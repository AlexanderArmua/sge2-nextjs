import { inputGetRoles } from "@/shared/filters/admin-roles-filter.schema";
import { type ReadonlyURLSearchParams } from "next/navigation";
import { Suspense } from "react";
import LoadingAdminTable from "./_components/table/loading-admin-table";
import { AdminActionButtons } from "./_components/action-button/action-buttons";
import RolesTableContainer from "./_components/table/roles-table-container";
import { adminRolesColumnas } from "./_components/table/columns";

type PageProps = {
  searchParams: ReadonlyURLSearchParams;
};

export default async function Page({ searchParams }: PageProps) {
  const filters = inputGetRoles.parse(searchParams);

  const filter_as_key = JSON.stringify(filters);

  return (
    <>
      <AdminActionButtons filters={filters} />

      <Suspense key={filter_as_key} fallback={<LoadingAdminTable columns={adminRolesColumnas} />}>
        <RolesTableContainer filters={filters} />
      </Suspense>
    </>
  );
}
