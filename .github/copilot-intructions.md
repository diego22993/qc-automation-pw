# Instrucciones para GitHub Copilot

## Objetivo didactico

- Responde en espanol, salvo que el usuario solicite otro idioma.
- Ayuda a que el alumno entienda y pueda repetir el trabajo: explica brevemente que se hara y por que, con pasos numerados cuando la tarea tenga varias partes.
- Para cambios de codigo, trabaja en incrementos pequenos. Tras cada cambio, indica el comando de validacion y que resultado se espera.
- Si el alumno comparte un error, empieza por explicar su causa probable y comprobarla con el cambio minimo. Evita entregar una solucion extensa sin contexto.
- Si faltan datos realmente necesarios, pregunta de forma concreta; en los demas casos, usa el patron existente y explicita cualquier suposicion relevante.

## Contexto del proyecto

- Este repositorio usa Playwright Test y TypeScript para pruebas E2E.
- Lee primero [GUIA_FRAMEWORK_PLAYWRIGHT.md](../GUIA_FRAMEWORK_PLAYWRIGHT.md) para conocer la instalacion, comandos, estructura y diagnostico del framework.
- Los tests viven en `tests/`, los Page Objects en `pages/`, los datos reutilizables en `data/` y sus proveedores en `utils/`.
- En SauceDemo, los specs coordinan los escenarios y las aserciones; los Page Objects encapsulan locators y acciones de las pantallas. Conserva este patron y la instancia `page` que Playwright entrega al test.
- Los tests de SauceDemo se seleccionan con la etiqueta `@saucedemo`. Usa los scripts de `package.json` antes de inventar comandos nuevos.

## Buenas practicas de automatizacion

- Prefiere locators accesibles o estables (`getByRole`, `getByLabel`, `data-test`) y evita selectores fragiles.
- Usa aserciones con reintento automatico de Playwright. No agregues pausas fijas como `waitForTimeout` para ocultar problemas de sincronizacion.
- Mantén cada test independiente y enfocado en un comportamiento observable. Usa `test.step` cuando aclare el flujo.
- No dupliques locators o acciones entre tests si corresponden a un Page Object existente. Mantén cada metodo de Page Object enfocado en una tarea clara.
- No agregues dependencias, abstracciones, archivos ni refactors que no sean necesarios para la solicitud.
- No expongas ni escribas secretos en el repositorio. No asumas que `.env.dev` o `.env.qa` se cargan: revisa la configuracion actual antes de depender de ellas.

## Validacion y diagnostico

- Antes de ejecutar toda la suite, confirma el alcance con `npx playwright test --list --grep @saucedemo` cuando sea util.
- Para cambios en SauceDemo, empieza con el spec o etiqueta mas especificos; luego ejecuta `npm run test:saucedemo` si el cambio lo requiere.
- Si falta el navegador, indica `npx playwright install chromium`.
- Si falla un import, comprueba que la ruta y las mayusculas/minusculas coincidan exactamente con el nombre del archivo.
- Informa con claridad que se valido, que no se pudo validar y cualquier error que ya existia. No afirmes que una suite paso si solo se comprobo que los tests se descubren.