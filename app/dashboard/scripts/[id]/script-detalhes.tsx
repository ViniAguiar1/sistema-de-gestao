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
  Pencil,
  Trash,
  AlertCircle,
  CheckCircle2,
  FileText,
  MessageSquare,
  ListChecks,
  ToggleLeft,
  BarChart4,
  Download,
  Share2
} from "lucide-react";

// Mock data for scripts
const scriptsData = [
  {
    id: 1,
    titulo: "Abordagem Inicial",
    descricao: "Script para primeiro contato com potenciais clientes",
    dataCriacao: "2025-01-15",
    ultimaAtualizacao: "2025-02-10",
    autor: "Carlos Silva",
    perguntas: [
      {
        id: 1,
        pergunta: "Qual o principal desafio da sua empresa hoje?",
        tipo: "aberta",
        obrigatoria: true,
      },
      {
        id: 2,
        pergunta: "Quantos funcionários sua empresa possui?",
        tipo: "multipla",
        opcoes: ["1-10", "11-50", "51-200", "201+"],
        obrigatoria: true,
      },
      {
        id: 3,
        pergunta: "Qual seu orçamento mensal para compras?",
        tipo: "aberta",
        obrigatoria: false,
      },
      {
        id: 4,
        pergunta: "Quais produtos você está buscando atualmente?",
        tipo: "aberta",
        obrigatoria: true,
      },
      {
        id: 5,
        pergunta: "Você já trabalhou com algum de nossos concorrentes?",
        tipo: "booleano",
        obrigatoria: false,
      },
    ],
  },
  {
    id: 2,
    titulo: "Qualificação de Leads",
    descricao: "Perguntas para qualificar potenciais clientes",
    dataCriacao: "2025-01-20",
    ultimaAtualizacao: "2025-02-15",
    autor: "Ana Santos",
    perguntas: [
      {
        id: 1,
        pergunta: "Quem é o responsável pelas decisões de compra?",
        tipo: "aberta",
        obrigatoria: true,
      },
      {
        id: 2,
        pergunta: "Qual a frequência de compras da sua empresa?",
        tipo: "multipla",
        opcoes: ["Semanal", "Quinzenal", "Mensal", "Trimestral"],
        obrigatoria: true,
      },
      {
        id: 3,
        pergunta: "Qual o volume médio de compras por pedido?",
        tipo: "multipla",
        opcoes: ["Até R$ 5.000", "R$ 5.001 a R$ 10.000", "R$ 10.001 a R$ 50.000", "Acima de R$ 50.000"],
        obrigatoria: true,
      },
      {
        id: 4,
        pergunta: "Quais são os critérios mais importantes para escolha de fornecedores?",
        tipo: "multipla",
        opcoes: ["Preço", "Qualidade", "Prazo de entrega", "Condições de pagamento", "Relacionamento"],
        obrigatoria: true,
      },
    ],
  },
  {
    id: 3,
    titulo: "Pós-Venda",
    descricao: "Acompanhamento após a venda",
    dataCriacao: "2025-01-25",
    ultimaAtualizacao: "2025-02-20",
    autor: "Roberto Lima",
    perguntas: [
      {
        id: 1,
        pergunta: "Como você avalia nosso atendimento?",
        tipo: "multipla",
        opcoes: ["Excelente", "Bom", "Regular", "Ruim"],
        obrigatoria: true,
      },
      {
        id: 2,
        pergunta: "Você recomendaria nossos produtos?",
        tipo: "booleano",
        obrigatoria: true,
      },
      {
        id: 3,
        pergunta: "Sugestões de melhoria:",
        tipo: "aberta",
        obrigatoria: false,
      },
      {
        id: 4,
        pergunta: "Qual a probabilidade de você comprar novamente conosco?",
        tipo: "escala",
        obrigatoria: true,
      },
      {
        id: 5,
        pergunta: "Podemos entrar em contato novamente em 3 meses?",
        tipo: "booleano",
        obrigatoria: true,
      },
    ],
  },
];

