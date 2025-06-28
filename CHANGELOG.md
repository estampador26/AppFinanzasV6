# Changelog

Todas las entradas notables en este proyecto serán documentadas en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

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
