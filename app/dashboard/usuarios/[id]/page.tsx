// @ts-nocheck
import { UsuarioDetalhes } from "./usuario-detalhes";

// Se desejar gerar as rotas estaticamente, você pode buscar os dados de uma API ou banco de dados.
// Exemplo com busca de dados:
// export async function generateStaticParams() {
//   const res = await fetch('https://suaapi.com/usuarios');
//   const usuarios = await res.json();
//   return usuarios.map(usuario => ({
//     id: usuario.id.toString(),
//   }));
// }

export default function UsuarioDetalhesPage({ params }) {
  // O Next.js injeta o parâmetro 'id' extraído da URL em params
  const { id } = params;
  return <UsuarioDetalhes id={id} />;
}
