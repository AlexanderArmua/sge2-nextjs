import { type inputEliminarDivision } from "@/shared/filters/divisiones-filter.schema";
import { type PrismaClient } from "@prisma/client";
import { type z } from "zod";
export const getAllDivisiones = async (ctx: { db: PrismaClient }) => {
  return await ctx.db.division.findMany({
    select: {
      id: true,
      nombre: true,
      anio: true,
    },
    orderBy: {
      nombre: "asc",
    },
  });
};

type InputEliminarDivision = z.infer<typeof inputEliminarDivision>;
export const eliminarDivision = async (ctx: { db: PrismaClient }, input: InputEliminarDivision) => {
  try {
    const division = await ctx.db.division.delete({
      where: {
        id: input.id,
      },
    });

    return division;
  } catch (error) {
    throw new Error(`Error eliminando division ${input.id}`);
  }
};
