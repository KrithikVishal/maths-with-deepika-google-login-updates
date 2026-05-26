import { redirect } from "next/navigation";

export default async function MotherModulePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  redirect(`/mother/dashboard#${id}`);
}
