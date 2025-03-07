"use client";

import { ClienteDetalhes } from "./cliente-detalhes";
import { useParams } from "next/navigation";

export default function ClienteDetalhesPage() {
  const params = useParams();
  const id = params.id as string;

  return <ClienteDetalhes />;
}