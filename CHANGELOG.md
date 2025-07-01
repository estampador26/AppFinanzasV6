# Changelog

Todas las entradas notables en este proyecto serán documentadas en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [1.5.0-alpha] - 2025-06-29

### Added
- `2025-06-29T11:45:00+02:00` - feat(savings): Implementado módulo de metas de ahorro.
  - Creada subcolección `savingsGoals` y subcolección anidada `contributions` en Firestore con sus reglas de seguridad.
  - `DataContext` ampliado para gestionar metas y aportaciones, con actualización automática del progreso mediante transacciones.
  - Desarrollados componentes React: `SavingsGoalsPage`, `SavingsGoalForm`, `SavingsGoalList` y `ContributionForm`.
  - Implementada barra de progreso visual en la lista de metas.
  - Añadida ruta `/savings-goals` y enlace en el `Dashboard`.

---

## [1.4.0-alpha] - 2025-06-29

### Added
- `2025-06-29T12:15:00+02:00` - feat(budgets): Implementado módulo de gestión de presupuestos mensuales.
  - Creada subcolección `budgets` en Firestore con sus reglas de seguridad.
  - `DataContext` ampliado para gestionar los datos de presupuestos.
  - Desarrollados componentes React: `BudgetsPage`, `BudgetForm`, y `BudgetList`.
  - Implementada lógica para calcular el gasto real por categoría y mostrar el progreso.
  - Añadida ruta `/budgets` y enlace en el `Dashboard`.

---

## [1.3.0-alpha] - 2025-06-29

### Added
- `2025-06-29T11:25:00+02:00` - feat(financed-purchases): Implementado módulo de seguimiento de compras financiadas.
  - Creada subcolección `financedPurchases` en Firestore con sus reglas de seguridad.
  - `DataContext` ampliado para gestionar los datos.
  - Desarrollados componentes React: `FinancedPurchasesPage`, `FinancedPurchaseForm`, y `FinancedPurchaseList`.
  - Implementada lógica de cálculo de progreso y saldo pendiente.
  - Añadida ruta `/financed-purchases` y enlace en el `Dashboard`.

---

## [1.2.0-alpha] - 2025-06-29

### Added
- `2025-06-29T10:30:00+02:00` - feat(credit-cards): Vinculación de gastos a tarjetas y cálculo de saldo.
  - Modificado `TransactionForm` para permitir asociar un gasto a una tarjeta de crédito.
  - Implementada la lógica en `CreditCardList` para calcular y mostrar el saldo del ciclo actual de cada tarjeta en tiempo real.
- `2025-06-29T10:21:00+02:00` - feat(credit-cards): Implementada la base del módulo de gestión de tarjetas de crédito.
  - Creada subcolección `creditCards` en Firestore con sus reglas de seguridad.
  - Desarrollados componentes React: `CreditCardsPage`, `CreditCardForm`, y `CreditCardList`.
  - `DataContext` ampliado para gestionar el estado y la persistencia de las tarjetas.
  - Añadida ruta `/credit-cards` protegida y enlace en el `Dashboard`.

---

## [1.1.0-alpha] - 2025-06-29

### Added
- `2025-06-29T18:30:00+02:00` - feat(loans): Implementado módulo completo de gestión de préstamos personales.
  - Creada subcolección `loans` en Firestore.
  - Desarrollados componentes React: `LoansPage`, `LoanForm`, y `LoanList`.
  - Integrada lógica de cálculo de amortización y visualización de progreso.
  - `DataContext` ampliado para gestionar el estado y la persistencia de los préstamos.
  - Añadida ruta `/loans` protegida y enlace en el `Dashboard`.
- `2025-06-29T18:25:00+02:00` - feat(ui): Mejorada la interfaz de usuario del `Dashboard` utilizando `StyledComponents` para una apariencia más moderna y organizada.

### Fixed
- `2025-06-29T18:20:00+02:00` - fix(routing): Corregida la estructura de enrutamiento en `App.jsx` para solucionar errores de sintaxis y anidamiento.

### Changed
- `2025-06-29T18:28:00+02:00` - refactor(data): Refactorizado `DataContext` para asegurar la correcta implementación de la gestión de préstamos.

---

## [1.0.0-mvp] - 2025-06-28

### Added
- `2025-06-28T23:51:00+02:00` - feat(transactions): Integrado el formulario de creación de transacciones en el Dashboard.
- `2025-06-28T23:49:00+02:00` - feat(data): Implementado `DataContext` para la gestión de datos de Firestore y visualización de balance y transacciones en el Dashboard.
- `2025-06-28T23:47:00+02:00` - feat(functions): Creadas Cloud Functions `onUserCreate` (con categorías por defecto) y `onUserDelete`.
- `2025-06-28T23:45:00+02:00` - feat(security): Definidas reglas de seguridad en `firestore.rules` para proteger los datos de usuario.
- `2025-06-28T23:43:00+02:00` - feat(navigation): Implementado el enrutamiento principal con `react-router-dom` y las páginas de autenticación (`Login`, `Register`, `Dashboard` con `PrivateRoute`).
- `2025-06-28T23:41:00+02:00` - feat(auth): Configurado Firebase y creado `AuthContext` para la gestión de la autenticación.
- `2025-06-28T23:35:00+02:00` - chore: Inicializado el proyecto con Vite, establecida la estructura de directorios y dependencias base.
