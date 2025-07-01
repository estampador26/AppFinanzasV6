# Directiva Completa de Desarrollo de Proyecto: App de Finanzas Personales

## 📜 Prompt Maestro para la IA de Desarrollo

Actúa como una IA experta en desarrollo de software full-stack, con especialización en la creación de Aplicaciones Web Progresivas (PWA) y el uso del ecosistema de Google Firebase.

Tu objetivo es desarrollar de forma autónoma una aplicación de finanzas personales completa.

A continuación de este prompt, encontrarás un documento detallado titulado **'Informe Guía para el Desarrollo Autónomo de Aplicación de Finanzas Personales'**. Este documento es tu **única fuente de verdad** y contiene todos los requisitos, arquitectura tecnológica, módulos funcionales y fases de desarrollo que debes seguir de manera estricta.

### Metodología de Desarrollo y Control de Versiones

Antes de comenzar, es fundamental que sigas este protocolo de trabajo:

1.  **Repositorio Git:** Inicializarás un repositorio de Git localmente para este proyecto.
2.  **Commits Semánticos:** Cada vez que completes una tarea funcional, una corrección o una mejora, realizarás un commit. Los mensajes de commit deben seguir la convención de "Commits Semánticos" (ej. `feat:`, `fix:`, `docs:`, `chore:`). Por ejemplo: `feat(auth): Implementado el flujo de registro de usuario con email y contraseña`.
3.  **Push a GitHub:** Después de cada commit significativo, harás push de los cambios a una rama de desarrollo en un repositorio de GitHub cuya URL te proporcionaré. Esto es crucial para tener un respaldo continuo y para que yo pueda revisar tu progreso.
4.  **Registro de Acciones (Changelog):** Mantendrás un archivo llamado `CHANGELOG.md` en la raíz del proyecto. En este archivo, registrarás cada acción significativa que realices, con la fecha y hora exactas (formato ISO 8601, CEST). Por ejemplo: `2025-06-28T23:15:00+02:00 - feat: Implementado el formulario de registro de nuevos gastos.`

Este sistema de control de versiones y registro es crítico para tener un respaldo de tu trabajo, mantener el contexto en caso de interrupciones y para que yo pueda seguir tu progreso en detalle.

### Plan de Acción

Tu plan de trabajo debe seguir el 'Plan de Implementación Sugerido' descrito en el informe. Por lo tanto, tu primera tarea será enfocarte exclusivamente en la **Fase 1 (MVP)**.

Antes de escribir una sola línea de código, quiero que me presentes un **plan de acción detallado para la Fase 1**. Este plan debe incluir:
1.  La estructura de colecciones y documentos que propones para la base de datos Cloud Firestore.
2.  La arquitectura de componentes que usarás en el frontend (framework React).
3.  Una descripción de las Cloud Functions que podrías necesitar para la lógica del backend de esta fase.

Una vez que yo valide tu plan de acción, procederás a generar el código correspondiente a la Fase 1, entregándolo de forma modular, bien documentado y siguiendo el protocolo de control de versiones descrito.

Si en algún punto del informe encuentras una ambigüedad o necesitas una decisión de diseño no especificada (por ejemplo, la paleta de colores exacta), debes detenerme y solicitar una clarificación explícita. No asumas nada más allá de lo escrito en el informe.

Tu enfoque principal debe ser la calidad del código, la seguridad y la fidelidad absoluta a los requisitos.

Confirmado esto, ¿estás lista para analizar el 'Informe Guía' que sigue a continuación y comenzar con el plan de acción para la Fase 1?

---
---

## 📄 Informe Guía para el Desarrollo Autónomo de Aplicación de Finanzas Personales

**Versión:** 1.0
**Fecha:** 28 de junio de 2025
**Para:** IA de Desarrollo de Software Autónomo
**De:** Arquitecto de Soluciones FinTech

### **Resumen Ejecutivo**

El objetivo es construir una aplicación de finanzas personales multiplataforma (Web App/PWA y App Nativa Android) enfocada en la simplicidad y el control. El usuario principal es un cabeza de familia que necesita una herramienta intuitiva para gestionar sus ingresos, gastos recurrentes, suscripciones, y deudas (préstamos, tarjetas, financiaciones). La aplicación debe ser segura, rápida y proporcionar información accionable que permita al usuario tomar mejores decisiones financieras sin necesidad de ser un experto.

### **1. Visión y Principios de Diseño**

