# Data Provider para SauceDemo

## Objetivo

Centralizar la entrada de datos de prueba y evitar duplicar credenciales directamente en cada spec.

## Arquitectura del proyecto

- La carpeta `data/` contiene los datasets reutilizables, como `saucedemo-users.csv`.
- La carpeta `utils/` contiene los proveedores y validaciones, por ejemplo `utils/saucedemo/userDataProvider.ts`.
- Los tests en `tests/saucedemo/` consumen ese proveedor y no importan archivos JSON o CSV directamente desde el spec.
- Los Page Objects en `pages/saucedemo/` encapsulan locators y acciones de la interfaz.

## Patrón recomendado

1. Definir el dataset en `data/`.
2. Crear una función de carga en `utils/` que valide columnas y tipos.
3. Importar ese proveedor desde el spec.
4. Iterar con `for ... of` o `forEach` usando `test()`.
5. Mantener la lógica de negocio de la prueba separada de la definición de datos.

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
- No usar nombres de propiedades inexistentes como `userName`, `expectSuccess`, `msjError` si el proveedor usa `username`, `password` y `expectedOutcome`.
- Validar que cada fila tenga `username`, `password` y `expectedOutcome`.
- Mantener los valores esperados alineados con el comportamiento real de SauceDemo.

## Validación

Para comprobar que el archivo funciona, ejecutar:

```bash
npx playwright test tests/saucedemo/dataProviderClase5.spec.ts --list
```

Si la lista de tests carga correctamente, el data provider está conectado al spec sin errores de importación o sintaxis.