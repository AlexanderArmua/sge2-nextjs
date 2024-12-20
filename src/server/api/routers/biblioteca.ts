import { createTRPCRouter } from "@/server/api/trpc";
import {
  getTodosLosLibrosProcedure,
  nuevoLibroProcedure,
  eliminarLibroProcedure,
  libroPorIdProcedure,
  editarLibroProcedure,
  getTodosLosEditorialProcedure,
  getTodosLosIdiomasProcedure,
  getTodosLosAutoresProcedure,
  crearAutorProcedure,
  crearEditorialProcedure,
} from "../services/biblioteca/biblioteca.service";

export const bibliotecaRouter = createTRPCRouter({
  getAll: getTodosLosLibrosProcedure,
  getAllEditorial: getTodosLosEditorialProcedure,
  getAllIdiomas: getTodosLosIdiomasProcedure,
  getAllAutores: getTodosLosAutoresProcedure,
  libroPorId: libroPorIdProcedure,
  nuevoLibro: nuevoLibroProcedure,
  editarLibro: editarLibroProcedure,
  eliminarLibro: eliminarLibroProcedure,
  crearAutor: crearAutorProcedure,
  crearEditorial: crearEditorialProcedure,
});
