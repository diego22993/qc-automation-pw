# Contexto del proyecto para alumnos y agentes de Test Automation

> Documento base para recuperar contexto del repositorio y planificar nuevos flujos de automatización. Está pensado para usarse como contexto de un agente (RAG). Describe el estado observado durante la revisión; el código actual es siempre la fuente de verdad.

## 1. Cómo usar este documento

Al comenzar una tarea:

1. Lee esta guía para orientarte y confirma los archivos relevantes del repositorio.
2. Contrasta cada dato que pueda haber cambiado con la configuración y el código actuales.
3. Usa los patrones existentes cuando sean adecuados; no los generalices ciegamente.
4. Separa hechos observados, hipótesis y recomendaciones.
5. Si un requisito funcional o el comportamiento esperado no está claro, pregunta o registra la suposición antes de implementarlo.

Este archivo no reemplaza los criterios de aceptación ni autoriza a un agente a cambiar el alcance de una tarea. No inventes endpoints, credenciales, reglas de negocio ni resultados esperados que no estén en el código o en el requisito.

## 2. Resumen ejecutivo

- Repositorio de práctica de automatización end-to-end con **Playwright Test y TypeScript**.
- Las pruebas ejercitan aplicaciones públicas de práctica/demo; no hay código de una aplicación de negocio bajo prueba dentro del repositorio.
- Los dominios funcionales son Practice Test Automation, SauceDemo, una lista de espera de Kit y un flujo de Booking.com en construcción.
- La arquitectura usa specs, Page Objects, datos JSON y proveedores/validadores de escenarios.
- La configuración activa Chromium, permite paralelismo completo, limita CI a un worker y genera reporte HTML.
- En el inventario realizado se detectaron 14 pruebas en 6 archivos spec.
- El área Booking dispone de Page Objects y utilidades, pero no se encontraron specs de Booking.
- La comprobación de TypeScript falla actualmente por dos imports de `bookingModal`; el listado de tests sí pudo descubrir las 14 pruebas.

## 3. Estructura del repositorio

| Ruta | Responsabilidad actual |
|---|---|
| `playwright.config.ts` | Configuración global de Playwright, workers, retries, reporter, `baseURL` y projects |
| `tests/` | Specs de los flujos y fixture específico de SauceDemo |
| `pages/` | Page Objects agrupados por área (`practice`, `saucedemo`, `booking`) |
| `utils/` | Proveedores/validadores de escenarios y utilidades de datos/fechas |
| `data/` | Escenarios de prueba en JSON |
| `uml/` | Diagrama Mermaid de clases de SauceDemo; validar vigencia antes de usarlo |
| `.github/workflows/playwright.yml` | Pipeline de GitHub Actions |
| `docs/` | Guías y contexto didáctico del repositorio |

No se encontró un README en los archivos versionados durante esta revisión. No existe actualmente una carpeta `tests/booking/`.

## 4. Flujos existentes

### 4.1 Practice Test Automation

- `tests/practice/PracticeHome.spec.ts`: valida secciones y enlaces de la página de práctica.
- `tests/practice/PracticeTestLogin.spec.ts`: carga escenarios JSON para login válido e inválido y valida los resultados.
- `tests/practice/PracticeContact.spec.ts`: completa el formulario con datos sintéticos, verifica campos requeridos y evita enviar el POST del formulario.
- Los Page Objects correspondientes están en `pages/practice/`.
- Se usan tags como `@practice`, `@practice-hub`, `@practice-login`, `@contact`, `@auth` y `@smoke`.

### 4.2 Kit Workshop / waitlist

- `tests/practice/KitWaitlist.spec.ts` contiene un caso de suscripción y un caso de email requerido.
- `utils/practice/waitlistScenarioProvider.ts` valida los escenarios y genera emails sintéticos.
- Las solicitudes del flujo de suscripción se interceptan; se comprueba el contenido enviado y se bloquean intentos de POST de suscripción no simulados.
- El Page Object está en `pages/practice/KitWaitlistPage.ts`.
- Tags observados: `@waitlist`, `@practice`, `@smoke` y `@validation`.

