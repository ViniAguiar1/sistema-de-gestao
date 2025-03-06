"use client";

import { useState, useEffect } from "react";
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

const statusStyles = {
  Ativo: "bg-emerald-100 text-emerald-800",
  "Baixo Estoque": "bg-yellow-100 text-yellow-800",
  Indisponível: "bg-red-100 text-red-800",
};

const statusMapping = {
  1: "Ativo",
  0: "Indisponível",
  2: "Baixo Estoque",
};

export default function ProdutosPage() {
  const router = useRouter();

  // Estado para guardar os produtos vindos da API
  const [produtos, setProdutos] = useState([]);
  // Estado para guardar as representadas vindas da API
  const [representadasData, setRepresentadasData] = useState([]);
  
  // Estados para filtro de busca e representada
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRepresentada, setSelectedRepresentada] = useState(null);

  // Buscar dados da API de produtos
  useEffect(() => {
    async function fetchProdutos() {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch("https://apicloud.tavrus.com.br/api/produtos", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.status}`);
        }
        const data = await response.json();
        setProdutos(data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    }

    fetchProdutos();
  }, []);

  // Buscar dados da API de representadas
  useEffect(() => {
    async function fetchRepresentadas() {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch("https://apicloud.tavrus.com.br/api/representadas", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.status}`);
        }
        const data = await response.json();
        setRepresentadasData(data);
      } catch (error) {
        console.error("Erro ao buscar representadas:", error);
      }
    }

    fetchRepresentadas();
  }, []);

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
            {representadasData.map((representada) => (
              <SelectItem key={representada.codigo} value={representada.razaoSocial}>
                {representada.razaoSocial}
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
            {produtos.map((produto) => {
              const statusLabel = statusMapping[produto.status] || "Desconhecido";
              // Converte produto.representada para número e procura na API utilizando "codigo"
              const representadaId = Number(produto.representada);
              const representadaEncontrada = representadasData.find(
                (r) => r.codigo === representadaId
              );
              return (
                <TableRow key={produto.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{produto.nome}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                        <div className="flex items-center gap-1">
                          <Package className="h-3 w-3" />
                          {produto.sku}
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
                      {Number(produto.precoCompra).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
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
                      {representadaEncontrada
                        ? representadaEncontrada.razaoSocial
                        : produto.representada}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        statusStyles[statusLabel] || ""
                      }`}
                    >
                      {statusLabel}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
