"use client";

import { useState } from "react";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Cable, Search, Link as LinkIcon, Key, Lock, User } from "lucide-react";

const integracoes = [
  {
    id: 1,
    nome: "Xalingo API",
    status: "Ativo",
    tipo: "Catálogo de Produtos",
    ultimaSinc: "19/02/2025 15:30",
    descricao: "Integração com a API de produtos da Xalingo para sincronização de catálogo e preços."
  },
  {
    id: 2,
    nome: "Athia Heroes API",
    status: "Configuração Pendente",
    tipo: "Pedidos",
    ultimaSinc: "N/A",
    descricao: "Integração com a API de pedidos da Athia Heroes para envio automático de pedidos."
  },
  {
    id: 3,
    nome: "Brasil Fit Integração",
    status: "Ativo",
    tipo: "Catálogo e Pedidos",
    ultimaSinc: "19/02/2025 14:45",
    descricao: "Integração completa com a Brasil Fit para sincronização de produtos e pedidos."
  },
  {
    id: 4,
    nome: "Sinteplast API",
    status: "Inativo",
    tipo: "Catálogo de Produtos",
    ultimaSinc: "15/02/2025 10:15",
    descricao: "Integração com a API de produtos da Sinteplast para sincronização de catálogo."
  },
  {
    id: 5,
    nome: "Patta Integração",
    status: "Ativo",
    tipo: "Catálogo e Pedidos",
    ultimaSinc: "18/02/2025 09:30",
    descricao: "Integração completa com a Patta para sincronização de produtos e pedidos."
  },
];

// Mock data for representadas
const representadas = [
  { id: 1, nome: "Xalingo Brinquedos" },
  { id: 2, nome: "Athia Heroes" },
  { id: 3, nome: "Brasil Fit" },
  { id: 4, nome: "Sinteplast" },
  { id: 5, nome: "Patta" },
];

