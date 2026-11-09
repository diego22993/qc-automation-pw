# Guia de actividades: SauceDemo Clase 3

## Proposito

Construir y comprender pruebas E2E con Playwright siguiendo los flujos desde la interfaz de SauceDemo. En esta actividad se escribe el flujo directamente en el archivo de pruebas, usando locators, `test.step` y aserciones. La meta es entender primero el recorrido completo; la separacion en Page Objects se deja para una segunda actividad o video.

Archivo de trabajo: `tests/saucedemo/saucedemo-clase-3.spec.ts`.

## Antes de comenzar

1. Abre la raiz del proyecto en VS Code.
2. Revisa que el archivo de trabajo exista en `tests/saucedemo/`.
3. Abre una terminal en la raiz del proyecto.
4. Comprueba que Playwright encuentre los tests:

```powershell
npx playwright test tests/saucedemo/saucedemo-clase-3.spec.ts --list
```

5. Ejecuta un solo test primero. Cuando pase, ejecuta la suite correspondiente y, al final, todo el archivo.

```powershell
npx playwright test tests/saucedemo/saucedemo-clase-3.spec.ts --grep "Iniciar sesión con credenciales válidas" --reporter=line
npx playwright test tests/saucedemo/saucedemo-clase-3.spec.ts --reporter=line
```

`page` es la pestaña que Playwright prepara para cada test. Cada test debe preparar su propio estado; no se debe depender de que otro test se haya ejecutado antes.

## Conceptos que se practican

- `test.describe`: agrupa pruebas relacionadas.
- `test`: define un caso de prueba independiente.
- `test.step`: separa el recorrido en pasos visibles en el reporte.
- `page.getByRole` y `page.getByPlaceholder`: localizan controles por su rol accesible o texto de ayuda.
- `page.locator`: localiza elementos mediante selectores CSS.
- `expect`: comprueba que la aplicacion produjo el resultado esperado.
- Funciones auxiliares: evitan repetir acciones comunes, sin cambiar el flujo a una arquitectura POM.

## Actividad 1: Preparar funciones auxiliares

Revisa las funciones de la parte superior del archivo antes de escribir los tests:

1. `loginTo(page, username, password)` navega al sitio, completa las credenciales y pulsa Login. Si no se indican otras credenciales, usa `standard_user` y `secret_sauce`.
2. `addProductToCart(page, productName)` busca la tarjeta que contiene el nombre solicitado y pulsa Add to cart dentro de esa tarjeta.
3. `openCart(page)` pulsa el enlace del carrito.

Al terminar, explica con tus palabras que estas funciones agrupan acciones reutilizables; las verificaciones del resultado siguen estando en cada test.

## Actividad 2: Autenticacion

Suite: `Autenticación`, tag `@auth`.

1. **Login exitoso:** abre la pagina, completa `standard_user` y `secret_sauce`, y pulsa Login. Esperado: URL `inventory.html` y titulo `Products` visible.
2. **Credenciales invalidas:** envia el usuario estandar con una contraseña incorrecta. Esperado: aparece el mensaje de credenciales incorrectas y sigue visible el formulario.
3. **Usuario bloqueado:** intenta entrar con `locked_out_user`. Esperado: SauceDemo muestra el mensaje de usuario bloqueado.
4. **Cerrar sesion:** inicia sesion, abre el menu y pulsa Logout. Esperado: vuelve al login. Luego intenta abrir `inventory.html` directamente y comprueba que se requiere iniciar sesion.

Ejecutar solo esta suite:

```powershell
npx playwright test tests/saucedemo/saucedemo-clase-3.spec.ts --grep "@auth" --reporter=line
```

## Actividad 3: Inventario

Suite: `Inventario`, tag `@inventory`. Su `beforeEach` inicia sesion antes de cada test.

### Ordenar por nombre y precio

La prueba comprueba dos resultados por cada criterio: el valor seleccionado en el combo y el orden visible de todos los productos.

1. Selecciona `az`. Esperado: `toHaveValue("az")` y nombres de A a Z: Backpack, Bike Light, Bolt T-Shirt, Fleece Jacket, Onesie y Test.allTheThings() T-Shirt (Red).
2. Selecciona `za`. Esperado: `toHaveValue("za")` y la lista anterior en orden inverso.
3. Selecciona `lohi`. Esperado: `toHaveValue("lohi")` y precios `$7.99`, `$9.99`, `$15.99`, `$15.99`, `$29.99`, `$49.99`.
4. Selecciona `hilo`. Esperado: `toHaveValue("hilo")` y precios `$49.99`, `$29.99`, `$15.99`, `$15.99`, `$9.99`, `$7.99`.

La primera asercion verifica que el control cambio de opcion. La segunda verifica el comportamiento visible del catalogo. Comprobar solo el valor del combo no demuestra que los productos se hayan ordenado correctamente.

### Detalle del producto

