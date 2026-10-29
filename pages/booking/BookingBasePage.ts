import { Locator, Page } from 'playwright';

// Esta una clase abstracta que sirve como base para todas las páginas de la aplicación.
// Contiene métodos y propiedades comunes que pueden ser utilizados por las clases hijas.

export class BookingBasePage {

    protected page: Page;

    // Cada clase debe tener si o si su constructor
    constructor(page: Page) {
        this.page = page;
    }

    // Acá arrancan los métodos que van a ser utilizados en todas las páginas, por ejemplo: navegar a una URL, hacer click en un elemento, etc.
    async navigateTo(url: string) {
        await this.page.goto(url, { waitUntil: 'domcontentloaded' });
    }

    async clickElement(locator: Locator) {
        await locator.waitFor({ state: 'visible' });
        await locator.click();
    }

    // Este método intenta cerrar un modal si está presente en la página. Si no hay un modal, simplemente registra un mensaje en la consola.
    async dismissModalIfPresent() {
        const cookiesAcceptButton = this.page.locator("#onetrust-accept-btn-handler");
        const signInCloseButton = this.page.locator('button[aria-label="Dismiss sign-in info."]');
        const modalCloseButton = cookiesAcceptButton.or(signInCloseButton);
        try {
            // isVisible no espera, por eso usamos waitFor
            await modalCloseButton.first().waitFor({ state: 'visible', timeout: 100000 });
            await modalCloseButton.first().click();
            console.log('Modal cerrado.');
        }
        catch (error) {
            console.log('No modal found to dismiss.');
        }
    }

    async typeText(locator: Locator, text: string) {
        await locator.waitFor({ state: 'visible' });
        await locator.fill(text);
    }
}