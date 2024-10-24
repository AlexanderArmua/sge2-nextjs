import {
  inputEliminarDivision,
  inputEditarDivision,
  inputAgregarDivision,
  inputGetDivision,
  inputGetDivisiones,
} from "./../../../../shared/filters/divisiones-filter.schema";
import {
  getAllDivisiones,
  eliminarDivision,
  editarDivision,
  agregarDivision,
  getDivisionById,
} from "../../repositories/division/division.repository";
import { protectedProcedure } from "../../trpc";
import { validarInput } from "../helper";
import { Prisma } from "@prisma/client";

export const getTodasLasDivisiones = protectedProcedure.query(async ({ ctx }) => {
  return await getAllDivisiones(ctx);
});

export const getDivisionesFiltradas = protectedProcedure.input(inputGetDivisiones).query(async ({ ctx, input }) => {
  const divisiones = await getAllDivisiones(ctx, input);
  return divisiones;
});

export const eliminarDivisionProcedure = protectedProcedure
  .input(inputEliminarDivision)
  .mutation(async ({ ctx, input }) => {
    validarInput(inputEliminarDivision, input);
    return await eliminarDivision(ctx, input);
  });

// Obtener una división por ID
export const getDivisionByIdProcedure = protectedProcedure.input(inputGetDivision).query(async ({ ctx, input }) => {
  validarInput(inputGetDivision, input);
  return await getDivisionById(ctx, input);
});

// Editar una división
export const editarDivisionProcedure = protectedProcedure
  .input(inputEditarDivision)
  .mutation(async ({ ctx, input }) => {
    validarInput(inputEditarDivision, input);
    const userId = ctx.session.user.id;
    try {
      return await editarDivision(ctx, input, userId);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          console.log(error);
          throw new Error("Ocurrió un error al editar la división");
        }
      }

      if (error instanceof Error) {
        throw new Error(error.message);
      }

      throw new Error("Error editando división");
    }
  });

// Agregar nueva división
export const nuevaDivisionProcedure = protectedProcedure
  .input(inputAgregarDivision)
  .mutation(async ({ ctx, input }) => {
    validarInput(inputAgregarDivision, input);

    const userId = ctx.session.user.id;

    try {
      return await agregarDivision(ctx, input, userId);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          console.log(error);
          throw new Error("Ocurrió un error al agregar la división");
        }
      }

      if (error instanceof Error) {
        throw new Error(error.message);
      }

      throw new Error("Error agregando división");
    }
  });
