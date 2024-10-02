"use client";

import { useRouter } from "next/navigation";
import { DivisionForm } from "./division-form";

type PageProps = {
  params: { id?: string };
};

export default function PageDivisionDetails({ params: { id } }: PageProps) {
  const router = useRouter();

  const handleClickCancel = () => router.back();

  const handleClickSave = () => router.push("/divisiones");

  return (
    <>
      <DivisionForm id={id} onCancel={handleClickCancel} onSubmit={handleClickSave} />
    </>
  );
}
