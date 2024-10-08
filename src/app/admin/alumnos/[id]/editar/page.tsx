import UpdateAlumnForm from "~/components/alumnos/forms/update-alumn-form"
import { service } from "~/server/services"

type Props = {
  params: {
    id: string
  }
}

export default async function EditarPage({ params }: Props) {

  const [alumn, belts] = await Promise.all([
    service.alumnos.getById(Number(params.id)),
    service.cinturones.list()
  ])

  if (!alumn) {
    return <section>
      Alumno no encontrado
      <br />
      <a href="/admin/alumnos">Volver a la lista</a>
    </section>
  }

  return <section className="min-w-[400px]">
    <h2 className="text-gray-800 font-bold text-lg">
      Editar datos
    </h2>
    <UpdateAlumnForm alumn={alumn} belts={belts} />
  </section>
}