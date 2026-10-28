import { Locator, Page } from 'playwright';

// Esta una clase abstracta que sirve como base para todas las páginas de la aplicación.
// Contiene métodos y propiedades comunes que pueden ser utilizados por las clases hijas.

export class BasePage {

    protected page: Page;

    // Cada clase debe tener si o si su constructor
    constructor(page: Page) {
        this.page = page;
    }

    // Acá arrancan los métodos que van a ser utilizados en todas las páginas, por ejemplo: navegar a una URL, hacer click en un elemento, etc.
    async navigateTo(url: string) {
        await this.page.goto(url);
    }

    async clickElement(locator: Locator) {
        await locator.waitFor({ state: 'visible' });
        await locator.click();
    }

    // Este método intenta cerrar un modal si está presente en la página. Si no hay un modal, simplemente registra un mensaje en la consola.
    async dismissModalIfPresent() {
        const modalCloseButton = this.page.locator("#onetrust-accept-btn-handler");
        try {
            if (await modalCloseButton.isVisible({ timeout: 3000 })) {
                await modalCloseButton.click();
            }
        }
        catch (error) {
            console.log('No modal found to dismiss.');
        }
    }
}