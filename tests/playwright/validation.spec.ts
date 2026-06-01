import { test, expect } from '@playwright/test';

test('validation error returns 400', async ({ request }) => {
  const response = await request.post('/api/validate', {
    data: { invalid: true },
  });
  expect(response.status()).toBe(400);
});

