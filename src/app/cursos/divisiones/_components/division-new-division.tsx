"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import ModalDrawer from "@/app/_components/modal/modal-drawer";
import { DivisionForm } from "../[id]/division-form"; // Asegúrate de que la ruta sea la correcta
import { useState } from "react";

export const NuevaDivision = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // Función que se ejecuta al guardar la nueva división
  const handleSave = () => {
    router.refresh(); // Refresca la página para mostrar la nueva división
    setOpen(false); // Cierra el modal
    // router.push("/divisiones"); // Redirige a la página de detalles de la división si fuera necesario
  };

  // Función para cancelar el formulario
  const handleCancel = () => setOpen(false);

  return (
    <ModalDrawer
      titulo={"Nueva División"}
      description={"Crea una nueva división"}
      open={open}
      onOpenChange={setOpen}
      trigger={
        <Button color={"primary"}>
          Nueva División
          <Plus size={16} className="ml-2" />
        </Button>
      }
      className={"max-h-[calc(100vh_-_10%)]"}
    >
      <div className="flex max-h-max w-full flex-col gap-4">
        <DivisionForm onCancel={handleCancel} onSubmit={handleSave} />
      </div>
    </ModalDrawer>
  );
};
