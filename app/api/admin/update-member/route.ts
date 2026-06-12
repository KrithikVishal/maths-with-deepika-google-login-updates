// app/api/admin/update-member/route.ts
import { NextResponse } from "next/server";
import { updateMemberAction } from "@/app/actions/admin";

export async function POST(request: Request) {
  const formData = await request.formData();
  await updateMemberAction(formData);
  return NextResponse.json({ ok: true, message: "Member updated" });
}
