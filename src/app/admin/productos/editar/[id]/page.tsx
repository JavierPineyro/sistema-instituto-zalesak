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
        <GoBack path="/admin/productos" />
        <h1 className="text-center">Producto no encontrado</h1>;
      </div>
    );
  }
  return (
    <section className="mx-auto flex max-w-[500px] flex-col gap-4 pb-5">
      <div className="flex flex-col gap-2">
        <GoBack path="/admin/productos" />
        <h1 className="text-center text-2xl font-bold tracking-tight">
          Editar Producto
        </h1>
      </div>
      <EditProductForm product={product} />
    </section>
  );
}
