"use client";

import dynamic from "next/dynamic";
import PDFOrdersDocument from "./pdf-orders-document";

const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  {
    ssr: false,
    loading: () => <p>Generando documento...</p>,
  },
);

type Props = {
  orders: {
    id: number;
    idProduct: number;
    quantity: number;
    producto: {
      name: string;
      teacherPrice: number;
    };
  }[];
};

export default function PdfOrdersList({ orders }: Props) {
  return (
    <PDFViewer width={768} height={800} showToolbar={true}>
      <PDFOrdersDocument orders={orders} />
    </PDFViewer>
  );
}
