import { PedidoEditar } from "./pedido-editar";
import { pedidos } from "../data";

export function generateStaticParams() {
  return pedidos.map((pedido) => ({
    id: pedido.id,
  }));
}

export default function PedidoEditarPage() {
  return <PedidoEditar />;
}