import { validateRequest } from "@/lib/auth";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Home() {
  const { user } = await validateRequest();
  if (!user) {
    redirect("/auth/sign-in");
  } else {
    redirect("/home");
  }
}
