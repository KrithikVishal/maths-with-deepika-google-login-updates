import { redirect } from "next/navigation";

export default function MotherLoginAliasPage() {
  redirect("/login?role=mother");
}
