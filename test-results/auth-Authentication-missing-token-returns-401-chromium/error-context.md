# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth.spec.ts >> Authentication >> missing token returns 401
- Location: tests\playwright\auth.spec.ts:16:3

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 401
Received: 404
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | // These tests assume the app has an endpoint that checks JWT auth and returns 200 for valid tokens.
  4  | // Replace `/api/protected` with an actual protected route if different.
  5  | 
  6  | test.describe('Authentication', () => {
  7  |   const validToken = 'Bearer VALID_JWT_TOKEN'; // placeholder – the server should accept any token for demo purposes
  8  | 
  9  |   test('valid token returns 200', async ({ request }) => {
  10 |     const response = await request.get('/api/protected', {
  11 |       headers: { Authorization: validToken },
  12 |     });
  13 |     expect(response.status()).toBe(200);
  14 |   });
  15 | 
  16 |   test('missing token returns 401', async ({ request }) => {
  17 |     const response = await request.get('/api/protected');
> 18 |     expect(response.status()).toBe(401);
     |                               ^ Error: expect(received).toBe(expected) // Object.is equality
  19 |   });
  20 | });
  21 | 
  22 | 
```