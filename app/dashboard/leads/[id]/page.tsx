import { LeadDetalhes } from "./lead-detalhes";

// Mock data for static paths
const leads = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
];

export function generateStaticParams() {
  return leads.map((lead) => ({
    id: lead.id.toString(),
  }));
}

export default function LeadDetalhesPage() {
  return <LeadDetalhes />;
}