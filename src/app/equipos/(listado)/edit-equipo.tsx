import { Button } from "@/components/ui/button";
import { EditIcon } from "lucide-react";
import Link from "next/link";

type EditEquipoModalProps = {
  equipoId: number;
};

export const EditarEquipoModal = (props: EditEquipoModalProps) => {
  return (
    <Link
      key={props.equipoId}
      href={`/equipos/equipo/${props.equipoId}`}
      passHref
      prefetch={false}
      title="Editar equipo"
    >
      <Button color={"outline"} className="h-8 w-8 px-1 py-1">
        <EditIcon size={16} />
      </Button>
    </Link>
  );
};
