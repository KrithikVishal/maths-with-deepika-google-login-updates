// app/api/update-order/route.ts
import { NextResponse, NextRequest } from "next/server";
import { updateOrderAction } from "@/app/actions/admin";

/**
 * Wrapper API that forwards the request to the server action used by the admin UI.
 * The client component can call this endpoint via `fetch`.
 */
export async function POST(request: NextRequest) {
  try {
    const { orderId, updates } = await request.json();
    // `updates` should match the shape expected by updateOrderAction
    // We simply forward the call and return the result.
    const result = await updateOrderAction(orderId, updates);
    return NextResponse.json(result);
  } catch (err) {
    console.error("❌ update‑order API error:", err);
    return NextResponse.json(
      { ok: false, error: "Failed to update order" },
      { status: 500 }
    );
  }
}
