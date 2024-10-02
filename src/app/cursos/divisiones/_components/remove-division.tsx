"use client"; // Asegúrate de que este componente sea un Client Component

import { useState } from "react";
import { TrashIcon } from "lucide-react";
import { Button } from "@/components/ui";
import { toast } from "@/components/ui";
import { api } from "@/trpc/react"; // Asegúrate de que esta ruta sea correcta
import ModalDrawer from "@/app/_components/modal/modal-drawer";

type RemoveDivisionModalProps = {
  divisionId: number; // ID de la división que se eliminará
  nombre?: string; // Nombre de la división (opcional)
  onSubmit: () => void; // Callback para ejecutar después de eliminar
};

export default function RemoveDivisionModal({ divisionId, nombre, onSubmit }: RemoveDivisionModalProps) {
  const eliminarDivision = api.division.eliminarDivision.useMutation({
    onSuccess: () => {
      toast.success(`La división ${nombre} se eliminó con éxito.`);
      onSubmit?.();
    },
    onError: (error) => {
      toast.error(error?.message ?? `Error eliminando la división ${nombre}`);
    },
  });

  const [open, setOpen] = useState(false); // Estado para manejar la apertura del modal

  const handleRemoveDivision = async (divisionId: number) => {
    eliminarDivision.mutate({ id: divisionId }); // Ejecuta la mutación para eliminar
    setOpen(false); // Cierra el modal después de eliminar
  };

  const handleCancel = () => setOpen(false); // Maneja la cancelación

  return (
    <ModalDrawer
      trigger={
        <Button
          title="Eliminar división"
          variant="icon"
          color="danger"
          className="h-8 w-8 px-2 py-2"
          icon={TrashIcon}
        />
      }
      titulo={`Eliminar división ${nombre ?? ""}`}
      cancelText="Cancelar"
      submitText="Sí, eliminar"
      open={open}
      onOpenChange={setOpen}
      onCancel={handleCancel}
      onSubmit={() => handleRemoveDivision(divisionId)} // Ejecuta la función para eliminar
      isAlertDialog
    >
      <div>
        Está seguro que desea eliminar <span className="font-bold">{nombre ?? "esta división"}</span>?
      </div>
    </ModalDrawer>
  );
}
