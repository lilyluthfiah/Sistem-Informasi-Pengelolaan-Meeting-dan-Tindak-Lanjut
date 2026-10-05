import { redirect } from "next/navigation";
import { getSession } from "@/lib/session.js";
import Sidebar from "./components/Sidebar.jsx";

export default async function DashboardLayout({ children }) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="app-content">{children}</div>
    </div>
  );
}
