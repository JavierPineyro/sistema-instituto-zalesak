import MakeOrderForm from "~/components/pedidos/forms/make-order-form";
import { service } from "~/server/services";

type Props = {
  params: {
    id: string;
  };
};

// Traer el alumno con id, nombre
// Despues de ahcer el pedido, puede haber un boton en el header para
// hacer el pago, un modal que se abre y n el form  solo se pone el
// writtenAmount y el concepto porque todo lo demas es automatico, ver en pay-action
// HAcer una nueva action para este pago que es mas facil de manejar
export default async function OrderPage({ params }: Props) {
  const alumnPromise = service.alumnos.getFullnameById(Number(params.id));
  const productsPromise = service.precios.listWithPublicPriceAndName();
  const [alumn, products] = await Promise.all([alumnPromise, productsPromise]);

  if (!alumn || !products)
    return (
      <section>
        Alumno no encontrado
        <br />
        <a href={`/admin/alumnos/${Number(params.id)}`}>Volver</a>
      </section>
    );

  return (
    <section className="px-5">
      <header className="mb-5 flex justify-between">
        <h2 className="text-pretty text-xl font-semibold">Hacer Pedido</h2>
      </header>
      <div>
        <MakeOrderForm alumn={alumn} products={products} />
      </div>
    </section>
  );
}
