import CreateEquipmentModal from "./modals/create-modal";
import { Package } from "lucide-react";
export default function HeaderEquipamiento() {
  return (
    <div className="flex items-center justify-between space-y-2">
      <div>
        <h2 className="flex items-center text-2xl font-bold tracking-tight">
          Equipamiento
          <Package className="ml-2 inline-block size-5" />
        </h2>
        <p className="text-muted-foreground">
          Aquí podrás ver y controlar el inventario
        </p>
      </div>
      <div className="flex items-center">
        <CreateEquipmentModal />
      </div>
    </div>
  );
}
