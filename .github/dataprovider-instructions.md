# Data Provider para SauceDemo

## Objetivo

Centralizar la entrada de datos de prueba para evitar duplicar credenciales y escenarios dentro de cada spec.

## Arquitectura del proyecto

- La carpeta `data/` guarda los datos fuente reutilizables, como `saucedemo-users.csv`.
- La carpeta `utils/` contiene los proveedores y validaciones, por ejemplo `utils/saucedemo/userDataProvider.ts`.
- Las pruebas en `tests/saucedemo/` consumen ese proveedor y no importan directamente JSON o CSV desde el spec.
- Los Page Objects en `pages/saucedemo/` encapsulan locators y acciones de la interfaz.

## Patrón recomendado

1. Definir el dataset en `data/`.
2. Crear una función de carga en `utils/` que valide columnas y tipos.
3. Importar ese proveedor desde el spec.
4. Iterar con `for ... of` usando `test()` para cada usuario.
5. Mantener separados los datos del comportamiento de la prueba.

## Ejemplo correcto

```ts
import { test } from "@playwright/test";
import { loadSauceDemoUsers } from "../../utils/saucedemo/userDataProvider";

for (const user of loadSauceDemoUsers()) {
  test(`Login: ${user.username}`, async ({ page }) => {
    // flujo de prueba
  });
}
```

## Reglas importantes

- No importar `../../data/*.json` directamente si ya existe un proveedor en `utils/`.
- No usar propiedades inexistentes como `userName`, `expectSuccess` y `msjError` si el proveedor usa `username`, `password` y `expectedOutcome`.
- Validar que cada fila tenga `username`, `password` y `expectedOutcome`.
- Mantener los mensajes esperados alineados con el comportamiento real de SauceDemo.

## Validación

Para comprobar que el data provider está bien conectado, ejecutar:

```bash
npx playwright test tests/saucedemo/dataProviderClase5.spec.ts --list
```

Si la lista de tests carga sin errores de sintaxis o importación, la arquitectura del data provider está correcta.
