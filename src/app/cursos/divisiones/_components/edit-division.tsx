"use client";

import { Button } from "@/components/ui/button";
import { EditIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import ModalDrawer from "@/app/_components/modal/modal-drawer";
import { DivisionForm } from "../[id]/division-form"; // Asegúrate de que la ruta sea la correcta
import { useState } from "react";

interface EditDivisionProps {
  divisionId: string; // El id de la división que vas a editar
}

export const EditDivisionModal = ({ divisionId }: EditDivisionProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // Función que se ejecuta al guardar los cambios de la división
  const handleSave = () => {
    router.refresh(); // Refresca la página para mostrar los cambios
    setOpen(false); // Cierra el modal
    // router.push("/divisiones"); // Si es necesario, redirigir a la lista de divisiones
  };

  // Función para cancelar el formulario
  const handleCancel = () => setOpen(false);

  return (
    <ModalDrawer
      titulo={"Editar División"}
      description={"Modifica los detalles de la división"}
      open={open}
      onOpenChange={setOpen}
      trigger={
        <Button color={"primary"} className="flex items-center gap-2">
          {/* Usa solo el ícono de editar aquí */}
          <EditIcon size={16} />
        </Button>
      }
      className={"max-h-[calc(100vh_-_10%)]"}
    >
      <div className="flex max-h-max w-full flex-col gap-4">
        {/* Pasas el id de la división al formulario para que cargue los datos de esa división */}
        <DivisionForm id={divisionId} onCancel={handleCancel} onSubmit={handleSave} />
      </div>
    </ModalDrawer>
  );
};
export default EditDivisionModal;
