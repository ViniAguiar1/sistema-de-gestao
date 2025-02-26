"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search, MoreHorizontal, Package, Tag, Building2 } from "lucide-react";
import Link from "next/link";

const produtos = [
  {
    id: 1,
    codigo: "XLG-001",
    nome: "Boneco Aventureiro",
    categoria: "Brinquedos",
    preco: 89.90,
    estoque: 150,
    representada: "Xalingo Brinquedos",
    status: "Ativo",
  },
  {
    id: 2,
    codigo: "ATH-123",
    nome: "Console Portátil Hero X",
    categoria: "Games",
    preco: 899.90,
    estoque: 45,
    representada: "Athia Heroes",
    status: "Ativo",
  },
  {
    id: 3,
    codigo: "BF-456",
    nome: "Esteira Elétrica Pro",
    categoria: "Fitness",
    preco: 3499.90,
    estoque: 12,
    representada: "Brasil Fit",
    status: "Ativo",
  },
  {
    id: 4,
    codigo: "SP-789",
    nome: "Tinta Acrílica Premium 18L",
    categoria: "Tintas",
    preco: 289.90,
    estoque: 80,
    representada: "Sinteplast",
    status: "Baixo Estoque",
  },
  {
    id: 5,
    codigo: "PT-321",
    nome: "Tênis Runner Pro",
    categoria: "Calçados",
    preco: 399.90,
    estoque: 0,
    representada: "Patta",
    status: "Indisponível",
  },
];

const representadas = [
  { id: 1, nome: "Xalingo Brinquedos" },
  { id: 2, nome: "Athia Heroes" },
  { id: 3, nome: "Brasil Fit" },
  { id: 4, nome: "Sinteplast" },
  { id: 5, nome: "Patta" },
];

const statusStyles = {
  Ativo: "bg-emerald-100 text-emerald-800",
  "Baixo Estoque": "bg-yellow-100 text-yellow-800",
  Indisponível: "bg-red-100 text-red-800",
};

export default function ProdutosPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRepresentada, setSelectedRepresentada] = useState<string | null>(null);

  // Filter products based on search term and selected representada
  const filteredProdutos = produtos.filter(produto => {
    const matchesSearch = 
      produto.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      produto.nome.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRepresentada = 
      !selectedRepresentada || 
      produto.representada === selectedRepresentada;

    return matchesSearch && matchesRepresentada;
  });

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Produtos</h2>
        <Link href="/dashboard/produtos/novo">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Novo Produto
          </Button>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Buscar produtos..." 
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select 
          value={selectedRepresentada || "todas"} 
          onValueChange={(value) => setSelectedRepresentada(value === "todas" ? null : value)}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Todas as representadas" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todas">Todas as representadas</SelectItem>
            {representadas.map((representada) => (
              <SelectItem key={representada.id} value={representada.nome}>
                {representada.nome}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produto</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Estoque</TableHead>
              <TableHead>Representada</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProdutos.map((produto) => (
              <TableRow key={produto.id}>
                <TableCell>
                  <div>
                    <p className="font-medium">{produto.nome}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                      <div className="flex items-center gap-1">
                        <Package className="h-3 w-3" />
                        {produto.codigo}
                      </div>
                      <div className="flex items-center gap-1">
                        <Tag className="h-3 w-3" />
                        {produto.categoria}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-medium">
                    {produto.preco.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    })}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-medium">
                    {produto.estoque} unidades
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    {produto.representada}
                  </div>
                </TableCell>
                <TableCell>
                  <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    statusStyles[produto.status as keyof typeof statusStyles]
                  }`}>
                    {produto.status}
                  </div>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}