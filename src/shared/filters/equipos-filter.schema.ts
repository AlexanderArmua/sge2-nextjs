import { z } from "zod";

export const inputAgregarEquipo = z.object({
  modelo: z.string().min(1, { message: "Requerido" }), //TODO: eliminar al normalizar
  numeroSerie: z.string().min(1, { message: "Requerido" }),
  observaciones: z.string().min(1, { message: "Requerido" }),
  palabrasClave: z.string().min(1, { message: "Requerido" }),
  imagen: z.string().min(1, { message: "Requerido" }),

  modeloId: z.number().min(1, { message: "Requerido" }),
  tipoId: z.number().min(1, { message: "Requerido" }),
  marcaId: z.number().min(1, { message: "Requerido" }),
  sedeId: z.number().min(1, { message: "Requerido" }),
  laboratorioId: z.number().min(1, { message: "Requerido" }),
  armarioId: z.number().positive().nullish(),
  estanteId: z.number().positive().nullish(),
  estadoId: z.number().min(1, { message: "Requerido" }),
  inventarioId: z.string().min(1, { message: "Requerido" }),
});

export const inputGetEquipos = z.object({
  pageSize: z.enum(["10", "20", "30", "40", "50"]).default("10").catch("10"),
  pageIndex: z
    .string()
    .default("0")
    .refine((value) => parseInt(value) >= 0, { message: "Debe ser mayor o igual a 0" })
    .catch("0"),
  orderBy: z
    .enum(["inventarioId", "tipo_nombre", "marca_nombre", "modelo", "numeroSerie", "estado_nombre", "disponible"])
    .default("inventarioId")
    .catch("inventarioId"),
  orderDirection: z.enum(["asc", "desc"]).default("asc").catch("asc"),
  searchText: z.string().default(""),
  armario: z.string().default(""),
  tipo: z.string().default(""),
  laboratorio: z
    .string()
    .optional()
    .refine((value) => value && parseInt(value) >= 0, { message: "Debe ser mayor o igual a 0" })
    .catch(""),
});

export const inputGetEquipo = z.object({ id: z.number() });

export const inputEliminarEquipo = inputGetEquipo;

export const inputEditarEquipos = z
  .object({
    id: z.number().optional(), // Si viene significa que se va a usar para editar, si no significa que se va a usar para crear
  })
  .merge(inputAgregarEquipo);
