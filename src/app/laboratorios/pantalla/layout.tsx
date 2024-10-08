"use server";

import { redirect } from "next/navigation";
import { getServerAuthSession } from "@/server/auth";
import { INICIO_ROUTE } from "@/shared/server-routes";

type LayoutProps = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: LayoutProps) {
  const session = await getServerAuthSession();

  if (!session) {
    redirect(INICIO_ROUTE.href);
    return null;
  }

  return (
    <main className="flex w-full flex-col">
      <div className="flex flex-col items-center justify-center gap-12 px-4 py-16 ">{children}</div>
    </main>
  );
}
