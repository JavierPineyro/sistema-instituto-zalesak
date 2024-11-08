"use client";

import { Recieve } from "~/lib/types";
import { PDFViewer } from "@react-pdf/renderer";
import PDFOrder from "./pdf-order-duplicate";
import PDF from "./pdf-duplicate";

type Props = {
  recieve: Recieve;
};

export default function PdfRecieveDuplicate({ recieve }: Props) {
  if (recieve.tipo === "pedido") {
    return (
      <PDFViewer width={768} height={800} showToolbar={true}>
        <PDFOrder recieve={recieve} />
      </PDFViewer>
    );
  }
  return (
    <PDFViewer width={768} height={800} showToolbar={true}>
      <PDF recieve={recieve} />
    </PDFViewer>
  );
}
