
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {

  readonly pageTitle: Locator;
  readonly inventoryItems: Locator;
  readonly shoppingCart: Locator;
  readonly cartBadge: Locator;
  readonly sortDropdown: Locator;

  constructor(page: Page) {
    super(page);

    this.pageTitle = page.locator('[data-test="title"]');

    this.inventoryItems = page.locator(
      '[data-test="inventory-item"]'
    );

    this.shoppingCart = page.locator(
      '[data-test="shopping-cart-link"]'
    );

    this.cartBadge = page.locator(
      '[data-test="shopping-cart-badge"]'
    );

    this.sortDropdown = page.locator(
      '[data-test="product-sort-container"]'
    );
  }

  async validateInventoryPage(): Promise<void> {

    await expect(this.page).toHaveURL(/inventory\.html/);

    await expect(this.pageTitle).toHaveText('Products');

    console.log('Página de productos validada');
  }

  async validateProductCount(
    expectedCount: number
  ): Promise<void> {

    await expect(this.inventoryItems).toHaveCount(
      expectedCount
    );
  }

  async addProductToCart(
    productName: string
  ): Promise<void> {

    const product = this.inventoryItems.filter({
      has: this.page.getByText(productName, {
        exact: true
      })
    });

    await product.getByRole('button', {
      name: 'Add to cart',
      exact: true
    }).click();

    console.log('Producto agregado:', productName);
  }

  async validateCartCount(
    expectedCount: number
  ): Promise<void> {

    await expect(this.cartBadge).toHaveText(
      String(expectedCount)
    );
  }

  async sortProducts(
    option: 'az' | 'za' | 'lohi' | 'hilo'
  ): Promise<void> {

    await this.sortDropdown.selectOption(option);
  }

  async openCart(): Promise<void> {

    await this.shoppingCart.click();

    await expect(this.page).toHaveURL(/cart\.html/);
  }
}
