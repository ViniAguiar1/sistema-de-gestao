import { RepresentadaEditar } from "./representada-editar";
import { representadasData } from "../data";

export function generateStaticParams() {
  return representadasData.map((representada) => ({
    id: representada.id.toString(),
  }));
}

export default function RepresentadaEditarPage() {
  return <RepresentadaEditar />;
}