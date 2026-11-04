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

