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
import { Plus, Search, MoreHorizontal, MapPin, Phone, Mail } from "lucide-react";

const empresas = [
  {
    id: 1,
    nome: "Matriz Comercial",
    cnpj: "12.345.678/0001-90",
    responsavel: "João Silva",
    telefone: "(11) 3456-7890",
    email: "contato@matriz.com",
    cidade: "São Paulo",
    estado: "SP",
    status: "Matriz",
  },
  {
    id: 2,
    nome: "Filial SP Interior",
    cnpj: "12.345.678/0002-71",
    responsavel: "Maria Santos",
    telefone: "(16) 3456-7890",
    email: "contato.sp@filial.com",
    cidade: "Ribeirão Preto",
    estado: "SP",
    status: "Filial",
  },
  {
    id: 3,
    nome: "Filial RJ",
    cnpj: "12.345.678/0003-52",
    responsavel: "Pedro Costa",
    telefone: "(21) 3456-7890",
    email: "contato.rj@filial.com",
    cidade: "Rio de Janeiro",
    estado: "RJ",
    status: "Filial",
  },
];

export default function EmpresasPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Empresas</h2>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Nova Empresa
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar empresas..." className="pl-8" />
        </div>
      </div>
      
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Empresa</TableHead>
              <TableHead>Responsável</TableHead>
              <TableHead>Contato</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {empresas.map((empresa) => (
              <TableRow key={empresa.id}>
                <TableCell>
                  <div>
                    <p className="font-medium">{empresa.nome}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {empresa.cidade}/{empresa.estado}
                      </div>
                      <span className="text-xs">{empresa.cnpj}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{empresa.responsavel}</TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-sm">
                      <Phone className="h-3 w-3 text-muted-foreground" />
                      {empresa.telefone}
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Mail className="h-3 w-3 text-muted-foreground" />
                      {empresa.email}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    empresa.status === 'Matriz' 
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {empresa.status}
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