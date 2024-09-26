import { z } from "zod";

const inputEquipoRequerido = z.object({ idTipo: z.string(), cantidad: z.number() });

export const inputReservaLaboratorioCerrado = z.object({
  cursoId: z.number().min(1, { message: "Requerido" }),
  fechaReserva: z.string().min(1, { message: "Requerido" }),
  requierePc: z.boolean().default(false),
  requiereProyector: z.boolean().default(false),
  requiereEquipo: z.boolean().default(false),
  equipoRequerido: z.array(inputEquipoRequerido).default([]),
  observaciones: z.string().max(250, { message: "Máximo 250 caracteres" }).default(""),
  aceptoTerminos: z.boolean().default(false),
});

export const inputReservaLaboratorioAbierto = z.object({
  tipo: z.string().min(1, { message: "Requerido" }),
  fechaReserva: z.string().min(1, { message: "Requerido" }),
  horaInicio: z.string().min(1, { message: "Requerido" }),
  horaFin: z.string().min(1, { message: "Requerido" }),
  concurrentes: z.number().min(1, { message: "Requerido" }),
  sedeId: z.number().min(1, { message: "Requerido" }),
  equipoRequerido: z.array(inputEquipoRequerido).default([]),
  observaciones: z.string().default(""),
  aceptoTerminos: z.boolean().default(false),
});
