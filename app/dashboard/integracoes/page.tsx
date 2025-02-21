"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Cable, Plus } from "lucide-react";

const integracoes = [
  {
    nome: "Xalingo API",
    status: "Ativo",
    tipo: "Catálogo de Produtos",
    ultimaSinc: "19/02/2025 15:30",
  },
  {
    nome: "Athia Heroes API",
    status: "Configuração Pendente",
    tipo: "Pedidos",
    ultimaSinc: "N/A",
  },
  {
    nome: "Brasil Fit Integração",
    status: "Ativo",
    tipo: "Catálogo e Pedidos",
    ultimaSinc: "19/02/2025 14:45",
  },
];

export default function IntegracoesPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Integrações</h2>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Nova Integração
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {integracoes.map((integracao, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cable className="h-5 w-5 text-muted-foreground" />
                {integracao.nome}
              </CardTitle>
              <CardDescription>{integracao.tipo}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Status:</span>
                  <span className={`text-sm font-medium ${
                    integracao.status === 'Ativo' 
                      ? 'text-emerald-600'
                      : 'text-yellow-600'
                  }`}>
                    {integracao.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Última Sincronização:</span>
                  <span className="text-sm">{integracao.ultimaSinc}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}