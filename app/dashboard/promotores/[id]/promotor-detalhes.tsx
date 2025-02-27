"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowLeft,
  User,
  Mail,
  MapPin,
  Phone,
  Calendar,
  Briefcase,
  Pencil,
  Trash,
  Target,
  Building2,
  FileText,
  DollarSign,
  BarChart3,
  ShoppingCart,
  Users,
  CheckCircle2
} from "lucide-react";
import Link from "next/link";

// Mock data for promotores
const promotoresData = [
  {
    id: 1,
    nome: "Carlos Silva",
    email: "carlos.silva@empresa.com",
    telefone: "(11) 98765-4321",
    cpf: "123.456.789-00",
    rg: "12.345.678-9",
    dataNascimento: "1985-05-15",
    endereco: "Rua das Flores, 123",
    numero: "123",
    complemento: "Apto 45",
    bairro: "Jardim Primavera",
    cidade: "São Paulo",
    estado: "SP",
    cep: "01234-567",
    cargo: "Promotor",
    status: "Ativo",
    comissao: 5.5,
    dataContratacao: "2020-03-10",
    territorios: [
      { id: 1, nome: "São Paulo - Capital" },
      { id: 2, nome: "São Paulo - Interior" }
    ],
    representadas: [
      { id: 1, nome: "Xalingo Brinquedos" },
      { id: 2, nome: "Athia Heroes" }
    ],
    observacoes: "Promotor experiente com ótimo histórico de vendas.",
    estatisticas: {
      vendasMes: 32,
      clientesAtendidos: 45,
      metaAtingida: 92,
      ticketMedio: 4850.75
    }
  },
  {
    id: 2,
    nome: "Ana Santos",
    email: "ana.santos@empresa.com",
    telefone: "(11) 97654-3210",
    cpf: "987.654.321-00",
    rg: "98.765.432-1",
    dataNascimento: "1990-08-22",
    endereco: "Avenida Paulista, 1000",
    numero: "1000",
    complemento: "Sala 45",
    bairro: "Bela Vista",
    cidade: "São Paulo",
    estado: "SP",
    cep: "01310-100",
    cargo: "Promotora",
    status: "Ativo",
    comissao: 6.0,
    dataContratacao: "2021-01-15",
    territorios: [
      { id: 3, nome: "Rio de Janeiro" }
    ],
    representadas: [
      { id: 3, nome: "Brasil Fit" },
      { id: 4, nome: "Sinteplast" }
    ],
    observacoes: "Especialista em negociação com grandes redes.",
    estatisticas: {
      vendasMes: 28,
      clientesAtendidos: 38,
      metaAtingida: 85,
      ticketMedio: 5230.50
    }
  },
  {
    id: 3,
    nome: "Roberto Lima",
    email: "roberto.lima@empresa.com",
    telefone: "(11) 96543-2109",
    cpf: "456.789.123-00",
    rg: "45.678.912-3",
    dataNascimento: "1982-11-30",
    endereco: "Rua Augusta, 500",
    numero: "500",
    complemento: "",
    bairro: "Consolação",
    cidade: "São Paulo",
    estado: "SP",
    cep: "01304-000",
    cargo: "Promotor",
    status: "Inativo",
    comissao: 5.0,
    dataContratacao: "2019-06-20",
    territorios: [
      { id: 4, nome: "Minas Gerais" },
      { id: 5, nome: "Região Sul" }
    ],
    representadas: [
      { id: 5, nome: "Patta" }
    ],
    observacoes: "Atualmente em licença médica.",
    estatisticas: {
      vendasMes: 15,
      clientesAtendidos: 22,
      metaAtingida: 65,
      ticketMedio: 3850.25
    }
  }
];

