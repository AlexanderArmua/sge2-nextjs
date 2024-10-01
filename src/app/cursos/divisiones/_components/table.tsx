"use client";

import { DataTable } from "@/components/ui"; // Asegúrate de que esto sea correcto
import { type RouterOutputs } from "@/trpc/react"; // Asegúrate de que esto sea correcto
import { type z } from "zod";
import { DataTablePaginationStandalone } from "@/components/ui/table/table-pagination-standalone";
//import { useDivisionesQueryParam } from "../_hooks/use-divisiones-query-param"; // Crea este hook si lo necesitas
import { getColumns } from "./columns"; // Crea columnas si es necesario
import { type SortingState } from "@tanstack/react-table";
type DivisionData = RouterOutputs["division"]["getAll"]; // Cambia esto según tu API

type DivisionesTableProps = {
  data: DivisionData;
};

export const DivisionesTable = ({ data }: DivisionesTableProps) => {
  // Comentado ya que no lo estás utilizando actualmente
  // const { refresh, pagination, sorting, onSortingChange, onPaginationChange } = useDivisionesQueryParam();

  const columns = getColumns(); // Asegúrate de definir las columnas para divisiones

  return (
    <>
      <DataTable
        data={data ?? []} // Asegúrate de que data sea la lista de divisiones
        columns={columns}
        manualSorting // Mantén esto si necesitas ordenamiento manual
        // Configuración de paginación y ordenamiento (ajusta según tus necesidades)
        pageSize={10} // Cambia esto a pagination.pageSize si usas paginación
        pageIndex={0} // Cambia esto a pagination.pageIndex si usas paginación
        config={{
          // Cambia esto si no estás usando un estado de ordenamiento
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
                <button className="text-blue-500 hover:underline">Editar</button>
                <button className="text-red-500 hover:underline">Eliminar</button>
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
