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
import { Plus, Search, MoreHorizontal, Package, Building2, User } from "lucide-react";
import Link from "next/link";

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
    status: "Cancelado",
  },
];

const statusStyles = {
  Aprovado: "bg-emerald-100 text-emerald-800",
  Pendente: "bg-yellow-100 text-yellow-800",
  Cancelado: "bg-red-100 text-red-800",
};

export default function PedidosPage() {
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

      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar pedidos..." className="pl-8" />
        </div>
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
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pedidos.map((pedido) => (
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