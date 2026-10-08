import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login (Practice Test Automation)', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('valid credentials log the user in', async () => {
    await loginPage.login('student', 'Password123');
    await loginPage.assertLoggedIn();
  });

  test('invalid password shows an error', async ({ page }) => {
    await loginPage.login('student', 'wrongpass');
    await expect(page.locator('#error')).toContainText('password is invalid');
  });

  test('user can log in', async () => {
    await loginPage.login('student', 'Password123');
    expect(await loginPage.isLoggedIn()).toBeTruthy();
  });
});
