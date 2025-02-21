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
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { Download, Package } from "lucide-react";

const vendasPorCategoria = [
  { categoria: "Brinquedos", valor: 185000, cor: "hsl(var(--chart-1))" },
  { categoria: "Games", valor: 142000, cor: "hsl(var(--chart-2))" },
  { categoria: "Fitness", valor: 98000, cor: "hsl(var(--chart-3))" },
  { categoria: "Tintas", valor: 76000, cor: "hsl(var(--chart-4))" },
  { categoria: "Calçados", valor: 64000, cor: "hsl(var(--chart-5))" },
];

const produtosMaisVendidos = [
  {
    id: 1,
    codigo: "XLG-001",
    nome: "Boneco Aventureiro",
    categoria: "Brinquedos",
    vendas: 850,
    valor: 76415,
    estoque: 150,
  },
  {
    id: 2,
    codigo: "ATH-123",
    nome: "Console Portátil Hero X",
    categoria: "Games",
    vendas: 425,
    valor: 382457.50,
    estoque: 45,
  },
  {
    id: 3,
    codigo: "BF-456",
    nome: "Esteira Elétrica Pro",
    categoria: "Fitness",
    vendas: 128,
    valor: 447987.20,
    estoque: 12,
  },
  {
    id: 4,
    codigo: "SP-789",
    nome: "Tinta Acrílica Premium 18L",
    categoria: "Tintas",
    vendas: 312,
    valor: 90448.80,
    estoque: 80,
  },
  {
    id: 5,
    codigo: "PT-321",
    nome: "Tênis Runner Pro",
    categoria: "Calçados",
    vendas: 245,
    valor: 97975.50,
    estoque: 0,
  },
];

export default function RelatorioProdutosPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Relatório de Produtos </h2>
        <Button className="gap-2">
          <Download className="h-4 w-4" />
          Exportar Relatório
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Total de Produtos</CardTitle>
            <CardDescription>Em catálogo</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">487</div>
            <p className="text-xs text-muted-foreground mt-1">
              +24 novos produtos este mês
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Produtos Vendidos</CardTitle>
            <CardDescription>Este mês</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.960</div>
            <p className="text-xs text-muted-foreground mt-1">
              +8% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Produtos em Baixa</CardTitle>
            <CardDescription>Estoque crítico</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground mt-1">
              Necessário reposição
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Categorias</CardTitle>
            <CardDescription>Total ativas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground mt-1">
              Todas com produtos ativos
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Vendas por Categoria</CardTitle>
            <CardDescription>Distribuição do faturamento</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={vendasPorCategoria}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="valor"
                  >
                    {vendasPorCategoria.map((entry, index) => (
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

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Produtos Mais Vendidos</CardTitle>
            <CardDescription>Top 5 em volume de vendas</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produto</TableHead>
                  <TableHead>Vendas</TableHead>
                  <TableHead>Valor Total</TableHead>
                  <TableHead>Estoque</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {produtosMaisVendidos.map((produto) => (
                  <TableRow key={produto.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{produto.nome}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                          <div className="flex items-center gap-1">
                            <Package className="h-3 w-3" />
                            {produto.codigo}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{produto.vendas} un</TableCell>
                    <TableCell>
                      {produto.valor.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      })}
                    </TableCell>
                    <TableCell>
                      <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        produto.estoque > 50
                          ? 'bg-emerald-100 text-emerald-800'
                          : produto.estoque > 0
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {produto.estoque} un
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