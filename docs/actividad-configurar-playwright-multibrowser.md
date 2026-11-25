# Actividad: mi primer proyecto Playwright multibrowser

## Consigna para el alumno

Elige una página pública, sencilla y estable. Configura un proyecto nuevo de Playwright con TypeScript para comprobar que la página carga en **Chromium, Firefox y WebKit**, y que sus pruebas pueden ejecutarse en paralelo.

Prepara una presentación breve para mostrar tu proyecto, explicar qué verificaste y enseñar el resultado de la ejecución.

**Objetivo:** terminar con un proyecto mínimo que funcione, no construir un framework completo.

## Alcance: qué sí y qué no debes hacer

### Debes hacer

- Crear un proyecto de Playwright con TypeScript.
- Configurar Chromium, Firefox y WebKit.
- Escribir **dos pruebas independientes y sencillas** sobre una página.
- Ejecutarlas con dos workers y los tres navegadores.
- Mostrar el resultado durante tu presentación.

### No es necesario

- Crear Page Objects, fixtures, JSON de datos o una arquitectura grande.
- Automatizar un login, una compra, una reserva o el envío de un formulario.
- Configurar CI, Allure, bases de datos, APIs o reportes personalizados.
- Probar muchos flujos: alcanza con una página y dos verificaciones.

## 1. Elegir la página

Selecciona una página pública que:

- se pueda abrir sin iniciar sesión;
- tenga un título de página y un encabezado visibles;
- no dependa de completar una compra, reserva o formulario;
- no bloquee la automatización con CAPTCHA o controles anti-bot.

Si tu página falla por ser inestable, usa esta opción de respaldo:

```text
https://practicetestautomation.com/practice/
```

La prioridad es practicar la configuración. No pierdas tiempo intentando automatizar una web que bloquea el navegador o cambia continuamente.

## 2. Crear el proyecto

Abre PowerShell en una carpeta nueva y ejecuta:

```powershell
npm init playwright@latest
```

Cuando el asistente pregunte:

1. Selecciona **TypeScript**.
2. Usa la carpeta de pruebas sugerida (`tests`).
3. La configuración de GitHub Actions es opcional; no se necesita para esta actividad.

Instala los navegadores:

```powershell
npx playwright install chromium firefox webkit
```

Comprueba que Playwright está disponible:

```powershell
npx playwright --version
```

## 3. Configurar los tres navegadores y el paralelismo

Abre `playwright.config.ts`. Conserva los imports y las opciones generadas que necesites, y confirma que la configuración incluya estos valores:

```ts
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  workers: 2,
  reporter: "html",
  use: {
    baseURL: "https://practicetestautomation.com",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],
});
```

Reemplaza `baseURL` por el dominio elegido. Si usas la página de respaldo, deja la URL mostrada. La ruta que usarás en el test debe ser relativa a ese dominio.

`fullyParallel` permite repartir pruebas independientes; `workers: 2` limita a dos los procesos simultáneos. Los tres `projects` hacen que Playwright pruebe el mismo spec en tres motores.

## 4. Crear dos pruebas pequeñas

Crea `tests/home.spec.ts`:

```ts
import { expect, test } from "@playwright/test";

test("la página tiene un título", async ({ page }) => {
  await page.goto("/practice/");
  await expect(page).toHaveTitle(/practice/i);
});

test("la página muestra un encabezado principal", async ({ page }) => {
  await page.goto("/practice/");
  await expect(
    page.getByRole("heading", { level: 1 }).first(),
  ).toBeVisible();
});
```

Si elegiste otro dominio:

1. Cambia `baseURL` en `playwright.config.ts`.
2. Cambia `"/practice/"` por la ruta de la página elegida. Para la raíz del sitio, usa `"/"`.
3. Ajusta el texto del título si la web no contiene la palabra `practice`.
4. Si no tiene un encabezado `h1`, selecciona otro elemento visible y estable, por ejemplo un encabezado con su nombre accesible.

Las dos pruebas deben poder ejecutarse por separado. No hagas que la segunda dependa de lo que hizo la primera.

## 5. Ejecutar y comprobar

