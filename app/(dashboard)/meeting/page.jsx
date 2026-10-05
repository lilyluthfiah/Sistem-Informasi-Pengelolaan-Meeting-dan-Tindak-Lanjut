import Link from "next/link";
import { prisma } from "@/lib/prisma.js";

const STATUS_BADGE_CLASS = {
  Terjadwal: "badge-info",
  Berlangsung: "badge-warning",
  Selesai: "badge-success",
  Dibatalkan: "badge-danger",
};

function formatTanggal(date) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function getStatusBadgeClass(status) {
  return STATUS_BADGE_CLASS[status] || "badge-neutral";
}

function getSearchQuery(searchParams) {
  const raw = searchParams?.q;
  const value = Array.isArray(raw) ? raw[0] : raw;
  return typeof value === "string" ? value.trim() : "";
}

export default async function MeetingPage({ searchParams }) {
  const query = getSearchQuery(searchParams);

  let meetings = [];
  let loadError = false;

  try {
    meetings = await prisma.meeting.findMany({
      where: query ? { title: { contains: query } } : {},
      orderBy: [{ date: "desc" }, { id: "desc" }],
    });
  } catch (error) {
    console.error("Gagal memuat data meeting:", error);
    loadError = true;
  }

  return (
    <main className="container-wide">
      <div className="card">
        <h1 className="page-title">Daftar Meeting</h1>
        <p className="page-subtitle">
          Daftar meeting yang tersimpan di database
        </p>

        <form className="search-form" method="get" role="search">
          <input
            className="input search-input"
            type="search"
            name="q"
            defaultValue={query}
            placeholder="Cari berdasarkan judul meeting..."
            aria-label="Cari meeting berdasarkan judul"
          />
          <button className="button button-secondary button-search" type="submit">
            Cari
          </button>
        </form>

        {loadError ? (
          <div className="error">
            Gagal memuat data meeting. Silakan coba lagi.
          </div>
        ) : meetings.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon" aria-hidden="true">
              🗓️
            </div>
            <p className="empty-state-title">
              {query ? "Meeting tidak ditemukan" : "Belum ada meeting"}
            </p>
            <p className="empty-state-text">
              {query
                ? `Tidak ada meeting dengan judul "${query}".`
                : "Data meeting akan ditampilkan di sini setelah tersedia."}
            </p>
            {query && (
              <Link className="button button-secondary button-sm" href="/meeting">
                Hapus pencarian
              </Link>
            )}
          </div>
        ) : (
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Judul</th>
                  <th scope="col">Tanggal</th>
                  <th scope="col">Waktu</th>
                  <th scope="col">Lokasi</th>
                  <th scope="col">Status</th>
                  <th scope="col" className="table-action">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {meetings.map((meeting) => (
                  <tr key={meeting.id}>
                    <td className="table-title">{meeting.title}</td>
                    <td>{formatTanggal(meeting.date)}</td>
                    <td>{meeting.time}</td>
                    <td>{meeting.location}</td>
                    <td>
                      <span
                        className={`badge ${getStatusBadgeClass(meeting.status)}`}
                      >
                        {meeting.status}
                      </span>
                    </td>
                    <td className="table-action">
                      <Link
                        className="button-detail"
                        href={`/meeting/${meeting.id}`}
                      >
                        Detail
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!loadError && (
          <p className="table-count">
            {meetings.length} meeting ditemukan
            {query ? ` untuk "${query}"` : ""}
          </p>
        )}
      </div>
    </main>
  );
}
