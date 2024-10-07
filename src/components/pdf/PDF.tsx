"use client";
import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import { Recieve } from "~/lib/types";

type Props = {
  recieve: Recieve;
};
export default function PDF({ recieve }: Props) {
  const styles = StyleSheet.create({
    page: {
      flexDirection: "row",
      backgroundColor: "#E4E4E4",
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
  });
  return (
    <Document title={`recibo-de-pago-${recieve.id}`}>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>{recieve.nameClient}</Text>
          <Text>{recieve.concept}</Text>
          <Text>Recibo de pago</Text>
          <Text>Fecha de pago: {recieve.date}</Text>
          <Text>Total: {recieve.total}</Text>
        </View>
        <View style={styles.section}>
          <Text>Section #2</Text>
        </View>
      </Page>
    </Document>
  );
}
