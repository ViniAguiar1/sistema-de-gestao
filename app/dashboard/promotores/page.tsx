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
import { Plus, Search, MoreHorizontal, Mail, Phone, MapPin, UserCheck } from "lucide-react";

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
  },
];

export default function PromotoresPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Promotores de Venda</h2>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Novo Promotor
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar promotores..." className="pl-8" />
        </div>
      </div>
      
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Promotor</TableHead>
              <TableHead>Contato</TableHead>
              <TableHead>Localização</TableHead>
              <TableHead>Desempenho</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {promotores.map((promotor) => (
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