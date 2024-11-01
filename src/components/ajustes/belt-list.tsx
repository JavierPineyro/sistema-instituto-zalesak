import UpdateBeltModal from "./modals/update-belt";

type Props = {
  belts: {
    id: number;
    name: string;
    description: string | null;
  }[];
};
export default function BeltList({ belts }: Props) {
  return (
    <>
      <div className="flex flex-wrap gap-2">
        {belts.map((belt) => (
          <div
            key={belt.id}
            className="flex w-[280px] flex-col items-center justify-between gap-3 rounded-md bg-gray-200 p-4 shadow-md"
          >
            <p className="text-balance text-lg font-bold leading-3">
              {belt.name}
            </p>
            <p className="text-sm text-black/80">
              {belt?.description ?? "Sin descripción"}
            </p>
            <UpdateBeltModal belt={belt} />
          </div>
        ))}
      </div>
    </>
  );
}
