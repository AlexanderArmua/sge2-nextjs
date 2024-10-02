import { CURSOS_ROUTE } from "@/shared/server-routes";
import { EditIcon } from "lucide-react"; // Asegúrate de que esta importación sea correcta
import Link from "next/link";

type EditDivisionModalProps = {
  divisionId: number; // Propiedad para el ID de la división
};
const rutaCurso = CURSOS_ROUTE;

export const EditDivisionModal = (props: EditDivisionModalProps) => {
  return (
    <Link key={props.divisionId} href={`${rutaCurso.href}/divisiones/${props.divisionId}`} passHref prefetch={false}>
      <EditIcon />
    </Link>
  );
};

export default EditDivisionModal;
