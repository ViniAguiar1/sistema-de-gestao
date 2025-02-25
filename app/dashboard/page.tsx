"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  BarChart3, 
  DollarSign, 
  Users, 
  Package,
  ArrowUp,
  ArrowDown,
  Calendar,
  Target
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { addDays, differenceInDays } from "date-fns";
import { 
  BarChart, 
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

// Mock data for charts
const clientesInativosData = [
  { name: "Empresa ABC", diasSemCompra: 45, company: "xalingo" },
  { name: "Distribuidora XYZ", diasSemCompra: 30, company: "athia" },
  { name: "Comércio Sul", diasSemCompra: 25, company: "brasilfit" },
  { name: "Indústria Norte", diasSemCompra: 20, company: "xalingo" },
  { name: "Atacado Central", diasSemCompra: 15, company: "athia" },
];

const rankingClientesData = [
  { name: "Empresa ABC", valor: 150000, company: "xalingo" },
  { name: "Distribuidora XYZ", valor: 120000, company: "athia" },
  { name: "Comércio Sul", valor: 90000, company: "brasilfit" },
  { name: "Indústria Norte", valor: 75000, company: "xalingo" },
  { name: "Atacado Central", valor: 60000, company: "athia" },
];

const rankingIndustriasData = [
  { name: "Xalingo", valor: 250000, company: "xalingo" },
  { name: "Athia Heroes", valor: 200000, company: "athia" },
  { name: "Brasil Fit", valor: 150000, company: "brasilfit" },
  { name: "Sinteplast", valor: 100000, company: "xalingo" },
  { name: "Patta", valor: 80000, company: "athia" },
];

const metasVendedoresData = [
  { name: "Carlos Silva", meta: 100000, realizado: 85000, company: "xalingo" },
  { name: "Ana Santos", meta: 80000, realizado: 90000, company: "athia" },
  { name: "Roberto Lima", meta: 70000, realizado: 45000, company: "brasilfit" },
];

const compromissosData = [
  {
    id: 1,
    titulo: "Reunião Cliente ABC",
    data: "20/03/2025",
    hora: "10:00",
    tipo: "Visita",
    cliente: "Empresa ABC Ltda",
    endereco: "Av. Paulista, 1000 - São Paulo, SP",
    descricao: "Apresentação da nova linha de produtos",
    company: "xalingo",
  },
  {
    id: 2,
    titulo: "Follow-up XYZ",
    data: "20/03/2025",
    hora: "14:30",
    tipo: "Ligação",
    cliente: "Distribuidora XYZ",
    telefone: "(11) 98765-4321",
    descricao: "Acompanhamento do último pedido",
    company: "athia",
  },
  {
    id: 3,
    titulo: "Apresentação Novos Produtos",
    data: "21/03/2025",
    hora: "09:00",
    tipo: "Online",
    cliente: "Comércio Sul",
    link: "https://meet.google.com/abc-defg-hij",
    descricao: "Demonstração da coleção 2025",
    company: "brasilfit",
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const [date, setDate] = useState({
    from: new Date(),
    to: addDays(new Date(), 30),
  });
  const [selectedCompany, setSelectedCompany] = useState("all");

  // Validate date range
  const handleDateChange = (newDate: { from: Date; to: Date }) => {
    const diffDays = differenceInDays(newDate.to, newDate.from);
    if (diffDays > 60) {
      // If more than 60 days, adjust the end date
      newDate.to = addDays(newDate.from, 60);
    }
    setDate(newDate);
  };

  const handleVerDetalhes = (compromissoId: number) => {
    router.push(`/dashboard/agenda/${compromissoId}`);
  };

  const filterDataByCompany = (data: any[]) => {
    if (selectedCompany === "all") return data;
    return data.filter(item => item.company === selectedCompany);
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center gap-4">
          <Select value={selectedCompany} onValueChange={setSelectedCompany}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Todas as representadas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as representadas</SelectItem>
              <SelectItem value="xalingo">Xalingo</SelectItem>
              <SelectItem value="athia">Athia Heroes</SelectItem>
              <SelectItem value="brasilfit">Brasil Fit</SelectItem>
            </SelectContent>
          </Select>
          <DatePickerWithRange date={date} setDate={handleDateChange} />
        </div>
      </div>
      
      {/* Cards de Métricas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vendas no Período</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 48.250,00</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <span className="text-emerald-500 flex items-center">
                <ArrowUp className="h-3 w-3" />
                +12.5%
              </span>
              vs período anterior
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Novos Clientes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+8</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <span className="text-emerald-500 flex items-center">
                <ArrowUp className="h-3 w-3" />
                +20%
              </span>
              vs período anterior
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Produtos Vendidos</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <span className="text-red-500 flex items-center">
                <ArrowDown className="h-3 w-3" />
                -5%
              </span>
              vs período anterior
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Meta Atingida</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <span className="text-emerald-500 flex items-center">
                <ArrowUp className="h-3 w-3" />
                +8%
              </span>
              vs período anterior
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos e Rankings */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Clientes Inativos */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Clientes por Dias sem Compra</CardTitle>
            <CardDescription>Últimas compras realizadas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={filterDataByCompany(clientesInativosData)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="diasSemCompra" name="Dias sem Compra" fill="hsl(var(--chart-1))" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Ranking de Clientes */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Top Clientes</CardTitle>
            <CardDescription>Por volume de compras</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart layout="vertical" data={filterDataByCompany(rankingClientesData)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="valor" name="Valor (R$)" fill="hsl(var(--chart-2))" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Ranking de Indústrias */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Ranking de Indústrias</CardTitle>
            <CardDescription>Por volume de vendas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={filterDataByCompany(rankingIndustriasData)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="valor" name="Valor (R$)" fill="hsl(var(--chart-3))" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Metas de Vendedores */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Metas de Vendedores</CardTitle>
            <CardDescription>Realizado vs Meta</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart layout="vertical" data={filterDataByCompany(metasVendedoresData)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="meta" name="Meta" fill="hsl(var(--chart-4))" />
                  <Bar dataKey="realizado" name="Realizado" fill="hsl(var(--chart-5))" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Meus Compromissos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Meus Compromissos
          </CardTitle>
          <CardDescription>Próximos eventos e reuniões</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filterDataByCompany(compromissosData).map((compromisso) => (
              <div key={compromisso.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                <div>
                  <p className="font-medium">{compromisso.titulo}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                    <span>{compromisso.data}</span>
                    <span>{compromisso.hora}</span>
                    <span>{compromisso.tipo}</span>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleVerDetalhes(compromisso.id)}
                >
                  Ver detalhes
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}