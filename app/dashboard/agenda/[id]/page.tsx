import { CompromissoDetalhes } from "./compromisso-detalhes";
import { compromissosData } from "./data";

export async function generateStaticParams() {
  return compromissosData.map((compromisso) => ({
    id: compromisso.id.toString(),
  }));
}

export default function CompromissoDetalhesPage() {
  return <CompromissoDetalhes />;
}