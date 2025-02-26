"use client";

import { useState } from "react";
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
import { Plus, Search, MoreHorizontal, Phone, Mail, MapPin } from "lucide-react";
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
import Link from "next/link";
import { useRouter } from "next/navigation";

const representadas = [
  {
    id: 1,
    nome: "Xalingo Brinquedos",
    segmento: "Brinquedos",
    contato: "Roberto Santos",
    telefone: "(51) 3456-7890",
    email: "comercial@xalingo.com.br",
    cidade: "Santa Cruz do Sul",
    estado: "RS",
    comissao: 8,
  },
  {
    id: 2,
    nome: "Athia Heroes",
    segmento: "Games e Entretenimento",
    contato: "Patricia Lima",
    telefone: "(11) 3456-7890",
    email: "vendas@athia.com.br",
    cidade: "São Paulo",
    estado: "SP",
    comissao: 10,
  },
  {
    id: 3,
    nome: "Brasil Fit",
    segmento: "Equipamentos Esportivos",
    contato: "Marcos Oliveira",
    telefone: "(41) 3456-7890",
    email: "comercial@brasilfit.com.br",
    cidade: "Curitiba",
    estado: "PR",
    comissao: 12,
  },
  {
    id: 4,
    nome: "Sinteplast",
    segmento: "Tintas e Revestimentos",
    contato: "Carla Silva",
    telefone: "(31) 3456-7890",
    email: "vendas@sinteplast.com.br",
    cidade: "Belo Horizonte",
    estado: "MG",
    comissao: 7,
  },
  {
    id: 5,
    nome: "Patta",
    segmento: "Calçados",
    contato: "Fernando Costa",
    telefone: "(54) 3456-7890",
    email: "comercial@patta.com.br",
    cidade: "Novo Hamburgo",
    estado: "RS",
    comissao: 9,
  },
];

export default function RepresentadasPage() {
  const router = useRouter();
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleDelete = async (id: number) => {
    setDeleteLoading(true);
    try {
      // Aqui vai a lógica de deleção
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Atualizar a lista
    } catch (error) {
      console.error("Erro ao excluir representada:", error);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Representadas</h2>
        <Link href="/dashboard/representadas/novo">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Nova Representada
          </Button>
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar representadas..." className="pl-8" />
        </div>
      </div>
      
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Empresa</TableHead>
              <TableHead>Segmento</TableHead>
              <TableHead>Contato</TableHead>
              <TableHead>Comissão</TableHead>
              <TableHead className="w-[100px]">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {representadas.map((representada) => (
              <TableRow key={representada.id}>
                <TableCell>
                  <div>
                    <p className="font-medium">{representada.nome}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {representada.cidade}/{representada.estado}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{representada.segmento}</TableCell>
                <TableCell>
                  <div>
                    <p>{representada.contato}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                      <div className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {representada.telefone}
                      </div>
                      <div className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {representada.email}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-medium">{representada.comissao}%</div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem 
                        onClick={() => router.push(`/dashboard/representadas/${representada.id}`)}
                      >
                        Ver detalhes
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => router.push(`/dashboard/representadas/${representada.id}/editar`)}
                      >
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <DropdownMenuItem 
                            className="text-red-600"
                            onSelect={(e) => e.preventDefault()}
                          >
                            Excluir
                          </DropdownMenuItem>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                            <AlertDialogDescription>
                              Tem certeza que deseja excluir esta representada? Esta ação não pode ser desfeita.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => handleDelete(representada.id)}
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