### 4.3 SauceDemo

- `tests/saucedemo/SauceDemoClase6Test.spec.ts`: escenarios de login válido, usuario bloqueado y contraseña incorrecta.
- `tests/saucedemo/SauceDemoCheckoutTest.spec.ts`: agregar/quitar productos, detalle de producto y checkout.
- Los datos viven en `data/saucedemo-login-scenarios.json` y `data/saucedemo-checkout-scenarios.json`.
- Los Page Objects están en `pages/saucedemo/`.
- `tests/fixtures/saucedemo.fixture.ts` crea un `SauceLoginPage`, navega a login antes de entregar el fixture y exporta `expect`.
- Tags observados: `@saucedemo`, `@auth`, `@cart`, `@checkout` y `@smoke`.

### 4.4 Booking.com

- Existen Page Objects para búsqueda de hoteles, resultados, detalle, checkout y búsqueda de vuelos en `pages/booking/`.
- `utils/booking/bookingDates.ts` genera fechas futuras para una estadía.
- `BookingBasePage` concentra navegación y manejo de avisos de cookies/modales; `bookingModal.ts` registra un handler por `Page`.
- Los flujos de búsqueda incluyen validaciones de fechas/cantidad de adultos, selección de filtros, resultados y manejo de pop-ups.
- No se encontraron archivos spec que ejecuten estos Page Objects. Trátalos como componentes aún no cubiertos por pruebas; antes de presentarlos como flujo validado, crea y ejecuta tests.
- Booking.com es un sitio externo dinámico. Cualquier prueba nueva debe evitar acciones de reserva/compra reales y privilegiar validaciones seguras o datos/entornos autorizados.

## 5. Patrones de diseño y convenciones observadas

### 5.1 Specs y Page Objects

- Los specs orquestan el flujo y declaran el resultado esperado.
- Los Page Objects encapsulan locators y acciones de pantalla.
- Las clases reciben `Page` por constructor y almacenan `Locator`.
- Se utilizan locators accesibles como `getByRole` y `getByLabel`, además de `data-test` o CSS cuando corresponde.
- Los módulos Practice instancian sus Page Objects directamente; SauceDemo además usa un fixture compartido de login.
- Booking tiene una clase base para navegación y manejo de elementos transversales.

Al crear un flujo, reutiliza un Page Object o fixture existente si coincide con la responsabilidad. Evita meter lógica de muchos dominios en una clase genérica o crear abstracciones para un único uso.

### 5.2 Datos y escenarios

- Los escenarios se mantienen en JSON y los proveedores los transforman a tipos TypeScript.
- Los loaders usan `JSON.parse` como `unknown`, validaciones de forma/tipo y errores explícitos con el número o contexto del escenario.
- Los archivos de escenarios se resuelven desde `process.cwd()/data`; ejecutar comandos desde la raíz del proyecto.
- Algunos escenarios se convierten en varios tests mediante un `for...of` durante el registro del spec.
- `generateSyntheticUser` usa `randomUUID` para evitar repetir emails sintéticos en tests de contacto.

Al agregar escenarios dinámicos, conserva validación en runtime: un tipo TypeScript por sí solo no valida JSON externo. Valida objetos, listas, campos requeridos y valores permitidos; los errores deben identificar el escenario y el campo.

### 5.3 Aserciones, sincronización y aislamiento

- Las pruebas usan `expect` de Playwright; hay aserciones web-first, `expect.poll` para valores que pueden actualizarse y algunas aserciones sobre valores obtenidos mediante helpers.
- Para estado de UI, prefiere `await expect(locator).toBeVisible()` / `toHaveText()` / `toHaveValue()` frente a leer una vez un valor y hacer una aserción inmediata, porque las aserciones web-first reintentan hasta timeout.
- No agregues esperas fijas como `waitForTimeout`; espera una condición observable, un estado o una respuesta relevante.
- Cada prueba debe poder ejecutarse sola y en cualquier orden. No compartas `Page`, `BrowserContext` ni datos mutables entre tests.
- Los retries ayudan a recopilar evidencia de fallos intermitentes; no deben ocultar condiciones de carrera o aserciones débiles.

