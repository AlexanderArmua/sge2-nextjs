import { LABORATORIO_ABIERTO_ROUTE } from "@/shared/server-routes";
import { EyeIcon } from "lucide-react";
import Link from "next/link";

type VerReservaModalProps = {
  reservaID: number;
};

const rutaSolicitud = LABORATORIO_ABIERTO_ROUTE.subRutas[1];

export const VerReservaModal = (props: VerReservaModalProps) => {
  return (
    <Link key={props.reservaID} href={`${rutaSolicitud?.href}/${props.reservaID}`} passHref prefetch={false}>
      <EyeIcon />
    </Link>
  );
};
