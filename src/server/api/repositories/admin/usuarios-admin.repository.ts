import { construirOrderByDinamico } from "@/shared/dynamic-orderby";
import {
  type inputGetUsuario,
  type inputEliminarUsuario,
  type inputGetUsuarios,
  type inputEditarUsuario,
} from "@/shared/filters/admin-usuarios-filter.schema";
import { type Prisma, type PrismaClient } from "@prisma/client";
import { type z } from "zod";

type InputGetAll = z.infer<typeof inputGetUsuarios>;
export const getAllUsuarios = async (ctx: { db: PrismaClient }, input: InputGetAll) => {
  const { pageIndex, pageSize, searchText, orderDirection, orderBy } = input ?? {};

  const ordenUsuario: Prisma.UserOrderByWithRelationInput = construirOrderByDinamico(
    orderBy ?? "",
    orderDirection ?? "",
  );

  const filtrosWhereUsuario: Prisma.UserWhereInput = {
    ...(searchText
      ? {
          OR: [
            {
              nombre: {
                contains: searchText ?? undefined,
                mode: "insensitive",
              },
            },
            {
              apellido: {
                contains: searchText ?? undefined,
                mode: "insensitive",
              },
            },
            {
              email: {
                contains: searchText ?? undefined,
                mode: "insensitive",
              },
            },
            {
              legajo: {
                contains: searchText ?? undefined,
                mode: "insensitive",
              },
            },
          ],
        }
      : {}),
    ...(input?.rol
      ? {
          usuarioRol: {
            some: {
              rolId: parseInt(input?.rol),
            },
          },
        }
      : {}),
  };

  const [count, usuarios] = await ctx.db.$transaction([
    ctx.db.user.count({
      where: filtrosWhereUsuario,
    }),
    ctx.db.user.findMany({
      include: {
        usuarioRol: {
          include: {
            rol: true,
          },
        },
      },
      where: filtrosWhereUsuario,
      orderBy: ordenUsuario,
      ...(pageIndex && pageSize
        ? {
            skip: parseInt(pageIndex) * parseInt(pageSize),
            take: parseInt(pageSize),
          }
        : {}),
    }),
  ]);

  return {
    count,
    usuarios,
  };
};

type InputEliminarUsuario = z.infer<typeof inputEliminarUsuario>;
export const eliminarUsuario = async (ctx: { db: PrismaClient }, input: InputEliminarUsuario) => {
  try {
    const usuario = await ctx.db.user.update({
      where: {
        id: input.id,
      },
      data: {
        usuarioRol: {
          set: [],
        },
      },
    });

    return usuario;
  } catch (error) {
    throw new Error(`Error eliminando usuario ${input.id}`);
  }
};

type InputGetUsuarioPorId = z.infer<typeof inputGetUsuario>;
export const getUsuarioPorId = async (ctx: { db: PrismaClient }, input: InputGetUsuarioPorId) => {
  const { id } = input;

  const usuario = await ctx.db.user.findUnique({
    include: {
      usuarioRol: {
        include: {
          rol: true,
        },
      },
    },
    where: {
      id,
    },
  });

  return usuario;
};

type InputEditarUsuario = z.infer<typeof inputEditarUsuario>;
export const editarUsuario = async (ctx: { db: PrismaClient }, input: InputEditarUsuario, userId: string) => {
  try {
    const usuario = await ctx.db.$transaction(async (prisma) => {
      const updatedUser = await prisma.user.update({
        data: {
          nombre: input.nombre,
          apellido: input.apellido,
          email: input.email,
          legajo: input.legajo,
          esDocente: input.esDocente,
          esTutor: input.esTutor,
          usuarioRol: {
            deleteMany: {
              userId: input.id,
            },
            createMany: {
              data: input.roles.map((rolId) => ({
                rolId: parseInt(rolId),
                usuarioCreadorId: userId,
              })),
            },
          },
        },
        where: {
          id: input.id,
        },
      });

      if (input.esTutor) {
        await prisma.tutor.upsert({
          where: { userId: input.id },
          create: { userId: input.id, diasHorarios: "", especialidad: "", sede: "", usuarioCreadorId: userId },
          update: {},
        });
      } else {
        // buscar si existe un tutor, si no existe no hacer nada, si existe eliminarlo
        const tutor = await prisma.tutor.findUnique({
          where: { userId: input.id },
        });
        if (tutor) {
          await prisma.tutor.delete({
            where: { userId: input.id },
          });
        }
      }

      return updatedUser;
    });

    return usuario;
  } catch (error) {
    console.error(error);
    throw new Error(`Error modificando usuario ${input.id}`);
  }
};

export const getAllTutores = async (ctx: { db: PrismaClient }) => {
  const tutores = await ctx.db.user.findMany({
    select: {
      id: true,
      nombre: true,
      apellido: true,
      email: true,
      legajo: true,
      image: true,
    },
  });

  return tutores;
};
