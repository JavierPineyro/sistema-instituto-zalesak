import CreateProductoModal from "./modals/create-producto";

export default function HeaderPedidos() {
  return (
    <div className="flex items-center justify-between space-y-2">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Pedidos</h2>
        <p className="text-muted-foreground">
          Aquí podrás ver la lista de todos los pedidos
        </p>
      </div>
      <div className="flex items-center">
        <CreateProductoModal>Agregar Nuevo Alumno</CreateProductoModal>
      </div>
    </div>
  );
}
