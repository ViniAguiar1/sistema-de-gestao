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
import { Plus, Search, MoreHorizontal, Package } from "lucide-react";

const vendas = [
  {
    id: "PED001",
    data: "19/02/2025",
    cliente: "Empresa ABC Ltda",
    valor: 12500.00,
    status: "Aprovado",
    produtos: 8,
    representada: "Xalingo Brinquedos",
  },
  {
    id: "PED002",
    data: "18/02/2025",
    cliente: "Distribuidora XYZ",
    valor: 8750.00,
    status: "Pendente",
    produtos: 5,
    representada: "Athia Heroes",
  },
  {
    id: "PED003",
    data: "18/02/2025",
    cliente: "Comércio Sul",
    valor: 15200.00,
    status: "Aprovado",
    produtos: 12,
    representada: "Brasil Fit",
  },
  {
    id: "PED004",
    data: "17/02/2025",
    cliente: "Indústria Norte",
    valor: 6300.00,
    status: "Cancelado",
    produtos: 4,
    representada: "Sinteplast",
  },
  {
    id: "PED005",
    data: "17/02/2025",
    cliente: "Atacado Central",
    valor: 23100.00,
    status: "Aprovado",
    produtos: 15,
    representada: "Patta",
  },
];

const statusStyles = {
  Aprovado: "bg-emerald-100 text-emerald-800",
  Pendente: "bg-yellow-100 text-yellow-800",
  Cancelado: "bg-red-100 text-red-800",
};

export default function VendasPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Vendas</h2>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Nova Venda
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar vendas..." className="pl-8" />
        </div>
      </div>
      
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pedido</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Representada</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vendas.map((venda) => (
              <TableRow key={venda.id}>
                <TableCell>
                  <div>
                    <p className="font-medium">{venda.id}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <span>{venda.data}</span>
                      <span className="flex items-center gap-1">
                        <Package className="h-3 w-3" />
                        {venda.produtos} itens
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{venda.cliente}</TableCell>
                <TableCell>
                  <div className="font-medium">
                    {venda.valor.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    })}
                  </div>
                </TableCell>
                <TableCell>
                  <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    statusStyles[venda.status as keyof typeof statusStyles]
                  }`}>
                    {venda.status}
                  </div>
                </TableCell>
                <TableCell>{venda.representada}</TableCell>
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