const crypto = require("crypto");

async function main() {
  const secret = "my_dummy_secret_123";

  const payload = JSON.stringify({
    event: "payment.captured",
    payload: {
      payment: {
        entity: {
          id: "pay_test_12345",
          order_id: "order_test_abcde",
          status: "captured"
        }
      }
    }
  });

  const signature = crypto.createHmac("sha256", secret).update(payload).digest("hex");

  console.log("Sending webhook payload:", payload);
  console.log("Signature:", signature);

  try {
    const res = await fetch("http://localhost:3000/api/razorpay/webhook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-razorpay-signature": signature
      },
      body: payload
    });

    const responseText = await res.text();
    console.log("Response Status:", res.status);
    console.log("Response Body:", responseText);
  } catch (error) {
    console.error("Fetch Error:", error);
  }
}

main();
