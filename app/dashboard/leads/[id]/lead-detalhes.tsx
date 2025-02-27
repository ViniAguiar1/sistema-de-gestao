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
  CardFooter,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowLeft,
  Building2,
  Mail,
  MapPin,
  Phone,
  User,
  Pencil,
  Trash,
  FileText,
  Calendar,
  UserCheck,
  BarChart3,
  MessageSquare,
  Clock,
  ThermometerSun,
  UserPlus
} from "lucide-react";
import Link from "next/link";

// Mock data for leads
const leadsData = [
  {
    id: 1,
    empresa: "Tech Solutions Ltda",
    contato: "Ricardo Mendes",
    cargo: "Diretor Comercial",
    telefone: "(11) 98765-4321",
    email: "ricardo@techsolutions.com",
    endereco: "Av. Paulista, 1000",
    complemento: "Sala 1010",
    bairro: "Bela Vista",
    cidade: "São Paulo",
    estado: "SP",
    cep: "01310-100",
    origem: "Indicação",
    status: "Quente",
    promotor: "Carlos Silva",
    ultimoContato: "2025-02-19",
    proximoContato: "2025-03-05",
    observacoes: "Cliente com grande potencial para compra de produtos da linha premium. Já demonstrou interesse em fazer um pedido teste.",
    historico: [
      {
        data: "2025-02-19",
        tipo: "Ligação",
        descricao: "Apresentação inicial dos produtos. Cliente demonstrou interesse na linha premium.",
        responsavel: "Carlos Silva"
      },
      {
        data: "2025-02-10",
        tipo: "Email",
        descricao: "Envio de catálogo digital com produtos selecionados.",
        responsavel: "Carlos Silva"
      },
      {
        data: "2025-02-05",
        tipo: "Ligação",
        descricao: "Primeiro contato. Cliente recebeu indicação de um parceiro.",
        responsavel: "Ana Santos"
      }
    ],
    interesses: ["Produtos Premium", "Linha Corporativa", "Serviços de Instalação"],
    potencialCompra: "Alto",
    previsaoFechamento: "2025-04-15"
  },
  {
    id: 2,
    empresa: "Mega Distribuidora",
    contato: "Patricia Santos",
    cargo: "Gerente de Compras",
    telefone: "(11) 97654-3210",
    email: "patricia@megadist.com",
    endereco: "Rua Augusta, 500",
    complemento: "Andar 5",
    bairro: "Consolação",
    cidade: "São Paulo",
    estado: "SP",
    cep: "01305-000",
    origem: "LinkedIn",
    status: "Morno",
    promotor: "Ana Santos",
    ultimoContato: "2025-02-18",
    proximoContato: "2025-03-01",
    observacoes: "Distribuidora com grande volume de vendas. Atualmente trabalha com concorrentes, mas está aberta a novas parcerias.",
    historico: [
      {
        data: "2025-02-18",
        tipo: "Reunião",
        descricao: "Apresentação da empresa e produtos. Cliente solicitou proposta comercial.",
        responsavel: "Ana Santos"
      },
      {
        data: "2025-02-12",
        tipo: "Email",
        descricao: "Agendamento de reunião presencial.",
        responsavel: "Ana Santos"
      },
      {
        data: "2025-02-08",
        tipo: "LinkedIn",
        descricao: "Primeiro contato via LinkedIn. Cliente aceitou conexão e demonstrou interesse.",
        responsavel: "Ana Santos"
      }
    ],
    interesses: ["Distribuição Exclusiva", "Produtos Linha Básica", "Condições Especiais"],
    potencialCompra: "Médio",
    previsaoFechamento: "2025-05-10"
  },
  {
    id: 3,
    empresa: "Comércio Rápido",
    contato: "Fernando Costa",
    cargo: "Proprietário",
    telefone: "(11) 96543-2109",
    email: "fernando@comerciorapido.com",
    endereco: "Av. Brigadeiro Faria Lima, 1500",
    complemento: "Loja 10",
    bairro: "Jardim Paulistano",
    cidade: "São Paulo",
    estado: "SP",
    cep: "01452-001",
    origem: "Site",
    status: "Frio",
    promotor: "Roberto Lima",
    ultimoContato: "2025-02-17",
    proximoContato: "2025-03-17",
    observacoes: "Pequeno comércio com potencial limitado. Proprietário mostrou interesse inicial, mas está focado em outros fornecedores no momento.",
    historico: [
      {
        data: "2025-02-17",
        tipo: "Ligação",
        descricao: "Follow-up após envio de material. Cliente informou que não tem interesse imediato.",
        responsavel: "Roberto Lima"
      },
      {
        data: "2025-02-14",
        tipo: "Email",
        descricao: "Envio de catálogo e lista de preços.",
        responsavel: "Roberto Lima"
      },
      {
        data: "2025-02-10",
        tipo: "Formulário Site",
        descricao: "Cliente preencheu formulário no site solicitando informações.",
        responsavel: "Sistema"
      }
    ],
    interesses: ["Produtos Básicos", "Condições de Pagamento Flexíveis"],
    potencialCompra: "Baixo",
    previsaoFechamento: "2025-06-30"
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

export function LeadDetalhes() {
  const router = useRouter();
  const params = useParams();
  const leadId = Number(params.id);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [convertLoading, setConvertLoading] = useState(false);
  const [isConvertDialogOpen, setIsConvertDialogOpen] = useState(false);

  // Find lead details
  const leadDetalhes = leadsData.find(l => l.id === leadId);

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
      router.push('/dashboard/leads');
    } catch (err) {
      setError('Erro ao excluir o lead. Tente novamente.');
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleConvertToClient = async () => {
    setConvertLoading(true);
    try {
      // Aqui iria a lógica de conversão para cliente
      await new Promise(resolve => setTimeout(resolve, 1500));
      router.push('/dashboard/clientes');
    } catch (err) {
      setError('Erro ao converter o lead para cliente. Tente novamente.');
    } finally {
      setConvertLoading(false);
      setIsConvertDialogOpen(false);
    }
  };

  // Helper function to get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Quente':
        return 'bg-red-100 text-red-800';
      case 'Morno':
        return 'bg-yellow-100 text-yellow-800';
      case 'Frio':
        return 'bg-blue-100 text-blue-800';
      case 'Convertido':
        return 'bg-emerald-100 text-emerald-800';
      case 'Perdido':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Helper function to get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Quente':
        return <ThermometerSun className="h-4 w-4" />;
      case 'Morno':
        return <ThermometerSun className="h-4 w-4" />;
      case 'Frio':
        return <ThermometerSun className="h-4 w-4" />;
      case 'Convertido':
        return <UserCheck className="h-4 w-4" />;
      case 'Perdido':
        return <Trash className="h-4 w-4" />;
      default:
        return <ThermometerSun className="h-4 w-4" />;
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

  if (!leadDetalhes) {
    return (
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center text-muted-foreground">Lead não encontrado</div>
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
          <h2 className="text-3xl font-bold tracking-tight">Detalhes do Lead</h2>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={isConvertDialogOpen} onOpenChange={setIsConvertDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <UserPlus className="h-4 w-4" />
                Converter para Cliente
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Converter Lead para Cliente</DialogTitle>
                <DialogDescription>
                  Você está prestes a converter este lead em um cliente. Todos os dados serão transferidos para o cadastro de clientes.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm mb-1">Empresa</h4>
                    <p className="text-sm">{leadDetalhes.empresa}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm mb-1">Contato</h4>
                    <p className="text-sm">{leadDetalhes.contato} - {leadDetalhes.cargo}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm mb-1">Status Atual</h4>
                    <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${getStatusColor(leadDetalhes.status)}`}>
                      {getStatusIcon(leadDetalhes.status)}
                      <span className="ml-1">{leadDetalhes.status}</span>
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsConvertDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleConvertToClient} disabled={convertLoading}>
                  {convertLoading ? "Convertendo..." : "Confirmar Conversão"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => router.push(`/dashboard/leads/${leadId}/editar`)}
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
                  Tem certeza que deseja excluir este lead? Esta ação não pode ser desfeita.
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

      <div className="grid gap-6">
        {/* Dados Principais */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Dados da Empresa
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Empresa</h4>
                <p>{leadDetalhes.empresa}</p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Status</h4>
                <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${getStatusColor(leadDetalhes.status)}`}>
                  {getStatusIcon(leadDetalhes.status)}
                  <span className="ml-1">{leadDetalhes.status}</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Origem</h4>
                <p>{leadDetalhes.origem}</p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Potencial de Compra</h4>
                <p>{leadDetalhes.potencialCompra}</p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Previsão de Fechamento</h4>
                <p className="flex items-center gap-1">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  {new Date(leadDetalhes.previsaoFechamento).toLocaleDateString('pt-BR')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contato */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Contato
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Nome</h4>
                <p>{leadDetalhes.contato}</p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Cargo</h4>
                <p>{leadDetalhes.cargo}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Email</h4>
                <p className="flex items-center gap-1">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  {leadDetalhes.email}
                </p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Telefone</h4>
                <p className="flex items-center gap-1">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  {leadDetalhes.telefone}
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
                <p>{leadDetalhes.endereco}</p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Complemento</h4>
                <p>{leadDetalhes.complemento}</p>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-6">
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Bairro</h4>
                <p>{leadDetalhes.bairro}</p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">CEP</h4>
                <p>{leadDetalhes.cep}</p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Cidade</h4>
                <p>{leadDetalhes.cidade}</p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Estado</h4>
                <p>{leadDetalhes.estado}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Acompanhamento */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="h-5 w-5" />
              Acompanhamento
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-3 gap-6">
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Promotor Responsável</h4>
                <p>{leadDetalhes.promotor}</p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Último Contato</h4>
                <p className="flex items-center gap-1">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  {new Date(leadDetalhes.ultimoContato).toLocaleDateString('pt-BR')}
                </p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Próximo Contato</h4>
                <p className="flex items-center gap-1">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  {new Date(leadDetalhes.proximoContato).toLocaleDateString('pt-BR')}
                </p>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-sm text-muted-foreground mb-2">Interesses</h4>
              <div className="flex flex-wrap gap-2 mt-1">
                {leadDetalhes.interesses.map((interesse, index) => (
                  <div 
                    key={index}
                    className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-secondary"
                  >
                    {interesse}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Histórico de Interações */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Histórico de Interações
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {leadDetalhes.historico.map((interacao, index) => (
                <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-secondary`}>
                          {interacao.tipo}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {new Date(interacao.data).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                      <p className="mt-2">{interacao.descricao}</p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {interacao.responsavel}
                    </div>
                  </div>
                </div>
              ))}
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
            <p className="text-muted-foreground">{leadDetalhes.observacoes}</p>
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
                <Phone className="h-4 w-4" />
                Registrar Contato
              </Button>
              <Button className="w-full gap-2">
                <Calendar className="h-4 w-4" />
                Agendar Visita
              </Button>
              <Button className="w-full gap-2">
                <Mail className="h-4 w-4" />
                Enviar Email
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}