### 5.4 Interceptación de red y efectos secundarios

- Los flujos de contacto y waitlist ya interceptan o bloquean solicitudes de escritura para evitar enviar formularios reales.
- Si una prueba necesita validar un efecto externo, determina primero si debe simularse, bloquearse o ejecutarse contra un entorno de prueba autorizado.
- Comprueba tanto el resultado visible como la solicitud/dato enviado cuando eso forma parte del requisito.
- No agregues envíos, reservas, pagos, correos ni escrituras reales como parte de una práctica sin autorización y protección explícitas.

## 6. Configuración de ejecución actual

La configuración observada en `playwright.config.ts`:

| Elemento | Valor observado | Consecuencia |
|---|---|---|
| `testDir` | `./tests` | Descubrimiento desde la carpeta de tests |
| `fullyParallel` | `true` | Habilita repartir pruebas individuales en paralelo |
| `workers` | `process.env.CI ? 1 : undefined` | Un worker en CI; Playwright decide el valor local |
| `retries` | `process.env.CI ? 2 : 0` | Reintentos en CI |
| `reporter` | `html` | Reporte HTML |
| `trace` | `on-first-retry` | Trace en el primer retry |
| `projects` activos | `chromium` | Firefox/WebKit aparecen comentados |
| `baseURL` | `BASE_URL` o SauceDemo | Afecta principalmente rutas relativas; varias páginas usan URLs completas |

No asumas que todos los tests usan `baseURL`. Para una prueba nueva, identifica si navega mediante URL absoluta o ruta relativa antes de modificar esta variable.

## 7. Comandos y CI existentes

### Comandos principales

```powershell
npm install
npm test
npx playwright test --list
npx playwright test --workers=1
npx playwright test --project=chromium
npx playwright test --grep "@smoke"
npm run test:report
```

Scripts disponibles en `package.json`:

- `test`, `test:ui`, `test:saucedemo`, `test:ui:saucedemo`
- `test:contact`, `test:wait`, `test:checkout`, `test:booking`
- `debug:saucedemo`, `debug:booking`, `test:smoke`
- scripts de Allure (`allure:generate`, `allure:open`, `allure:serve`)

Detalles que un agente debe tener en cuenta:

- `test:smoke` incluye `--ui`; para una ejecución CLI/CI no interactiva se puede usar `npx playwright test --grep "@smoke"`.
- `test:booking` y `debug:booking` existen, pero no se encontraron specs Booking ni tests con tag `@booking`; verificar el descubrimiento antes de asumir que ejecutaron casos.
- Hay dependencias y scripts de Allure, pero el reporter configurado actualmente es HTML; no asumir que Allure está integrado en la ejecución.
- No se observaron scripts de lint, formato ni typecheck en `package.json`.

### GitHub Actions

`.github/workflows/playwright.yml`:

1. Ejecuta en `push` y `pull_request` contra `main`/`master`.
2. Usa `ubuntu-latest` y Node LTS.
3. Instala dependencias con `npm ci`.
4. Ejecuta `npx playwright install --with-deps`.
5. Ejecuta `npx playwright test`.
6. Sube `playwright-report/` como artifact por hasta 30 días, salvo cancelación.

La configuración limita CI a un worker. El workflow sube el reporte HTML; no se observó un paso separado que suba `test-results/` o traces como artifact.

## 8. Hallazgos técnicos verificados durante la revisión

Estos hallazgos describen el snapshot revisado; vuelve a comprobarlos antes de actuar:

1. **TypeScript no compila actualmente.** `npx tsc --noEmit` reportó `TS2307` en:
   - `pages/booking/BookingBasePage.ts`: importa `../bookingModal`.
   - `pages/booking/BookingResultsPage.ts`: importa `../bookingModal`.
   
   El archivo existente está en `pages/booking/bookingModal.ts`, dentro del mismo directorio; el path relativo parece no corresponder. No se modificó código como parte de esta guía.

