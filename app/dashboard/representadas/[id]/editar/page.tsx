import { RepresentadaEditar } from "./representada-editar";

export function generateStaticParams() {
  return representadasData.map((representada) => ({
    id: representada.id.toString(),
  }));
}

export default function RepresentadaEditarPage() {
  return <RepresentadaEditar />;
}