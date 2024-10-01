import { z } from "zod";

// Esquema para agregar una división
export const inputAgregarDivision = z.object({
  nombre: z.string().min(1, { message: "El nombre es requerido" }),
});

// Esquema para obtener todas las divisiones con paginación y filtros
export const inputGetDivisiones = z.object({
  pageSize: z.enum(["10", "20", "30", "40", "50"]).default("10").catch("10"),
  pageIndex: z
    .string()
    .default("0")
    .refine((value) => parseInt(value) >= 0, { message: "Debe ser mayor o igual a 0" })
    .catch("0"),
  orderBy: z.enum(["nombre"]).default("nombre").catch("nombre"), // Solo hay un campo: nombre
  orderDirection: z.enum(["asc", "desc"]).default("asc").catch("asc"),
  searchText: z.string().default(""),
});

// Esquema para obtener una división específica por su ID
export const inputGetDivision = z.object({
  id: z.number(),
});

// Esquema para eliminar una división
export const inputEliminarDivision = inputGetDivision;

// Esquema para editar una división (combina el agregar con un id opcional)
export const inputEditarDivision = z
  .object({
    id: z.number().optional(), // Si viene significa que se va a usar para editar, si no significa que se va a usar para crear
  })
  .merge(inputAgregarDivision);
