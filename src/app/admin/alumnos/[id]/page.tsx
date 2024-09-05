import Link from "next/link"
import EnableOrDisable from "~/components/alumnos/modals/enable-or-disable"
import Cuotas from "~/components/cuotas"
import GoBack from "~/components/go-back"
import { Button } from "~/components/ui/button"
import { Payment } from "~/lib/types"
import { calculateAge, cn, parseToLocalDate } from "~/lib/utils"
import { service } from "~/server/services"

type Props = {
  params: {
    id: string
  }
}

export default async function AlumnInfoPage({ params }: Props) {

  const alumn = await service.alumnos.getByIdWithBelt(Number(params.id))
  const cuotas: Payment[] = [
    {
      id: 5,
      month: "Marzo",
      date: '2023--3-13',
      idAlumn: 1,
      idRecieve: 1
    },
    {
      id: 4,
      month: "Abril",
      date: '2023-04-20',
      idAlumn: 1,
      idRecieve: 2
    },
    {
      id: 1,
      month: "Mayo",
      date: '2023-05-10',
      idAlumn: 1,
      idRecieve: 3
    },
    {
      id: 2,
      month: "Junio",
      date: '2023-06-03',
      idAlumn: 1,
      idRecieve: 4
    },
    {
      id: 3,
      month: "Julio",
      date: '2023-07-15',
      idAlumn: 1,
      idRecieve: 5
    },
    {
      id: 6,
      month: "Agosto",
      date: '2023-08-22',
      idAlumn: 1,
      idRecieve: 6
    },

  ]

  if (!alumn) {
    return <div className="flex flex-col gap-1 items-center justify-center">
      Alumno no encontrado
      <GoBack path="/alumnos" />
    </div>
  }

  return (
    <section className="px-5">
      <header className="flex flex-col gap-1 justify-center mb-5">
        <GoBack path="/admin/alumnos" />
        <h2 className="font-bold text-center text-3xl">{alumn.fullname}</h2>
      </header>
      <div className="text-xl flex gap-20 justify-start">
        <div>
          <span className="font-semibold">Fecha Nac</span>:
          <span className="ml-1">{parseToLocalDate(alumn.birthday)}</span>
        </div>
        <div>
          <span className="font-semibold">Edad</span>:
          <span className="ml-1">
            {calculateAge(alumn.birthday).toString().concat(" años")}
          </span>
        </div>
        <div>
          <span className="font-semibold">Tutor</span>:
          <span className="ml-1">{alumn.tutor ?? "No tiene"}</span>
        </div>
      </div>

      <div className="text-xl flex gap-20 justify-start">
        <div>
          <span className="font-semibold">Inscripción</span>:
          <span className="ml-1">{parseToLocalDate(alumn.dateAdmission)}</span>
        </div>
        <div className="flex gap-1">
          <span className="font-semibold">Estado</span>:
          <span className="ml-1">{alumn.active ? "Activo" : "Inactivo"}</span>
        </div>
        <div>
          <span className="font-semibold">Teléfono</span>:
          <span className="ml-1">{alumn.phoneNumber ?? "No tiene"}</span>
        </div>
      </div>
      <div className="text-xl flex gap-20 justify-start">
        <div>
          <span className="font-semibold">Cinturón</span>:
          <span className="ml-1">{alumn.cinturon.description}</span>
        </div>
      </div>

      <div className="my-5 grid gap-2">
        <h3 className="font-semibold text-xl">Cuotas ({new Date().getFullYear()})</h3>
        <div>
          <Cuotas cuotas={cuotas} admissionDate={alumn.dateAdmission} />
        </div>
      </div>

      <footer className="flex justify-evenly mt-10 gap-1 w-full">
        <Button asChild className={cn("w-32 bg-blue-600 hover:bg-blue-500 transition-colors")}>
          <Link href={`/admin/alumnos/${alumn.id}/editar`}>Editar</Link>
        </Button>
        <EnableOrDisable id={alumn.id} active={alumn.active} />
        <Button asChild className={cn("w-32")}>
          <Link href={`/admin/alumnos/${alumn.id}/pagar`}>Pagar Cuota</Link>
        </Button>
        <Button asChild className={cn("w-32")}>
          <Link href={`/admin/alumnos/${alumn.id}/hacer-pedido`}>Hacer Pedido</Link>
        </Button>
      </footer>
    </section >
  )
}