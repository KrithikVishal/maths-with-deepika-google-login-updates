# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: validation.spec.ts >> validation error returns 400
- Location: tests\playwright\validation.spec.ts:3:1

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 400
Received: 404
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test('validation error returns 400', async ({ request }) => {
  4  |   const response = await request.post('/api/validate', {
  5  |     data: { invalid: true },
  6  |   });
> 7  |   expect(response.status()).toBe(400);
     |                             ^ Error: expect(received).toBe(expected) // Object.is equality
  8  | });
  9  | 
  10 | 
```