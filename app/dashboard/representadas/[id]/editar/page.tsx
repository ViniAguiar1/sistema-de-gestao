"use client";

import { RepresentadaEditar } from "./representada-editar";
import { useParams } from "next/navigation";

export default function RepresentadaEditarPage() {
  const params = useParams();
  const id = params.id as string;

  return <RepresentadaEditar id={id} />;
}