1. Pulsa el nombre `Sauce Labs Backpack`.
2. Comprueba que se abre la URL del detalle (`inventory-item.html?id=4`).
3. Verifica que el nombre y el boton Add to cart esten visibles.
4. Pulsa Back to products y comprueba que regresa el inventario.

Ejecutar inventario:

```powershell
npx playwright test tests/saucedemo/saucedemo-clase-3.spec.ts --grep "@inventory" --reporter=line
```

## Actividad 4: Carrito

Suite: `Carrito`, tag `@cart`. Cada test inicia sesion desde el inventario.

### Agregar y quitar un producto

1. Agrega Sauce Labs Backpack.
2. Comprueba que el badge muestre `1`.
3. Abre el carrito y confirma que contiene una fila con Backpack.
4. Pulsa Remove.
5. Comprueba que no hay filas `cart_item` y que el badge desaparecio.

### Conservar productos al navegar

1. Agrega Backpack y Bike Light; el badge debe mostrar `2`.
2. Abre el carrito y verifica que esten ambos productos.
3. Pulsa Continue Shopping y confirma que regresa al inventario con el badge en `2`.
4. Vuelve a abrir el carrito y verifica nuevamente ambos productos.

Ejecutar carrito:

```powershell
npx playwright test tests/saucedemo/saucedemo-clase-3.spec.ts --grep "@cart" --reporter=line
```

## Actividad 5: Checkout exitoso

Suite: `Checkout`, tag `@checkout`.

1. Agrega Backpack y Bike Light y comprueba el badge `2`.
2. Abre el carrito, verifica ambos productos y pulsa Checkout.
3. Completa First Name, Last Name y Zip/Postal Code.
4. Pulsa Continue y verifica que se abre el resumen.
5. Confirma los productos y los importes: subtotal `$39.98`, impuesto `$3.20` y total `$43.18`.
6. Pulsa Finish y verifica la URL `checkout-complete.html` y el encabezado `Thank you for your order!`.

## Actividad 6: Generar PDF

Este paso se mantiene deliberadamente como esta en el archivo para la primera demostracion:

1. Agrega Backpack.
2. Avanza por carrito y checkout, completando los datos.
3. Comprueba que llegaste a la confirmacion.
4. Pulsa Generate PDF order.

En esta actividad el test muestra la accion y el recorrido. La validacion del archivo descargado se puede dejar para otra clase; no agregues Page Objects en este paso.

## Actividad 7: Campos obligatorios del checkout

Se practican tres entradas invalidas, dejando vacio un solo campo en cada caso:

- Sin First Name: esperado `Error: First Name is required`.
- Sin Last Name: esperado `Error: Last Name is required`.
- Sin Zip/Postal Code: esperado `Error: Postal Code is required`.

El archivo presenta estos casos de dos maneras para comparar estilos de automatizacion:

1. Tests escritos uno por uno, adecuados para seguir visualmente cada escenario.
2. Tests creados desde `missingCheckoutFields` y un `for...of`, donde los datos variables estan en objetos.

### Preparacion importante antes de ejecutar

En la version actual, el bloque `for...of` de `missingCheckoutFields` esta fuera de la suite principal. Por eso no hereda el `beforeEach` que inicia sesion y puede intentar agregar un producto desde una pagina sin autenticar. Antes de ejecutar esos tres tests, mueve la constante y el bucle dentro de la suite `Checkout` para que usen su preparacion y sus tags. Para la grabacion, explica que este cambio evita repetir el login dentro de cada escenario.

Los tres casos escritos uno por uno ya estan dentro de Checkout y heredan su `beforeEach`.

## Etiquetas y ejecucion

La suite principal usa `@saucedemo` y `@regression`. Las suites internas agregan `@auth`, `@inventory`, `@cart` y `@checkout`; los casos correspondientes tambien pueden tener tags como `@smoke` o `@pdf`.

Ejecutar todos los tests del archivo:

```powershell
npx playwright test tests/saucedemo/saucedemo-clase-3.spec.ts --reporter=line
```

Ejecutar por nombre cuando un test falla:

```powershell
npx playwright test tests/saucedemo/saucedemo-clase-3.spec.ts --grep "Ordenar productos por nombre y precio" --reporter=line
```

## Si algo falla

1. Lee el primer error del reporte y localiza el paso (`test.step`) donde ocurrio.
2. Comprueba que el test inicio sesion si necesita llegar al inventario.
3. Confirma que el locator identifica un solo elemento. Si hay botones repetidos, busca primero la tarjeta del producto y luego el boton dentro de ella.
4. Verifica que el texto esperado coincida exactamente con SauceDemo, incluidos mayusculas, espacios y precios.
5. Ejecuta de nuevo solo el test que fallaba antes de volver a correr todo el archivo.

## Cierre de la actividad

El alumno deberia poder explicar el recorrido de cada test, distinguir una accion de una asercion, describir por que cada test prepara su propio estado y reconocer que un Page Object seria una mejora arquitectonica para una segunda etapa, no un requisito para comprender estos primeros flujos.
