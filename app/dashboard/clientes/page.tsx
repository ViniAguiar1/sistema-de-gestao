"use client";

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
import { Plus, Search, MoreHorizontal, Phone, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const clientes = [
  {
    id: 1,
    nome: "Empresa ABC Ltda",
    contato: "João Silva",
    telefone: "(11) 98765-4321",
    email: "joao.silva@abc.com",
    cidade: "São Paulo",
    estado: "SP",
    status: "Ativo",
  },
  {
    id: 2,
    nome: "Distribuidora XYZ",
    contato: "Maria Santos",
    telefone: "(21) 97654-3210",
    email: "maria@xyz.com",
    cidade: "Rio de Janeiro",
    estado: "RJ",
    status: "Ativo",
  },
  {
    id: 3,
    nome: "Comércio Sul",
    contato: "Pedro Oliveira",
    telefone: "(51) 96543-2109",
    email: "pedro@sul.com",
    cidade: "Porto Alegre",
    estado: "RS",
    status: "Inativo",
  },
];

export default function ClientesPage() {
  const router = useRouter();

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Clientes</h2>
        <Link href="/dashboard/clientes/novo">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Novo Cliente
          </Button>
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar clientes..." className="pl-8" />
        </div>
      </div>
      
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cliente</TableHead>
              <TableHead>Contato</TableHead>
              <TableHead>Cidade/UF</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[100px]">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clientes.map((cliente) => (
              <TableRow key={cliente.id}>
                <TableCell>
                  <div>
                    <p className="font-medium">{cliente.nome}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                      <div className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {cliente.telefone}
                      </div>
                      <div className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {cliente.email}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{cliente.contato}</TableCell>
                <TableCell>{cliente.cidade}/{cliente.estado}</TableCell>
                <TableCell>
                  <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    cliente.status === 'Ativo' 
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {cliente.status}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => router.push(`/dashboard/clientes/${cliente.id}`)}
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}