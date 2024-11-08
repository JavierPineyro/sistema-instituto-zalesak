import UpdateAlumnForm from "~/components/alumnos/forms/update-alumn-form";
import { service } from "~/server/services";

type Props = {
  params: {
    id: string;
  };
};

export default async function EditarPage({ params }: Props) {
  const [alumn, belts] = await Promise.all([
    service.alumnos.getById(Number(params.id)),
    service.cinturones.list(),
  ]);

  if (!alumn) {
    return (
      <section>
        Alumno no encontrado
        <br />
        <a href="/admin/alumnos">Volver a la lista</a>
      </section>
    );
  }

  if (!belts) {
    return (
      <section>
        No hay o no se pudo cargar los cinturones
        <br />
        <a href="/admin/alumnos">Volver a la lista</a>
      </section>
    );
  }

  return (
    <section className="min-w-[400px] pb-10">
      <h2 className="text-lg font-bold text-gray-800">Editar datos</h2>
      <div className="px-auto flex max-w-[500px] flex-col gap-3">
        <UpdateAlumnForm alumn={alumn} belts={belts} />
      </div>
    </section>
  );
}
