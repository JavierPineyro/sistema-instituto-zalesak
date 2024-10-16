import CreateProductoModal from "./modals/create-product";

export default function HeaderPedidos() {
  return (
    <div className="flex items-center justify-between space-y-2">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Productos</h2>
        <p className="text-muted-foreground">
          Aquí podrás ver la lista de precios de los productos
        </p>
      </div>
      <div className="flex items-center">
        <CreateProductoModal>Agregar Producto</CreateProductoModal>
      </div>
    </div>
  );
}
