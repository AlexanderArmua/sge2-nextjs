"use client";

import { DataTable } from "@/components/ui"; // Asegúrate de que esto sea correcto
import { type RouterOutputs } from "@/trpc/react"; // Asegúrate de que esto sea correcto
import { type z } from "zod";
import { DataTablePaginationStandalone } from "@/components/ui/table/table-pagination-standalone";
import { getColumns } from "./columns"; // Asegúrate de definir las columnas para divisiones
import { type SortingState } from "@tanstack/react-table";
import RemoveDivisionModal from "./remove-division";
import EditDivisionModal from "./edit-division";

type DivisionData = RouterOutputs["division"]["getAll"]; // Cambia esto según tu API

type DivisionesTableProps = {
  data: DivisionData;
  refresh: () => void; // Asegúrate de recibir la función refresh como prop
};

export const DivisionesTable = ({ data, refresh }: DivisionesTableProps) => {
  const columns = getColumns(); // Asegúrate de definir las columnas para divisiones

  return (
    <>
      <DataTable
        data={data ?? []} // Asegúrate de que data sea la lista de divisiones
        columns={columns}
        manualSorting // Mantén esto si necesitas ordenamiento manual
        pageSize={10} // Cambia esto a pagination.pageSize si usas paginación
        pageIndex={0} // Cambia esto a pagination.pageIndex si usas paginación
        config={{
          sorting: [], // Reemplaza con el estado de ordenamiento si lo utilizas
          onSortingChange: (updaterOrValue: SortingState | ((prevState: SortingState) => SortingState)) =>
            typeof updaterOrValue === "function" ? updaterOrValue([]) : updaterOrValue,
        }}
        action={{
          header: "Acciones",
          cell({ original }) {
            return (
              <>
                {/* Aquí puedes agregar botones o acciones relacionadas con la división */}
                <EditDivisionModal divisionId={original.id} />
                <RemoveDivisionModal divisionId={original.id} nombre={original.nombre} onSubmit={refresh} />
              </>
            );
          },
        }}
      />

      <DataTablePaginationStandalone
        pageIndex={0} // Cambia esto a pagination.pageIndex si usas paginación
        pageSize={10} // Cambia esto a pagination.pageSize si usas paginación
        rowCount={data.length} // Cambia esto si tienes una propiedad count en tus datos
        onChange={({ pageIndex, pageSize }) => {
          // Aquí maneja la lógica de paginación
          console.log("Página:", pageIndex, "Tamaño de página:", pageSize);
          // Puedes actualizar el estado de paginación aquí
        }}
      />
    </>
  );
};

export default DivisionesTable; // Exporta el componente
