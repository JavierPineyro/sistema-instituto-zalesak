import BeltList from "~/components/ajustes/belt-list";
import CreateBeltModal from "~/components/ajustes/modals/create-belt";
import CreateCuotaModal from "~/components/ajustes/modals/create-cuota";
import UpdateCuotaModal from "~/components/ajustes/modals/update-cuota";
import { parseTotalToLocale } from "~/lib/utils";
import { service } from "~/server/services";

export default async function AjustesPage() {
  const beltsPromise = service.cinturones.list();
  const cuotaPromise = service.precioServicio.getCuotaService();
  const [belts, cuota] = await Promise.all([beltsPromise, cuotaPromise]);

  if (!belts)
    return (
      <div>
        No hay cinturones, intenta agregar algunos. Si ya creaste cinturones
        intenta volver más tarde.
        <CreateBeltModal />
      </div>
    );
  if (!cuota)
    return (
      <div>
        No hay precio de la cuota, intenta agregarlo. Si ya agregaste el precio
        de la cuota intenta volver más tarde.
        <CreateCuotaModal />
      </div>
    );

  return (
    <section className="flex flex-col gap-2 px-5 py-3">
      <h1 className="text-2xl font-bold">Ajustes</h1>
      <div className="flex justify-evenly gap-2">
        <article className="flex w-[300px] flex-col items-center justify-center gap-2 rounded-md bg-gray-200 p-5">
          <h2 className="text-lg font-bold leading-3">Precio de la cuota</h2>
          <p className="text-2xl font-extrabold text-green-800">
            {parseTotalToLocale(cuota.price)}
          </p>
          <UpdateCuotaModal cuota={cuota} />
        </article>
        <article className="flex w-[300px] flex-col items-center justify-center gap-2 rounded-md bg-gray-200 p-5">
          <h2 className="text-lg font-bold leading-3">Crear nuevo cinturón</h2>
          <p className="text-sm text-black/80">
            Actualmente hay {belts.length} cinturones, ten en cuenta que todos
            los cinturones ya existen.
          </p>
          <CreateBeltModal />
        </article>
      </div>
      <div className="mt-4">
        <h2 className="mb-1 text-xl font-bold">Lista de cinturones</h2>
        <BeltList belts={belts} />
      </div>
    </section>
  );
}
