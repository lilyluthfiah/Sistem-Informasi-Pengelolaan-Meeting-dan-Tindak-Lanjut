import Link from "next/link";

const STATUS_BADGE_CLASS = {
  Terjadwal: "badge-info",
  Berlangsung: "badge-warning",
  Selesai: "badge-success",
  Dibatalkan: "badge-danger",
};

const SAMPLE_MEETINGS = [
  {
    id: "sample-1",
    title: "Evaluasi Kinerja Tim Kuartal III",
    date: new Date(2026, 8, 28),
    time: "09:00",
    location: "Ruang Rapat Utama",
    status: "Selesai",
  },
  {
    id: "sample-2",
    title: "Rapat Koordinasi Proyek Sistem Informasi",
    date: new Date(2026, 9, 1),
    time: "10:00",
    location: "Ruang Meeting A",
    status: "Selesai",
  },
  {
    id: "sample-3",
    title: "Pembahasan Anggaran Operasional",
    date: new Date(2026, 9, 5),
    time: "13:30",
    location: "Ruang Rapat Direksi",
    status: "Berlangsung",
  },
  {
    id: "sample-4",
    title: "Perencanaan Sprint Pengembangan",
    date: new Date(2026, 9, 7),
    time: "09:30",
    location: "Ruang Meeting B",
    status: "Terjadwal",
  },
  {
    id: "sample-5",
    title: "Review Kebutuhan Pengguna",
    date: new Date(2026, 9, 9),
    time: "14:00",
    location: "Ruang Kolaborasi",
    status: "Terjadwal",
  },
  {
    id: "sample-6",
    title: "Presentasi Hasil dan Tindak Lanjut",
    date: new Date(2026, 9, 12),
    time: "11:00",
    location: "Aula Lantai 2",
    status: "Terjadwal",
  },
];

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

export default function MeetingPage({ searchParams }) {
  const query = getSearchQuery(searchParams);
  const normalizedQuery = query.toLocaleLowerCase("id-ID");
  const meetings = SAMPLE_MEETINGS.filter((meeting) =>
    meeting.title.toLocaleLowerCase("id-ID").includes(normalizedQuery)
  ).sort((first, second) => second.date.getTime() - first.date.getTime());

  return (
    <main className="container-wide">
      <div className="card">
        <h1 className="page-title">Daftar Meeting</h1>
        <p className="page-subtitle">
          Contoh tampilan daftar meeting
        </p>
        <p className="sample-data-notice">
          Data dummy hanya untuk tampilan dan tidak terhubung ke database.
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

        {meetings.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon" aria-hidden="true">
              🗓️
            </div>
            <p className="empty-state-title">
              {query ? "Meeting tidak ditemukan" : "Belum ada meeting"}
            </p>
            <p className="empty-state-text">
              {query
                ? `Tidak ada contoh meeting dengan judul "${query}".`
                : "Belum ada data contoh meeting."}
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
                      <span className="badge badge-neutral">Contoh</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p className="table-count">
          {meetings.length} contoh meeting ditemukan
          {query ? ` untuk "${query}"` : ""}
        </p>
      </div>
    </main>
  );
}
