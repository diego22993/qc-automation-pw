# Guía de referencia: paralelismo y multibrowser en Playwright con TypeScript

## 1. Objetivo y alcance

Esta guía explica cómo ejecutar pruebas Playwright:

- en paralelo, distribuidas entre workers;
- en varios navegadores mediante projects;
- de forma progresiva y depurable, usando este repositorio como ejemplo.

Está escrita para poder retomarse después de la clase. Los ejemplos de configuración son referencias didácticas; no modifican automáticamente el proyecto.

## 2. Marco teórico: por qué aplicar multibrowser y paralelismo

### 2.1 El propósito de las pruebas automatizadas

Una prueba automatizada comprueba que una funcionalidad se comporte como se espera. Al repetirla después de un cambio, ayuda a detectar regresiones antes de que lleguen a los usuarios.

Para evaluar una suite no basta con preguntar si pasó. También importa cuánto tarda en entregar resultados y en qué navegadores se comprobó el comportamiento.

### 2.2 Ventajas del multibrowser

Multibrowser consiste en ejecutar una misma prueba con distintos motores de navegador:

- **Chromium**, motor usado por Chrome y Edge.
- **Firefox**, con su propio motor.
- **WebKit**, motor asociado a Safari.

Su principal ventaja es encontrar diferencias de compatibilidad. Un formulario, una interacción o un componente visual puede funcionar en Chromium y comportarse de otra manera en Firefox o WebKit. Probar más de un motor aumenta la cobertura y reduce el riesgo de descubrir esas diferencias recién en producción.

La cobertura no es absoluta: Chromium no equivale a todas las versiones de Chrome y Edge, y WebKit no es una instalación de Safari. Multibrowser prueba motores y configuraciones seleccionados, no todas las combinaciones posibles de navegador, versión y dispositivo.

### 2.3 Ventajas del paralelismo

Paralelismo significa permitir que varias pruebas se ejecuten al mismo tiempo, distribuidas entre procesos llamados **workers**. Su principal beneficio es reducir el tiempo de espera para obtener resultados y acelerar la retroalimentación durante el desarrollo y en CI.

El paralelismo no reduce el número total de pruebas ni las vuelve más precisas por sí solo. Añade concurrencia: puede reducir la duración de pared si hay recursos suficientes, pero consume más CPU y memoria y genera más carga en el sistema probado.

### 2.4 Cómo se relacionan projects y workers

Multibrowser y paralelismo son dimensiones diferentes:

- Los **projects** dicen qué configuración ejecutar; por ejemplo, Chromium, Firefox y WebKit.
- Los **workers** limitan cuántas tareas se ejecutan simultáneamente.

Con 10 pruebas y 3 navegadores hay hasta 30 ejecuciones de prueba. Los workers reparten esas ejecuciones, pero no eliminan ninguna combinación. El tiempo real depende de los workers configurados, los recursos disponibles, la red y la capacidad del sistema probado.

### 2.5 El requisito: pruebas independientes

Para que una ejecución paralela sea confiable, cada prueba debe poder ejecutarse sola y en cualquier orden:

- No debe depender de que otra prueba se haya ejecutado antes.
- Debe preparar el estado que necesita y evitar colisiones de datos modificables.
- No debe compartir objetos `page` o `context` globales.
- Debe limpiar los recursos que crea cuando corresponda.

Playwright aísla el estado del navegador entre pruebas, pero eso no aísla los datos del servidor. Dos pruebas todavía pueden intentar modificar la misma cuenta o registro.

### 2.6 Costos, límites y orden recomendado

| Técnica | Beneficio | Riesgo si se aplica sin preparación |
|---|---|---|
| Multibrowser | Detecta incompatibilidades entre motores | Aumenta la cantidad de ejecuciones y puede revelar diferencias que deben investigarse |
| Paralelismo | Reduce el tiempo para obtener resultados | Puede causar colisiones de datos, sobrecarga o fallos intermitentes |
| Ambas juntas | Aumenta la cobertura con mejor tiempo de respuesta | Consume más recursos y puede hacer más compleja la depuración |

