import LoadingTable from "@/components/ui/table/loading-table";
import LoadingPagination from "@/components/ui/table/loading-pagination";

export default function LoadingAdminUsuariosTable({ columns }: { columns: string[] }) {
  return (
    <>
      <LoadingTable columns={columns} rowsLength={10} />

      <LoadingPagination />
    </>
  );
}
