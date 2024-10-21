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

export const SelectModelosForm = <T extends FieldValues, TType extends string>({
  name,
  control,
  className,
  ...props
}: Omit<FormAutocompleteProps<T, TType>, "items"> & { realNameId?: Path<T> }): ReactElement => {
  const { data, isLoading, isError } = api.equipos.getAllModelos.useQuery();

  const [query, setQuery] = useState("");

  const [items, setItems] = useState<{ id: number; label: string }[]>([]);

  const modelos = useMemo(() => {
    if (!data) return [];

    return data
      .map((modelo) => {
        const { id, modelo: label } = modelo;

        return {
          label: label ?? "Sin informar",
          id,
        };
      })
      .filter((item) => !query || estaDentroDe(query, item.label));
  }, [data, query]);

  const onCreateModelo = () => {
    toast.success("Modelo agregada con éxito.");
    const ids = data?.map((d) => d.id);
    if (ids) {
      const maxId = Math.max(...ids);
      setItems([...items, { id: maxId + 1, label: query }]);
      if (modelos) modelos.push({ id: maxId + 1, label: query });
      if (data) data.push({ id: maxId + 1, modelo: query });
    }
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
            id="selectModelo"
            className="h-10 transition-colors focus:border-primary focus:ring-0 group-hover:border-input-hover"
          >
            <SelectValue placeholder="Error cargando modelos" />
          </SelectTrigger>
        </div>
      </Select>
    );
  }

  return (
    <FormAutocomplete
      async
      items={modelos}
      noOptionsComponent={
        <div className="flex flex-col items-center justify-center gap-2 px-4 py-6 text-sm">
          <span>No se encontró el modelo</span>
          <Link href={""} className="text-primary" onClick={onCreateModelo}>
            Crear nuevo modelo
          </Link>
        </div>
      }
      className={className}
      onQueryChange={setQuery}
      isLoading={isLoading}
      placeholder="Buscar por modelo de equipo"
      clearable
      debounceTime={0}
      control={control}
      name={name}
      {...props}
    />
  );
};
