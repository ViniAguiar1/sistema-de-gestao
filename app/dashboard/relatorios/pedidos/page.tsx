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
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { Download } from "lucide-react";

const pedidosPorStatus = [
  { status: "Aprovado", quantidade: 28, cor: "hsl(var(--chart-1))" },
  { status: "Pendente", quantidade: 12, cor: "hsl(var(--chart-2))" },
  { status: "Cancelado", quantidade: 4, cor: "hsl(var(--chart-3))" },
];

const pedidosPorMes = [
  { mes: "Jan", aprovados: 42, pendentes: 15, cancelados: 3 },
  { mes: "Fev", aprovados: 38, pendentes: 12, cancelados: 4 },
  { mes: "Mar", aprovados: 52, pendentes: 18, cancelados: 6 },
  { mes: "Abr", aprovados: 41, pendentes: 14, cancelados: 3 },
  { mes: "Mai", aprovados: 48, pendentes: 16, cancelados: 5 },
  { mes: "Jun", aprovados: 58, pendentes: 20, cancelados: 4 },
];

const valorMedioPorMes = [
  { mes: "Jan", valor: 4250 },
  { mes: "Fev", valor: 3980 },
  { mes: "Mar", valor: 4680 },
  { mes: "Abr", valor: 4120 },
  { mes: "Mai", valor: 4350 },
  { mes: "Jun", valor: 4580 },
];

export default function RelatorioPedidosPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Relatório de Pedidos</h2>
        <Button className="gap-2">
          <Download className="h-4 w-4" />
          Exportar Relatório
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Total de Pedidos</CardTitle>
            <CardDescription>Últimos 30 dias</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">44</div>
            <p className="text-xs text-muted-foreground mt-1">
              +12% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Taxa de Aprovação</CardTitle>
            <CardDescription>Últimos 30 dias</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89%</div>
            <p className="text-xs text-muted-foreground mt-1">
              +2% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Valor Médio</CardTitle>
            <CardDescription>Por pedido</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 4.580,00</div>
            <p className="text-xs text-muted-foreground mt-1">
              +5% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Tempo Médio</CardTitle>
            <CardDescription>Até aprovação</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4 dias</div>
            <p className="text-xs text-muted-foreground mt-1">
              -0.5 dias em relação ao mês anterior
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Pedidos por Mês</CardTitle>
            <CardDescription>Distribuição por status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={pedidosPorMes}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="aprovados" name="Aprovados" fill="hsl(var(--chart-1))" />
                  <Bar dataKey="pendentes" name="Pendentes" fill="hsl(var(--chart-2))" />
                  <Bar dataKey="cancelados" name="Cancelados" fill="hsl(var(--chart-3))" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Status dos Pedidos</CardTitle>
            <CardDescription>Distribuição atual</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pedidosPorStatus}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="quantidade"
                  >
                    {pedidosPorStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.cor} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Valor Médio dos Pedidos</CardTitle>
          <CardDescription>Evolução mensal</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={valorMedioPorMes}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="valor" 
                  name="Valor Médio (R$)"
                  stroke="hsl(var(--chart-1))" 
                  activeDot={{ r: 8 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}