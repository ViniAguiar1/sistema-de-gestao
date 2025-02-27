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
import { Plus, Search, MoreHorizontal, Phone, Mail, Building2, UserCheck, Eye, Pencil, Trash, ThermometerSun, UserPlus } from "lucide-react";
import Link from "next/link";

const leads = [
  {
    id: 1,
    empresa: "Tech Solutions Ltda",
    contato: "Ricardo Mendes",
    cargo: "Diretor Comercial",
    telefone: "(11) 98765-4321",
    email: "ricardo@techsolutions.com",
    origem: "Indicação",
    status: "Quente",
    promotor: "Carlos Silva",
    ultimoContato: "19/02/2025",
    potencialCompra: "Alto",
  },
  {
    id: 2,
    empresa: "Mega Distribuidora",
    contato: "Patricia Santos",
    cargo: "Gerente de Compras",
    telefone: "(11) 97654-3210",
    email: "patricia@megadist.com",
    origem: "LinkedIn",
    status: "Morno",
    promotor: "Ana Santos",
    ultimoContato: "18/02/2025",
    potencialCompra: "Médio",
  },
  {
    id: 3,
    empresa: "Comércio Rápido",
    contato: "Fernando Costa",
    cargo: "Proprietário",
    telefone: "(11) 96543-2109",
    email: "fernando@comerciorapido.com",
    origem: "Site",
    status: "Frio",
    promotor: "Roberto Lima",
    ultimoContato: "17/02/2025",
    potencialCompra: "Baixo",
  },
];

const statusStyles = {
  Quente: "bg-red-100 text-red-800",
  Morno: "bg-yellow-100 text-yellow-800",
  Frio: "bg-blue-100 text-blue-800",
  Convertido: "bg-emerald-100 text-emerald-800",
  Perdido: "bg-gray-100 text-gray-800",
};

export default function LeadsPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [leadToDelete, setLeadToDelete] = useState<number | null>(null);

  // Filter leads based on search term and status
  const filteredLeads = leads.filter(lead => {
    // Filter by search term
    const matchesSearch = 
      lead.empresa.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.contato.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by status
    const matchesStatus = 
      !statusFilter || 
      lead.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const handleViewLead = (id: number) => {
    router.push(`/dashboard/leads/${id}`);
   };

  const handleEditLead = (id: number) => {
    router.push(`/dashboard/leads/${id}/editar`);
  };

  const handleDeleteLead = async (id: number) => {
    setDeleteLoading(true);
    setLeadToDelete(id);
    try {
      // Aqui iria a lógica de deleção
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Atualizar a lista de leads
      console.log(`Lead ${id} excluído com sucesso`);
    } catch (error) {
      console.error("Erro ao excluir lead:", error);
    } finally {
      setDeleteLoading(false);
      setLeadToDelete(null);
    }
  };

  const handleConvertToClient = (id: number) => {
    router.push(`/dashboard/leads/${id}`);
  };

  // Helper function to get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Quente':
        return <ThermometerSun className="h-4 w-4 text-red-500" />;
      case 'Morno':
        return <ThermometerSun className="h-4 w-4 text-yellow-500" />;
      case 'Frio':
        return <ThermometerSun className="h-4 w-4 text-blue-500" />;
      default:
        return <ThermometerSun className="h-4 w-4" />;
    }
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Leads</h2>
        <Link href="/dashboard/leads/novo">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Novo Lead
          </Button>
        </Link>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Buscar leads..." 
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
            <SelectItem value="quente">Quente</SelectItem>
            <SelectItem value="morno">Morno</SelectItem>
            <SelectItem value="frio">Frio</SelectItem>
            <SelectItem value="convertido">Convertido</SelectItem>
            <SelectItem value="perdido">Perdido</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Empresa</TableHead>
              <TableHead>Contato</TableHead>
              <TableHead>Origem</TableHead>
              <TableHead>Promotor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[150px]">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLeads.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell>
                  <div>
                    <p className="font-medium">{lead.empresa}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                      <div className="flex items-center gap-1">
                        <Building2 className="h-3 w-3" />
                        Último contato: {lead.ultimoContato}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <p>{lead.contato}</p>
                    <p className="text-sm text-muted-foreground">{lead.cargo}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                      <div className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {lead.telefone}
                      </div>
                      <div className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {lead.email}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{lead.origem}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <UserCheck className="h-4 w-4 text-muted-foreground" />
                    {lead.promotor}
                  </div>
                </TableCell>
                <TableCell>
                  <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    statusStyles[lead.status as keyof typeof statusStyles]
                  }`}>
                    {getStatusIcon(lead.status)}
                    <span className="ml-1">{lead.status}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="h-8 gap-1"
                      onClick={() => handleConvertToClient(lead.id)}
                    >
                      <UserPlus className="h-3 w-3" />
                      Converter
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewLead(lead.id)}>
                          <Eye className="h-4 w-4 mr-2" />
                          Ver detalhes
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditLead(lead.id)}>
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
                                Tem certeza que deseja excluir este lead? Esta ação não pode ser desfeita.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => handleDeleteLead(lead.id)}
                                disabled={deleteLoading && leadToDelete === lead.id}
                              >
                                {deleteLoading && leadToDelete === lead.id ? "Excluindo..." : "Excluir"}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filteredLeads.length === 0 && (
        <div className="flex items-center justify-center h-64 border rounded-lg">
          <div className="text-center">
            <p className="text-muted-foreground">Nenhum lead encontrado</p>
            {searchTerm && (
              <Button 
                variant="link" 
                onClick={() => setSearchTerm("")}
              >
                Limpar busca
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}