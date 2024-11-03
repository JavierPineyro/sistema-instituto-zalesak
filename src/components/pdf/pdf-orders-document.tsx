import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import { parseTotalToLocale } from "~/lib/utils";

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
export default function PDFOrdersDocument({ orders }: Props) {
  const total = orders.reduce((acc, item) => {
    const { quantity, producto } = item;
    const value = quantity * producto.teacherPrice;
    return acc + value;
  }, 0);

  const styles = StyleSheet.create({
    page: {
      flexDirection: "column",
      backgroundColor: "#fff",
      gap: 5,
      padding: 10,
      height: 800,
      minHeight: 800,
    },
    wrapper: {
      display: "flex",
      flexDirection: "column",
      gap: 2,
      padding: 4,
      border: "1px solid #000",
    },
    tableheader: {
      display: "flex",
      borderBottom: "1px solid #000",
      fontSize: 12,
      fontWeight: "bold",
    },
  });

  return (
    <Document title={`lista-de-pedidos-${total}`}>
      <Page size="A4" style={styles.page}>
        <View style={{ marginBottom: 10 }}>
          <Text>Lista de pedidos:</Text>
        </View>
        <View style={styles.wrapper}>
          {orders.map((order) => (
            <View style={{ fontSize: 12 }} key={order.id}>
              <Text>
                - {order.producto.name} {"                                    "} {order.quantity}
                {"     "}
                {parseTotalToLocale(order.producto.teacherPrice)}
                {"     "}
                {parseTotalToLocale(
                  order.quantity * order.producto.teacherPrice,
                )}
              </Text>
            </View>
          ))}
        </View>
        <View>
          <Text style={{ fontSize: 14, fontWeight: "bold" }}>
            Total: ${parseTotalToLocale(total)}
          </Text>
        </View>
      </Page>
    </Document>
  );
}
/**

<View key={order.id}>
  <Text>
    - {order.producto.name} {"                 "} {order.quantity}
    {"        "}
    {parseTotalToLocale(order.producto.teacherPrice)}
    {"       "}
    {parseTotalToLocale(
      order.quantity * order.producto.teacherPrice,
    )}
  </Text>
</View>
*/
