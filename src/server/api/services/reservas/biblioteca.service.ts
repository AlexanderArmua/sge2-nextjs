import { protectedProcedure } from "../../trpc";
import {getReservaPorUsuarioId} from "@/server/api/repositories/reservas/biblioteca.repository";
import {validarInput} from "@/server/api/services/helper";
import {inputGetReservaLibroPorUsuarioId} from "@/shared/filters/reservas-filter.schema";



export const getReservaLibroPorUserProcedure = protectedProcedure.input(inputGetReservaLibroPorUsuarioId).query(async ({ ctx, input }) => {
  validarInput(inputGetReservaLibroPorUsuarioId, input);

  const reserva = await getReservaPorUsuarioId(ctx, input);

  return reserva;
});