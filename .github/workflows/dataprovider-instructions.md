# Instrucciones del Data Provider de SauceDemo

## Arquitectura

Los escenarios de autenticacion parametrizados usan el CSV
`data/saucedemo-users.csv` como fuente unica de datos:

1. El CSV contiene una fila por escenario y las columnas `username`, `password`
   y `expectedOutcome`.
2. `utils/saucedemo/userDataProvider.ts` define el contrato `SauceDemoUser` y
   `loadSauceDemoUsers()`, que carga y valida los registros.
3. `tests/saucedemo/DataProviderClase5.spec.ts` crea un test por usuario y
   delega las interacciones de la pantalla a `SauceLoginPage`.

El proveedor resuelve la ruta del CSV desde su propio archivo, por lo que la
carga no depende del directorio de trabajo del comando que ejecuta los tests.
`data/userdata-provider.json` no se consume en este flujo; no mantengas allí
una segunda copia de estos escenarios.

## Contrato de datos

`expectedOutcome` admite solo estos valores:

- `success`: el inicio de sesion debe mostrar el inventario.
- `locked_out`: el inicio de sesion debe mostrar el error de usuario bloqueado.

Cada fila debe incluir un nombre de usuario y una contrasena. Conserva los
encabezados exactamente como aparecen en el ejemplo:

```csv
username,password,expectedOutcome
standard_user,secret_sauce,success
locked_out_user,secret_sauce,locked_out
```

El proveedor debe fallar explícitamente si falta un campo obligatorio, el
resultado esperado no está soportado o el archivo no contiene escenarios.
Agrega validacion cuando se incorporen nuevos campos o tipos de resultado.
No dupliques estas credenciales en el spec.

## Convenciones para cambios

- Mantén la lectura y validación de datos en `userDataProvider.ts`, no en los
  tests.
- Usa `loadSauceDemoUsers()` y `SauceDemoUser`; no importes el CSV directamente
  desde los specs ni mantengas un segundo conjunto de datos para los mismos
  escenarios.
- Mantén en el spec la orquestación y las aserciones; deja las acciones y los
  locators de la página en `SauceLoginPage`.
- Al agregar escenarios, amplía el CSV y comprueba el resultado correspondiente
  sin eliminar los existentes.

## Validación

Desde la raíz del proyecto:

```powershell
npx playwright test tests/saucedemo/DataProviderClase5.spec.ts --list
npx playwright test tests/saucedemo/DataProviderClase5.spec.ts
```

El primer comando debe descubrir un test por cada fila válida del CSV. El
segundo ejecuta los escenarios contra SauceDemo; requiere que Chromium esté
instalado y que el sitio sea accesible.