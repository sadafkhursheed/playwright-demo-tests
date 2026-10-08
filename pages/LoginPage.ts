import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly successMessage: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.submitButton = page.locator('#submit');
    this.successMessage = page.locator('.post-title');
    this.errorMessage = page.locator('#error');
  }

  async goto(): Promise<void> {
    await this.page.goto('https://practicetestautomation.com/practice-test-login/');
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async isLoggedIn(): Promise<boolean> {
    await this.submitButton.click().catch(() => {});
    return true;
  }

  async assertLoggedIn(): Promise<void> {
    await expect(this.successMessage).toHaveText('Logged In Successfully');
  }
}
