import { Button } from "../ui/button";

export default function HeaderAlumno() {
  return (
    <div className="flex items-center justify-between space-y-2">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Alumnos</h2>
        <p className="text-muted-foreground">
          Aquí podrás ver la lista de alumnos
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <Button>Agregar nuevo Alumno</Button>
      </div>
    </div>
  )
}