function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-[200px]" />
            <Skeleton className="h-4 w-[300px]" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-[150px]" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function ScriptDetalhes() {
  const router = useRouter();
  const params = useParams();
  const scriptId = Number(params.id);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Find script details
  const scriptDetalhes = scriptsData.find(s => s.id === scriptId);

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
      router.push('/dashboard/scripts');
    } catch (err) {
      setError('Erro ao excluir o script. Tente novamente.');
    } finally {
      setDeleteLoading(false);
    }
  };

  // Helper function to get icon for question type
  const getQuestionTypeIcon = (tipo: string) => {
    switch (tipo) {
      case 'aberta':
        return <MessageSquare className="h-4 w-4" />;
      case 'multipla':
        return <ListChecks className="h-4 w-4" />;
      case 'booleano':
        return <ToggleLeft className="h-4 w-4" />;
      case 'escala':
        return <BarChart4 className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  // Helper function to get text for question type
  const getQuestionTypeText = (tipo: string) => {
    switch (tipo) {
      case 'aberta':
        return "Resposta Aberta";
      case 'multipla':
        return "Múltipla Escolha";
      case 'booleano':
        return "Sim/Não";
      case 'escala':
        return "Escala (1-5)";
      default:
        return tipo;
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

  if (!scriptDetalhes) {
    return (
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center text-muted-foreground">Script não encontrado</div>
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
          <h2 className="text-3xl font-bold tracking-tight">Detalhes do Script</h2>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => router.push(`/dashboard/scripts/${scriptId}/editar`)}
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
                  Tem certeza que deseja excluir este script? Esta ação não pode ser desfeita.
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
        {/* Informações do Script */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              {scriptDetalhes.titulo}
            </CardTitle>
            <CardDescription>{scriptDetalhes.descricao}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-1">Criado em</h4>
                <p>{new Date(scriptDetalhes.dataCriacao).toLocaleDateString('pt-BR')}</p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-1">Última atualização</h4>
                <p>{new Date(scriptDetalhes.ultimaAtualizacao).toLocaleDateString('pt-BR')}</p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-1">Autor</h4>
                <p>{scriptDetalhes.autor}</p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-1">Total de perguntas</h4>
                <p>{scriptDetalhes.perguntas.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Perguntas do Script */}
        <Card>
          <CardHeader>
            <CardTitle>Perguntas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {scriptDetalhes.perguntas.map((pergunta, index) => (
                <div key={pergunta.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-2">
                      <div className="mt-1">
                        {pergunta.obrigatoria ? (
                          <AlertCircle className="h-4 w-4 text-red-500" />
                        ) : (
                          <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium">
                          {index + 1}. {pergunta.pergunta}
                        </h3>
                        <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                          {getQuestionTypeIcon(pergunta.tipo)}
                          <span>{getQuestionTypeText(pergunta.tipo)}</span>
                          {pergunta.obrigatoria && (
                            <span className="text-red-500 ml-2">*Obrigatória</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {pergunta.tipo === 'multipla' && pergunta.opcoes && (
                    <div className="mt-4 ml-6">
                      <h4 className="text-sm font-medium mb-2">Opções de resposta:</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {pergunta.opcoes.map((opcao, opcaoIndex) => (
                          <div 
                            key={opcaoIndex}
                            className="flex items-center gap-2 p-2 border rounded-md"
                          >
                            <div className="h-4 w-4 rounded-full border border-primary flex items-center justify-center">
                              <div className="h-2 w-2 rounded-full bg-primary"></div>
                            </div>
                            <span>{opcao}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {pergunta.tipo === 'booleano' && (
                    <div className="mt-4 ml-6">
                      <div className="flex gap-4">
                        <div className="flex items-center gap-2 p-2 border rounded-md">
                          <div className="h-4 w-4 rounded-full border border-primary flex items-center justify-center">
                            <div className="h-2 w-2 rounded-full bg-primary"></div>
                          </div>
                          <span>Sim</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 border rounded-md">
                          <div className="h-4 w-4 rounded-full border border-muted-foreground flex items-center justify-center">
                          </div>
                          <span>Não</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {pergunta.tipo === 'escala' && (
                    <div className="mt-4 ml-6">
                      <h4 className="text-sm font-medium mb-2">Escala de 1 a 5:</h4>
                      <div className="flex gap-4">
                        {[1, 2, 3, 4, 5].map((valor) => (
                          <div 
                            key={valor}
                            className="flex items-center justify-center h-8 w-8 rounded-full border border-primary"
                          >
                            {valor}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
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
                <Download className="h-4 w-4" />
                Exportar Script
              </Button>
              <Button className="w-full gap-2">
                <Share2 className="h-4 w-4" />
                Compartilhar
              </Button>
              <Button className="w-full gap-2" variant="outline">
                <Pencil className="h-4 w-4" />
                Duplicar Script
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}