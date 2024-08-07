import { type ReadonlyURLSearchParams } from "next/navigation";
import { ActionButtons } from "./(listado)/action-buttons";
import BibliotecaTableContainer from "./(listado)/biblioteca-table-container";
import { inputGetBooks } from "@/shared/filters/biblioteca-filter.schema";
import { Suspense, useMemo } from "react";
import LoadingBibliotecaTable from "./(listado)/loading-biblioteca-table";

type PageProps = {
  searchParams: ReadonlyURLSearchParams;
};

export default async function Page({ searchParams }: PageProps) {
  const filters = inputGetBooks.parse(searchParams);

  const filter_as_key = useMemo(() => JSON.stringify(filters), [filters]);

  return (
    <>
      <h3 className="text-5xl font-extrabold tracking-tight sm:text-[3rem]">Listado de libros</h3>
      <ActionButtons filters={filters} />
      <Suspense key={filter_as_key} fallback={<LoadingBibliotecaTable />}>
        <BibliotecaTableContainer filters={filters} />
      </Suspense>
    </>
  );
}
