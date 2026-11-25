# Guía: Automation Practice, clase 6

Esta guía resume cómo se organizaron los escenarios de login de Automation Practice con Page Object Model (POM), Data Provider y un custom fixture de Playwright.

## Objetivo

Ejecutar tres escenarios de login de forma independiente, reutilizando la misma prueba y manteniendo separados:

- Los datos de prueba.
- Los localizadores y acciones de la página.
- La preparación común de cada prueba.
- Las verificaciones de cada escenario.

El sitio de práctica es [Practice Test Automation - Test Login](https://practicetestautomation.com/practice-test-login/).

## Estructura implementada

```text
data/
  automationpractice-users.json
fixtures/
  automationpractice.fixture.ts
pages/
  automationpractice/
    AutomationPracticeLoginPage.ts
    AutomationPracticeLoggedInPage.ts
tests/
  automationpractice/
    automationpracticeClase6.spec.ts
utils/
  automationpractice/
    userDataProvider.ts
```

## 1. Data Provider: separar los datos de las pruebas

En la clase 5, `dataProviderClase5.spec.ts` obtiene sus casos desde un JSON mediante un helper, y genera una prueba por escenario con `forEach`. Para Automation Practice se aplicó la misma idea con archivos propios, sin mezclar los usuarios de SauceDemo con los de este sitio.

El archivo [`data/automationpractice-users.json`](../data/automationpractice-users.json) define estos tres casos:

| Escenario | Usuario | Contraseña | Resultado |
|---|---|---|---|
| Credenciales válidas | `student` | `Password123` | Login exitoso |
| Nombre de usuario inválido | `incorrectUser` | `Password123` | `Your username is invalid!` |
| Contraseña inválida | `student` | `incorrectPassword` | `Your password is invalid!` |

Cada entrada usa el contrato:

```json
{
  "scenario": "Nombre descriptivo",
  "userName": "usuario",
  "password": "contraseña",
  "expectSuccess": false,
  "msjError": "Mensaje esperado cuando el login falla"
}
```

`expectSuccess` determina qué resultado verificar. Para un escenario exitoso, `msjError` debe ser una cadena vacía; para uno fallido, debe contener el mensaje esperado.

El helper [`utils/automationpractice/userDataProvider.ts`](../utils/automationpractice/userDataProvider.ts) carga el JSON y valida que tenga la estructura correcta. Si el archivo o un escenario no cumple el contrato, el helper genera un error explícito.

> El CSV de SauceDemo no se usa en esta suite. El Data Provider de Automation Practice lee su propio JSON.

## 2. POM: encapsular las páginas

### Página de login

[`AutomationPracticeLoginPage.ts`](../pages/automationpractice/AutomationPracticeLoginPage.ts) encapsula los selectores y las acciones del formulario:

- Usuario: `#username`
- Contraseña: `#password`
- Enviar: `#submit`
- Error: `#error`

Sus métodos permiten abrir la página (`goto`), enviar credenciales (`login`) y leer el mensaje de error (`getErrorMessage`).

### Página de login exitoso

[`AutomationPracticeLoggedInPage.ts`](../pages/automationpractice/AutomationPracticeLoggedInPage.ts) encapsula las verificaciones de la página de éxito: el encabezado “Logged In Successfully” y el enlace “Log out”.

Así, los tests describen el comportamiento esperado sin repetir selectores CSS o construir localizadores dentro de cada escenario.

## 3. Custom fixture: preparar el formulario una vez por prueba

El fixture está en [`fixtures/automationpractice.fixture.ts`](../fixtures/automationpractice.fixture.ts). Extiende el `test` de Playwright con un fixture llamado `loginPage`:

```ts
export const test = base.extend<AutomationPracticeFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new AutomationPracticeLoginPage(page);
    await loginPage.goto();
    await use(loginPage);
  },
});

export { expect };
```

Playwright crea una página aislada para cada test. El fixture construye el POM y abre el formulario antes de entregarlo al test mediante `use(loginPage)`.

El fixture **no envía credenciales automáticamente**. Esto permite que cada escenario del Data Provider decida qué credenciales enviar, incluidos los casos inválidos.

## 4. Tests parametrizados

En [`tests/automationpractice/automationpracticeClase6.spec.ts`](../tests/automationpractice/automationpracticeClase6.spec.ts), el `forEach` registra un test independiente para cada entrada del JSON. El test importa `test` y `expect` desde el fixture personalizado, recibe `loginPage` y utiliza los datos del escenario.

La lógica de verificación es:

1. Enviar `userName` y `password` a través del POM.
2. Si `expectSuccess` es `true`, verificar la URL de éxito, el encabezado y el enlace de logout.
3. Si `expectSuccess` es `false`, comparar el mensaje mostrado con `msjError`.

## 5. Ejecutar las pruebas

Desde la carpeta del proyecto `qc-automation-pw`, ejecutar los casos etiquetados para Automation Practice:

```powershell
npx playwright test --project=chromium --grep "@automationpractice"
```

La ejecución validada de esta suite produjo **3 pruebas aprobadas**.

## Agregar un escenario

1. Añadir una nueva entrada a `data/automationpractice-users.json`.
2. Completar todos los campos del contrato.
3. Definir `expectSuccess` y `msjError` coherentemente:
   - Éxito: `expectSuccess: true` y `msjError: ""`.
   - Error: `expectSuccess: false` y el texto esperado en `msjError`.
4. Ejecutar nuevamente el comando de arriba.

El Data Provider generará automáticamente una prueba para la nueva entrada. Automation Practice documenta `student` / `Password123` como credenciales válidas; los otros escenarios ejercitan errores de usuario o contraseña.
