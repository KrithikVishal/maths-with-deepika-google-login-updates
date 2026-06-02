// tests/e2e/login.test.ts
import { test, expect } from '@playwright/test';

test.describe('Authentication flows', () => {
  test('Student login succeeds', async ({ page }) => {
    await page.goto('/login');
    await page.getByPlaceholder('Email').fill('student@example.com');
    await page.getByPlaceholder('Password').fill('password123');
    await page.getByRole('button', { name: 'Login' }).click();
    // Assume successful redirect to dashboard
    await expect(page).toHaveURL(/\/dashboard/);
    await expect(page.locator('text=Dashboard')).toBeVisible();
  });

  test('Student registration works', async ({ page }) => {
    await page.goto('/login');
    await page.getByRole('button', { name: 'Create New Account' }).click();
    // Fill registration form
    await page.getByPlaceholder('Full name').fill('Test Student');
    await page.getByPlaceholder('Email').fill('newstudent@example.com');
    await page.getByPlaceholder('Phone').fill('1234567890');
    await page.getByPlaceholder('Username').fill('teststudent');
    await page.getByPlaceholder('Password').fill('password123');
    await page.getByPlaceholder('Confirm password').fill('password123');
    await page.getByRole('button', { name: 'Create Account' }).click();
    // Expect redirect to appropriate dashboard based on role
    await expect(page).toHaveURL(/\/dashboard/);
    await expect(page.locator('text=Dashboard')).toBeVisible();
  });
});
