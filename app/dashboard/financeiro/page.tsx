// @ts-nocheck
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowDown, ArrowUp, DollarSign, Plus } from "lucide-react";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { addDays, differenceInDays, isWithinInterval } from "date-fns";

// Mock data for representadas
const representadas = [
  { id: 1, nome: "Xalingo Brinquedos" },
  { id: 2, nome: "Athia Heroes" },
  { id: 3, nome: "Brasil Fit" },
  { id: 4, nome: "Sinteplast" },
  { id: 5, nome: "Patta" },
];

// Mock financial data
const mockTransactions = [
  {
    id: 1,
    descricao: "Comissão Vendas Janeiro",
    valor: 2500,
    tipo: "receita",
    categoria: "comissao",
    data: "2025-01-15",
    representadaId: 1, // Xalingo
  },
  {
    id: 2,
    descricao: "Comissão Vendas Janeiro",
    valor: 1800,
    tipo: "receita",
    categoria: "comissao",
    data: "2025-01-20",
    representadaId: 2, // Athia
  },
  {
    id: 3,
    descricao: "Comissão Vendas Janeiro",
    valor: 1130,
    tipo: "receita",
    categoria: "comissao",
    data: "2025-01-25",
    representadaId: 3, // Brasil Fit
  },
  {
    id: 4,
    descricao: "Venda Direta Cliente ABC",
    valor: 25000,
    tipo: "receita",
    categoria: "venda",
    data: "2025-01-10",
    representadaId: 1, // Xalingo
  },
  {
    id: 5,
    descricao: "Venda Direta Cliente XYZ",
    valor: 18500,
    tipo: "receita",
    categoria: "venda",
    data: "2025-01-12",
    representadaId: 2, // Athia
  },
  {
    id: 6,
    descricao: "Venda Direta Cliente DEF",
    valor: 4750,
    tipo: "receita",
    categoria: "venda",
    data: "2025-01-18",
    representadaId: 3, // Brasil Fit
  },
  {
    id: 7,
    descricao: "Despesa com Combustível",
    valor: 450,
    tipo: "despesa",
    categoria: "despesa_operacional",
    data: "2025-01-05",
    representadaId: null, // Geral
  },
  {
    id: 8,
    descricao: "Aluguel Escritório",
    valor: 800,
    tipo: "despesa",
    categoria: "despesa_administrativa",
    data: "2025-01-01",
    representadaId: null, // Geral
  },
];

