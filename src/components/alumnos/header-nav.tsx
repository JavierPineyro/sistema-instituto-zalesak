import { Button } from "~/components/ui/button";
import CreateAlumnModal from "./modals/create-alumn-modal";

export default function HeaderAlumno() {
  return (
    <div className="flex items-center justify-between space-y-2">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Alumnos</h2>
        <p className="text-muted-foreground">
          Aquí podrás ver la lista de alumnos
        </p>
      </div>
      <div className="flex items-center">
        <CreateAlumnModal>Agregar Nuevo Alumno</CreateAlumnModal>
      </div>
    </div>
  )
}