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
  BarChart, 
  LineChart, 
  Line, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer 
} from "recharts";
import { Download } from "lucide-react";

const vendasMensais = [
  { mes: "Jan", vendas: 65000, pedidos: 45 },
  { mes: "Fev", vendas: 48250, pedidos: 38 },
  { mes: "Mar", vendas: 72300, pedidos: 52 },
  { mes: "Abr", vendas: 58900, pedidos: 41 },
  { mes: "Mai", vendas: 68400, pedidos: 48 },
  { mes: "Jun", vendas: 81200, pedidos: 58 },
];

const vendasPorRepresentada = [
  { nome: "Xalingo", valor: 185000 },
  { nome: "Athia", valor: 142000 },
  { nome: "Brasil Fit", valor: 98000 },
  { nome: "Sinteplast", valor: 76000 },
  { nome: "Patta", valor: 64000 },
];

export default function RelatorioVendasPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Relatório de Vendas</h2>
        <Button className="gap-2">
          <Download className="h-4 w-4" />
          Exportar Relatório
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total de Vendas</CardTitle>
            <CardDescription>Últimos 30 dias</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 148.250,00</div>
            <p className="text-xs text-muted-foreground mt-1">
              32 pedidos realizados
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Ticket Médio</CardTitle>
            <CardDescription>Valor médio por pedido</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 4.632,81</div>
            <p className="text-xs text-muted-foreground mt-1">
              +12% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Taxa de Conversão</CardTitle>
            <CardDescription>Pedidos aprovados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89%</div>
            <p className="text-xs text-muted-foreground mt-1">
              28 de 32 pedidos aprovados
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Vendas por Mês</CardTitle>
            <CardDescription>Últimos 6 meses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={vendasMensais}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="vendas" 
                    name="Vendas (R$)"
                    stroke="hsl(var(--chart-1))" 
                    activeDot={{ r: 8 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Vendas por Representada</CardTitle>
            <CardDescription>Total acumulado</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={vendasPorRepresentada}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="nome" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar 
                    dataKey="valor" 
                    name="Vendas (R$)"
                    fill="hsl(var(--chart-2))" 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}