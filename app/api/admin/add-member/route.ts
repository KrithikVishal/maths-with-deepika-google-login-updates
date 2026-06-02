// app/api/admin/add-member/route.ts
import { NextResponse } from "next/server";
import { addMemberAction } from "@/app/actions/admin";

export async function POST(request: Request) {
  const formData = await request.formData();
  await addMemberAction(formData);
  return NextResponse.json({ ok: true, message: "Member added" });
}
