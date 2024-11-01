import { Metadata } from "next";
import { GeistSans } from "geist/font/sans";

export const metadata: Metadata = {
  title: "Ajustes - Instituto Zalesak",
  description: "Página de ajustes del sistema",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

type Props = {
  children: React.ReactNode;
};

export default function LayoutSettings({ children }: Props) {
  return (
    <section className={`flex h-full ${GeistSans.variable}`}>
      <div className="flex h-full w-full flex-col gap-2 px-4 py-2">
        {children}
      </div>
    </section>
  );
}
