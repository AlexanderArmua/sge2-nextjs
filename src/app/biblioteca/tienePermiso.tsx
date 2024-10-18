"use client";

import { useTienePermisos } from "@/app/_hooks/use-tiene-permisos";

type TienePermisosProps = {
  permisos: string[];
  fallback?: React.ReactNode;
  children: React.ReactNode;
};

export const TienePermiso = ({ permisos, fallback = null, children }: TienePermisosProps) => {
  const { tienePermisos, isLoading, error } = useTienePermisos(permisos);

  if (isLoading) {
    return <p>Cargando permisos...</p>;
  }

  if (error) {
    return <p>Error al verificar permisos.</p>;
  }

  return tienePermisos ? <>{children}</> : <>{fallback}</>;
};
