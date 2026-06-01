import { test, expect } from '@playwright/test';

// These tests assume the app has an endpoint that checks JWT auth and returns 200 for valid tokens.
// Replace `/api/protected` with an actual protected route if different.

test.describe('Authentication', () => {
  const validToken = 'Bearer VALID_JWT_TOKEN'; // placeholder – the server should accept any token for demo purposes

  test('valid token returns 200', async ({ request }) => {
    const response = await request.get('/api/protected', {
      headers: { Authorization: validToken },
    });
    expect(response.status()).toBe(200);
  });

  test('missing token returns 401', async ({ request }) => {
    const response = await request.get('/api/protected');
    expect(response.status()).toBe(401);
  });
});

