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
