"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer 
} from "recharts";
import { Download, Building2 } from "lucide-react";

const comissoesMensais = [
  { mes: "Jan", valor: 5850 },
  { mes: "Fev", valor: 4325 },
  { mes: "Mar", valor: 6480 },
  { mes: "Abr", valor: 5290 },
  { mes: "Mai", valor: 6150 },
  { mes: "Jun", valor: 7308 },
];

const comissoesPorRepresentada = [
  {
    id: 1,
    representada: "Xalingo Brinquedos",
    vendas: 185000,
    comissao: 8,
    valor: 14800,
    status: "Pago",
  },
  {
    id: 2,
    representada: "Athia Heroes",
    vendas: 142000,
    comissao: 10,
    valor: 14200,
    status: "Pendente",
  },
  {
    id: 3,
    representada: "Brasil Fit",
    vendas: 98000,
    comissao: 12,
    valor: 11760,
    status: "Pago",
  },
  {
    id: 4,
    representada: "Sinteplast",
    vendas: 76000,
    comissao: 7,
    valor: 5320,
    status: "Pendente",
  },
  {
    id: 5,
    representada: "Patta",
    vendas: 64000,
    comissao: 9,
    valor: 5760,
    status: "Pago",
  },
];

export default function RelatorioComissoesPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Relatório de Comissões</h2>
        <Button className="gap-2">
          <Download className="h-4 w-4" />
          Exportar Relatório
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Total de Comissões</CardTitle>
            <CardDescription>Mês atual</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 51.840,00</div>
            <p className="text-xs text-muted-foreground mt-1">
              +8% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Comissões Pagas</CardTitle>
            <CardDescription>Mês atual</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 32.320,00</div>
            <p className="text-xs text-muted-foreground mt-1">
              62% do total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Comissões Pendentes</CardTitle>
            <CardDescription>Mês atual</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 19.520,00</div>
            <p className="text-xs text-muted-foreground mt-1">
              38% do total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Média de Comissão</CardTitle>
            <CardDescription>Por representada</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">9,2%</div>
            <p className="text-xs text-muted-foreground mt-1">
              Variação de 7% a 12%
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Comissões por Mês</CardTitle>
            <CardDescription>Últimos 6 meses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comissoesMensais}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar 
                    dataKey="valor" 
                    name="Comissões (R$)"
                    fill="hsl(var(--chart-1))" 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Comissões por Representada</CardTitle>
            <CardDescription>Mês atual</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Representada</TableHead>
                  <TableHead>Vendas</TableHead>
                  <TableHead>Comissão</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {comissoesPorRepresentada.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        {item.representada}
                      </div>
                    </TableCell>
                    <TableCell>
                      {item.vendas.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      })}
                    </TableCell>
                    <TableCell>{item.comissao}%</TableCell>
                    <TableCell>
                      {item.valor.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      })}
                    </TableCell>
                    <TableCell>
                      <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        item.status === 'Pago' 
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {item.status}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}