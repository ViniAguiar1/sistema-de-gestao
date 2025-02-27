import { ScriptDetalhes } from "./script-detalhes";

// Mock data for static paths
const scripts = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
];

export function generateStaticParams() {
  return scripts.map((script) => ({
    id: script.id.toString(),
  }));
}

export default function ScriptDetalhesPage() {
  return <ScriptDetalhes />;
}