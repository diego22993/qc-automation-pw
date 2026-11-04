import { test, expect } from '@playwright/test'; 

test.describe('Ejercicios: Nivel básico', () => {

  test('Login completo: Puntos 1,2 y 3', async ({ page }) => {

    // 1. Ingreso a la plataforma y validación de URL
    await page.goto('https://www.saucedemo.com/');
    await expect(page).toHaveURL('https://www.saucedemo.com/');

    // 2. Proceso de autenticación de usuario
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

  });  

  test('Credenciales inválidas y re-login: Puntos 4, 5 y 6', async ({ page }) => {

    // 1. Ingreso a la plataforma
    await page.goto('https://www.saucedemo.com/');

    // 2. Ingreso sin credenciales
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText('Epic sadface: Username is required')).toBeVisible(); 

    // 3. Ingreso con credenciales válidas
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
  });  

  test(' Puntos 4, 5 y 6', async ({ page }) => {

    // 1. Ingreso a la plataforma
    await page.goto('https://www.saucedemo.com/');

    // 2. Ingreso sin credenciales
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText('Epic sadface: Username is required')).toBeVisible(); 

    // 3. Ingreso con credenciales válidas
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
  }); 

});