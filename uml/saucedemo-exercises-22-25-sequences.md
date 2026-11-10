# SauceDemo: Secuencias de los ejercicios 22-25

## Preparacion del proyecto

Clona directamente la rama que contiene los ejercicios y entra en la carpeta del proyecto:

```bash
git clone --branch feature/clase-4-pom --single-branch https://github.com/diego22993/qc-automation-pw.git
cd qc-automation-pw
```

Cada diagrama representa un test independiente. Todos parten de la sesion iniciada y del inventario cargado mediante `loginToInventory(page)`.

## Guia breve para alumnos

**Objetivo:** practicar como un test delega acciones en un Page Object, usa locators claros y verifica el resultado esperado. No hace falta resolver los cuatro ejercicios de una vez: completa y ejecuta uno antes de continuar.

1. Revisa el diagrama del ejercicio y localiza la accion que le corresponde a `InventoryPage`.
2. Implementa o completa el metodo del Page Object; evita poner toda la interaccion directamente en el test.
3. En el test, usa `test.step` para separar la accion de su verificacion.
4. Ejecuta solo ese ejercicio y comprueba el resultado esperado que aparece en el diagrama.
5. Si pasa, continua con el siguiente; al final ejecuta los cuatro juntos.

**Meta de cada ejercicio:**

- Ejercicio 22: seleccionar `Price (low to high)` y verificar el valor `lohi`.
- Ejercicio 23: seleccionar `Name (Z to A)` y verificar el valor `za`.
- Ejercicio 24: filtrar las tarjetas por `Sauce Labs Onesie` y comprobar que el locator encuentra una sola tarjeta visible.
- Ejercicio 25: agregar `Sauce Labs Bike Light` desde su tarjeta y comprobar que el badge del carrito muestre `1`.

**Comandos de verificacion:**

```powershell
npx playwright test tests/saucedemo/saucedemo.test.ts --grep "Ejercicio 22"
npx playwright test tests/saucedemo/saucedemo.test.ts --grep "Ejercicio 23"
npx playwright test tests/saucedemo/saucedemo.test.ts --grep "Ejercicio 24"
npx playwright test tests/saucedemo/saucedemo.test.ts --grep "Ejercicio 25"
npx playwright test tests/saucedemo/saucedemo.test.ts --grep "Ejercicio 2[2-5]"
```

## Ejercicio 22: Ordenar por precio ascendente

```mermaid
sequenceDiagram
    autonumber
    actor Test as Ejercicio 22
    participant Helper as loginToInventory
    participant Login as LoginPage
    participant Inventory as InventoryPage
    participant Page as Playwright Page
    participant UI as Interfaz SauceDemo

    Test->>Helper: loginToInventory(page)
    Helper->>Login: goto()
    Login->>Page: page.goto(URL login)
    Page->>UI: Abrir login
    UI-->>Page: Formulario visible
    Helper->>Login: login(standard_user, secret_sauce)
    Login->>Page: Completar campos y pulsar Login
    Page->>UI: Enviar credenciales
    UI-->>Page: Mostrar inventory.html
    Helper->>Login: expectInventoryPage()
    Login->>Page: Validar URL inventory y titulo Products
    Helper-->>Test: InventoryPage

    Test->>Inventory: sortBy(Price low to high, lohi)
    Inventory->>Page: getByRole(combobox, Sort products)
    Page-->>Inventory: sortControl
    Inventory->>Page: selectOption(Price low to high)
    Page->>UI: Cambiar orden del catalogo
    UI-->>Page: Seleccion lohi
    Inventory->>Page: expect toHaveValue(lohi)
    Page-->>Test: Validacion aprobada
```

## Ejercicio 23: Ordenar por nombre descendente

