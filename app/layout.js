import "./globals.css";

export const metadata = {
  title: "Sistem Informasi Pengelolaan Meeting",
  description: "Sprint 1 - Fondasi aplikasi",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
