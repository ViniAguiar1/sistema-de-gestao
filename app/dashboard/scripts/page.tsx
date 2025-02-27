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
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { Plus, Search, CheckCircle2, AlertCircle, MoreHorizontal, Eye, Pencil, Trash } from "lucide-react";
import Link from "next/link";

// Mock data for scripts
const initialScripts = [
  {
    id: 1,
    titulo: "Abordagem Inicial",
    descricao: "Script para primeiro contato com potenciais clientes",
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
    ],
  },
  {
    id: 2,
    titulo: "Qualificação de Leads",
    descricao: "Perguntas para qualificar potenciais clientes",
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
    ],
  },
  {
    id: 3,
    titulo: "Pós-Venda",
    descricao: "Acompanhamento após a venda",
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
    ],
  },
];

export default function ScriptsPage() {
  const router = useRouter();
  const [scripts, setScripts] = useState(initialScripts);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [scriptToDelete, setScriptToDelete] = useState<number | null>(null);

  // Filter scripts based on search term
  const filteredScripts = scripts.filter(script => 
    script.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    script.descricao.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewScript = (id: number) => {
    router.push(`/dashboard/scripts/${id}`);
  };

  const handleEditScript = (id: number) => {
    router.push(`/dashboard/scripts/${id}/editar`);
  };

  const handleDeleteScript = async (id: number) => {
    setDeleteLoading(true);
    setScriptToDelete(id);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Remove script from state
      setScripts(scripts.filter(script => script.id !== id));
    } catch (error) {
      console.error("Error deleting script:", error);
    } finally {
      setDeleteLoading(false);
      setScriptToDelete(null);
    }
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Scripts de Vendas</h2>
        <Link href="/dashboard/scripts/novo">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Novo Script
          </Button>
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Buscar scripts..." 
            className="pl-8" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredScripts.map((script) => (
          <Card key={script.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{script.titulo}</CardTitle>
                  <CardDescription>{script.descricao}</CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleViewScript(script.id)}>
                      <Eye className="h-4 w-4 mr-2" />
                      Ver detalhes
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleEditScript(script.id)}>
                      <Pencil className="h-4 w-4 mr-2" />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <DropdownMenuItem 
                          className="text-red-600"
                          onSelect={(e) => e.preventDefault()}
                        >
                          <Trash className="h-4 w-4 mr-2" />
                          Excluir
                        </DropdownMenuItem>
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
                          <AlertDialogAction 
                            onClick={() => handleDeleteScript(script.id)}
                            disabled={deleteLoading && scriptToDelete === script.id}
                          >
                            {deleteLoading && scriptToDelete === script.id ? "Excluindo..." : "Excluir"}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {script.perguntas.slice(0, 2).map((pergunta) => (
                  <div key={pergunta.id} className="space-y-2">
                    <div className="flex items-start gap-2">
                      {pergunta.obrigatoria ? (
                        <AlertCircle className="h-4 w-4 text-red-500 mt-1" />
                      ) : (
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-1" />
                      )}
                      <div>
                        <p className="font-medium">{pergunta.pergunta}</p>
                        {pergunta.tipo === 'multipla' && pergunta.opcoes && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {pergunta.opcoes.map((opcao, index) => (
                              <span
                                key={index}
                                className="rounded-full bg-secondary px-2 py-1 text-xs"
                              >
                                {opcao}
                              </span>
                            ))}
                          </div>
                        )}
                        <p className="text-sm text-muted-foreground mt-1">
                          Tipo: {pergunta.tipo}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                {script.perguntas.length > 2 && (
                  <p className="text-sm text-muted-foreground">
                    + {script.perguntas.length - 2} pergunta(s) adicional(is)
                  </p>
                )}
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => handleViewScript(script.id)}
              >
                Ver Script Completo
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredScripts.length === 0 && (
        <div className="flex items-center justify-center h-64 border rounded-lg">
          <div className="text-center">
            <p className="text-muted-foreground">Nenhum script encontrado</p>
            {searchTerm && (
              <Button 
                variant="link" 
                onClick={() => setSearchTerm("")}
              >
                Limpar busca
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}