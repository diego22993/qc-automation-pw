# Guía: Automation Practice, clase 6

Esta guía describe la implementación de los escenarios de login de Automation Practice en el proyecto `qc-automation-pw`, utilizando Page Object Model (POM), Data Provider y un custom fixture de Playwright.

## Objetivo

Ejecutar tres escenarios de login como tests independientes y mantener separados:

- Los datos de prueba.
- Los localizadores y las acciones de las páginas.
- La preparación común de cada test.
- Las verificaciones de cada escenario.

El sitio utilizado es [Practice Test Automation - Test Login](https://practicetestautomation.com/practice-test-login/).

## Estructura implementada

```text
data/
  automation-practice-users.json
pages/
  automationPractice/
    AutomationPracticeLoginPage.ts
    AutomationPracticeLoggedInPage.ts
tests/
  fixtures/
    automationPractice.fixture.ts
  automationPractice/
    automationpracticeClase6.spec.ts
utils/
  automationPractice/
    automationPracticeDataProvider.ts
```

## 1. Data Provider: separar los datos de las pruebas

En la clase 5, `dataProviderClase5.spec.ts` obtiene sus casos desde un JSON y genera un test por escenario con `forEach`. Para Automation Practice se usa el mismo patrón, con datos propios para no mezclar los escenarios de este sitio con los de SauceDemo.

El archivo [`data/automation-practice-users.json`](../data/automation-practice-users.json) define estos escenarios:

| Escenario | Usuario | Contraseña | Resultado esperado |
|---|---|---|---|
| Inicio de sesión positivo | `student` | `Password123` | Login exitoso |
| Nombre de usuario negativo | `incorrect` | `Password123` | `Your username is invalid!` |
| Contraseña negativa | `student` | `incorrect` | `Your password is invalid!` |

Cada entrada utiliza este contrato:

```json
{
  "scenario": "Nombre descriptivo",
  "userName": "usuario",
  "password": "contraseña",
  "expectSuccess": false,
  "msjError": "Mensaje esperado cuando el login falla"
}
```

`expectSuccess` determina el resultado que se verifica. Si es `true`, `msjError` debe estar vacío; si es `false`, debe contener el mensaje de error esperado.

El helper [`utils/automationPractice/automationPracticeDataProvider.ts`](../utils/automationPractice/automationPracticeDataProvider.ts) carga el JSON y valida el formato de los escenarios y sus campos. Si los datos no cumplen el contrato, genera un error explícito.

> El CSV de SauceDemo no se utiliza en esta suite. Automation Practice lee su propio JSON.

## 2. POM: encapsular las páginas

### Página de login

[`pages/automationPractice/AutomationPracticeLoginPage.ts`](../pages/automationPractice/AutomationPracticeLoginPage.ts) encapsula los selectores y las acciones del formulario:

- Usuario: `#username`
- Contraseña: `#password`
- Enviar: `#submit`
- Error: `#error`

Sus métodos permiten abrir la página (`goto`), enviar las credenciales (`login`), leer el mensaje de error (`getErrorMessage`) y esperar la navegación al login exitoso (`goToLoggedInPage`).

### Página de login exitoso

[`pages/automationPractice/AutomationPracticeLoggedInPage.ts`](../pages/automationPractice/AutomationPracticeLoggedInPage.ts) encapsula la lectura del mensaje de éxito, la comprobación de la URL y la visibilidad del enlace `Log out`.

Los tests interactúan con estas páginas mediante sus métodos, sin definir selectores de la aplicación en cada escenario.

## 3. Custom fixture: preparar el formulario una vez por test

El fixture se encuentra en [`tests/fixtures/automationPractice.fixture.ts`](../tests/fixtures/automationPractice.fixture.ts). Extiende el `test` de Playwright con el fixture `automationPracticeLoginPage`:

```ts
export const test = base.extend<AutomationPracticeFixtures>({
  automationPracticeLoginPage: async ({ page }, use) => {
    const loginPage = new AutomationPracticeLoginPage(page);
    await loginPage.goto();
    await use(loginPage);
  },
});
```

Playwright crea una página aislada para cada test. El fixture construye el Page Object, abre el formulario y luego lo entrega al test mediante `use(loginPage)`.

El fixture **no envía credenciales**. Cada escenario del Data Provider decide qué usuario y contraseña probar, incluidos los escenarios negativos. El fixture exporta `test`; `expect` se importa directamente desde `@playwright/test`.

## 4. Tests parametrizados

En [`tests/automationPractice/automationpracticeClase6.spec.ts`](../tests/automationPractice/automationpracticeClase6.spec.ts), el `forEach` registra un test independiente por cada escenario del JSON. El test importa `test` desde el fixture personalizado y recibe `automationPracticeLoginPage`.

La suite tiene los tags `@automation-practice`, `@login` y `@regression`. Cada test:

1. Envía `userName` y `password` a través del Page Object.
2. Si `expectSuccess` es `true`, verifica la URL de éxito, el texto de confirmación y el enlace `Log out`.
3. Si `expectSuccess` es `false`, compara el mensaje mostrado con `msjError`.

## 5. Ejecutar las pruebas

Desde la carpeta del proyecto `qc-automation-pw`, ejecutar solo esta suite:

```bash
npx playwright test tests/automationPractice/automationpracticeClase6.spec.ts --project=chromium
```

Para filtrar por el tag de Automation Practice:

```bash
npx playwright test --project=chromium --grep "@automation-practice"
```

Para abrir el runner de Playwright UI con ese tag:

```bash
npx playwright test --ui --project=chromium --grep "@automation-practice"
```

La suite fue validada con **3 pruebas aprobadas** en Chromium.

## Agregar un escenario

1. Añadir una entrada a [`data/automation-practice-users.json`](../data/automation-practice-users.json).
2. Completar los campos del contrato.
3. Definir `expectSuccess` y `msjError` coherentemente:
   - Éxito: `expectSuccess: true` y `msjError: ""`.
   - Error: `expectSuccess: false` y el mensaje esperado en `msjError`.
4. Ejecutar nuevamente uno de los comandos de la sección anterior.

El Data Provider registrará automáticamente un nuevo test para esa entrada. El sitio documenta `student` / `Password123` como credenciales válidas; los otros escenarios actuales comprueban los errores de usuario y contraseña.
