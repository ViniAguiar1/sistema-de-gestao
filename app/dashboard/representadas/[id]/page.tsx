import { RepresentadaDetalhes } from "./representada-detalhes";
import { representadasData } from "./data";

export function generateStaticParams() {
  return representadasData.map((representada) => ({
    id: representada.id.toString(),
  }));
}

export default function RepresentadaDetalhesPage() {
  return <RepresentadaDetalhes />;
}