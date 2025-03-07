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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Plus, Search, MoreHorizontal, Package, Tag, Building2, Pencil, Trash2, Eye } from "lucide-react";
import Link from "next/link";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [produtos, setProdutos] = useState<{ codigo: number; nome: string; sku: string; categoria: string; precoCompra: number; quantidade: string; representada: string; status: number; }[]>([]);
  // Estado para guardar as representadas vindas da API
  const [representadasData, setRepresentadasData] = useState<{ codigo: number; razaoSocial: string; }[]>([]);
  
  // Estados para filtro de busca e representada
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRepresentada, setSelectedRepresentada] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

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

  // Função para excluir produto
  const handleDelete = async (produtoId: number) => {
    setDeleteLoading(true);
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`https://apicloud.tavrus.com.br/api/produtos/${produtoId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao excluir o produto");
      }

      setProdutos(produtos.filter(produto => produto.codigo !== produtoId));
      toast.success("Produto excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir produto:", error);
      toast.error("Erro ao excluir o produto");
    } finally {
      setDeleteLoading(false);
    }
  };

  // Filtrar produtos com base no termo de busca e representada selecionada
  const filteredProdutos = produtos.filter((produto) => {
    const matchesSearchTerm = produto.nome.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRepresentada = selectedRepresentada
      ? representadasData.find((r) => r.razaoSocial === selectedRepresentada)?.codigo === Number(produto.representada)
      : true;
    return matchesSearchTerm && matchesRepresentada;
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
          value={selectedRepresentada ?? "todas"}
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
            {filteredProdutos.map((produto) => {
              const statusLabel = statusMapping[produto.status as keyof typeof statusMapping] || "Desconhecido";
              const representadaId = Number(produto.representada);
              const representadaEncontrada = representadasData.find(
                (r) => r.codigo === representadaId
              );
              return (
                <TableRow key={produto.codigo}>
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
                      <div>{parseInt(produto.quantidade, 10)} unidades</div>
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
                        statusStyles[statusLabel as keyof typeof statusStyles] || ""
                      }`}
                    >
                      {statusLabel}
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => router.push(`/dashboard/produtos/${produto.codigo}`)}>
                          <Eye className="mr-2 h-4 w-4" />
                          Ver detalhes
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => router.push(`/dashboard/produtos/${produto.codigo}/editar`)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                              <Trash2 className="mr-2 h-4 w-4" />
                              Excluir
                            </DropdownMenuItem>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                              <AlertDialogDescription>
                                Tem certeza que deseja excluir este produto? Esta ação não pode ser desfeita.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(produto.codigo)}
                                disabled={deleteLoading}
                              >
                                {deleteLoading ? "Excluindo..." : "Excluir"}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </DropdownMenuContent>
                    </DropdownMenu>
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