* **Objetivo Principal:** Facilitar la toma de decisiones financieras rápidas, informadas y seguras. La app debe transformar datos complejos en claridad y control para el usuario.
* **Principio de Simplicidad Radical:** Cada pantalla y flujo de trabajo debe ser intuitivo. El registro de un gasto debe tomar menos de 5 segundos.
* **Seguridad como Prioridad (Security by Design):** La confianza del usuario es el activo más importante. La seguridad no es una característica, es el fundamento.
* **Accionabilidad de los Datos:** La aplicación no solo muestra números, sino que también sugiere acciones. Debe responder a la pregunta del usuario: "¿Y ahora qué hago?".

### **2. Arquitectura Tecnológica Recomendada**

Para cumplir con el requisito multiplataforma de forma eficiente, se recomienda la siguiente pila tecnológica:

* **Frontend (Aplicación de Usuario):**
    * **Método Recomendado: Progressive Web App (PWA) usando el framework React.** Esta aproximación unifica el desarrollo para web y móvil. Se puede instalar en el escritorio del ordenador y en la pantalla de inicio de Android, comportándose casi como una app nativa, pero manteniendo una única base de código.
* **Backend (Lógica y Base de Datos):**
    * **Plataforma: Google Firebase.** Es una solución ideal "Backend-as-a-Service" que reduce drásticamente el tiempo de desarrollo.
    * **Autenticación:** **Firebase Authentication.** Provee un sistema seguro y fácil de implementar para el registro y login (Email/Contraseña, Google, etc.).
    * **Base de Datos:** **Cloud Firestore.** Una base de datos NoSQL, en tiempo real, escalable y perfecta para la sincronización instantánea entre dispositivos.
    * **Lógica de Servidor:** **Cloud Functions for Firebase.** Para ejecutar código backend en respuesta a eventos (ej. enviar un email de recordatorio, procesar un resumen mensual).
    * **Almacenamiento:** **Cloud Storage for Firebase.** Para guardar los backups generados por el usuario (PDF/Excel).
* **Seguridad:**
    * Toda la comunicación entre cliente y servidor debe ser sobre HTTPS.
    * Los datos sensibles en la base de datos (Firestore) deben estar protegidos con las Reglas de Seguridad de Firestore para garantizar que un usuario solo pueda acceder a su propia información.
    * Implementar autenticación de dos factores (2FA) como opción de seguridad avanzada para el usuario.

---

### **3. Desglose de Funcionalidades (Módulos de Desarrollo)**

A continuación, se detallan los módulos funcionales que la IA debe desarrollar.

#### **Módulo 1: Core - Onboarding y Gestión de Transacciones**

* **1.1. Autenticación de Usuario:**
    * Flujo de registro y login usando Firebase Authentication.
    * Opción de recuperación de contraseña.
* **1.2. Configuración Inicial (Onboarding):**
    * Al primer login, solicitar al usuario la moneda principal (ej. EUR, USD).
    * Un breve tutorial opcional mostrando las 3 características principales.
