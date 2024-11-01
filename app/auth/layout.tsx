import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  const { user } = await validateRequest();
  if (user) {
    redirect("/home");
  }
  return <>{children}</>;
}