Una prueba frágil no se vuelve confiable por correr en más navegadores o más rápido. Se recomienda avanzar gradualmente:

1. Validar las pruebas en un navegador.
2. Ejecutar con un worker para obtener una referencia controlada.
3. Aumentar workers y comparar tiempo y estabilidad.
4. Agregar otros navegadores como projects.
5. Combinar navegadores y workers poco a poco.
6. Si aparece un fallo, reducir a un navegador y un worker para investigarlo.

**Idea clave para la clase:** primero confiabilidad; después velocidad y mayor cobertura.

## 3. Estado actual del repositorio

La configuración está en `playwright.config.ts` y las pruebas viven en `tests/`.

Actualmente:

| Opción | Estado | Efecto |
|---|---|---|
| `testDir` | `./tests` | Descubre pruebas en esa carpeta |
| `fullyParallel` | `true` | Habilita ejecución paralela de pruebas individuales |
| `workers` | `process.env.CI ? 1 : undefined` | Un worker en CI; configuración automática local |
| `retries` | `process.env.CI ? 2 : 0` | Reintenta en CI, no localmente |
| `projects` | Chromium activo | Firefox y WebKit están en el archivo, pero comentados |
| `reporter` | `html` | Genera el reporte HTML |
| `trace` | `on-first-retry` | Guarda trace en el primer reintento |

El proyecto también tiene pruebas en `tests/practice/` y `tests/saucedemo/`, objetos de página en `pages/`, escenarios en `data/` y proveedores en `utils/`.

## 4. Conceptos básicos

### Paralelismo

Playwright Test puede ejecutar pruebas en procesos de sistema operativo separados llamados **workers**. Cada worker tiene su propio entorno y navegador; workers diferentes no comparten variables de memoria.

Los workers hacen que una suite pueda terminar antes, pero más concurrencia implica más consumo de CPU/memoria y más solicitudes al sistema bajo prueba. Si las pruebas escriben en cuentas o datos compartidos, una ejecución paralela puede exponer colisiones que no aparecían en serie.

### `fullyParallel`

- `fullyParallel: true` permite que Playwright distribuya pruebas individuales, incluso varias del mismo archivo.
- Con el valor predeterminado (`false`), Playwright normalmente paraleliza archivos, mientras mantiene las pruebas dentro de cada archivo en orden.
- El modo `serial` existe, pero suele ser mejor hacer que las pruebas sean independientes que hacer que dependan de una secuencia.

### `workers`

`workers` limita el número de procesos de trabajo simultáneos. Se puede ajustar por configuración o por CLI:

```powershell
npx playwright test --workers=1
npx playwright test --workers=2
npx playwright test --workers=50%
```

Un worker es útil al depurar; un número moderado suele ser un buen punto de partida local. No hay un valor universal: medir en el equipo y en el agente de CI.

### Multibrowser y `projects`

Un project agrupa una configuración con nombre. Los tres engines habituales son Chromium, Firefox y WebKit. Si una suite tiene `N` pruebas y se ejecuta en `B` projects, se generan hasta `N × B` ejecuciones de pruebas.

Workers y projects resuelven preguntas distintas:

- **Projects:** qué configuraciones se prueban.
- **Workers:** cuántas tareas se ejecutan simultáneamente.

No hay que multiplicar manualmente el número de workers por el de navegadores. Playwright coordina la ejecución de los projects con el límite de workers configurado.

## 5. Preparación inicial

Desde la raíz del repositorio, instalar dependencias si es necesario y comprobar Playwright:

```powershell
npm install
npx playwright --version
```

Instalar los tres navegadores:

```powershell
npx playwright install chromium firefox webkit
```

O instalar solo Chromium para seguir el ejercicio de manera incremental:

```powershell
npx playwright install chromium
```

Si la instalación de un navegador falla, conservar y leer el error. No cambiar workers ni código de pruebas para resolver un problema de instalación.

## 6. Ejecutar el estado inicial

```powershell
npm test
```

