"use client";

// import { Button } from "@/components/ui/button";
// import { EditIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import ModalDrawer from "@/app/_components/modal/modal-drawer";
import { DivisionForm } from "../[id]/division-form";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { TienePermiso } from "@/app/_components/permisos/tienePermiso";
import { SgeNombre } from "@prisma/client";

interface EditDivisionProps {
  divisionId: string;
  divisionName: string;
}

export const EditDivisionModal = ({ divisionId, divisionName }: EditDivisionProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleSave = () => {
    router.refresh();
    setOpen(false);
  };

  const handleCancel = () => setOpen(false);

  return (
    <TienePermiso permisos={[SgeNombre.DIVISIONES_ABM]} fallback={<Badge key={divisionId} />}>
      <ModalDrawer
        titulo={"Editar División"}
        description={"Modifica los detalles de la división"}
        open={open}
        onOpenChange={setOpen}
        trigger={
          <Badge key={divisionId} className="hover:bg-blue-800/20">
            <button>{divisionName}</button>
          </Badge>
        }
        className={"max-h-[calc(100vh_-_300px)]"}
      >
        <div className="flex max-h-max w-full flex-col gap-4">
          <DivisionForm id={divisionId} name={divisionName} onCancel={handleCancel} onSubmit={handleSave} />
        </div>
      </ModalDrawer>
    </TienePermiso>
  );
};
export default EditDivisionModal;
