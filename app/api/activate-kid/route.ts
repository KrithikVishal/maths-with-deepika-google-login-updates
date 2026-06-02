// app/api/activate-kid/route.ts
import { NextResponse } from "next/server";
import { activateKidAccess } from "@/app/actions/kid";

export async function POST(request: Request) {
  const formData = await request.formData();
  // Directly invoke the server action (it already handles revalidation, etc.)
  await activateKidAccess(formData);
  return NextResponse.json({ ok: true, message: "Kid access activated" });
}
