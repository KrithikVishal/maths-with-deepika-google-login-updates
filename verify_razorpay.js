require('dotenv').config({ path: './.env' });
require('dotenv').config({ path: './.env.local' });
const keyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
const keySecret = process.env.RAZORPAY_KEY_SECRET;
if (!keyId || !keySecret) {
  console.error('Missing Razorpay credentials');
  process.exit(1);
}
(async () => {
  const amount = 100; // 1 INR in paise
  const response = await fetch('https://api.razorpay.com/v1/orders', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString('base64')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ amount, currency: 'INR', receipt: `test_${Date.now()}` }),
  });
  const data = await response.json();
  console.log(JSON.stringify(data, null, 2));
})();
