"use client";
import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import { Recieve } from "~/lib/types";

type Props = {
  recieve: Recieve;
};
export default function PDFOrder({ recieve }: Props) {
  const styles = StyleSheet.create({
    page: {
      flexDirection: "column",
      backgroundColor: "#fff",
      gap: 5,
      padding: 10,
      height: 800,
      minHeight: 800,
    },
    wrap: {
      border: "1px solid #000",
      padding: 10,
      height: 800,
    },
    header: {
      flexDirection: "row",
      gap: 3,
      justifyContent: "space-between",
      backgroundColor: "#fff",
      marginBottom: 50,
    },
    subheader: {
      flexDirection: "column",
      gap: 2,
    },
    title: {
      fontSize: 14,
      fontWeight: "bold",
      color: "#000",
    },
    original: {
      fontSize: 11,
      fontWeight: "bold",
      color: "#000",
    },
    id: {
      fontSize: 11,
      fontWeight: "bold",
      color: "#000",
    },
    date: {
      fontWeight: "bold",
      fontSize: 11,
    },
    body: {
      flexDirection: "row",
      gap: 2,
      backgroundColor: "#fff",
      fontSize: 11,
    },
    tableheader: {
      fontWeight: "bold",
      marginBottom: 5,
    },
    tablesection: {
      flexDirection: "column",
      gap: 5,
      minWidth: 150,
    },
    resume: {
      width: "100%",
      flexDirection: "column",
      alignItems: "flex-end",
      fontWeight: "bold",
      fontSize: 12,
      marginTop: 50,
      marginBottom: 50,
    },
    resumeitem: {
      flexDirection: "row",
      gap: 1,
      justifyContent: "space-between",
      fontSize: 12,
    },
    footer: {
      fontSize: 14,
      borderBottom: "1px solid #000",
      backgroundColor: "#fff",
      marginTopTop: 50,
      paddingBottom: 4,
    },
    firma: {
      textDecoration: "none",
    },
    bold: {
      fontWeight: "bold",
    },
  });
  return (
    <Document title={`recibo-de-pago-${recieve.id}`}>
      <Page size="A4" style={styles.page}>
        <View style={styles.wrap}>
          <View style={styles.header}>
            <View style={styles.subheader}>
              <Text style={styles.title}>Instituto de Taekwondo Zalesak</Text>
              <Text style={styles.title}>Tel: +54-3743-411903</Text>
              <Text style={styles.title}>Cuit: 23-23096313-4</Text>
              <Text style={styles.title}>
                Av. San Luis Gonzaga - Capioví, Misiones
              </Text>
            </View>
            <View style={styles.subheader}>
              <Text style={styles.original}>ORIGINAL</Text>
              <Text style={styles.id}>Recibo Nº {recieve.id}</Text>
              <View style={{ flexDirection: "row", gap: 1 }}>
                <Text style={styles.date}>Fecha de emisión:</Text>
                <Text style={{ fontSize: 11 }}>{recieve.date}</Text>
              </View>
              <Text style={{ fontSize: 11 }}>Consumidor final</Text>
            </View>
          </View>

          <View style={{ marginBottom: 50, flexDirection: "row", gap: 20 }}>
            <View style={{ flexDirection: "column", gap: 5, fontSize: 11 }}>
              <View style={{ flexDirection: "row", gap: 1 }}>
                <Text style={styles.bold}>Apellido y Nombre: </Text>
                <Text>{recieve.nameClient}</Text>
              </View>
            </View>
            <View style={{ flexDirection: "row", gap: 1, fontSize: 11 }}>
              <Text style={styles.bold}>Condición de pago:</Text>s
              <Text>Pago al contado</Text>
            </View>
          </View>

          <View>
            <View style={styles.body}>
              <View style={styles.tablesection}>
                <Text
                  style={{
                    fontWeight: "bold",
                    marginBottom: 5,
                    textDecoration: "underline",
                  }}
                >
                  Concepto
                </Text>
                <Text>{recieve.concept}</Text>
              </View>
              <View style={styles.tablesection}>
                <Text
                  style={{
                    fontWeight: "bold",
                    marginBottom: 5,
                    textDecoration: "underline",
                  }}
                >
                  Cantidad
                </Text>
                <Text>1 unidad(es)</Text>
              </View>
              <View style={styles.tablesection}>
                <Text
                  style={{
                    fontWeight: "bold",
                    marginBottom: 5,
                    textDecoration: "underline",
                  }}
                >
                  Precio unitario
                </Text>
                <View style={{ flexDirection: "row", gap: 1 }}>
                  <Text>${recieve.amount}</Text>
                  <Text style={{ fontSize: 9, fontStyle: "cursive" }}>
                    ({recieve.writtenAmount})
                  </Text>
                </View>
              </View>
              <View
                style={{
                  gap: 2,
                  flexDirection: "column",
                  justifyContent: "flex-end",
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    marginBottom: 5,
                    textDecoration: "underline",
                  }}
                >
                  Subtotal
                </Text>
                <Text>{recieve.amount}</Text>
              </View>
            </View>
          </View>

          <View style={styles.resume}>
            <View style={styles.resumeitem}>
              <Text>Subtotal: </Text>
              <Text>${recieve.total}</Text>
            </View>
            <View style={styles.resumeitem}>
              <Text>Total: </Text>
              <Text>${recieve.total}</Text>
            </View>
          </View>

          <View style={styles.footer}>
            <Text style={styles.firma}>Firma:</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
