"use server";

import { redirect } from "next/navigation";
import { INICIO_ROUTE } from "@/shared/server-routes";
import { estaLogueadoYConPermiso } from "@/server/permisos";
import { SgeNombre } from "@prisma/client";

type LayoutProps = {
  children: React.ReactNode;
  modal: React.ReactNode;
};

export default async function RootLayout({ children, modal }: LayoutProps) {
  const puedeVer = await estaLogueadoYConPermiso([SgeNombre.RES_LAB_RESERVAR_CATEDRA_AUTO]);
  if (!puedeVer) {
    redirect(INICIO_ROUTE.href);
  }

  return (
    <main className="flex flex-col">
      {children}
      {modal}
    </main>
  );
}
