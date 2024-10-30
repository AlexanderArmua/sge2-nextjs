"use client";

import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import ModalDrawer from "@/app/_components/modal/modal-drawer";
import { useState } from "react";
import FileUpload from "../curso/[id]/bulk-insert-form";

export const CargarCursos = () => {
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const handleSave = () => {
    router.refresh();
    setOpen(false);
  };

  const handleCancel = () => setOpen(false);

  return (
    <ModalDrawer
      titulo={"Cargar cursos"}
      description={"Subí un archivo CSV para cargar cursos"}
      open={open}
      onOpenChange={setOpen}
      trigger={
        <Button color={"primary"} className="w-10 p-0">
          <Upload size={16} />
        </Button>
      }
      className={"max-h-[calc(100vh_-_10%)]"}
    >
      <FileUpload onSubmit={handleSave} onCancel={handleCancel} />
    </ModalDrawer>
  );
};