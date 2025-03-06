"use client";

import { RepresentadaDetalhes } from "./representada-detalhes";
import { useParams } from "next/navigation";

export default function RepresentadaDetalhesPage() {
  const params = useParams();
  const id = params.id as string;

  return <RepresentadaDetalhes id={id} />;
}