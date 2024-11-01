import TopBar from "@/components/topbar";
import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await validateRequest();
  if (!user) {
    redirect("/auth/sign-in");
  }
  return (
    <>
      <TopBar email={user.email} />
      <div className="h-screen overflow-y-auto overflow-x-hidden z-10">
        {children}
      </div>
    </>
  );
}
