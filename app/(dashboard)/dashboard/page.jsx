import { prisma } from "@/lib/prisma.js";
import { getSession } from "@/lib/session.js";
import LogoutButton from "./LogoutButton.jsx";

export default async function DashboardPage() {
  const session = await getSession();

  const user = session
    ? await prisma.user.findUnique({
        where: { id: session.userId },
        select: { id: true, name: true, email: true, createdAt: true },
      })
    : null;

  return (
    <main className="container">
      <div className="card">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">Halaman utama setelah login — Sprint 1</p>

        {user ? (
          <div style={{ marginTop: "16px" }}>
            <p><strong>Nama:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p style={{ color: "#6b7280", fontSize: "13px", marginTop: "8px" }}>
              Login sebagai ID #{user.id}
            </p>
          </div>
        ) : (
          <p>Data pengguna tidak ditemukan.</p>
        )}

        <div style={{ marginTop: "24px" }}>
          <LogoutButton />
        </div>

        <div style={{ marginTop: "24px", padding: "12px", background: "#f9fafb", borderRadius: "8px", fontSize: "13px", color: "#6b7280" }}>
          Fondasi Sprint 1 siap. Fitur Meeting dan Tindak Lanjut akan ditambahkan di Sprint berikutnya.
        </div>
      </div>
    </main>
  );
}
