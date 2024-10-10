"use client";

import { Recieve } from "~/lib/types";
import {
  PDFViewer,
  Document,
  Page,
  View,
  Text,
  StyleSheet,
} from "@react-pdf/renderer";
import PDF from "./PDF";

type Props = {
  recieve: Recieve;
};
export default function PdfRecieve({ recieve }: Props) {
  return (
    <PDFViewer width={768} height={800} showToolbar={true}>
      <PDF recieve={recieve} />
    </PDFViewer>
  );
}