Primero confirma que Playwright encuentra los tests:

```powershell
npx playwright test --list
```

Ejecuta solo Chromium para comprobar la página:

```powershell
npx playwright test --project=chromium
```

Después ejecuta los tres navegadores y dos workers:

```powershell
npx playwright test --workers=2
```

Como hay dos pruebas y tres navegadores, el resultado esperado es **seis ejecuciones aprobadas** (`2 pruebas × 3 navegadores`).

Abre el reporte HTML si quieres mostrar más detalle:

```powershell
npx playwright show-report
```

## 6. Si algo falla

Prueba estas soluciones en orden:

1. **No encuentra el navegador:** ejecuta `npx playwright install chromium firefox webkit`.
2. **No encuentra el test:** comprueba que el archivo termine en `.spec.ts` y esté dentro de `tests/`.
3. **Project no encontrado:** confirma que los nombres de `--project` coincidan con `name` en `projects`.
4. **Falla el título o encabezado:** abre la página manualmente y ajusta la aserción a un texto o elemento que realmente exista.
5. **La web bloquea o falla en un navegador:** usa la página de respaldo y vuelve a correr.
6. **Falla solo en paralelo:** prueba con `--workers=1` y confirma que las dos pruebas no dependan del mismo estado.

No agregues esperas fijas para tapar errores. Usa una aserción sobre el resultado observable, como `toBeVisible()` o `toHaveTitle()`.

## 7. Presentación: todos participan

Cada alumno dispone de **2 minutos** para explicar y mostrar:

1. El dominio y la página elegidos.
2. Qué verifican sus dos pruebas.
3. Dónde configuró los tres navegadores y los dos workers.
4. El comando ejecutado y su resultado.
5. Un problema que encontró y cómo lo resolvió, si tuvo alguno.

Con 16 alumnos, son aproximadamente **32 minutos de exposición**, más el tiempo de cambio entre presentaciones. Se puede presentar en vivo o mostrar una captura del resultado si el entorno de clase no tiene buena conectividad.

### Registro de exposiciones

| Turno | Alumno | Presentó |
|---:|---|:---:|
| 1 | ____________________ | [ ] |
| 2 | ____________________ | [ ] |
| 3 | ____________________ | [ ] |
| 4 | ____________________ | [ ] |
| 5 | ____________________ | [ ] |
| 6 | ____________________ | [ ] |
| 7 | ____________________ | [ ] |
| 8 | ____________________ | [ ] |
| 9 | ____________________ | [ ] |
| 10 | ____________________ | [ ] |
| 11 | ____________________ | [ ] |
| 12 | ____________________ | [ ] |
| 13 | ____________________ | [ ] |
| 14 | ____________________ | [ ] |
| 15 | ____________________ | [ ] |
| 16 | ____________________ | [ ] |

## 8. Lista de entrega

- [ ] Proyecto creado con TypeScript.
- [ ] `playwright.config.ts` tiene Chromium, Firefox y WebKit.
- [ ] La ejecución utiliza dos workers.
- [ ] Hay dos pruebas independientes y comprensibles.
- [ ] Las seis ejecuciones terminan correctamente, o se presenta el error y su diagnóstico.
- [ ] El alumno explica su trabajo en el turno asignado.

El objetivo de aprendizaje es comprender y dejar configurada la base. Si la página elegida presenta un bloqueo externo, se acepta cambiar a la web de respaldo.

## Criterio simple de evaluación

| Criterio | Puntaje |
|---|---:|
| Proyecto TypeScript creado y Playwright instalado | 2 |
| Tres navegadores configurados | 2 |
| Dos pruebas claras e independientes | 2 |
| Ejecución con dos workers y evidencia del resultado | 2 |
| Presentación breve y explicación de un aprendizaje | 2 |
| **Total** | **10** |

## Material de apoyo

- [Guion para presentación: paralelismo y multibrowser](./guia-paralelismo-multibrowser-presentacion.md)
- [Guía de referencia: paralelismo y multibrowser](./guia-paralelismo-multibrowser-referencia.md)
- [Contexto del proyecto para futuros alumnos y agentes](./contexto-agente-test-automation.md)
