LOGIN.HTML
Ejercicio 1 (getByPlaceholder): Completa el campo de usuario escribiendo standard_user identificándolo por su placeholder.
Ejercicio 2 (getByPlaceholder): Completa el campo de contraseña escribiendo secret_sauce identificándolo por su placeholder.
Ejercicio 3 (getByRole): Haz clic en el botón de login usando getByRole('button', { name: 'Login' }).
Ejercicio 4 (getByText): Intenta ingresar sin credenciales y valida que se muestre el texto de error "Epic sadface: Username is required".
Ejercicio 5 (CSS Selector ID): Completa el campo de usuario utilizando su ID directo (#user-name).
Ejercicio 6 (CSS Selector ID): Completa el campo de contraseña usando su ID #password y presiona el botón #login-button.


INVENTARIO.HTML
Ejercicio 7 (getByRole - Heading): Tras iniciar sesión, verifica que exista un encabezado de nivel 1 o título visible con el texto "Swag Labs".
Ejercicio 8 (getByText): Encuentra en el catálogo el producto "Sauce Labs Backpack" usando getByText.
Ejercicio 9 (getByAltText): Ubica la imagen principal de la camiseta usando getByAltText('Sauce Labs Bolt T-Shirt’).
Ejercicio 10 (.first()): Haz clic en el primer botón de agregar al carrito que aparezca en la lista usando .first().
Ejercicio 11 (.last()): Haz clic en el último botón de agregar al carrito utilizando .last().
Ejercicio 12 (.nth()): Selecciona el segundo producto de la lista (índice 1) y haz clic en la imagen del producto.

CART.HTML
Ejercicio 13 (getByText): En /cart.html, verifica la presencia del título de columna "QTY".
Ejercicio 14 (getByText): En /cart.html, verifica la presencia del título de columna "Description".
Ejercicio 15 (getByRole): Ubica el botón "Continue Shopping" usando getByRole por su nombre accesible.

CHECKOUT-STEP-ONE.HTML
Ejercicio 16 (getByPlaceholder): Rellena el campo First Name usando su placeholder "First Name".
Ejercicio 17 (getByPlaceholder): Rellena el campo Last Name usando su placeholder "Last Name".
Ejercicio 18 (getByPlaceholder): Rellena el campo Zip/Postal Code usando su placeholder "Zip/Postal Code".

CHECKOUT-STEP-TWO.HTML
Ejercicio 19 (getByText): En /checkout-step-two.html, ubica el texto "Payment Information:".
Ejercicio 20 (getByRole): En /checkout-complete.html, valida que el título de agradecimiento sea un heading con texto "Thank you for your order!".

LOGIN E INVENTARIO
Ejercicio 21 (CSS Atributo Personalizado): Selecciona el botón de login usando el atributo de test nativo [data-test="login-button"].
Ejercicio 22 (getByRole Combobox): En /inventory.html, selecciona la opción de ordenamiento "Price (low to high)" interactuando con el selector de rol combobox.
Ejercicio 23 (getByRole Combobox): Cambia el ordenamiento a "Name (Z to A)" comprobando que el valor cambie a za.
Ejercicio 24 (.filter() por Texto): Filtra los bloques de productos .inventory_item para obtener únicamente el que contiene el texto "Sauce Labs Onesie".
Ejercicio 25 (.filter() + Acción): Filtra la tarjeta del producto "Sauce Labs Bike Light" y haz clic en su botón interno de agregar al carrito.
Ejercicio 26 (Encadenamiento en Inventario): Desde #inventory_container, encadena la búsqueda hasta encontrar todos los elementos con la clase .inventory_item_price.
Ejercicio 27 (Validación de Precio con Chaining): Filtra el producto "Sauce Labs Fleece Jacket" y encadena la búsqueda para verificar que su precio sea "$49.99".

CARRITO Y NAVEGACION
Ejercicio 28 (Badge de Carrito): Agrega dos productos y encadena locators desde el contenedor .shopping_cart_container para verificar que la etiqueta .shopping_cart_badge muestre "2".
Ejercicio 29 (.filter() en Carrito): En /cart.html, filtra los ítems .cart_item buscando aquel que contenga el texto "Sauce Labs Backpack" y haz clic en su botón "Remove".
Ejercicio 30 (Lista vacía en Carrito): Remueve todos los ítems del carrito y valida que .cart_item tenga un conteo (count()) igual a 0.
Ejercicio 31 (getByRole Navegación): Desde /cart.html, haz clic en el botón de rol button con nombre "Checkout" para navegar a la siguiente pantalla.

FORMULARIO CHECKOUT-STEP-ONE
Ejercicio 32 (Validación de Error en Formulario): Intenta hacer clic en "Continue" en /checkout-step-one.html sin llenar los campos y valida el mensaje de error con getByText('Error: First Name is required’).
Ejercicio 33 (Llenado Completo con Placeholders): Completa los tres campos de información personal usando únicamente getByPlaceholder.
Ejercicio 34 (Boton Cancelar): En /checkout-step-one.html, presiona el botón "Cancel" usando getByRole y confirma el retorno a /cart.html.

FORMULARIO CHECKOUT-STEP-TWO & COMPLETE
Ejercicio 35 (Resumen Financiero - Item Total): En /checkout-step-two.html, ubica el elemento .summary_subtotal_label y verifica que contenga el prefijo "Item total:".
Ejercicio 36 (Resumen Financiero - Impuestos): Valida la visibilidad del texto de impuesto .summary_tax_label.
Ejercicio 37 (Resumen Financiero - Total Final): Valida que el selector .summary_total_label esté visible.
Ejercicio 38 (Confirmación de Envío): En /checkout-step-two.html, presiona el botón "Finish" usando getByRole('button', { name: 'Finish' }).
Ejercicio 39 (Texto Descriptivo de Confirmación): En /checkout-complete.html, valida el texto secundario "Your order has been dispatched".
Ejercicio 40 (Botón Regreso al Inicio): En /checkout-complete.html, presiona el botón "Back Home" y confirma el retorno a /inventory.html.

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