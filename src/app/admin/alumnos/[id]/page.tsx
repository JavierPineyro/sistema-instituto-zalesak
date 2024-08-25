import GoBack from "~/components/go-back"
import { Button } from "~/components/ui/button"
import { calculateAge } from "~/lib/utils"
import { service } from "~/server/services"

type Props = {
  params: {
    id: string
  }
}

export default async function AlumnInfoPage({ params }: Props) {

  const alumn = await service.alumnos.getByIdWithBelt(Number(params.id))

  if (!alumn) {
    return <div className="flex flex-col gap-1 items-center justify-center">
      Alumno no encontrado
      <GoBack path="/alumnos" />
    </div>
  }

  return (
    <section>
      <header className="flex flex-col gap-1 justify-center">
        <GoBack path="/admin/alumnos" />
        <h2>{alumn.fullname}</h2>
      </header>
      <div className="flex gap-1 justify-evenly">
        <div>
          <span>Fecha Nac: </span>
          <span>{alumn.birthday}</span>
        </div>
        <div>
          <span>Edad: </span>
          <span>
            {calculateAge(alumn.birthday)}
          </span>
        </div>
        <div className="flex gap-1 justify-evenly">
          <span>Estado:</span>
          <span>{alumn.active ? "Activo" : "Inactivo"}</span>
        </div>
      </div>

      <div className="flex gap-1 justify-evenly">
        <div>
          <span>Tutor: </span>
          <span>{alumn.tutor}</span>
        </div>
        <div>
          <span>Teléfono: </span>
          <span>{alumn.phoneNumber}</span>
        </div>
        <div>
          <span>Cinturón</span>
          <span>{alumn.cinturon.name}</span>
        </div>
      </div>

      <div>
        <h3>Cuotas:</h3>
        <div>Algun component para ver Pagos</div>
      </div>

      <footer className="flex justify-evenly gap-1 w-full">
        <Button>Editar</Button>
        <Button>Desactivar</Button>
        <Button>Pagar Cuota</Button>
        <Button>Hacer Pedido</Button>
      </footer>
    </section >
  )
}