2. **El descubrimiento de Playwright sí funciona.** `npx playwright test --list` detectó 14 tests en 6 archivos, todos bajo el project `chromium`. Listar no equivale a ejecutar los tests.

3. **Booking todavía no tiene cobertura de spec.** Existen clases de página y un comando de booking, pero no tests descubiertos para ese flujo.

4. **No se observó un typecheck en CI.** El workflow ejecuta Playwright, pero no `npx tsc --noEmit`; la suite puede descubrir tests aunque la compilación estática reporte problemas en módulos no cargados por esos tests.

5. **Dependencia de sitios externos.** Practice, SauceDemo, Kit y Booking usan sitios fuera del repositorio. Sus cambios, disponibilidad, red, rate limits o controles anti-bot pueden afectar la estabilidad.

6. **Artefactos y diagramas requieren vigencia.** `uml/saucedemo-clase-4-diagrama-clases-uml.mmd` parece describir una versión/clase anterior; comparar el diagrama con los Page Objects y specs actuales antes de usarlo como contrato.

7. **Estilo TypeScript no es totalmente uniforme.** La configuración usa comillas simples y varios specs/POM usan comillas dobles. Al editar, conserva el estilo del archivo y evita reformateos masivos.

El chequeo de typecheck y el inventario son evidencia de esta revisión, no una certificación de estabilidad del sitio ni una ejecución de los 14 tests.

## 9. Oportunidades de mejora para una evolución profesional

Prioriza según el flujo y el riesgo, no intentes refactorizar todo de una vez:

1. Corregir y validar los imports de Booking antes de apoyarse en esos módulos.
2. Crear specs para Booking solo con escenarios seguros, claros y autorizados; cubrir primero una búsqueda no transaccional.
3. Incorporar un paso de typecheck a CI cuando el baseline esté limpio.
4. Evaluar `strict` de TypeScript, lint y formatter de forma incremental, con cambios de configuración separados de features.
5. Considerar si algunas expectativas síncronas de valor deberían ser aserciones web-first.
6. Estabilizar dependencias externas usando datos seguros, interceptación selectiva o un entorno controlado cuando corresponda.
7. Mantener el reporte y traces necesarios para diagnosticar CI; evaluar la retención de `test-results/`.
8. Aclarar tags y scripts para que cada comando seleccione realmente una suite descubierta.
9. Mantener diagramas y documentación alineados con el código que se ejecuta hoy.
10. Activar más navegadores o workers solo después de comprobar independencia, recursos y estabilidad.

## 10. Procedimiento recomendado para implementar un flujo nuevo

### Paso 1: entender el requisito

- Identifica actor, precondiciones, acción, resultado esperado y reglas de negocio.
- Separa escenarios positivos, negativos y límites que realmente cambian el comportamiento.
- Decide qué no debe ocurrir (por ejemplo, no enviar un POST real).
- No derives el resultado esperado de la implementación del test; usa el requisito o un contrato verificable.

### Paso 2: localizar un patrón existente

- Para el estilo de Page Objects, revisa `pages/practice/` o `pages/saucedemo/`.
- Para fixtures, revisa `tests/fixtures/saucedemo.fixture.ts`.
- Para escenarios JSON validados, revisa el provider del dominio más parecido.
- Para interceptación de escritura, revisa los tests de Contact y Waitlist.
- Reutiliza solo código que tenga la misma responsabilidad; no acoples un flujo a un módulo ajeno.

### Paso 3: diseñar una prueba independiente

- Define precondiciones y datos por prueba.
- Evita estado compartido y dependencia del orden.
- Decide qué datos pueden ser sintéticos y cuáles requieren configuración externa segura.
- Para un sitio externo, limita acciones a las autorizadas y simula/aborta efectos secundarios cuando sea apropiado.

### Paso 4: implementar el Page Object mínimo

- Recibe `Page` en el constructor.
- Mantén locators y acciones de pantalla dentro de la clase.
- Prefiere locators por rol/label/nombre accesible; usa `data-test` o CSS estable si no hay una alternativa semántica adecuada.
- Centraliza navegación y componentes compartidos solamente cuando el patrón tenga más de un uso real.
- Mantén los tipos y errores explícitos; no uses `any` como atajo.

