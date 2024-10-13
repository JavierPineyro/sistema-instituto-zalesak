import { type Metadata } from "next";
import "~/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import HeaderProductos from "~/components/productos/header-productos";
import { Product } from "~/lib/types";

export const metadata: Metadata = {
  title: "Productos y Precios - Instituto Zalesak",
  description: "Panel de Admnistracion de Productos y Precios",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};
export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  // const data = await service.precios.list();
  /*MOC DATA */
  const data: Product[] = [
    {
      id: 1,
      name: "Producto 1",
      publicPrice: 10,
      teacherPrice: 20,
      active: true,
    },
    {
      id: 2,
      name: "Producto 2",
      publicPrice: 20,
      teacherPrice: 40,
      active: true,
    },
    {
      id: 3,
      name: "Producto 3",
      publicPrice: 30,
      teacherPrice: 60,
      active: true,
    },
    {
      id: 4,
      name: "Producto 4",
      publicPrice: 40,
      teacherPrice: 80,
      active: false,
    },
    {
      id: 5,
      name: "Producto 5",
      publicPrice: 50,
      teacherPrice: 100,
      active: true,
    },
  ];

  return (
    <main
      className={`${GeistSans.variable} h-full flex-1 flex-col space-y-8 p-8 md:flex`}
    >
      <div className="space-y-2">
        <HeaderProductos />
        <DataTable data={data} columns={columns} />
      </div>
    </main>
  );
}
