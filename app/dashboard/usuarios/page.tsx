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
import { Plus, Search, MoreHorizontal, Mail, Shield, Eye, Pencil, Trash } from "lucide-react";
import Link from "next/link";

const API_URL = "https://apicloud.tavrus.com.br/api/usuarios";
const CREATE_USER_URL = "https://apicloud.tavrus.com.br/api/usuarios/criar";
const LOGIN_URL = "https://apicloud.tavrus.com.br/api/login";

export default function UsuariosPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    codigo: Math.floor(Math.random() * 10000),
    nome: "",
    email: "",
    senha: "",
    telefone: "",
    tipousuario: "",
    empresa: "",
    ativo: true,
    datacriacao: new Date().toISOString(),
  });
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao carregar usuários");
      }

      const data = await response.json();
      console.log("Usuários da API:", data);

      if (Array.isArray(data)) {
        setUsuarios(data);
      } else {
        console.error("Formato inválido da resposta da API");
      }
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  };

  const handleCreateUser = async () => {
    if (!token) {
      alert("Você precisa estar logado para cadastrar usuários.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(CREATE_USER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erro ao cadastrar usuário: ${errorText}`);
      }

      alert("Usuário cadastrado com sucesso!");
      setNewUser({
        codigo: Math.floor(Math.random() * 10000),
        nome: "",
        email: "",
        senha: "",
        telefone: "",
        tipousuario: "",
        empresa: "",
        ativo: true,
        datacriacao: new Date().toISOString(),
      });
      setIsDialogOpen(false);
      fetchUsuarios();
    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar usuário. Verifique a autenticação.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Usuários</h2>
        <Button onClick={() => setIsDialogOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Novo Usuário
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar usuários..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Usuário</TableHead>
              <TableHead>Cargo</TableHead>
              <TableHead>Empresa</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[100px]">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {usuarios.map((usuario) => (
              <TableRow key={usuario.codigo}>
                <TableCell>
                  <div>
                    <p className="font-medium">{usuario.nome}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                      <div className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {usuario.email}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    {usuario.tipousuario}
                  </div>
                </TableCell>
                <TableCell>{usuario.empresa}</TableCell>
                <TableCell>
                  <div
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      usuario.ativo
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {usuario.ativo ? "Ativo" : "Inativo"}
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
                      <DropdownMenuItem>
                        <Shield className="h-4 w-4 mr-2" />
                        Ver detalhes
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Pencil className="h-4 w-4 mr-2" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <Trash className="h-4 w-4 mr-2" />
                        Excluir
                      </DropdownMenuItem>
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