* **1.3. Registro de Ingresos y Gastos:**
    * **Flujo de Registro Rápido:** Un botón flotante (+) siempre visible para añadir una transacción.
    * **Campos para Transacción:**
        * Monto.
        * Tipo (Ingreso / Gasto).
        * Categoría (lista predefinida y personalizable).
        * Subcategoría (opcional, personalizable).
        * Fecha (por defecto, la actual).
        * Descripción (opcional).
        * Etiquetas (opcional, para búsquedas avanzadas, ej. #vacaciones2025).
    * **Transacciones Recurrentes:** Opción para marcar una transacción como recurrente (diaria, semanal, mensual, anual) con fecha de inicio y fin (opcional). El sistema debe generar automáticamente estas transacciones en las fechas correspondientes.

#### **Módulo 2: Gestión de Compromisos Financieros**

* **2.1. Panel de Suscripciones y Servicios:**
    * Sección dedicada para listar servicios como Netflix, Spotify, gimnasio, etc.
    * **Campos:** Nombre, Monto, Frecuencia de pago (mensual/anual), Fecha del próximo cobro.
    * El sistema debe generar automáticamente el gasto correspondiente en la fecha de cobro.
    * **Visualización:** Mostrar el coste anual total de todas las suscripciones.
* **2.2. Módulo de Préstamos Personales:**
    * Sección para registrar y seguir préstamos.
    * **Campos:** Nombre del préstamo (ej. "Préstamo Coche"), Banco/Entidad, Monto inicial, Tasa de Interés Anual (TAE), Cuota mensual, Fecha de inicio.
    * **Cálculo Automático:** El sistema debe calcular y mostrar el monto pendiente, el capital amortizado y una gráfica simple de amortización. La cuota mensual debe registrarse como un gasto recurrente.
    * **Fórmula de amortización de referencia para el cálculo:**
        $$ M = P \frac{i(1+i)^n}{(1+i)^n - 1} $$
        Donde:
        - $M$ = Cuota mensual
        - $P$ = Monto del préstamo (principal)
        - $i$ = Tasa de interés mensual (interés anual / 12)
        - $n$ = Número total de cuotas
* **2.3. Gestión de Tarjetas de Crédito Revolving:**
    * Sección para tarjetas de crédito.
    * **Campos:** Nombre de la tarjeta, Límite de crédito, Fecha de corte, Fecha límite de pago.
    * **Funcionalidad:** Permitir al usuario registrar el pago mensual y actualizar el saldo pendiente.
    * **Alertas:** Generar recordatorios automáticos días antes de la fecha de corte y la fecha de pago.
* **2.4. Seguimiento de Compras Financiadas (a Plazos):**
    * Módulo específico para compras tipo "móvil a 24 meses".
    * **Campos:** Nombre del artículo, Tienda, Monto total, Número de cuotas, Cuota mensual.
    * **Visualización:** Mostrar "Pagado X de Y cuotas" y el monto restante. La cuota se registra como gasto recurrente.

#### **Módulo 3: Visualización, Presupuestos y Alertas**

* **3.1. Dashboard Principal (Pantalla de Inicio):**
    * Balance del mes actual: `Ingresos - Gastos = Saldo`.
    * Gráfico circular o de barras mostrando los gastos por categoría del mes en curso.
    * Próximos vencimientos (suscripciones, préstamos, tarjetas) de los próximos 7 días.
    * Acceso rápido a las últimas 5 transacciones.
* **3.2. Informes y Resumen Histórico:**
    * Vista que permita filtrar por mes, año o rango de fechas personalizado.
    * Comparativa de ingresos vs. gastos entre diferentes periodos (ej. "este mes vs. el mes pasado").
    * Opción para exportar el resumen del periodo seleccionado a PDF y CSV/Excel.
* **3.3. Sistema de Presupuestos:**
    * Permitir al usuario fijar un límite de gasto mensual por categoría (ej. "Alimentación: 400€").
    * Mostrar una barra de progreso para cada presupuesto en la vista de categorías.
    * **Alertas de Presupuesto:** Notificación push cuando se alcance el 75% y el 100% del presupuesto de una categoría.
* **3.4. Panel de Alertas y Recordatorios:**
    * Centro de notificaciones centralizado dentro de la app.
    * Configuración para que el usuario elija qué notificaciones desea recibir (vencimientos, presupuestos, etc.) y por qué medio (push y/o email).

#### **Módulo 4: Funciones Avanzadas (Post-MVP)**

* **4.1. Dashboard Inteligente con IA:**
    * Una vez que existan datos de varios meses, implementar un módulo que analice los patrones de gasto.
    * **Sugerencias Proactivas:**
        * "Has gastado un 20% más en 'Restaurantes' este mes en comparación con tu media."
        * "Detectamos un gasto inusual en [Categoría]."
        * "Puedes ahorrar X€ al año si cancelas suscripciones con bajo uso." (Requeriría una entrada manual del usuario sobre el uso).
* **4.2. Metas de Ahorro:**
    * Permitir al usuario crear objetivos de ahorro (ej. "Viaje a Japón", "Fondo de Emergencia").
    * **Campos:** Nombre de la meta, Monto objetivo, Fecha límite.
    * Funcionalidad para asociar ingresos o transferencias específicas a esa meta y visualizar el progreso.

---

### **4. Plan de Implementación Sugerido para la IA**

Se recomienda un desarrollo por fases para validar el producto de forma incremental.

1.  **Fase 1 (MVP - Producto Mínimo Viable):**
    * Implementar el **Módulo 1** completo.
    * Implementar las funciones básicas del **Módulo 3** (Dashboard Principal, Informes simples sin exportación).
    * El objetivo es lanzar una versión funcional que permita al usuario registrar y visualizar sus finanzas mensuales.
2.  **Fase 2 (Expansión de Funcionalidades):**
    * Implementar el **Módulo 2** completo (Suscripciones, Préstamos, Tarjetas, Financiaciones).
    * Completar el **Módulo 3** (Exportación a PDF/Excel, Sistema de Presupuestos y Alertas).
3.  **Fase 3 (Inteligencia y Retención):**
    * Implementar el **Módulo 4** (Dashboard Inteligente y Metas de Ahorro).
    * Refinar la UI/UX basándose en el feedback inicial.
    * **Opcional Avanzado:** Investigar la integración con APIs de Open Banking (vía PSD2) para la sincronización automática de cuentas bancarias. Esto sería una mejora significativa pero de alta complejidad.