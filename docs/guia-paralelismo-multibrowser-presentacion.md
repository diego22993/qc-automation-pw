# Playwright: pruebas en paralelo y en varios navegadores

> Guion paso a paso para convertir en diapositivas. Cada sección corresponde a una diapositiva; los bloques de código son material para mostrar o copiar durante la clase.

## Diapositiva 1 — ¿Qué vamos a aprender?

Al finalizar, cada alumno podrá:

1. Explicar qué significa ejecutar pruebas en paralelo.
2. Configurar y controlar los workers de Playwright.
3. Ejecutar el mismo conjunto de pruebas en Chromium, Firefox y WebKit.
4. Diagnosticar los problemas más comunes sin frustrarse.

**Idea clave:** primero hacemos que una prueba sea confiable en un navegador; después aumentamos el paralelismo y la cobertura de navegadores.

## Diapositiva 2 — ¿Qué significa “en paralelo”?

- En lugar de ejecutar una prueba detrás de otra, Playwright puede repartir trabajo entre varios procesos llamados **workers**.
- Cada worker es un proceso independiente y abre su propio navegador.
- Más workers pueden reducir el tiempo, pero también consumen más CPU, memoria y recursos del sitio probado.
- Los workers no comparten variables ni estado en memoria.

**Analogía:** varios alumnos resuelven ejercicios distintos a la vez; cada uno necesita sus propios datos y materiales.

## Diapositiva 3 — ¿Qué significa “multibrowser”?

- Ejecutar pruebas en más de un motor de navegador:
  - **Chromium**: base de Chrome y Edge.
  - **Firefox**.
  - **WebKit**: motor usado por Safari.
- Playwright representa cada combinación de navegador/configuración como un **project**.
- Ejecutar en tres projects normalmente ejecuta cada prueba tres veces, una por navegador.

**Importante:** Chromium no es exactamente lo mismo que Google Chrome, ni WebKit es una instalación de Safari.

## Diapositiva 4 — Antes de tocar la configuración

En la raíz del proyecto:

```powershell
npm install
npx playwright --version
```

Instalar los navegadores que se usarán:

```powershell
npx playwright install chromium firefox webkit
```

Si solo se va a practicar con Chromium:

```powershell
npx playwright install chromium
```

**Punto de control:** si la instalación termina correctamente, seguir. Si no, leer el error completo antes de cambiar la configuración.

## Diapositiva 5 — Reconocer los archivos del proyecto

- `playwright.config.ts`: ubicación de pruebas, paralelismo, workers, reportes y projects.
- `tests/`: pruebas automatizadas.
- `pages/`: objetos de página usados por las pruebas.
- `data/` y `utils/`: escenarios y proveedores de datos.
- `package.json`: comandos `npm run ...`.

En este repositorio:

- `testDir` apunta a `./tests`.
- `fullyParallel: true` habilita paralelismo de pruebas individuales.
- Chromium es el único project activo; Firefox y WebKit están comentados.
- CI usa `workers: 1`, es decir, ejecuta con un worker.

## Diapositiva 6 — Primer paso: ejecutar como estamos

```powershell
npm test
```

También se puede usar directamente:

```powershell
npx playwright test
```

Abrir el reporte HTML cuando termine:

```powershell
npm run test:report
```

**Punto de control:** anotar cuántas pruebas se ejecutaron y confirmar que el reporte muestra su resultado.

## Diapositiva 7 — Segundo paso: controlar workers

Probar con un worker:

```powershell
npx playwright test --workers=1
```

Probar con dos workers:

```powershell
npx playwright test --workers=2
```

Ejecutar con un porcentaje de los cores disponibles:

```powershell
npx playwright test --workers=50%
```

Comparar duración y resultados. No asumir que más workers siempre es mejor.

## Diapositiva 8 — ¿Qué controla `fullyParallel`?

En `playwright.config.ts`:

```ts
export default defineConfig({
  fullyParallel: true,
});
```

- `true`: Playwright puede ejecutar pruebas individuales de un mismo archivo en paralelo.
- `false` o ausente: por defecto, los archivos pueden ejecutarse en paralelo, pero las pruebas de cada archivo se ejecutan en orden.
- `--workers=1`: reduce la ejecución a un worker, aunque `fullyParallel` siga configurado.

**Regla didáctica:** `fullyParallel` decide qué trabajo se puede repartir; `workers` limita cuántos procesos trabajan al mismo tiempo.

## Diapositiva 9 — Pruebas independientes: el requisito más importante

Cada prueba debería poder ejecutarse sola y en cualquier orden:

