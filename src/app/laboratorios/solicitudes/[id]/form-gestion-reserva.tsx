import { ScrollArea } from "@/components/ui/scroll-area";
import { api } from "@/trpc/react";
import { esFechaPasada } from "@/shared/get-date";
import { ReservaDetalle } from "../../_components/info-basica-reserva";
import { ReservaAprobacion } from "../../_components/reserva-gestion";

interface ReservaViewAdminProps {
  reservaId: number;
  onAprobar: () => void;
  onRechazar: () => void;
  onCancel: () => void;
}

export const ReservaViewAdmin = ({ reservaId, onCancel, onAprobar, onRechazar }: ReservaViewAdminProps) => {
  const { data: reservaData } = api.reservas.reservarLaboratorioCerrado.getReservaPorID.useQuery({
    id: Number(reservaId),
  });

  const esReservaPasada = esFechaPasada(reservaData?.reserva?.fechaHoraInicio);

  return (
    <ScrollArea className="max-h-[calc(100vh_-_10%)]">
      <div className="container mx-auto space-y-8 p-4">
        <ReservaDetalle reservaId={reservaId} mostrarCompleto={esReservaPasada} />
        {!esReservaPasada && (
          <ReservaAprobacion reservaId={reservaId} onCancel={onCancel} onAprobar={onAprobar} onRechazar={onRechazar} />
        )}
      </div>
    </ScrollArea>
  );
};