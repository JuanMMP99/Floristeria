# Sistema de Pedidos - Florería Natura

### Guía de implementación paso a paso (mismo patrón que C&H Consultorio Dental)

Este sistema usa **Google Sheets como base de datos** y **Google Apps Script como backend**, sin costo de hosting. Tiene dos partes:

1. **API pública** — recibe los pedidos desde `productos.html` / `index.html` y los guarda en una hoja de cálculo.
2. **Panel administrativo** (`Admin.html`) — CRM privado con login, dashboard, listado de pedidos, agendado manual, directorio de clientes, PDF y respaldos.

---

## PASO 1 — Crear la hoja de cálculo

1. Ve a [sheets.google.com](https://sheets.google.com) y crea una hoja nueva.
2. Nómbrala, por ejemplo: **"Florería Natura - CRM Pedidos"**.
3. No necesitas crear las pestañas **Pedidos**, **Usuarios** ni **Visitas** a mano: el código las crea automáticamente cuando se ejecutan las funciones correspondientes (`getSheet()`, `getUsersSheet_()`, `getVisitasSheet_()`).

---

## PASO 2 — Crear el proyecto de Apps Script

1. En la hoja, ve a **Extensiones → Apps Script**.
2. Esto crea un proyecto de Apps Script **vinculado a esta hoja específica**. Es importante que sea así, porque `getSheet()` utiliza `SpreadsheetApp.getActiveSpreadsheet()` y no un ID fijo.
3. Borra el contenido de `Código.gs` y pega **todo** el contenido de `Code.gs` (el archivo que te entregué).
4. En el menú lateral de archivos, crea un archivo HTML nuevo llamado exactamente **`Admin`** (Apps Script le pondrá la extensión `.html` automáticamente) y pega el contenido de `Admin.html`.
5. Guarda el proyecto (ícono de disquete). Nómbralo, por ejemplo: **"Florería Natura - Backend"**.

---

## PASO 3 — Inicializar y probar el backend

Antes de crear los despliegues, ejecuta las funciones de prueba para comprobar que el proyecto está correctamente conectado a la hoja y que se creen las estructuras necesarias.

1. En el selector de funciones, arriba, junto al botón **▷ Ejecutar**, busca `testConection`.
2. Selecciona `testConection` y dale **Ejecutar**.
3. La primera vez Google te pedirá autorizar los permisos del proyecto. Autorízalos con la cuenta que administra la hoja.
4. Revisa el **Registro de ejecución** para confirmar que la prueba terminó correctamente.
5. Después, en el selector de funciones, busca `handleRegistrarVisita`.
6. Selecciona `handleRegistrarVisita` y dale **Ejecutar**.
7. Revisa nuevamente el **Registro de ejecución** y confirma que la función terminó correctamente.
8. Abre la hoja de cálculo y verifica que se hayan creado las pestañas necesarias, incluyendo **Visitas**. Las demás pestañas se crean automáticamente conforme las funciones del backend las necesiten.

> **Importante:** ejecuta `testConection()` y `handleRegistrarVisita()` antes de continuar con los despliegues. Esto permite comprobar primero que el backend puede trabajar correctamente con la hoja de cálculo.

---

## PASO 4 — Crear tu primer usuario administrador

1. Abre la función `crearPrimerAdmin()` en el código.
2. Edita estas tres líneas con tus datos reales:

   ```js
   const nombre = 'Florería Natura';
   const email = 'tu-correo-real@gmail.com';
   const passwordPlano = 'unaContraseñaSegura123';
   ```
3. Selecciona `crearPrimerAdmin` en el menú de funciones y dale **Ejecutar**.
4. Esta función solo se puede correr **una vez** (queda protegida). Si necesitas correrla de nuevo, primero ejecuta `resetearSetup()`.
5. Revisa el **Registro de ejecución** para confirmar que el usuario fue creado correctamente.
6. Después de crear usuarios adicionales, hazlo desde el panel (no desde aquí).

---

## PASO 5 — Primer despliegue: API pública

1. Arriba a la derecha, clic en **Implementar → Nueva implementación**.
2. Tipo: **Aplicación web**.
3. Configuración:

   * **Ejecutar como:** Yo (tu cuenta)
   * **Quién tiene acceso:** Cualquier usuario
4. Clic en **Implementar** y autoriza los permisos que pida Google.
5. Copia la **URL de la aplicación web** que te da — termina en `/exec`. Esa es tu **URL pública de la API**.

---

## PASO 6 — Segundo despliegue: Panel administrativo

Vas a crear una **segunda implementación**, con otra URL, dedicada solo al panel. Así separas el acceso público del privado sin necesitar dos proyectos distintos.

1. Clic otra vez en **Implementar → Nueva implementación**.
2. Tipo: **Aplicación web**.
3. Configuración:

   * **Ejecutar como:** Yo (tu cuenta)
   * **Quién tiene acceso:** Cualquier usuario
4. Implementar y copiar esta **segunda URL** — esta es tu **URL del panel admin**.

> Tendrás dos URLs distintas de `/exec`. El código decide cuál mostrar el panel y cuál la API comparando la URL desde la que se ejecuta contra la que guardes en el paso siguiente.

---

## PASO 7 — Vincular la URL del panel admin

1. En el editor de Apps Script, abre la función `configurarUrlAdmin()`.
2. Reemplaza `'PEGA_AQUI_LA_URL_DE_TU_DEPLOYMENT_ADMIN'` con la **URL del panel** que copiaste en el Paso 6.
3. Selecciónala en el menú desplegable de funciones (arriba) y dale **Ejecutar**.
4. Revisa el registro (Ver → Registro) — debe decir **"URL del panel administrativo configurada"**.

Esto guarda la URL en las Propiedades del Script y permite que `doGet()` determine si debe mostrar el panel HTML o responder como API JSON.

---

## PASO 8 — Activar el respaldo semanal automático (opcional pero recomendado)

1. Selecciona la función `instalarTriggerRespaldoSemanal` en el menú de funciones.
2. Dale **Ejecutar** una sola vez.
3. Esto crea un disparador que corre cada **lunes ~2:00 AM** y guarda un `.xlsx` con la hoja de Pedidos (nunca la de Usuarios) en una carpeta de Drive llamada **"Respaldos CRM - Pedidos Florería Natura"**.
4. Confirma en **Triggers / Disparadores** (icono de reloj a la izquierda) que el disparador quedó creado correctamente.

---

## PASO 9 — Conectar el sitio público al backend

1. Abre `constants.js`.
2. Reemplaza:

   ```js
   API_URL: 'PEGA_AQUI_LA_URL_DE_TU_DEPLOYMENT_PUBLICO',
   ```

   con la **URL pública del Paso 5**.
3. Sube estos archivos actualizados a tu hosting, reemplazando los actuales:

   * `constants.js` (con tu API_URL)
   * `api.js` (nuevo)
   * `app.js` (actualizado: ahora guarda el pedido en el backend antes de abrir WhatsApp)
   * `index.html` (actualizado: honeypot anti-spam + carga `api.js`)
   * `productos.html` (actualizado: honeypot anti-spam + carga `api.js`)
   * `styles.css` (actualizado: estilo del honeypot)
   * `catalog.js` y `productos.js` — **sin cambios**, no necesitas re-subirlos, pero puedes hacerlo por consistencia.

---

## PASO 10 — Probar todo el flujo

1. Abre tu sitio público.
2. Verifica que se registre una visita y confirma que aparezca una fila nueva en la pestaña **Visitas**.
3. Agrega productos al carrito.
4. Completa el formulario de pedido y envíalo.
5. Deberías ver:

   * Un mensaje de confirmación en el sitio.
   * WhatsApp abrirse con el mensaje del pedido.
   * Un correo de notificación en la cuenta que configuraste dentro de `handleCrearPedido` en `Code.gs` (busca `juanposicionsatelital@gmail.com` y cámbialo por el correo real de la florería).
6. Abre la **URL del panel admin** (Paso 6) en el navegador.
7. Inicia sesión con el usuario del Paso 4.
8. Verifica que el pedido aparezca en **Pedidos** y en el **Dashboard**.
9. Desde el panel, prueba **exportar el PDF de un pedido**.
10. Prueba también **forzar un respaldo manual**.
11. Confirma que Drive y Docs soliciten/dispongan de los permisos necesarios y que ambas funciones funcionen correctamente.

---

## Resumen de las pestañas del panel

| Pestaña            | Qué hace                                                                                                 |
| ------------------ | -------------------------------------------------------------------------------------------------------- |
| **Dashboard**      | Totales, ventas, entregas de hoy, desglose por estatus y modalidad, respaldo manual                      |
| **Pedidos**        | Lista filtrable (por estatus, fecha, búsqueda), ver detalle, cambiar estatus, exportar comprobante a PDF |
| **Agendar Pedido** | Registrar un pedido tomado por teléfono/en tienda, con productos y total capturados a mano               |
| **Clientes**       | Directorio derivado automáticamente del historial de pedidos (gasto total, puntos, última compra)        |

Además, el backend utiliza la pestaña **Visitas** para registrar las visitas provenientes del sitio público y **Usuarios** para gestionar los usuarios del panel administrativo.

## Notas importantes

* **Nunca compartas la URL del panel admin públicamente** — aunque tiene login, es mejor mantenerla solo entre quienes la usan.
* Los **puntos florería** se calculan automáticamente ($100 MXN = 1 punto) tanto en pedidos del sitio como en los agendados manualmente.
* Si en algún momento cambias el catálogo de productos (`catalog.js`), no hace falta tocar el backend: los pedidos guardan el nombre/precio tal como estaban al momento de la compra.
* El correo de notificación se envía desde tu cuenta de Google (la que creó el script), usando `MailApp.sendEmail`, sin configuración adicional de SMTP.
* **`testConection()` y `handleRegistrarVisita()` deben ejecutarse durante la configuración inicial, antes de realizar los despliegues.**
