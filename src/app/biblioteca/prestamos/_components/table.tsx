"use client";

import { Button, DataTable } from "@/components/ui";
import { type RouterOutputs } from "@/trpc/react";
import { type z } from "zod";

import { DataTablePaginationStandalone } from "@/components/ui/table/table-pagination-standalone";
import { type SortingState } from "@tanstack/react-table";
import { useBibliotecaPrestamosQueryParam } from "../../_hooks/use-biblioteca-prestamo-query-param";
import { type inputGetAllPrestamosLibros } from "@/shared/filters/reservas-filter.schema";
import { getColumnasPrestamo } from "../../(listado)/columns-prestamo";
import { PrinterIcon } from "lucide-react";
import { COMPROBANTE_ROUTE } from "@/shared/server-routes";
import Link from "next/link";

type LibroPrestamoData = RouterOutputs["reservas"]["reservaBiblioteca"]["getAll"];
type BibliotecaFilters = z.infer<typeof inputGetAllPrestamosLibros>;

type BibliotecaTableProps = {
  data: LibroPrestamoData;
  filters: BibliotecaFilters;
  filterByUser?: boolean;
};

export const BibliotecaPrestamosTable = ({ data, filters, filterByUser }: BibliotecaTableProps) => {
  const { pagination, sorting, onSortingChange, onPaginationChange } = useBibliotecaPrestamosQueryParam(filters);

  const columns = getColumnasPrestamo({ filterByUser });

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
          cell: (row) => {
            return (
              <>
                {!filterByUser && (
                  <Link href={`${COMPROBANTE_ROUTE.bibliotecaRuta.href}/${row.original.reserva.id}`} target="_blank">
                    <Button title="Imprimir" variant="icon" color="ghost" icon={PrinterIcon} />
                  </Link>
                )}
                {/* <VerLibroModal libroId={original.id} />
                <EditLibroModal libroId={original.id} /> */}
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
