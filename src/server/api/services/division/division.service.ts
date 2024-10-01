import { inputEliminarDivision } from "./../../../../shared/filters/divisiones-filter.schema";
import { getAllDivisiones, eliminarDivision } from "../../repositories/division/division.repository";
import { protectedProcedure } from "../../trpc";
import { validarInput } from "../helper";
export const getTodasLasDivisiones = protectedProcedure.query(async ({ ctx }) => {
  return await getAllDivisiones(ctx);
});

export const eliminarDivisionProcedure = protectedProcedure
  .input(inputEliminarDivision)
  .mutation(async ({ ctx, input }) => {
    validarInput(inputEliminarDivision, input);

    const division = await eliminarDivision(ctx, input);

    return division;
  });
