// tests/e2e/full_suite.spec.ts
import { test, expect } from '@playwright/test';

const kidCredentials = {
  email: 'krithikvishal01@gmail.com',
  password: 'password',
};

/** Helper to perform login */
async function loginAsKid(page) {
  await page.goto('/login?role=kid');
  await page.fill('input[name="email"]', kidCredentials.email);
  await page.fill('input[name="password"]', kidCredentials.password);
  await page.click('button:has-text("Login")');
  await expect(page).toHaveURL(/.*dashboard.*/);
}

/** Helper to add first product to cart */
async function addFirstProductToCart(page) {
  // Navigate to shop
  await page.click('a[href="/shop"]');
  await expect(page).toHaveURL('/shop');
  // Click the first "Add to Cart" button we encounter
  const addButtons = await page.locator('button:has-text("Add to Cart")').first();
  await addButtons.click();
  // Verify cart badge increments
  const badge = page.locator('span[data-testid="cart-count"]');
  await expect(badge).toHaveText('1');
}

/** Helper to checkout and complete Razorpay test payment */
async function checkoutAndPay(page) {
  await page.click('a[href="/cart"]');
  await expect(page).toHaveURL('/cart');
  await page.click('button:has-text("Checkout")');
  // Login step if required
  if (page.url().includes('/login')) {
    await loginAsKid(page);
  }
  // Wait for Razorpay modal and click the test "Pay" button
  const razorpayIframe = page.frameLocator('iframe[title="Razorpay Checkout"]');
  await razorpayIframe.locator('button:has-text("Pay")').click();
  // Success message
  await expect(page.locator('text=Payment successful')).toBeVisible({ timeout: 15000 });
}

/** Test all public pages */
test.describe('Public pages sanity', () => {
  test('Home page loads with SEO tags', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Maths with Deepika/);
    const meta = await page.locator('meta[name="description"]');
    await expect(meta).toHaveAttribute('content', /Vedic Maths learning/);
  });

  const pages = [
    '/about',
    '/for-mothers',
    '/for-kids',
    '/shop',
  ];

  for (const path of pages) {
    test(`Page ${path} loads correctly`, async ({ page }) => {
      await page.goto(path);
      await expect(page).toHaveURL(path);
    });
  }
});

/** Test product flow */
test.describe('Product & cart flow', () => {
  test('Add product to cart and checkout (kid)', async ({ page }) => {
    await addFirstProductToCart(page);
    await checkoutAndPay(page);
    // Verify order status in DB via API (simple GET for demo)
    const response = await page.request.get('/api/orders/latest');
    const data = await response.json();
    expect(data.paymentStatus).toBe('paid');
  });
});

/** Test authentication */
test.describe('Authentication', () => {
  test('Kid login works', async ({ page }) => {
    await loginAsKid(page);
    await expect(page.locator('text=Welcome back')).toBeVisible();
  });
});

/** Test admin protected routes (mocked auth) */
test.describe('Admin routes', () => {
  test('Admin dashboard accessible with mock session', async ({ page }) => {
    // Set a cookie that mimics admin auth – adjust name/value to match your app
    await page.context().addCookies([
      { name: 'admin_session', value: 'mocked-admin-token', domain: 'localhost', path: '/' },
    ]);
    await page.goto('/admin-dashboard');
    await expect(page).toHaveURL('/admin-dashboard');
    await expect(page.locator('text=Admin Dashboard')).toBeVisible();
  });
});
