export default function CreateProductForm() {
  return (
    <>
      <form>
        <input type="text" placeholder="Nombre del producto" />
        <input type="text" placeholder="Precio" />
        <input type="text" placeholder="Descripcion" />
        <button>Guardar</button>
      </form>
    </>
  );
}