function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
      <div className="grid gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-[200px]" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function PromotorDetalhes() {
  const router = useRouter();
  const params = useParams();
  const promotorId = Number(params.id);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Find promotor details
  const promotorDetalhes = promotoresData.find(p => p.id === promotorId);

  // Simulate loading
  useState(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  });

  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      // Aqui iria a lógica de deleção
      await new Promise(resolve => setTimeout(resolve, 1000));
      router.push('/dashboard/promotores');
    } catch (err) {
      setError('Erro ao excluir o promotor. Tente novamente.');
    } finally {
      setDeleteLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 space-y-4 p-8 pt-6">
        <LoadingSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center text-red-500">{error}</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!promotorDetalhes) {
    return (
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center text-muted-foreground">Promotor não encontrado</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <h2 className="text-3xl font-bold tracking-tight">Detalhes do Promotor</h2>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => router.push(`/dashboard/promotores/${promotorId}/editar`)}
          >
            <Pencil className="h-4 w-4" />
            Editar
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="gap-2">
                <Trash className="h-4 w-4" />
                Excluir
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                <AlertDialogDescription>
                  Tem certeza que deseja excluir este promotor? Esta ação não pode ser desfeita.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} disabled={deleteLoading}>
                  {deleteLoading ? "Excluindo..." : "Excluir"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* Métricas do Promotor */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vendas no Mês</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{promotorDetalhes.estatisticas.vendasMes}</div>
            <p className="text-xs text-muted-foreground mt-1">
              pedidos realizados
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clientes Atendidos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{promotorDetalhes.estatisticas.clientesAtendidos}</div>
            <p className="text-xs text-muted-foreground mt-1">
              clientes no total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Meta Atingida</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{promotorDetalhes.estatisticas.metaAtingida}%</div>
            <p className="text-xs text-muted-foreground mt-1">
              da meta mensal
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ticket Médio</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {promotorDetalhes.estatisticas.ticketMedio.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              })}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              por pedido
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6">
        {/* Dados Pessoais */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Dados Pessoais
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Nome Completo</h4>
                <p>{promotorDetalhes.nome}</p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Email</h4>
                <p className="flex items-center gap-1">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  {promotorDetalhes.email}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">CPF</h4>
                <p>{promotorDetalhes.cpf}</p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">RG</h4>
                <p>{promotorDetalhes.rg}</p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Data de Nascimento</h4>
                <p className="flex items-center gap-1">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  {new Date(promotorDetalhes.dataNascimento).toLocaleDateString('pt-BR')}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Telefone</h4>
                <p className="flex items-center gap-1">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  {promotorDetalhes.telefone}
                </p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Data de Contratação</h4>
                <p className="flex items-center gap-1">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  {new Date(promotorDetalhes.dataContratacao).toLocaleDateString('pt-BR')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Endereço */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Endereço
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Endereço</h4>
                <p>{promotorDetalhes.endereco}, {promotorDetalhes.numero}</p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Complemento</h4>
                <p>{promotorDetalhes.complemento || "N/A"}</p>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-6">
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Bairro</h4>
                <p>{promotorDetalhes.bairro}</p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">CEP</h4>
                <p>{promotorDetalhes.cep}</p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Cidade</h4>
                <p>{promotorDetalhes.cidade}</p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Estado</h4>
                <p>{promotorDetalhes.estado}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Informações Profissionais */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Informações Profissionais
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-3 gap-6">
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Cargo</h4>
                <p>{promotorDetalhes.cargo}</p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Status</h4>
                <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                  promotorDetalhes.status === 'Ativo' 
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {promotorDetalhes.status}
                </div>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Comissão</h4>
                <p className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  {promotorDetalhes.comissao}%
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-sm text-muted-foreground mb-2">Territórios de Atuação</h4>
              <div className="flex flex-wrap gap-2 mt-2">
                {promotorDetalhes.territorios.map((territorio) => (
                  <div 
                    key={territorio.id}
                    className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-secondary"
                  >
                    <Target className="h-4 w-4 mr-2" />
                    {territorio.nome}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-sm text-muted-foreground mb-2">Representadas</h4>
              <div className="flex flex-wrap gap-2 mt-2">
                {promotorDetalhes.representadas.map((representada) => (
                  <div 
                    key={representada.id}
                    className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-secondary"
                  >
                    <Building2 className="h-4 w-4 mr-2" />
                    {representada.nome}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Desempenho */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Desempenho
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
              <p className="text-muted-foreground">Gráfico de desempenho será implementado aqui</p>
            </div>
          </CardContent>
        </Card>

        {/* Observações */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Observações
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{promotorDetalhes.observacoes}</p>
          </CardContent>
        </Card>

        {/* Ações Rápidas */}
        <Card>
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="w-full gap-2">
                <ShoppingCart className="h-4 w-4" />
                Ver Pedidos
              </Button>
              <Button className="w-full gap-2">
                <Calendar className="h-4 w-4" />
                Ver Agenda
              </Button>
              <Button className="w-full gap-2">
                <CheckCircle2 className="h-4 w-4" />
                Definir Metas
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}