```mermaid
sequenceDiagram
    autonumber
    actor Test as Ejercicio 23
    participant Helper as loginToInventory
    participant Login as LoginPage
    participant Inventory as InventoryPage
    participant Page as Playwright Page
    participant UI as Interfaz SauceDemo

    Test->>Helper: loginToInventory(page)
    Helper->>Login: goto()
    Login->>Page: page.goto(URL login)
    Page->>UI: Abrir login
    UI-->>Page: Formulario visible
    Helper->>Login: login(standard_user, secret_sauce)
    Login->>Page: Completar campos y pulsar Login
    Page->>UI: Enviar credenciales
    UI-->>Page: Mostrar inventory.html
    Helper->>Login: expectInventoryPage()
    Login->>Page: Validar URL inventory y titulo Products
    Helper-->>Test: InventoryPage

    Test->>Inventory: sortBy(Name Z to A, za)
    Inventory->>Page: getByRole(combobox, Sort products)
    Page-->>Inventory: sortControl
    Inventory->>Page: selectOption(Name Z to A)
    Page->>UI: Cambiar orden del catalogo
    UI-->>Page: Seleccion za
    Inventory->>Page: expect toHaveValue(za)
    Page-->>Test: Validacion aprobada
```

## Ejercicio 24: Filtrar Sauce Labs Onesie

```mermaid
sequenceDiagram
    autonumber
    actor Test as Ejercicio 24
    participant Helper as loginToInventory
    participant Login as LoginPage
    participant Inventory as InventoryPage
    participant Items as Locator inventoryItems
    participant Page as Playwright Page
    participant UI as Interfaz SauceDemo

    Test->>Helper: loginToInventory(page)
    Helper->>Login: goto()
    Login->>Page: page.goto(URL login)
    Page->>UI: Abrir login
    UI-->>Page: Formulario visible
    Helper->>Login: login(standard_user, secret_sauce)
    Login->>Page: Completar campos y pulsar Login
    Page->>UI: Enviar credenciales
    UI-->>Page: Mostrar inventory.html
    Helper->>Login: expectInventoryPage()
    Login->>Page: Validar URL inventory y titulo Products
    Helper-->>Test: InventoryPage

    Test->>Inventory: expectOnlyProduct(Sauce Labs Onesie)
    Inventory->>Items: filter(hasText: Sauce Labs Onesie)
    Items->>Page: Resolver tarjetas .inventory_item
    Page->>UI: Consultar DOM del catalogo
    UI-->>Page: Una tarjeta coincide
    Items-->>Inventory: matchingProduct
    Inventory->>Page: expect count 1
    Inventory->>Page: expect visible
    Page-->>Test: Validaciones aprobadas
```

## Ejercicio 25: Agregar Bike Light y validar badge

```mermaid
sequenceDiagram
    autonumber
    actor Test as Ejercicio 25
    participant Helper as loginToInventory
    participant Login as LoginPage
    participant Inventory as InventoryPage
    participant Item as Tarjeta Bike Light
    participant Page as Playwright Page
    participant UI as Interfaz SauceDemo

    Test->>Helper: loginToInventory(page)
    Helper->>Login: goto()
    Login->>Page: page.goto(URL login)
    Page->>UI: Abrir login
    UI-->>Page: Formulario visible
    Helper->>Login: login(standard_user, secret_sauce)
    Login->>Page: Completar campos y pulsar Login
    Page->>UI: Enviar credenciales
    UI-->>Page: Mostrar inventory.html
    Helper->>Login: expectInventoryPage()
    Login->>Page: Validar URL inventory y titulo Products
    Helper-->>Test: InventoryPage

    Test->>Inventory: addProductToCart(Sauce Labs Bike Light)
    Inventory->>Item: filter(hasText: Bike Light).first()
    Item->>Page: Verificar tarjeta visible
    Page-->>Inventory: Tarjeta visible
    Inventory->>Item: getByRole(button, Add to cart).click()
    Item->>UI: Agregar producto al carrito
    UI-->>Item: Actualizar estado del carrito
    Test->>Inventory: expectCartCount(1)
    Inventory->>Page: Leer data-test shopping-cart-badge
    Page->>UI: Consultar badge
    UI-->>Page: Texto 1
    Page-->>Test: Validacion aprobada
```