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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
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
import { Plus, Search, MoreHorizontal, Mail, Phone, MapPin, UserCheck, Eye, Pencil, Trash, Target } from "lucide-react";
import Link from "next/link";

const promotores = [
  {
    id: 1,
    nome: "Carlos Silva",
    email: "carlos.silva@empresa.com",
    telefone: "(11) 98765-4321",
    cidade: "São Paulo",
    estado: "SP",
    status: "Ativo",
    vendas: 32,
    clientes: 45,
    territorios: ["São Paulo - Capital", "São Paulo - Interior"]
  },
  {
    id: 2,
    nome: "Ana Santos",
    email: "ana.santos@empresa.com",
    telefone: "(11) 97654-3210",
    cidade: "Guarulhos",
    estado: "SP",
    status: "Ativo",
    vendas: 28,
    clientes: 38,
    territorios: ["Rio de Janeiro"]
  },
  {
    id: 3,
    nome: "Roberto Lima",
    email: "roberto.lima@empresa.com",
    telefone: "(11) 96543-2109",
    cidade: "Osasco",
    estado: "SP",
    status: "Inativo",
    vendas: 15,
    clientes: 22,
    territorios: ["Minas Gerais", "Região Sul"]
  },
];

export default function PromotoresPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Filter promotores based on search term and status
  const filteredPromotores = promotores.filter(promotor => {
    // Filter by search term
    const matchesSearch = 
      promotor.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      promotor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      promotor.telefone.includes(searchTerm);
    
    // Filter by status
    const matchesStatus = 
      !statusFilter || 
      promotor.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const handleViewPromotor = (id: number) => {
    router.push(`/dashboard/promotores/${id}`);
  };

  const handleEditPromotor = (id: number) => {
    router.push(`/dashboard/promotores/${id}/editar`);
  };

  const handleDeletePromotor = async (id: number) => {
    setDeleteLoading(true);
    try {
      // Aqui iria a lógica de deleção
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Atualizar a lista de promotores
      console.log(`Promotor ${id} excluído com sucesso`);
    } catch (error) {
      console.error("Erro ao excluir promotor:", error);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Promotores de Venda</h2>
        <Link href="/dashboard/promotores/novo">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Novo Promotor
          </Button>
        </Link>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Buscar promotores..." 
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select 
          value={statusFilter || "todos"} 
          onValueChange={(value) => setStatusFilter(value === "todos" ? null : value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Todos os status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos os status</SelectItem>
            <SelectItem value="ativo">Ativo</SelectItem>
            <SelectItem value="inativo">Inativo</SelectItem>
            <SelectItem value="ferias">Em Férias</SelectItem>
            <SelectItem value="licenca">Em Licença</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Promotor</TableHead>
              <TableHead>Contato</TableHead>
              <TableHead>Localização</TableHead>
              <TableHead>Territórios</TableHead>
              <TableHead>Desempenho</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[100px]">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPromotores.map((promotor) => (
              <TableRow key={promotor.id}>
                <TableCell>
                  <div>
                    <p className="font-medium">{promotor.nome}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                      <div className="flex items-center gap-1">
                        <UserCheck className="h-3 w-3" />
                        ID #{promotor.id}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-sm">
                      <Phone className="h-3 w-3 text-muted-foreground" />
                      {promotor.telefone}
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Mail className="h-3 w-3 text-muted-foreground" />
                      {promotor.email}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    {promotor.cidade}/{promotor.estado}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {promotor.territorios.map((territorio, index) => (
                      <div 
                        key={index}
                        className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-secondary"
                      >
                        <Target className="h-3 w-3 mr-1" />
                        {territorio}
                      </div>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <p className="text-sm">
                      {promotor.vendas} vendas realizadas
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {promotor.clientes} clientes atendidos
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    promotor.status === 'Ativo' 
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {promotor.status}
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
                      <DropdownMenuItem onClick={() => handleViewPromotor(promotor.id)}>
                        <Eye className="h-4 w-4 mr-2" />
                        Ver detalhes
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEditPromotor(promotor.id)}>
                        <Pencil className="h-4 w-4 mr-2" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <DropdownMenuItem 
                            className="text-red-600"
                            onSelect={(e) => e.preventDefault()}
                          >
                            <Trash className="h-4 w-4 mr-2" />
                            Excluir
                          </DropdownMenuItem>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                            <AlertDialogDescription>
                              Tem certeza que deseja excluir este promotor? Esta ação não pode ser desfeita.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => handleDeletePromotor(promotor.id)}
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
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}