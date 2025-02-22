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
import { Plus, Search, MoreHorizontal, Phone, Mail, Building2, UserCheck } from "lucide-react";

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
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Leads</h2>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Novo Lead
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar leads..." className="pl-8" />
        </div>
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
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.map((lead) => (
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
                    {lead.status}
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