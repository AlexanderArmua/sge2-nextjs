"use client";

import { DataTable } from "@/components/ui";
import { type RouterOutputs } from "@/trpc/react";
import { ReservarLaboratorioCerradoModal } from "./reservar-laboratorio";
import { getColumns } from "./columns";
import { TienePermiso } from "@/app/_components/permisos/tienePermiso";
import { SgeNombre } from "@prisma/client";

type CursoData = RouterOutputs["cursos"]["getAll"];

type CursosTableProps = {
  data: CursoData;
};

export const CursosTable = ({ data }: CursosTableProps) => {
  const columns = getColumns();

  // TODO: Implement resizing
  return (
    <>
      <TienePermiso
        permisos={[SgeNombre.LAB_ABIERTO_RESERVAR]}
        fallback={<span className="text-red-500">NO TIENE LAB_ABIERTO_RESERVAR</span>}
      >
        <span className="text-green-500">TIENE LAB_ABIERTO_RESERVAR</span>
      </TienePermiso>
      <div></div>
      <TienePermiso
        permisos={[SgeNombre.ADMIN_ACCESO_SVN]}
        fallback={<span className="text-red-500">NO TIENE ADMIN_ACCESO_SVN</span>}
      >
        <span className="text-green-500">TIENE ADMIN_ACCESO_SVN</span>
      </TienePermiso>

      <DataTable
        data={data.cursos ?? []}
        columns={columns}
        action={{
          header: "Acciones",
          cell({ original }) {
            return (
              <>
                <ReservarLaboratorioCerradoModal cursoId={original.id} />
              </>
            );
          },
        }}
      />
    </>
  );
};
