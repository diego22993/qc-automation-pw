
import { test, expect } from '../../Clase6/fixtures/sauceDemoFixtures';
import { USERS } from '../../Clase6/data/users';

test.describe('Clase 6 - SauceDemo Login', () => {

  test('TC01 - Login con usuario válido', async ({ loginPage }) => {

    await loginPage.login(
      USERS.standard.username,
      USERS.standard.password
    );

    await loginPage.validateSuccessfulLogin();

  });

  test('TC02 - Login con usuario bloqueado', async ({ loginPage }) => {

    await loginPage.login(
      USERS.locked.username,
      USERS.locked.password
    );

    await loginPage.validateError(
      'Sorry, this user has been locked out.'
    );

    await expect(loginPage.loginButton).toBeVisible();

  });

  test('TC03 - Login con credenciales inválidas', async ({ loginPage }) => {

    await loginPage.login(
      USERS.invalid.username,
      USERS.invalid.password
    );

    await loginPage.validateError(
      'Username and password do not match any user in this service'
    );

    await expect(loginPage.loginButton).toBeVisible();

  });

  test('TC04 - Login sin username', async ({ loginPage }) => {

    await loginPage.login(
      '',
      USERS.standard.password
    );

    await loginPage.validateError(
      'Username is required'
    );

    await expect(loginPage.loginButton).toBeVisible();

  });

  test('TC05 - Login sin password', async ({ loginPage }) => {

    await loginPage.login(
      USERS.standard.username,
      ''
    );

    await loginPage.validateError(
      'Password is required'
    );

    await expect(loginPage.loginButton).toBeVisible();

  });

});