export default function IntegracoesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIntegration, setSelectedIntegration] = useState<number | null>(null);
  const [selectedRepresentada, setSelectedRepresentada] = useState<string>("");
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);
  const [isLinking, setIsLinking] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  const [authCredentials, setAuthCredentials] = useState({
    username: "",
    password: "",
    apiKey: "",
    apiSecret: "",
    clientId: "",
    clientSecret: "",
    authType: "basic"
  });

  // Filter integrations based on search term
  const filteredIntegracoes = integracoes.filter(integracao => 
    integracao.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    integracao.tipo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLinkIntegration = (integrationId: number) => {
    setSelectedIntegration(integrationId);
    setSelectedRepresentada("");
    setAuthCredentials({
      username: "",
      password: "",
      apiKey: "",
      apiSecret: "",
      clientId: "",
      clientSecret: "",
      authType: "basic"
    });
    setActiveTab("basic");
    setIsLinkDialogOpen(true);
  };

  const handleConfirmLink = async () => {
    if (!selectedRepresentada) return;
    
    setIsLinking(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log(`Linked integration ${selectedIntegration} with representada ${selectedRepresentada}`);
      console.log("Authentication credentials:", authCredentials);
      
      // Close dialog and reset state
      setIsLinkDialogOpen(false);
      setSelectedIntegration(null);
      setSelectedRepresentada("");
    } catch (error) {
      console.error("Error linking integration:", error);
    } finally {
      setIsLinking(false);
    }
  };

  const handleAuthInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setAuthCredentials(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleAuthTypeChange = (value: string) => {
    setAuthCredentials(prev => ({
      ...prev,
      authType: value
    }));
    setActiveTab(value);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ativo':
        return 'text-emerald-600';
      case 'Configuração Pendente':
        return 'text-yellow-600';
      case 'Inativo':
        return 'text-gray-500';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Integrações</h2>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Buscar integrações..." 
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredIntegracoes.map((integracao) => (
          <Card key={integracao.id} className="overflow-hidden">
            <div className={`h-2 ${
              integracao.status === 'Ativo' 
                ? 'bg-emerald-500' 
                : integracao.status === 'Configuração Pendente'
                ? 'bg-yellow-500'
                : 'bg-gray-300'
            }`}></div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cable className="h-5 w-5 text-muted-foreground" />
                {integracao.nome}
              </CardTitle>
              <CardDescription>{integracao.tipo}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Status:</span>
                    <span className={`text-sm font-medium ${getStatusColor(integracao.status)}`}>
                      {integracao.status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Última Sincronização:</span>
                    <span className="text-sm">{integracao.ultimaSinc}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{integracao.descricao}</p>
              </div>
            </CardContent>
            <CardFooter className="bg-gray-50 p-4">
              <Button 
                variant="outline" 
                className="w-full gap-2"
                onClick={() => handleLinkIntegration(integracao.id)}
              >
                <LinkIcon className="h-4 w-4" />
                Vincular com Representada
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredIntegracoes.length === 0 && (
        <div className="flex items-center justify-center h-64 border rounded-lg">
          <div className="text-center">
            <p className="text-muted-foreground">Nenhuma integração encontrada</p>
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

      {/* Link Integration Dialog */}
      <Dialog open={isLinkDialogOpen} onOpenChange={setIsLinkDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Vincular Integração com Representada</DialogTitle>
            <DialogDescription>
              Selecione a representada e forneça as credenciais de acesso para vincular com esta integração.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-6">
            <div className="space-y-2">
              <Label>Integração</Label>
              <div className="p-2 border rounded-md bg-gray-50">
                {selectedIntegration && integracoes.find(i => i.id === selectedIntegration)?.nome}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Representada</Label>
              <Select value={selectedRepresentada} onValueChange={setSelectedRepresentada}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma representada" />
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

            <div className="space-y-2">
              <Label>Tipo de Autenticação</Label>
              <Select value={authCredentials.authType} onValueChange={handleAuthTypeChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo de autenticação" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Usuário e Senha</SelectItem>
                  <SelectItem value="apikey">API Key</SelectItem>
                  <SelectItem value="oauth">OAuth 2.0</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basic">Usuário/Senha</TabsTrigger>
                <TabsTrigger value="apikey">API Key</TabsTrigger>
                <TabsTrigger value="oauth">OAuth 2.0</TabsTrigger>
              </TabsList>
              <TabsContent value="basic" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Usuário</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input 
                      id="username" 
                      placeholder="Nome de usuário" 
                      className="pl-9"
                      value={authCredentials.username}
                      onChange={handleAuthInputChange}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="Senha" 
                      className="pl-9"
                      value={authCredentials.password}
                      onChange={handleAuthInputChange}
                    />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="apikey" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="apiKey">API Key</Label>
                  <div className="relative">
                    <Key className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input 
                      id="apiKey" 
                      placeholder="API Key" 
                      className="pl-9"
                      value={authCredentials.apiKey}
                      onChange={handleAuthInputChange}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="apiSecret">API Secret</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input 
                      id="apiSecret" 
                      type="password" 
                      placeholder="API Secret" 
                      className="pl-9"
                      value={authCredentials.apiSecret}
                      onChange={handleAuthInputChange}
                    />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="oauth" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="clientId">Client ID</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input 
                      id="clientId" 
                      placeholder="Client ID" 
                      className="pl-9"
                      value={authCredentials.clientId}
                      onChange={handleAuthInputChange}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clientSecret">Client Secret</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input 
                      id="clientSecret" 
                      type="password" 
                      placeholder="Client Secret" 
                      className="pl-9"
                      value={authCredentials.clientSecret}
                      onChange={handleAuthInputChange}
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsLinkDialogOpen(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={handleConfirmLink} 
              disabled={!selectedRepresentada || isLinking}
            >
              {isLinking ? "Vinculando..." : "Confirmar Vinculação"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Label component for the dialog
function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-sm font-medium mb-1.5">{children}</div>
  );
}