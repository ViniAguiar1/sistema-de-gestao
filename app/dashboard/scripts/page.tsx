"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Search, CheckCircle2, AlertCircle } from "lucide-react";

const scripts = [
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
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Scripts de Vendas</h2>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Novo Script
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar scripts..." className="pl-8" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {scripts.map((script) => (
          <Card key={script.id}>
            <CardHeader>
              <CardTitle>{script.titulo}</CardTitle>
              <CardDescription>{script.descricao}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {script.perguntas.map((pergunta) => (
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
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}