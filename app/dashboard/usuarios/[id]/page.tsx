import { UsuarioDetalhes } from "./usuario-detalhes";

// Mock data for static paths
const usuarios = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
];

export function generateStaticParams() {
  return usuarios.map((usuario) => ({
    id: usuario.id.toString(),
  }));
}

export default function UsuarioDetalhesPage() {
  return <UsuarioDetalhes />;
}