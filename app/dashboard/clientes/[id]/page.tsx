import { ClienteDetalhes } from "./cliente-detalhes";
import { clientesData } from "./data";

export function generateStaticParams() {
  return clientesData.map((cliente) => ({
    id: cliente.id.toString(),
  }));
}

export default function ClienteDetalhesPage() {
  return <ClienteDetalhes />;
}