El script `test` de `package.json` ejecuta `npx playwright test`. Para abrir el reporte más reciente:

```powershell
npm run test:report
```

También se puede invocar Playwright directamente:

```powershell
npx playwright test
```

Conviene registrar el resultado inicial antes de cambiar el paralelismo, para separar fallos preexistentes de los que aparezcan durante la práctica.

## 7. Probar workers paso a paso

### Paso 1: ejecutar de forma controlada

```powershell
npx playwright test --workers=1
```

Esto ayuda a reproducir fallos y reduce interferencias por concurrencia. No modifica permanentemente `playwright.config.ts`.

### Paso 2: aumentar la concurrencia

```powershell
npx playwright test --workers=2
```

### Paso 3: comparar con la configuración automática

```powershell
npx playwright test
```

Comparar duración y fallos, pero tener en cuenta que factores como red, carga del sitio y caché cambian los tiempos.

### Paso 4: controlar `fullyParallel`

El proyecto ya define:

```ts
fullyParallel: true,
```

Para observar la diferencia en una prueba didáctica se puede alternar temporalmente entre `true` y `false`, y ejecutar con más de un worker. Restaurar el valor deseado al terminar el ejercicio.

## 8. Configurar múltiples navegadores

En `playwright.config.ts`, la sección `projects` actual mantiene Chromium activo y tiene Firefox/WebKit comentados. Para habilitar la matriz de escritorio, dejarla así:

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

`devices` se importa desde `@playwright/test` en la configuración existente. Los perfiles de desktop aportan valores de dispositivo (por ejemplo viewport y user agent); `name` permite seleccionar el project desde la CLI.

En este repositorio, `baseURL` globalmente usa `https://www.saucedemo.com/` por defecto. Algunas páginas de práctica navegan a URLs completas, mientras SauceDemo usa rutas relativas. Si se configura `baseURL` diferente por project, confirmar qué pruebas deben usar cada URL antes de hacerlo; no cambiar el host como parte del ejercicio básico de multibrowser.

### Ejecutar un navegador

```powershell
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Ejecutar todos los navegadores configurados

```powershell
npx playwright test
```

### Ejecutar algunos navegadores y limitar workers

```powershell
npx playwright test --project=chromium --project=firefox --workers=2
```

Los valores de `--project` deben coincidir exactamente con `name` en la configuración. Si no se especifica `--project`, se ejecutan todos los projects definidos.

## 9. Ejemplo completo de configuración (solo referencia)

Esta versión conserva los valores de paralelismo y CI observados en el repositorio y activa tres navegadores. No se debe reemplazar toda la configuración existente solo por copiar este ejemplo: conservar reporter, baseURL, trace y cualquier otra opción propia del proyecto.

```ts
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: process.env.BASE_URL ?? "https://www.saucedemo.com/",
    trace: "on-first-retry",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
  ],
});
```

El archivo existente usa comillas simples; mantener el estilo del repositorio al editarlo.

## 10. Por qué las pruebas deben ser independientes

Una suite paralela fiable evita dependencias de orden:

- Cada prueba establece el estado que necesita.
- Ninguna prueba depende de la ejecución previa de otra.
- Cada prueba usa los fixtures que recibe; no comparte `page` o `context` globales.
- Los datos modificables son únicos por prueba o worker cuando el sistema de prueba lo requiere.
- Los recursos creados se limpian de forma controlada.

Playwright aísla el estado del navegador entre pruebas. Esto no aísla datos del lado del servidor: dos pruebas pueden seguir intentando editar el mismo registro o usar la misma cuenta.

El proyecto genera pruebas desde escenarios, por ejemplo `tests/saucedemo/SauceDemoClase6Test.spec.ts` usa `loadSauceDemoLoginScenarios()`. Al aumentar workers y projects, revisar que cada escenario pueda ejecutarse independientemente y que no altere datos compartidos.

## 11. Criterios para escoger workers

1. Empezar con `--workers=1` si se investiga un fallo.
2. Aumentar gradualmente y comparar estabilidad y duración.
3. Considerar recursos disponibles, límites del sitio de prueba y servicios externos.
4. Mantener CI conservador mientras se valida; aumentar workers solo si el agente de CI tiene capacidad y las pruebas son estables.
5. No tomar una sola medición de duración como garantía de rendimiento.

La configuración actual `workers: process.env.CI ? 1 : undefined` significa un worker en CI y el valor predeterminado de Playwright localmente. Aunque se activen varios browsers, CI seguirá limitado a un worker hasta cambiar explícitamente esa opción.

## 12. Reportes y depuración

### HTML report

```powershell
npm run test:report
```

Revisar el nombre del test, el project y los pasos que precedieron el fallo.

### Reproducir con menos variables

```powershell
npx playwright test --project=chromium --workers=1
```

Después probar un solo project alternativo. Esto distingue, por ejemplo, un fallo general de una diferencia de renderizado o comportamiento entre navegadores.

La configuración actual recoge trace en el primer reintento (`trace: "on-first-retry"`). Los reintentos sirven para recopilar evidencia y confirmar si un fallo es intermitente; no reemplazan la investigación de la causa raíz.

## 13. Problemas frecuentes y cómo avanzar

| Síntoma | Qué comprobar primero |
|---|---|
| `Executable doesn't exist` o navegador no instalado | Ejecutar `npx playwright install <browser>` |
| Project no encontrado | Comparar `--project` con el nombre exacto de `projects[].name` |
| Falla solo con más workers | Buscar estado compartido, datos duplicados, límites de tasa o recursos insuficientes |
| Falla solo en Firefox/WebKit | Revisar el comportamiento y las aserciones; no asumir que es un fallo del runner |
| Timeout al combinar más navegadores | Probar un project y `--workers=1`; considerar capacidad local/CI y lentitud externa |
| Diferente URL inesperada | Revisar `baseURL` y si la navegación usa ruta relativa o URL completa |
| Solo falla en CI | Revisar workers, variables de entorno, instalación de browsers, reportes y trace |

