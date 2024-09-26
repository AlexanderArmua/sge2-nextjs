"use server";

type LayoutProps = {
  children: React.ReactNode;
  modal: React.ReactNode;
};

export default async function Layout({ children, modal }: LayoutProps) {
  return (
    <>
      <h3 className="text-5xl font-extrabold tracking-tight sm:text-[3rem]">Reserva Laboratorio - Cátedra</h3>
      {children}
      {modal}
    </>
  );
}
