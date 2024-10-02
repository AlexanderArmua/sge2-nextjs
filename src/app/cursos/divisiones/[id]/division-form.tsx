import { FormProvider, useForm } from "react-hook-form";
import { api } from "@/trpc/react";
import { Button, FormInput, ScrollArea, toast } from "@/components/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { inputEditarDivision } from "@/shared/filters/divisiones-filter.schema"; // Reemplazar con el schema adecuado
import { type z } from "zod";
import { useEffect, useMemo } from "react";

type Props = {
  id?: string;
  onSubmit: () => void;
  onCancel: () => void;
};

type FormEditarDivisionType = z.infer<typeof inputEditarDivision>;

export const DivisionForm = ({ id, onSubmit, onCancel }: Props) => {
  const esNuevo = id === undefined;
  const divisionId = parseInt(id ?? "");

  const {
    data: division,
    isLoading,
    isError,
  } = api.division.getDivisionById.useQuery({ id: divisionId }, { enabled: !!id });

  const editarDivision = api.division.editarDivision.useMutation(); // Para editar si existe divisionId
  const agregarDivision = api.division.nuevaDivision.useMutation(); // Para agregar nueva división si no existe divisionId

  const divisionBase: FormEditarDivisionType = useMemo(() => {
    if (!division) return {} as FormEditarDivisionType;
    return {
      id: division.id,
      nombre: division.nombre,
      anio: division.anio ?? 0, // Asegúrate de que anio tenga un valor predeterminado
    };
  }, [division]);

  const formHook = useForm<FormEditarDivisionType>({
    mode: "onChange",
    defaultValues: divisionBase,
    resolver: zodResolver(inputEditarDivision),
  });

  const { handleSubmit, control, watch } = formHook;

  useEffect(() => formHook.reset(divisionBase), [formHook, divisionBase]);

  const onFormSubmit = (formData: FormEditarDivisionType) => {
    if (esNuevo) {
      agregarDivision.mutate(formData, {
        onSuccess: () => {
          toast.success("División agregada con éxito.");
          onSubmit();
        },
        onError: (error) => {
          toast.error(error?.message ?? "Error al agregar la división");
        },
      });
      return;
    }

    editarDivision.mutate(formData, {
      onSuccess: () => {
        toast.success("División actualizada con éxito.");
        onSubmit();
      },
      onError: (error) => {
        toast.error(error?.message ?? "Error al actualizar la división");
      },
    });
  };

  const handleCancel = () => {
    formHook.reset();
    onCancel();
  };

  if (!esNuevo && isNaN(divisionId)) {
    return <div>Error al cargar...</div>;
  }

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (isError) {
    return <div>Error al cargar...</div>;
  }

  return (
    <FormProvider {...formHook}>
      <form onSubmit={handleSubmit(onFormSubmit)} className="relative flex w-full flex-col gap-4">
        <ScrollArea className="max-h-[calc(100vh_-_20%)] w-full pr-4 md:max-h-[calc(100vh_-_30%)] lg:max-h-[calc(100vh_-_30%)]">
          <div className="flex w-full flex-col items-center justify-center">
            <div className="flex flex-col space-y-4 px-0 md:px-6">
              <div className="flex w-full flex-row lg:flex-row lg:justify-between lg:gap-x-4">
                {/* Campo para el nombre de la división */}
                <div className="mt-4 w-full">
                  <FormInput label={"Nombre"} control={control} name="nombre" type={"text"} className="mt-2" />
                </div>
                {/* Campo para el año de la división */}
                <div className="mt-4 w-full">
                  <FormInput label={"Año"} control={control} name="anio" type={"number"} className="mt-2" />
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
        <div className="mb-3 flex w-full flex-row items-end justify-center space-x-4 md:justify-end lg:justify-end">
          <Button title="Cancelar" type="button" variant="default" color="secondary" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button title="Guardar" type="submit" variant="default" color="primary">
            Guardar
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
