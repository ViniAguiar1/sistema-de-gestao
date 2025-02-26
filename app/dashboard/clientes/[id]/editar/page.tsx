import { ClienteEditar } from "./cliente-editar";
import { clientesData } from "../data";

export function generateStaticParams() {
  return clientesData.map((cliente) => ({
    id: cliente.id.toString(),
  }));
}

export default function ClienteEditarPage() {
  return <ClienteEditar />;
}