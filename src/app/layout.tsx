import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";

export const metadata = {
  title: "Instituto Zalesak",
  description: "Sistema de gestión para el instituto de taekwondo Zalesak",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${GeistSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