- No depender de una prueba anterior.
- No modificar ni borrar datos que otra prueba necesite.
- Usar datos propios o identificadores únicos si escribe en un sistema compartido.
- No compartir objetos `page` o `context` entre pruebas.
- Limpiar los datos creados cuando corresponda.

Playwright crea un contexto de navegador aislado para cada prueba. Eso ayuda a aislar cookies y almacenamiento del navegador, pero no evita colisiones en una base de datos o cuenta externa.

## Diapositiva 10 — Tercer paso: activar navegadores adicionales

En `playwright.config.ts`, reemplazar el bloque `projects` actual por:

```ts
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
```

Esta configuración usa convenciones de comillas dobles para coincidir con los ejemplos de pruebas de este repositorio; el archivo actual usa comillas simples.

Antes de ejecutar, confirmar que se instalaron los tres navegadores.

## Diapositiva 11 — Cuarto paso: ejecutar un navegador o todos

Un navegador:

```powershell
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

Todos los projects configurados:

```powershell
npx playwright test
```

Dos projects seleccionados:

```powershell
npx playwright test --project=chromium --project=firefox
```

El nombre debe coincidir con `name` dentro de `projects`.

## Diapositiva 12 — Quinto paso: combinar navegadores y paralelismo

Ejecutar Chromium y Firefox con dos workers:

```powershell
npx playwright test --project=chromium --project=firefox --workers=2
```

**Cálculo mental:** número de pruebas × número de projects. Los workers reparten ese trabajo; no reducen el número de combinaciones que se ejecutan.

Ejemplo: 8 pruebas y 3 navegadores producen hasta 24 ejecuciones de prueba.

## Diapositiva 13 — El patrón de datos del repositorio

Hay pruebas que crean casos desde proveedores de escenarios. Por ejemplo:

- `tests/saucedemo/SauceDemoClase6Test.spec.ts`
- `utils/saucedemo/loginScenarioProvider.ts`
- `data/saucedemo-login-scenarios.json`

Si cada escenario es independiente, Playwright puede repartirlo entre workers y ejecutarlo en cada project. Revisar que ningún escenario dependa del estado dejado por otro.

**No hacer:** compartir una misma cuenta/dato modificable entre pruebas que escriben simultáneamente.

## Diapositiva 14 — Si algo falla, bajar la complejidad

Volver a una ejecución controlada:

```powershell
npx playwright test --project=chromium --workers=1
```

Luego revisar:

1. ¿Falla también en un solo worker?
2. ¿Falla en todos los navegadores o solo en uno?
3. ¿El error indica navegador faltante, timeout o una aserción?
4. ¿La prueba depende de datos compartidos o de una prueba previa?
5. ¿El trace o el reporte muestra el último paso correcto?

No usar retries para ocultar una prueba inestable. Primero entender la causa.

## Diapositiva 15 — CI y workers

La configuración actual contiene:

```ts
workers: process.env.CI ? 1 : undefined,
```

- Localmente, `undefined` deja que Playwright elija el número de workers.
- En CI, `1` da una ejecución más conservadora y predecible, pero no paralela.
- Se puede aumentar después de medir capacidad y estabilidad del agente de CI.
- Al añadir más navegadores, el tiempo/costo de CI puede aumentar.

## Diapositiva 16 — Ejercicio guiado y cierre

1. Ejecutar el conjunto actual en Chromium con `--workers=1`.
2. Ejecutarlo con `--workers=2` y comparar.
3. Activar Firefox y WebKit en `projects`.
4. Ejecutar solo Firefox.
5. Ejecutar todos los browsers.
6. Si falla, volver a un navegador y un worker, y leer el reporte.

**Checklist final**

- [ ] Instalé los navegadores.
- [ ] Entiendo la diferencia entre worker y project.
- [ ] Mis pruebas no dependen del orden.
- [ ] Puedo seleccionar un navegador.
- [ ] Puedo ejecutar todos los navegadores.
- [ ] Sé cómo reducir la ejecución para depurar.

## Comandos para una diapositiva de referencia

```powershell
npm test
npx playwright test --workers=1
npx playwright test --workers=2
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
npx playwright test --project=chromium --project=firefox --workers=2
npm run test:report
```

## Fuentes oficiales

- [Playwright: Parallelism](https://playwright.dev/docs/test-parallel)
- [Playwright: Projects](https://playwright.dev/docs/test-projects)
- [Playwright: Browsers](https://playwright.dev/docs/browsers)
- [Playwright: Test configuration](https://playwright.dev/docs/test-configuration)
