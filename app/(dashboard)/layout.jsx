import { redirect } from "next/navigation";
import { getSession } from "@/lib/session.js";

export default async function DashboardLayout({ children }) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return <>{children}</>;
}
