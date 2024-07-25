import "~/styles/globals.css";
import { type Metadata } from "next"

import { GeistSans } from "geist/font/sans";
import UserNav from "~/components/layout-components/user-nav";
import Search from "~/components/layout-components/search";
import MainNav from "~/components/layout-components/main-nav";

export const metadata: Metadata = {
  title: "Panel de Administración - Instituto Zalesak",
  description: "Dashboard del Sistema de gestión para el instituto de taekwondo Zalesak",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function LayoutAdmin({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${GeistSans.variable} "h-full bg-white"`}>
      <body className="h-full">
        <div className="hidden flex-col md:flex">
          <div className="border-b">
            <div className="flex h-16 items-center px-4">
              Instituto Zalesak
              <MainNav className="mx-6" />
              <div className="ml-auto flex items-center space-x-4">
                <Search />
                <UserNav />
              </div>
            </div>
          </div>
        </div>
        {children}
      </body>
    </html>
  )
}