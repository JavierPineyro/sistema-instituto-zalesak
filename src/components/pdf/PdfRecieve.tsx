"use client";

import { Recieve } from "~/lib/types";
import { PDFViewer } from "@react-pdf/renderer";
import PDF from "./PDF";
import PdfOrder from "./pdf-order";

type Props = {
  recieve: Recieve;
};
export default function PdfRecieve({ recieve }: Props) {
  if (recieve.tipo === "pedido") {
    return (
      <PDFViewer width={768} height={800} showToolbar={true}>
        <PdfOrder recieve={recieve} />
      </PDFViewer>
    );
  }
  return (
    <PDFViewer width={768} height={800} showToolbar={true}>
      <PDF recieve={recieve} />
    </PDFViewer>
  );
}
