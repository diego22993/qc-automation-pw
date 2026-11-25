# Data Provider de SauceDemo

## Arquitectura

- `data/userdata-provider.json` es la fuente de escenarios de autenticacion.
- `utils/saucedemo/userDataProvider.ts` lee el JSON, valida su estructura y devuelve una lista tipada de `UserDataProvider`.
- `fixtures/saucedemo.fixture.ts` extiende el `test` de Playwright con `sauceLoginPage`, instancia el Page Object y abre el login.
- `tests/saucedemo/dataProviderClase5.spec.ts` crea un test por escenario y verifica el resultado con `SauceLoginPage`.
- `pages/saucedemo/SauceLoginPage.ts` encapsula las acciones y consultas de la pantalla; no debe contener datos de prueba.

El provider resuelve la ruta del JSON desde el directorio de trabajo actual. Ejecuta Playwright desde la raiz del proyecto para que encuentre `data/userdata-provider.json`. La carga ocurre al declarar los tests, antes de que comiencen las ejecuciones del navegador. Si el JSON no se puede analizar o un escenario no cumple el contrato, el error identifica el escenario y detiene el registro de los casos.

## Contrato de datos

Cada propiedad del objeto JSON representa un identificador de escenario. Su valor debe tener estas propiedades:

| Campo | Tipo | Uso |
| --- | --- | --- |
| `scenario` | `string` | Nombre descriptivo usado en el titulo del test. |
| `userName` | `string` | Usuario que se escribe en el formulario. |
| `password` | `string` | Contrasena que se escribe en el formulario. |
| `expectSuccess` | `boolean` | Indica si se espera llegar al inventario. |
| `msjError` | `string` | Mensaje esperado cuando el login debe fallar; vacio para un login exitoso. |

Los escenarios exitosos deben usar `msjError: ""`. Los escenarios fallidos deben incluir el mensaje esperado para evitar que una asercion vacia pase por accidente.

## Agregar un escenario

1. Agrega una nueva propiedad al objeto de `data/userdata-provider.json`.
2. Completa todos los campos del contrato y conserva los tipos indicados.
3. Define la expectativa segun el comportamiento real del usuario en SauceDemo. Por ejemplo, `problem_user` permite iniciar sesion; sus problemas aparecen despues, en el comportamiento de la aplicacion.
4. Ejecuta `npx playwright test tests/saucedemo/dataProviderClase5.spec.ts --list` para comprobar que el provider carga y que el nuevo test se registra.
5. Ejecuta `npm run test:saucedemo` para validar los escenarios de SauceDemo en el navegador.

No importes el JSON directamente desde los specs: usa `loadUserDataProvider()` para mantener un solo punto de lectura, validacion y tipado. Mantén las acciones de interfaz en los Page Objects y las expectativas del escenario en el spec.

## Fixture de login

Los specs de SauceDemo que necesitan el formulario deben importar `test` y `expect` desde `fixtures/saucedemo.fixture.ts` y solicitar `sauceLoginPage` en el test o hook. El fixture abre el login antes de entregar el Page Object; no completa credenciales. Usa `sauceLoginPage.login()` para enviar las credenciales del escenario y evita crear otra instancia o repetir `goto()`.