Procedimiento recomendado:

1. Guardar el mensaje de error y revisar el reporte.
2. Repetir con un solo project y un worker.
3. Determinar si el fallo es de instalación, configuración, prueba o sistema bajo prueba.
4. Corregir la causa y volver a ejecutar primero el caso afectado.
5. Finalmente ejecutar la suite y los projects requeridos.

## 14. Ejercicio para alumnos

1. Ejecutar `npm test` y observar el resultado.
2. Repetir con `--workers=1` y luego `--workers=2`.
3. Instalar Firefox y WebKit.
4. Activar los dos projects en `playwright.config.ts`.
5. Ejecutar solo Firefox.
6. Ejecutar Chromium y Firefox con `--workers=2`.
7. Provocar un error solo en un navegador y usar el reporte para localizarlo.
8. Restaurar la prueba y verificar la suite completa.

### Criterios de éxito

- El alumno explica workers y projects con sus propias palabras.
- Selecciona un project por nombre.
- Puede identificar cuándo está duplicando ejecuciones al agregar navegadores.
- Puede reducir a un worker y un browser antes de depurar.
- No depende del orden de ejecución.

## 15. Lista de comprobación para futuros cambios

- [ ] ¿Los navegadores requeridos están instalados en local/CI?
- [ ] ¿Los nombres de projects son claros y estables?
- [ ] ¿Las pruebas pasan en el project principal antes de ampliar la matriz?
- [ ] ¿Los datos compartidos pueden colisionar?
- [ ] ¿El número de navegadores y workers cabe en los recursos disponibles?
- [ ] ¿El reporte/traces permite entender un fallo?
- [ ] ¿La configuración mantiene `baseURL` correcto para las pruebas afectadas?

## 16. Referencias oficiales

- [Parallelism](https://playwright.dev/docs/test-parallel)
- [Projects](https://playwright.dev/docs/test-projects)
- [Browsers](https://playwright.dev/docs/browsers)
- [Test configuration](https://playwright.dev/docs/test-configuration)
- [Test CLI](https://playwright.dev/docs/test-cli)
