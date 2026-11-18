# Correcciones del Data Provider de SauceDemo

## Arquitectura

El data provider separa los datos de las pruebas y expone dos fuentes:

- JSON: `data/userdata-provider.json`
  - Se carga mediante `loadUserData()`.
  - Cada escenario contiene `scenario`, `userName`, `password`, `expectSuccess` y `msjError`.
- CSV: `data/saucedemo-users.csv`
  - Se carga mediante `loadSauceDemoUsers()`.
  - Cada fila contiene `username`, `password` y `expectedOutcome`.

Las pruebas parametrizadas usan el JSON a traves de `userDataProvider()`. Los datos se cargan una sola vez al inicio del archivo y se crean dinamicamente pruebas con `forEach`.

## Errores corregidos

1. Se elimino `export type Loing`, que era una declaracion TypeScript incompleta y impedia compilar el proyecto.
2. Se agrego `userDataProvider()` como API compatible que delega a `loadUserData()`.
3. Se reemplazo el bucle que importaba directamente el JSON por el data provider centralizado.
4. Se corrigio la variable usada en `forEach`: ahora todas las referencias usan `user1`, que coincide con el escenario recibido.
5. Se corrigieron todas las referencias dentro de la prueba parametrizada, evitando el uso de la variable inexistente `user`.
6. Se agrego una prueba automatizada para validar la carga del CSV.
7. Las rutas ahora se resuelven respecto a `__dirname`, evitando el error `ENOENT` cuando Playwright se inicia desde otra carpeta.

## Validaciones realizadas

- `npm run typecheck`: correcta.
- `npx playwright test tests/saucedemo/userDataProvider.spec.ts`: 3 pruebas aprobadas.

## Convenciones recomendadas

- Mantener un solo origen de datos por flujo de prueba.
- Usar `loadUserData()` para escenarios con mensajes de error y campos de espera completos.
- Usar `loadSauceDemoUsers()` para escenarios simples basados en resultados `success` o `locked_out`.
- Ejecutar siempre `npm run typecheck` antes de crear o ejecutar pruebas Playwright.
