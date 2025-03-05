"use client";

import { useState, useEffect } from "react";
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
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RepresentadasPage() {
  const router = useRouter();
  const [deleteLoading, setDeleteLoading] = useState(false);
  interface Representada {
    codigoREPRESENTADA: number;
    nomeFantasiaREPRESENTADA: string;
    cidadeREPRESENTADA: string;
    estadoREPRESENTADA: string;
    segmentoREPRESENTADA: string;
    razaoSocialREPRESENTADA: string;
    telefonePrincipalREPRESENTADA: string;
    emailREPRESENTADA: string;
  }

  const [representadas, setRepresentadas] = useState<Representada[]>([]);

  useEffect(() => {
    const fetchRepresentadas = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch("https://apicloud.tavrus.com.br/api/representadas", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setRepresentadas(data);
      } catch (error) {
        console.error("Erro ao buscar representadas:", error);
      }
    };

    fetchRepresentadas();
  }, []);

  const handleDelete = async (id: number) => {
    setDeleteLoading(true);
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`https://apicloud.tavrus.com.br/api/representadas/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Erro ao excluir representada");
      }
      // Atualizar a lista
      setRepresentadas(prev => prev.filter(rep => rep.codigoREPRESENTADA !== id));
      toast.success("Representada excluída com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir representada:", error);
      toast.error("Erro ao excluir representada.");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <ToastContainer />
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
              <TableRow key={representada.codigoREPRESENTADA}>
                <TableCell>
                  <div>
                    <p className="font-medium">{representada.nomeFantasiaREPRESENTADA}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {representada.cidadeREPRESENTADA}/{representada.estadoREPRESENTADA}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{representada.segmentoREPRESENTADA}</TableCell>
                <TableCell>
                  <div>
                    <p>{representada.razaoSocialREPRESENTADA}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                      <div className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {representada.telefonePrincipalREPRESENTADA}
                      </div>
                      <div className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {representada.emailREPRESENTADA}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-medium">N/A</div>
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
                        onClick={() => router.push(`/dashboard/representadas/${representada.codigoREPRESENTADA}`)}
                      >
                        Ver detalhes
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => router.push(`/dashboard/representadas/${representada.codigoREPRESENTADA}/editar`)}
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
                              onClick={() => handleDelete(representada.codigoREPRESENTADA)}
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