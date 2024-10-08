import { Button } from "@/components/ui";
import { Skeleton } from "@/components/ui/skeleton";
import LoadingBibliotecaTable from "./(listado)/loading-biblioteca-table";

export default function BibliotecaLoading() {
  return (
    <>
      <div className="relative flex w-full flex-col items-center justify-between space-y-2 md:flex-row-reverse  md:space-x-1.5 md:space-y-0">
        <div className="relative flex w-full flex-row justify-end md:w-auto md:basis-1/3">
          <Button color={"primary"} isLoading>
            Nuevo libro
          </Button>
        </div>

        <div className="w-full md:basis-1/3">
          <Skeleton className="h-10 w-full" />
        </div>
      </div>

      <LoadingBibliotecaTable />
    </>
  );
}
