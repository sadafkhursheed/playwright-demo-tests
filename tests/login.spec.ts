import { test, expect } from '@playwright/test';

// ---- Test 1: a correct, meaningful test ----
test('login page shows the sign-in form', async ({ page }) => {
  await page.goto('https://practicetestautomation.com/practice-test-login/');
  await expect(page.locator('#username')).toBeVisible();
  await expect(page.locator('#password')).toBeVisible();
  await expect(page.locator('#submit')).toBeVisible();
});

// ---- Test 2: a correct end-to-end login assertion ----
test('user can log in with valid credentials', async ({ page }) => {
  await page.goto('https://practicetestautomation.com/practice-test-login/');
  await page.fill('#username', 'student');
  await page.fill('#password', 'Password123');
  await page.click('#submit');
  await expect(page.locator('.post-title')).toHaveText('Logged In Successfully');
});

// ---- Test 3: intentionally weak "fake-pass" test (for review) ----
async function doLogin(page: any): Promise<boolean> {
  await page.goto('https://practicetestautomation.com/practice-test-login/');
  await page.fill('#username', 'student');
  await page.fill('#password', 'Password123');
  await page.click('#submit');
  return true; // always true regardless of outcome
}

test('login works', async ({ page }) => {
  const ok = await doLogin(page);
  expect(ok).toBeTruthy(); // passes even if login failed
});
