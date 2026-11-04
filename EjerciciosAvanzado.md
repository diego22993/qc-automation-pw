MENÚ LATERAL & ACCESIBILIDAD
Ejercicio 41 (Menú Hamburguesa): En /inventory.html, abre el menú lateral haciendo clic en el botón con ID #react-burger-menu-btn.
Ejercicio 42 (Logout vía Menú): Abre el menú lateral, espera a que los enlaces sean visibles y haz clic en el enlace "Logout" con getByRole('link', { name: 'Logout' }).
Ejercicio 43 (Reset App State): Abre el menú lateral y haz clic en la opción "Reset App State" para limpiar los elementos del carrito.


MANIPULACIÓN AVANZADA DE COLLECCIONES
Ejercicio 44 (.nth() e Iteración): Selecciona el 1.º, 3.º y 5.º producto del catálogo usando .nth(0), .nth(2) y .nth(4), agregándolos al carrito.
Ejercicio 45 (.filter() por Sub-elemento): En /inventory.html, filtra los elementos .inventory_item que contengan un botón con el texto "Add to cart" y valida cuántos quedan sin agregar.
Ejercicio 46 (Verificación de Conteo Dinámico): Agrega 4 productos al carrito, navega a /cart.html y valida estrictamente con expect(page.locator('.cart_item')).toHaveCount(4).
Ejercicio 47 (Validación Múltiple de Precios): Recorre el catálogo filtrando los productos con precio mayor a $20 y confirma su presencia.


VALIDACIÓN ESTRICTAS END-TO-END (E2E) POR PANTALLAS
Ejercicio 48 (Detalle de Producto - Navegación): En /inventory.html, haz clic en la imagen de un producto específico usando getByAltText, valida la redirección a /inventory-item.html y confirma el botón "Back to products".
Ejercicio 49 (Remover desde Detalle): Agrega un producto desde su página de detalle /inventory-item.html y confirma que el botón cambie a "Remove".
Ejercicio 50 (Validación de Ordenamiento A-Z vs Z-A): Cambia el ordenamiento a Z-A y verifica que el primer producto de la lista sea "Test.allTheThings() T-Shirt (Red)".
Ejercicio 51 (Validación de Ordenamiento por Precio Low to High): Cambia el ordenamiento a precio ascendente y confirma mediante encadenamiento que el primer precio sea "$7.99".
Ejercicio 52 (Validación de Ordenamiento por Precio High to Low): Cambia el ordenamiento a precio descendente y confirma que el primer precio sea "$49.99".


FLUJOS COMPLETOS INTEGRALES
Ejercicio 53 (E2E Compra Simple de 1 Producto): Realiza la compra de 1 producto navegando secuencialmente por las 6 pantallas (/ /inventory.html /cart.html /checkout-step-one.html /checkout-step-two.html /checkout-complete.html).
Ejercicio 54 (E2E Compra Múltiple): Agrega 3 productos específicos con .filter(), valida sus nombres en /cart.html, completa el checkout y confirma el mensaje final.
Ejercicio 55 (E2E Modificación de Carrito en Paso Intermedio): Agrega 2 productos, ve al carrito, elimina 1 producto con .filter(), procede al checkout y completa la compra de 1 solo ítem.
Ejercicio 56 (E2E Intento Fallido de Checkout): Agrega un producto, ve a /checkout-step-one.html, deja el campo Zip en blanco, valida el mensaje de error específico, completa el campo faltante y finaliza la compra.
Ejercicio 57 (E2E Cancelación en Checkout Paso 2): Inicia un flujo de compra hasta /checkout-step-two.html, presiona el botón "Cancel" y verifica el retorno a /inventory.html.
Ejercicio 58 (E2E Navegación Inversa): Desde /checkout-step-one.html, presiona "Cancel" para volver a /cart.html, luego presiona "Continue Shopping" para volver a /inventory.html.
Ejercicio 59 (E2E Verificación de Datos de Pago y Envío): En /checkout-step-two.html, verifica que la información de pago contenga "SauceCard" y la información de envío contenga "Free Pony Express Delivery!".
Ejercicio 60 (E2E Máximo Reto Integrador):
Inicia sesión con credenciales válidas.
Ordena los productos por precio de menor a mayor.
Agrega el producto más barato (.first()) y el más caro (.last()).
Ve al carrito, elimina el producto más barato y confirma que el badge indique "1".
Completa el formulario de checkout.
Valida que en /checkout-step-two.html el producto presente sea el más caro ($49.99).
Finaliza la compra y regresa a la pantalla principal comprobando que el carrito quede limpio.