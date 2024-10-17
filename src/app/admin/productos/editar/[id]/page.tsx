import GoBack from "~/components/go-back";
import EditProductForm from "~/components/productos/forms/edit-product-form";
import { service } from "~/server/services";

type Props = {
  params: { id: string };
};

export default async function ProductEditPage({ params }: Props) {
  const id = Number(params.id);
  const product = await service.precios.getById(id);

  if (!product) {
    return (
      <div>
        <GoBack path="/productos" />
        <h1 className="text-center">Producto no encontrado</h1>;
      </div>
    );
  }
  return (
    <section className="container mx-auto flex flex-col gap-4">
      <div className="flex flex-col items-center gap-2">
        <GoBack path="/productos" />
        <h1 className="text-2xl font-bold tracking-tight">Editar Produto</h1>
      </div>
      <EditProductForm product={product} />
    </section>
  );
}
