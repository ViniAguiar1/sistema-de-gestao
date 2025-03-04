// @ts-nocheck
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
import { Plus, Search, MoreHorizontal, Package, Building2, User, Eye, Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { addDays } from "date-fns";

const pedidos = [
  {
    id: "PED001",
    data: "19/02/2025",
    cliente: {
      nome: "Empresa ABC Ltda",
      cidade: "São Paulo",
      estado: "SP",
    },
    representada: "Xalingo Brinquedos",
    valor: 12500.00,
    itens: 8,
    status: "Aprovado",
  },
  {
    id: "PED002",
    data: "18/02/2025",
    cliente: {
      nome: "Distribuidora XYZ",
      cidade: "Rio de Janeiro",
      estado: "RJ",
    },
    representada: "Athia Heroes",
    valor: 8750.00,
    itens: 5,
    status: "Pendente",
  },
  {
    id: "PED003",
    data: "18/02/2025",
    cliente: {
      nome: "Comércio Sul",
      cidade: "Porto Alegre",
      estado: "RS",
    },
    representada: "Brasil Fit",
    valor: 15200.00,
    itens: 12,
    status: "Aprovado",
  },
  {
    id: "PED004",
    data: "17/02/2025",
    cliente: {
      nome: "Indústria Norte",
      cidade: "Manaus",
      estado: "AM",
    },
    representada: "Sinteplast",
    valor: 6300.00,
    itens: 4,
    status: "Rascunho",
  },
];

const statusStyles = {
  Aprovado: "bg-emerald-100 text-emerald-800",
  Pendente: "bg-yellow-100 text-yellow-800",
  Cancelado: "bg-red-100 text-red-800",
  Rascunho: "bg-gray-100 text-gray-800",
};

const representadas = [
  { id: 1, nome: "Xalingo Brinquedos" },
  { id: 2, nome: "Athia Heroes" },
  { id: 3, nome: "Brasil Fit" },
  { id: 4, nome: "Sinteplast" },
  { id: 5, nome: "Patta" },
];

export default function PedidosPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRepresentada, setSelectedRepresentada] = useState<string | null>(null);
  const [date, setDate] = useState({
    from: new Date(),
    to: addDays(new Date(), 30),
  });
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleViewOrder = (orderId: string) => {
    window.open(`/dashboard/pedidos/preview`, "_blank");
  };

  const handleEditOrder = (orderId: string) => {
    router.push(`/dashboard/pedidos/${orderId}/editar`);
  };

  const handleDeleteOrder = async (orderId: string) => {
    setDeleteLoading(true);
    try {
      // Aqui iria a lógica de deleção
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Atualizar a lista de pedidos
    } catch (error) {
      console.error("Erro ao excluir pedido:", error);
    } finally {
      setDeleteLoading(false);
    }
  };

  // Filtrar pedidos
  const filteredPedidos = pedidos.filter(pedido => {
    const matchesSearch = 
      pedido.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pedido.cliente.nome.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRepresentada = 
      !selectedRepresentada || 
      pedido.representada === selectedRepresentada;

    // Aqui você pode adicionar a lógica de filtro por data
    // usando date.from e date.to

    return matchesSearch && matchesRepresentada;
  });

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Pedidos</h2>
        <Link href="/dashboard/pedidos/novo">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Novo Pedido
          </Button>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Buscar pedidos..." 
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
        <DatePickerWithRange date={date} setDate={setDate} />
      </div>
      
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pedido</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Representada</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[100px]">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPedidos.map((pedido) => (
              <TableRow key={pedido.id}>
                <TableCell>
                  <div>
                    <p className="font-medium">{pedido.id}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                      <div className="flex items-center gap-1">
                        <Package className="h-3 w-3" />
                        {pedido.itens} itens
                      </div>
                      <span>{pedido.data}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      {pedido.cliente.nome}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {pedido.cliente.cidade}/{pedido.cliente.estado}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    {pedido.representada}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-medium">
                    {pedido.valor.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    })}
                  </div>
                </TableCell>
                <TableCell>
                  <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    statusStyles[pedido.status as keyof typeof statusStyles]
                  }`}>
                    {pedido.status}
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
                      <DropdownMenuItem onClick={() => handleViewOrder(pedido.id)}>
                        <Eye className="h-4 w-4 mr-2" />
                        Visualizar
                      </DropdownMenuItem>
                      {pedido.status === 'Rascunho' && (
                        <>
                          <DropdownMenuItem onClick={() => handleEditOrder(pedido.id)}>
                            <Pencil className="h-4 w-4 mr-2" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                <Trash className="h-4 w-4 mr-2" />
                                Excluir
                              </DropdownMenuItem>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Tem certeza que deseja excluir este pedido? Esta ação não pode ser desfeita.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction 
                                  onClick={() => handleDeleteOrder(pedido.id)}
                                  disabled={deleteLoading}
                                >
                                  {deleteLoading ? "Excluindo..." : "Excluir"}
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </>
                      )}
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