export default function FinanceiroPage() {
  const [isNewTransactionOpen, setIsNewTransactionOpen] = useState(false);
  const [selectedRepresentada, setSelectedRepresentada] = useState<string | null>(null);
  const [date, setDate] = useState({
    from: new Date(),
    to: addDays(new Date(), 30),
  });
  const [newTransaction, setNewTransaction] = useState({
    descricao: "",
    valor: "",
    tipo: "receita",
    data: "",
    representada: "",
    categoria: "",
    observacao: "",
  });

  // Financial metrics state
  const [financialMetrics, setFinancialMetrics] = useState({
    receitaTotal: 0,
    comissoes: 0,
    despesas: 0,
    receitaVariacao: 0,
    comissoesVariacao: 0,
    despesasVariacao: 0,
  });

  // Validate date range
  const handleDateChange = (newDate: { from: Date; to: Date }) => {
    const diffDays = differenceInDays(newDate.to, newDate.from);
    if (diffDays > 60) {
      // If more than 60 days, adjust the end date
      newDate.to = addDays(newDate.from, 60);
    }
    setDate(newDate);
  };

  const handleCreateTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você implementaria a lógica para salvar a transação
    console.log("Nova transação:", newTransaction);
    setIsNewTransactionOpen(false);
    // Limpar o formulário
    setNewTransaction({
      descricao: "",
      valor: "",
      tipo: "receita",
      data: "",
      representada: "",
      categoria: "",
      observacao: "",
    });
  };

  // Filter transactions based on selected representada and date range
  useEffect(() => {
    // Filter transactions based on date range and representada
    const filteredTransactions = mockTransactions.filter(transaction => {
      const transactionDate = new Date(transaction.data);
      const isInDateRange = isWithinInterval(transactionDate, {
        start: date.from,
        end: date.to
      });

      // Check if representada matches (or if no representada is selected)
      const representadaMatches = selectedRepresentada 
        ? transaction.representadaId === parseInt(selectedRepresentada)
        : true;

      return isInDateRange && representadaMatches;
    });

    // Calculate financial metrics
    const receitas = filteredTransactions
      .filter(t => t.tipo === "receita" && t.categoria !== "comissao")
      .reduce((sum, t) => sum + t.valor, 0);
    
    const comissoes = filteredTransactions
      .filter(t => t.categoria === "comissao")
      .reduce((sum, t) => sum + t.valor, 0);
    
    const despesas = filteredTransactions
      .filter(t => t.tipo === "despesa")
      .reduce((sum, t) => sum + t.valor, 0);

    // Set metrics with mock variations
    setFinancialMetrics({
      receitaTotal: receitas,
      comissoes: comissoes,
      despesas: despesas,
      receitaVariacao: 8,
      comissoesVariacao: 12,
      despesasVariacao: -2,
    });
  }, [selectedRepresentada, date]);

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Financeiro</h2>
        <Dialog open={isNewTransactionOpen} onOpenChange={setIsNewTransactionOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Nova Movimentação
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <form onSubmit={handleCreateTransaction}>
              <DialogHeader>
                <DialogTitle>Nova Movimentação Financeira</DialogTitle>
                <DialogDescription>
                  Preencha os detalhes da nova movimentação
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="descricao">Descrição</Label>
                    <Input
                      id="descricao"
                      placeholder="Descrição da movimentação"
                      value={newTransaction.descricao}
                      onChange={(e) => setNewTransaction({ ...newTransaction, descricao: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="valor">Valor</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="valor"
                        type="number"
                        step="0.01"
                        placeholder="0,00"
                        className="pl-9"
                        value={newTransaction.valor}
                        onChange={(e) => setNewTransaction({ ...newTransaction, valor: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tipo">Tipo</Label>
                    <Select
                      value={newTransaction.tipo}
                      onValueChange={(value) => setNewTransaction({ ...newTransaction, tipo: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="receita">Receita</SelectItem>
                        <SelectItem value="despesa">Despesa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="data">Data</Label>
                    <Input
                      id="data"
                      type="date"
                      value={newTransaction.data}
                      onChange={(e) => setNewTransaction({ ...newTransaction, data: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="representada">Representada</Label>
                    <Select
                      value={newTransaction.representada}
                      onValueChange={(value) => setNewTransaction({ ...newTransaction, representada: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a representada" />
                      </SelectTrigger>
                      <SelectContent>
                        {representadas.map((representada) => (
                          <SelectItem key={representada.id} value={representada.id.toString()}>
                            {representada.nome}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="categoria">Categoria</Label>
                  <Select
                    value={newTransaction.categoria}
                    onValueChange={(value) => setNewTransaction({ ...newTransaction, categoria: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="comissao">Comissão</SelectItem>
                      <SelectItem value="venda">Venda</SelectItem>
                      <SelectItem value="despesa_operacional">Despesa Operacional</SelectItem>
                      <SelectItem value="despesa_administrativa">Despesa Administrativa</SelectItem>
                      <SelectItem value="imposto">Imposto</SelectItem>
                      <SelectItem value="outros">Outros</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="observacao">Observação</Label>
                  <Textarea
                    id="observacao"
                    placeholder="Observações adicionais"
                    value={newTransaction.observacao}
                    onChange={(e) => setNewTransaction({ ...newTransaction, observacao: e.target.value })}
                    className="min-h-[100px]"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsNewTransactionOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">Salvar</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
      {/* Filtros */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-[200px]">
          <Select 
            value={selectedRepresentada || "todas"} 
            onValueChange={(value) => setSelectedRepresentada(value === "todas" ? null : value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Todas as representadas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todas">Todas as representadas</SelectItem>
              {representadas.map((representada) => (
                <SelectItem key={representada.id} value={representada.id.toString()}>
                  {representada.nome}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <DatePickerWithRange date={date} setDate={handleDateChange} />
      </div>

      {/* Cards de Métricas Financeiras */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {financialMetrics.receitaTotal.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              })}
            </div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <span className="text-emerald-500 flex items-center">
                <ArrowUp className="h-3 w-3" />
                +{financialMetrics.receitaVariacao}%
              </span>
              desde último mês
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Comissões</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {financialMetrics.comissoes.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              })}
            </div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <span className="text-emerald-500 flex items-center">
                <ArrowUp className="h-3 w-3" />
                +{financialMetrics.comissoesVariacao}%
              </span>
              desde último mês
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Despesas</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {financialMetrics.despesas.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              })}
            </div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <span className={financialMetrics.despesasVariacao < 0 ? "text-red-500 flex items-center" : "text-emerald-500 flex items-center"}>
                {financialMetrics.despesasVariacao < 0 ? (
                  <ArrowDown className="h-3 w-3" />
                ) : (
                  <ArrowUp className="h-3 w-3" />
                )}
                {financialMetrics.despesasVariacao}%
              </span>
              desde último mês
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Área para relatórios financeiros */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Relatório de Comissões</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
              <p className="text-muted-foreground">Gráfico de comissões será implementado aqui</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Fluxo de Caixa</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
              <p className="text-muted-foreground">Gráfico de fluxo de caixa será implementado aqui</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}