import { PromotorEditar } from "./promotor-editar";

// Mock data for static paths
const promotores = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
];

export function generateStaticParams() {
  return promotores.map((promotor) => ({
    id: promotor.id.toString(),
  }));
}

export default function PromotorEditarPage() {
  return <PromotorEditar />;
}