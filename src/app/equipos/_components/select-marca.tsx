import { useMemo, useState, type ReactElement } from "react";
import { type Path, type FieldValues } from "react-hook-form";
import { api } from "@/trpc/react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  FormAutocomplete,
  type FormAutocompleteProps,
  Select,
  SelectTrigger,
  SelectValue,
  toast,
} from "@/components/ui";
import { estaDentroDe } from "@/shared/string-compare";
import Link from "next/link";

export const SelectMarcasForm = <T extends FieldValues, TType extends string>({
  name,
  control,
  className,
  ...props
}: Omit<FormAutocompleteProps<T, TType>, "items"> & { realNameId?: Path<T> }): ReactElement => {
  const { data, isLoading, isError } = api.equipos.getAllMarcas.useQuery();

  const agregarMarca = api.equipos.nuevaMarca.useMutation();

  const [query, setQuery] = useState("");

  const marcas = useMemo(() => {
    if (!data) return [];

    return data
      .map((marca) => {
        const { id, nombre: label } = marca;

        return {
          label,
          id,
        };
      })
      .filter((item) => !query || estaDentroDe(query, item.label));
  }, [data, query]);

  const [item, setItem] = useState<{ id: number; label: string }>();

  const onCreateMarca = () => {
    agregarMarca.mutate(
      { nombre: query },
      {
        onSuccess: (item) => {
          toast.success("Marca agregada con éxito.");
          setItem({ id: item.id, label: item.nombre });
        },
        onError: (error) => {
          toast.error(error?.message ?? "Error al agregar la marca");
        },
      },
    );
  };

  if (isLoading) {
    return (
      <div className="flex flex-row items-center space-x-2">
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  if (isError) {
    return (
      <Select>
        <div className="flex flex-row items-center space-x-2">
          <SelectTrigger
            disabled
            id="selectMarca"
            className="h-10 transition-colors focus:border-primary focus:ring-0 group-hover:border-input-hover"
          >
            <SelectValue placeholder="Error cargando marcas" />
          </SelectTrigger>
        </div>
      </Select>
    );
  }

  return (
    <FormAutocomplete
      async
      items={item ? [...marcas, item] : marcas}
      noOptionsComponent={
        <div className="flex flex-col items-center justify-center gap-2 px-4 py-6 text-sm text-white">
          <span>No se encontró la marca</span>
          <Link href={""} className="text-primary" onClick={onCreateMarca}>
            Crear nueva marca
          </Link>
        </div>
      }
      className={className}
      onQueryChange={setQuery}
      isLoading={isLoading}
      placeholder="Buscar por marca de equipo"
      clearable
      debounceTime={0}
      control={control}
      name={name}
      {...props}
    />
  );
};
