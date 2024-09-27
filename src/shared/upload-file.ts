"use server";

import { mkdirSync } from "fs";
import { rm, writeFile } from "fs/promises";
import { revalidatePath } from "next/cache";
import path from "path";

export async function uploadFile(formData: FormData) {
  const file = formData.get("file") as File;
  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  const dir = path.join(process.cwd(), "public/imagenes");
  mkdirSync(dir, { recursive: true });

  const filePath = path.join(dir, file.name);

  try {
    await writeFile(filePath, buffer);
  } catch (e) {
    throw new Error(`No se pudo guardar la imagen en ${filePath}`);
  }

  revalidatePath("/");

  return `${file.name}`;
}

export async function removeFile(fileName: string) {
  const filePath = path.join(process.cwd(), "public/imagenes", fileName);

  try {
    await rm(filePath);
  } catch (e) {
    throw new Error(`No se pudo eliminar la imagen en ${filePath}`);
  }
}