### Paso 5: agregar datos solo si aportan valor

- Para pocos valores legibles, el escenario puede vivir cerca del spec.
- Si hay conjuntos reutilizables o data-driven tests, usa `data/<dominio>-<flujo>-scenarios.json` con un provider en `utils/<dominio>/`.
- Valida el JSON en runtime con mensajes accionables.
- No guardes secretos, datos personales ni cuentas reales en JSON o en código.

### Paso 6: escribir el spec

- Ubícalo bajo `tests/<dominio>/` con sufijo `.spec.ts`.
- Describe la intención del negocio en español, siguiendo los nombres del área.
- Usa `test.describe`, tags existentes cuando correspondan y nombres de caso específicos.
- Coloca las aserciones de resultado en el spec; usa aserciones web-first para UI.
- No añadas `test.only`, esperas fijas, retries locales como solución a una carrera ni aserciones que dependan del orden.

### Paso 7: ejecutar y depurar en pequeño

```powershell
npx playwright test --list
npx playwright test tests/<dominio>/<flujo>.spec.ts --workers=1
npm test
```

Primero confirma que el test se descubre; después ejecuta el caso nuevo; finalmente ejecuta la suite relevante. Ante un fallo, conserva el error, revisa HTML/trace y reduce a un project y un worker.

### Paso 8: evaluar la calidad de entrega

- Ejecuta typecheck y pruebas dirigidas disponibles. Considera el error TypeScript de Booking señalado arriba como estado base pendiente, no como fallo introducido por una tarea nueva.
- Asegúrate de que las pruebas no provoquen efectos reales.
- Actualiza documentación solo si el flujo cambia instrucciones, scripts o arquitectura.
- Resume archivos modificados, pruebas ejecutadas y fallos conocidos.

## 11. Estructura posible para un flujo data-driven

Usa solo los archivos que el caso necesite; no es requisito crear los cuatro siempre:

```text
tests/<dominio>/<flujo>.spec.ts
pages/<dominio>/<Pantalla>Page.ts
utils/<dominio>/<flujo>ScenarioProvider.ts
data/<dominio>-<flujo>-scenarios.json
```

Flujo conceptual:

```text
spec -> provider (si aplica) -> Page Object -> interfaz bajo prueba
  └── assertions de resultado
```

## 12. Criterio de terminado (Definition of Done)

- [ ] El requisito y los resultados esperados son trazables y no inventados.
- [ ] El test es legible, aislado y ejecutable sin depender de otro.
- [ ] Los locators son estables y las aserciones esperan el estado observable.
- [ ] Los datos son sintéticos/seguros y validados si provienen de JSON.
- [ ] Los efectos externos están bloqueados, simulados o explícitamente autorizados.
- [ ] El test aparece en `npx playwright test --list`.
- [ ] Se ejecutó el test afectado y se reportó el resultado real.
- [ ] Typecheck/lint aplicables se ejecutaron o se anotó claramente el bloqueo preexistente.
- [ ] No se añadieron credenciales, `test.only`, esperas fijas ni cambios fuera de alcance.
- [ ] La respuesta final distingue lo implementado de lo pendiente y enlaza los archivos relevantes.

## 13. Instrucciones compactas para un agente

> Usa esta guía como contexto orientativo y verifica el código fuente antes de modificarlo. Implementa únicamente el flujo solicitado, en los directorios y patrones existentes; conserva pruebas independientes, datos seguros, locators estables y aserciones web-first. No inventes requisitos ni ejecutes efectos externos reales. Ejecuta primero el test dirigido y luego las verificaciones aplicables. Distingue fallos preexistentes —incluidos los imports Booking reportados por `tsc` en este snapshot— de los causados por tus cambios. Explica archivos cambiados, comandos ejecutados, resultados y limitaciones.

## 14. Guías complementarias

- [Guion para presentación: paralelismo y multibrowser](./guia-paralelismo-multibrowser-presentacion.md)
- [Guía de referencia: paralelismo y multibrowser](./guia-paralelismo-multibrowser-referencia.md)
