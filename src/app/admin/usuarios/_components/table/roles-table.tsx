"use client";

import { DataTable } from "@/components/ui";
import RemoverRolModal from "./remove-libro";
import { type RouterOutputs } from "@/trpc/react";
import { type z } from "zod";
import { EditarUsuarioModal } from "./edit-libro";
import { type SortingState } from "@tanstack/react-table";
import { getColumns } from "./columns";
import { useAdminUsuariosQueryParam } from "../../_hooks/use-admin-usuarios-query-param";
import { type inputGetUsuarios } from "@/shared/filters/admin-usuarios-filter.schema";
import { DataTablePaginationStandalone } from "@/components/ui/table/table-pagination-standalone";

type UsuariosData = RouterOutputs["admin"]["usuarios"]["getAll"];
type AdminUsuariosFilters = z.infer<typeof inputGetUsuarios>;

type Props = {
  data: UsuariosData;
  filters: AdminUsuariosFilters;
};

export const AdminUsuariosTable = ({ data, filters }: Props) => {
  const { refresh, sorting, pagination, onSortingChange, onPaginationChange } = useAdminUsuariosQueryParam(filters);

  const columns = getColumns();

  // TODO: Implement resizing
  return (
    <>
      <DataTable
        data={data.usuarios ?? []}
        columns={columns}
        pageSize={pagination.pageSize}
        pageIndex={pagination.pageIndex}
        manualSorting
        config={{
          sorting,
          onSortingChange: (updaterOrValue: SortingState | ((prevState: SortingState) => SortingState)) =>
            onSortingChange(typeof updaterOrValue === "function" ? updaterOrValue([]) : updaterOrValue),
        }}
        action={{
          header: "Acciones",
          cell({ original }) {
            return (
              <>
                <EditarUsuarioModal usuarioId={original.id} />
                <RemoverRolModal usuarioId={original.id} email={original.email ?? ""} onSubmit={refresh} />
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
