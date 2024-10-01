import { api } from "@/trpc/server"; // O la ruta correspondiente para acceder a tu API
import { DivisionesTable } from "./table"; // Un componente que renderice la tabla de divisiones

export default async function DivisionesTableContainer() {
  const data = await api.division.getAll(); // Cambia 'api.division.getAll' a la llamada real de tu backend
  return <DivisionesTable data={data} />; // Renderiza la tabla con los datos obtenidos
}
