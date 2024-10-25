import Link from "next/link";
import EnableOrDisable from "~/components/alumnos/modals/enable-or-disable";
import Cuotas from "~/components/cuotas";
import GoBack from "~/components/go-back";
import { Button } from "~/components/ui/button";
import { calculateAge, cn, parseToLocalDate } from "~/lib/utils";
import { service } from "~/server/services";

type Props = {
  params: {
    id: string;
  };
};

export default async function AlumnInfoPage({ params }: Props) {
  const curretYear = new Date().getFullYear();
  const alumn = await service.alumnos.getAlumnWithBeltAndPayments(
    Number(params.id),
    curretYear,
  );

  if (!alumn) {
    return (
      <div className="flex flex-col items-center justify-center gap-1">
        Alumno no encontrado
        <GoBack path="/alumnos" />
      </div>
    );
  }
  const cuotas = alumn.pagos;
  return (
    <section className="px-5">
      <header className="mb-5 flex flex-col justify-center gap-1">
        <GoBack path="/admin/alumnos" />
        <h2 className="text-center text-3xl font-bold">{alumn.fullname}</h2>
      </header>
      <div className="flex justify-start gap-20 text-xl">
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

      <div className="flex justify-start gap-20 text-xl">
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
      <div className="flex justify-start gap-20 text-xl">
        <div>
          <span className="font-semibold">Cinturón</span>:
          <span className="ml-1">{alumn.cinturon.description}</span>
        </div>
      </div>

      <div className="my-5 grid gap-2">
        <h3 className="text-xl font-semibold">
          Cuotas ({new Date().getFullYear()})
        </h3>
        <div>
          <Cuotas cuotas={cuotas} admissionDate={alumn.dateAdmission} />
        </div>
      </div>

      <footer className="mt-10 flex w-full justify-evenly gap-1">
        <Button asChild variant="default" className={cn("w-32")}>
          <Link href={`/admin/alumnos/${alumn.id}/editar`}>Editar</Link>
        </Button>
        <EnableOrDisable id={alumn.id} active={alumn.active} />
        <Button variant="default" asChild className={cn("w-32")}>
          <Link href={`/admin/alumnos/${alumn.id}/pagar`}>Pagar Cuota</Link>
        </Button>
        <Button variant="default" asChild className={cn("w-32")}>
          <Link href={`/admin/alumnos/${alumn.id}/hacer-pedido`}>
            Hacer Pedido
          </Link>
        </Button>
      </footer>
    </section>
  );
}
