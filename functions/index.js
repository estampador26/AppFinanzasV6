const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

const db = admin.firestore();

/**
 * @name onUserCreate
 * @description Triggered when a new user signs up. Creates a corresponding user profile
 * in Firestore and populates it with default categories.
 */
exports.onUserCreate = functions.auth.user().onCreate(async (user) => {
  const { uid, email, displayName } = user;

  // Create user document in Firestore
  await db.collection("users").doc(uid).set({
    email,
    displayName,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    currency: "EUR", // Default currency
  });

  // Create default categories for the new user
  const categoriesCollection = db.collection("users").doc(uid).collection("categories");
  const defaultCategories = [
    { name: "Salario", type: "income", icon: "cash-outline" },
    { name: "Alimentación", type: "expense", icon: "fast-food-outline" },
    { name: "Transporte", type: "expense", icon: "bus-outline" },
    { name: "Ocio", type: "expense", icon: "game-controller-outline" },
    { name: "Hogar", type: "expense", icon: "home-outline" },
    { name: "Suscripciones", type: "expense", icon: "card-outline" },
    { name: "Otros", type: "expense", icon: "shapes-outline" },
  ];

  const batch = db.batch();
  defaultCategories.forEach((category) => {
    const docRef = categoriesCollection.doc(); // Automatically generate unique ID
    batch.set(docRef, category);
  });

  await batch.commit();
  console.log(`User profile and default categories created for ${uid}`);
});

/**
 * @name onUserDelete
 * @description Triggered when a user deletes their account. Cleans up all associated data
 * from Firestore to ensure data privacy.
 */
exports.onUserDelete = functions.auth.user().onDelete(async (user) => {
  const { uid } = user;
  const userDocRef = db.collection("users").doc(uid);

  // NOTE: Deleting a document does not delete its subcollections.
  // For a complete cleanup, a more complex recursive deletion is needed.
  // For this MVP, we will delete the main user document.
  // A full implementation should handle subcollection deletion.
  await userDocRef.delete();
  console.log(`User data cleaned up for ${uid}`);
});


/**
 * @name processSubscriptions
 * @description A scheduled function that runs daily to process recurring subscriptions.
 * It checks for subscriptions due for billing, creates a corresponding expense transaction,
 * and updates the next billing date for the subscription.
 */
/*
 * TODO: Descomentar y desplegar esta función cuando el proyecto se actualice al plan Blaze.
 * 
exports.processSubscriptions = functions.pubsub.schedule("every 24 hours").onRun(async (context) => {
    functions.logger.info("Starting subscription processing.", {structuredData: true});
    
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to the beginning of the day
    const todayTimestamp = admin.firestore.Timestamp.fromDate(today);

    const usersSnapshot = await db.collection("users").get();
    if (usersSnapshot.empty) {
        functions.logger.info("No users found. Exiting function.");
        return null;
    }

    const promises = [];

    for (const userDoc of usersSnapshot.docs) {
        const userId = userDoc.id;
        const subscriptionsRef = db.collection("users").doc(userId).collection("subscriptions");

        // Query for subscriptions where the next billing date is on or before today.
        const dueSubscriptionsQuery = subscriptionsRef.where("nextBillingDate", "<=", todayTimestamp);

        const processUserPromise = dueSubscriptionsQuery.get().then(snapshot => {
            if (snapshot.empty) {
                return;
            }

            const batch = db.batch();
            snapshot.forEach(doc => {
                const subscription = doc.data();
                const subId = doc.id;

                // 1. Create a new transaction for the expense
                const transactionsRef = db.collection("users").doc(userId).collection("transactions");
                batch.set(transactionsRef.doc(), {
                    amount: subscription.amount,
                    type: "expense",
                    category: "Suscripciones",
                    description: `Suscripción: ${subscription.name}`,
                    date: admin.firestore.FieldValue.serverTimestamp(),
                    userId: userId,
                });

                // 2. Calculate and update the next billing date
                const currentBillingDate = subscription.nextBillingDate.toDate();
                let nextBillingDate;

                if (subscription.frequency === "mensual") {
                    nextBillingDate = new Date(currentBillingDate.setMonth(currentBillingDate.getMonth() + 1));
                } else if (subscription.frequency === "anual") {
                    nextBillingDate = new Date(currentBillingDate.setFullYear(currentBillingDate.getFullYear() + 1));
                } else {
                    functions.logger.warn(`Unknown frequency '${subscription.frequency}' for sub ${subId}. Skipping.`);
                    return; // continue forEach
                }
                
                const subscriptionDocRef = subscriptionsRef.doc(subId);
                batch.update(subscriptionDocRef, { nextBillingDate: admin.firestore.Timestamp.fromDate(nextBillingDate) });
                
                functions.logger.info(`Processed subscription '${subscription.name}' for user ${userId}.`);
            });
            return batch.commit();
        }).catch(error => {
            functions.logger.error(`Error processing subscriptions for user ${userId}:`, error);
        });
        
        promises.push(processUserPromise);
    }

    await Promise.all(promises);
    functions.logger.info("Subscription processing finished.");
    return null;
});
*/
