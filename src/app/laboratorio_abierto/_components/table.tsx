"use client";

import { Button, DataTable } from "@/components/ui";
import { type RouterOutputs } from "@/trpc/react";
import { type z } from "zod";

import { DataTablePaginationStandalone } from "@/components/ui/table/table-pagination-standalone";
import { type SortingState } from "@tanstack/react-table";
import { useBibliotecaPrestamosQueryParam } from "../_hooks/use-biblioteca-prestamo-query-param";
import { type inputGetAllSolicitudesReservaLaboratorioAbierto } from "@/shared/filters/reservas-filter.schema";
import { getColumnasReservasLaboratorioAbierto } from "../(listado)/columns-reserva";
import { PrinterIcon } from "lucide-react";

type LaboratorioAbiertoReservaData = RouterOutputs["reservas"]["reservaLaboratorioAbierto"]["getAll"];
type reservaFilters = z.infer<typeof inputGetAllSolicitudesReservaLaboratorioAbierto>;

type LaboratorioAbiertoTableProps = {
  data: LaboratorioAbiertoReservaData;
  filters: reservaFilters;
  filterByUser?: boolean;
};

export const LaboratorioAbiertoReservaTable = ({ data, filters, filterByUser }: LaboratorioAbiertoTableProps) => {
  const { pagination, sorting, onSortingChange, onPaginationChange } = useBibliotecaPrestamosQueryParam(filters);

  const columns = getColumnasReservasLaboratorioAbierto({ filterByUser });

  return (
    <>
      <DataTable
        data={data.reservas ?? []}
        columns={columns}
        manualSorting
        pageSize={pagination.pageSize}
        pageIndex={pagination.pageIndex}
        config={{
          sorting,
          onSortingChange: (updaterOrValue: SortingState | ((prevState: SortingState) => SortingState)) =>
            onSortingChange(typeof updaterOrValue === "function" ? updaterOrValue([]) : updaterOrValue),
        }}
        action={{
          header: "Acciones",
          cell() {
            return (
              <>
                {!filterByUser && (
                  <Button title="Ver" variant="icon" color="ghost" icon={PrinterIcon} onClick={() => window.print()} />
                )}
              </>
            );
          },
        }}
      />

      <DataTablePaginationStandalone
        pageIndex={pagination.pageIndex}
        pageSize={pagination.pageSize}
        rowCount={data.count}
        onChange={onPaginationChange}
      />
    </>
  );
};
