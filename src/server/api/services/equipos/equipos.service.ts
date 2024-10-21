import {
  inputAgregarTipo,
  inputEditarTipo,
  inputEliminarTipo,
  inputGetTipo,
  inputGetTipos,
} from "@/shared/filters/equipos-tipos-filter.schema";
import {
  agregarEquipo,
  agregarMarca,
  editarEquipo,
  eliminarEquipo,
  getAllArmarios,
  getAllEquipos,
  getAllEstados,
  getAllMarcas,
  getAllModelos,
  getEquipoPorId,
} from "../../repositories/equipos/equipos.repository";
import { protectedProcedure } from "../../trpc";
import { validarInput } from "../helper";
import {
  inputAgregarEquipo,
  inputAgregarMarca,
  inputEditarEquipos,
  inputEliminarEquipo,
  inputGetArmarios,
  inputGetEquipo,
  inputGetEquipos,
} from "@/shared/filters/equipos-filter.schema";
import {
  agregarTipo,
  editarTipo,
  eliminarTipo,
  getAllTipos,
  getTipoPorId,
} from "../../repositories/equipos/equipos-tipos.repository";

export const getTodosLosEquiposProcedure = protectedProcedure.input(inputGetEquipos).query(async ({ ctx, input }) => {
  validarInput(inputGetEquipos, input);

  const equipos = await getAllEquipos(ctx, input);

  return equipos;
});

export const equipoPorIdProcedure = protectedProcedure.input(inputGetEquipo).query(async ({ ctx, input }) => {
  validarInput(inputGetEquipo, input);

  const equipos = await getEquipoPorId(ctx, input);

  return equipos;
});

export const nuevoEquipoProcedure = protectedProcedure.input(inputAgregarEquipo).mutation(async ({ ctx, input }) => {
  validarInput(inputAgregarEquipo, input);

  const userId = ctx.session.user.id;

  const equipo = await agregarEquipo(ctx, input, userId);

  return equipo;
});

export const editarEquipoProcedure = protectedProcedure.input(inputEditarEquipos).mutation(async ({ ctx, input }) => {
  validarInput(inputEditarEquipos, input);

  const userId = ctx.session.user.id;

  const equipo = await editarEquipo(ctx, input, userId);

  return equipo;
});

export const eliminarEquipoProcedure = protectedProcedure
  .input(inputEliminarEquipo)
  .mutation(async ({ ctx, input }) => {
    validarInput(inputEliminarEquipo, input);

    const equipo = await eliminarEquipo(ctx, input);

    return equipo;
  });

export const eliminarTipoProcedure = protectedProcedure.input(inputEliminarTipo).mutation(async ({ ctx, input }) => {
  validarInput(inputEliminarEquipo, input);

  const tipo = await eliminarTipo(ctx, input);

  return tipo;
});

export const getTodosLosTiposProcedure = protectedProcedure.input(inputGetTipos).query(async ({ ctx, input }) => {
  validarInput(inputGetTipos, input);

  const tipos = await getAllTipos(ctx, input);

  return tipos;
});

export const tipoPorIdProcedure = protectedProcedure.input(inputGetTipo).query(async ({ ctx, input }) => {
  validarInput(inputGetTipo, input);

  const tipo = await getTipoPorId(ctx, input);

  return tipo;
});

export const editarTipoProcedure = protectedProcedure.input(inputEditarTipo).mutation(async ({ ctx, input }) => {
  validarInput(inputEditarTipo, input);

  const userId = ctx.session.user.id;

  const tipo = await editarTipo(ctx, input, userId);

  return tipo;
});

export const nuevoTipoProcedure = protectedProcedure.input(inputAgregarTipo).mutation(async ({ ctx, input }) => {
  validarInput(inputAgregarTipo, input);

  const userId = ctx.session.user.id;

  const tipo = await agregarTipo(ctx, input, userId);

  return tipo;
});

export const getTodasLasMarcasProcedure = protectedProcedure.query(async ({ ctx }) => {
  const marcas = await getAllMarcas(ctx);

  return marcas;
});

export const getTodosLosEstadosProcedure = protectedProcedure.query(async ({ ctx }) => {
  const estados = await getAllEstados(ctx);

  return estados;
});

export const getTodosLosArmariosProcedure = protectedProcedure.input(inputGetArmarios).query(async ({ ctx, input }) => {
  validarInput(inputGetArmarios, input);

  const armarios = await getAllArmarios(ctx, input);

  return armarios;
});

export const getTodosLosModelosProcedure = protectedProcedure.query(async ({ ctx }) => {
  const modelos = await getAllModelos(ctx);

  return modelos;
});

export const nuevaMarcaProcedure = protectedProcedure.input(inputAgregarMarca).mutation(async ({ ctx, input }) => {
  validarInput(inputAgregarMarca, input);

  const userId = ctx.session.user.id;

  const marca = await agregarMarca(ctx, input, userId);

  return marca;
});
