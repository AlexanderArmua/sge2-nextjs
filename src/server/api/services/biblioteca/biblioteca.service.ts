import { protectedProcedure } from "../../trpc";
import {
  getAllLibros,
  addLibro,
  editLibro,
  deleteLibro,
  getLibroPorId,
} from "../../repositories/biblioteca/biblioteca.repository";
import {
  inputAddBooks,
  inputEditBooks,
  inputEliminarLibro,
  inputGetBooks,
  inputGetLibro,
} from "@/shared/filters/biblioteca-filter.schema";
import { validarInput } from "../helper";

export const getTodosLosLibrosProcedure = protectedProcedure.input(inputGetBooks).query(async ({ ctx, input }) => {
  validarInput(inputGetBooks, input);

  const libros = await getAllLibros(ctx, input);

  return libros;
});

export const libroPorIdProcedure = protectedProcedure.input(inputGetLibro).query(async ({ ctx, input }) => {
  validarInput(inputGetLibro, input);

  const libro = await getLibroPorId(ctx, input);

  return libro;
});

export const nuevoLibroProcedure = protectedProcedure.input(inputAddBooks).mutation(async ({ ctx, input }) => {
  validarInput(inputAddBooks, input);

  const userId = ctx.session.user.id;

  const libro = await addLibro(ctx, input, userId);

  return libro;
});

export const editarLibroProcedure = protectedProcedure.input(inputEditBooks).mutation(async ({ ctx, input }) => {
  validarInput(inputEditBooks, input);

  const userId = ctx.session.user.id;

  const libro = await editLibro(ctx, input, userId);

  return libro;
});

export const eliminarLibroProcedure = protectedProcedure.input(inputEliminarLibro).mutation(async ({ ctx, input }) => {
  validarInput(inputEliminarLibro, input);

  const libro = await deleteLibro(ctx, input);

  return libro;
});
