"use client";

import { useState, useEffect } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Building2, Mail, Phone, MapPin, User, Calendar, ThermometerSun } from "lucide-react";

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
    interesses: ["Produtos Básicos", "Condições de Pagamento Flexíveis"],
    potencialCompra: "Baixo",
    previsaoFechamento: "2025-06-30"
  }
];

// Mock data for promotores
const promotores = [
  { id: 1, nome: "Carlos Silva" },
  { id: 2, nome: "Ana Santos" },
  { id: 3, nome: "Roberto Lima" },
];

// Mock data for interesses
const interessesDisponiveis = [
  "Produtos Premium",
  "Linha Corporativa",
  "Serviços de Instalação",
  "Distribuição Exclusiva",
  "Produtos Linha Básica",
  "Condições Especiais",
  "Condições de Pagamento Flexíveis",
  "Suporte Técnico",
  "Treinamento",
  "Produtos Básicos",
];

// Mock data for origens
const origens = [
  "Indicação",
  "LinkedIn",
  "Site",
  "Feira",
  "Ligação Fria",
  "Email Marketing",
  "Anúncio",
  "Outro",
];

export function LeadEditar() {
  const router = useRouter();
  const params = useParams();
  const leadId = Number(params.id);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    empresa: "",
    contato: "",
    cargo: "",
    telefone: "",
    email: "",
    endereco: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
    cep: "",
    origem: "",
    status: "",
    promotor: "",
    ultimoContato: "",
    proximoContato: "",
    observacoes: "",
    interesses: [] as string[],
    potencialCompra: "",
    previsaoFechamento: "",
  });

  // Find lead details
  const lead = leadsData.find(l => l.id === leadId);

  // Load lead data
  useEffect(() => {
    if (lead) {
      setFormData({
        empresa: lead.empresa,
        contato: lead.contato,
        cargo: lead.cargo,
        telefone: lead.telefone,
        email: lead.email,
        endereco: lead.endereco,
        complemento: lead.complemento,
        bairro: lead.bairro,
        cidade: lead.cidade,
        estado: lead.estado,
        cep: lead.cep,
        origem: lead.origem,
        status: lead.status,
        promotor: lead.promotor,
        ultimoContato: lead.ultimoContato,
        proximoContato: lead.proximoContato,
        observacoes: lead.observacoes,
        interesses: lead.interesses,
        potencialCompra: lead.potencialCompra,
        previsaoFechamento: lead.previsaoFechamento,
      });
    }
  }, [lead]);

  if (!lead) {
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (id: string, value: string) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleInteresseChange = (interesse: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        interesses: [...prev.interesses, interesse]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        interesses: prev.interesses.filter(i => i !== interesse)
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Aqui vai a lógica de atualização
      await new Promise(resolve => setTimeout(resolve, 1000));
      router.push(`/dashboard/leads/${leadId}`);
    } catch (err) {
      setError('Erro ao atualizar o lead. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <h2 className="text-3xl font-bold tracking-tight">Editar Lead</h2>
        </div>
      </div>

      {error && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center text-red-500">{error}</div>
          </CardContent>
        </Card>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6">
          {/* Dados da Empresa */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Dados da Empresa
              </CardTitle>
              <CardDescription>
                Informações sobre a empresa
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="empresa">Nome da Empresa</Label>
                  <Input 
                    id="empresa" 
                    placeholder="Nome da empresa" 
                    value={formData.empresa}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="origem">Origem</Label>
                  <Select 
                    value={formData.origem} 
                    onValueChange={(value) => handleSelectChange("origem", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a origem" />
                    </SelectTrigger>
                    <SelectContent>
                      {origens.map((origem) => (
                        <SelectItem key={origem} value={origem}>
                          {origem}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select 
                    value={formData.status} 
                    onValueChange={(value) => handleSelectChange("status", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Quente">
                        <div className="flex items-center">
                          <ThermometerSun className="h-4 w-4 mr-2 text-red-500" />
                          Quente
                        </div>
                      </SelectItem>
                      <SelectItem value="Morno">
                        <div className="flex items-center">
                          <ThermometerSun className="h-4 w-4 mr-2 text-yellow-500" />
                          Morno
                        </div>
                      </SelectItem>
                      <SelectItem value="Frio">
                        <div className="flex items-center">
                          <ThermometerSun className="h-4 w-4 mr-2 text-blue-500" />
                          Frio
                        </div>
                      </SelectItem>
                      <SelectItem value="Perdido">Perdido</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="potencialCompra">Potencial de Compra</Label>
                  <Select 
                    value={formData.potencialCompra} 
                    onValueChange={(value) => handleSelectChange("potencialCompra", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o potencial" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Alto">Alto</SelectItem>
                      <SelectItem value="Médio">Médio</SelectItem>
                      <SelectItem value="Baixo">Baixo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="previsaoFechamento">Previsão de Fechamento</Label>
                  <Input 
                    id="previsaoFechamento" 
                    type="date" 
                    value={formData.previsaoFechamento}
                    onChange={handleInputChange}
                  />
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contato">Nome do Contato</Label>
                  <Input 
                    id="contato" 
                    placeholder="Nome do contato" 
                    value={formData.contato}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cargo">Cargo</Label>
                  <Input 
                    id="cargo" 
                    placeholder="Cargo" 
                    value={formData.cargo}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="email@exemplo.com" 
                      className="pl-9"
                      value={formData.email}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input 
                      id="telefone" 
                      placeholder="(00) 00000-0000" 
                      className="pl-9"
                      value={formData.telefone}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="endereco">Endereço</Label>
                  <Input 
                    id="endereco" 
                    placeholder="Rua, Avenida, etc." 
                    value={formData.endereco}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="complemento">Complemento</Label>
                  <Input 
                    id="complemento" 
                    placeholder="Complemento" 
                    value={formData.complemento}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bairro">Bairro</Label>
                  <Input 
                    id="bairro" 
                    placeholder="Bairro" 
                    value={formData.bairro}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cep">CEP</Label>
                  <Input 
                    id="cep" 
                    placeholder="00000-000" 
                    value={formData.cep}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2 col-span-2 md:col-span-3">
                  <Label htmlFor="cidade">Cidade</Label>
                  <Input 
                    id="cidade" 
                    placeholder="Cidade" 
                    value={formData.cidade}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="estado">Estado</Label>
                  <Select 
                    value={formData.estado} 
                    onValueChange={(value) => handleSelectChange("estado", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="UF" />
                    </SelectTrigger>
                    <SelectContent>
                      {["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"].map((uf) => (
                        <SelectItem key={uf} value={uf}>{uf}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Acompanhamento */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Acompanhamento
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="promotor">Promotor Responsável</Label>
                  <Select 
                    value={formData.promotor} 
                    onValueChange={(value) => handleSelectChange("promotor", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o promotor" />
                    </SelectTrigger>
                    <SelectContent>
                      {promotores.map((promotor) => (
                        <SelectItem key={promotor.id} value={promotor.nome}>
                          {promotor.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ultimoContato">Último Contato</Label>
                  <Input 
                    id="ultimoContato" 
                    type="date" 
                    value={formData.ultimoContato}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="proximoContato">Próximo Contato</Label>
                  <Input 
                    id="proximoContato" 
                    type="date" 
                    value={formData.proximoContato}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Interesses</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 border rounded-md p-4">
                  {interessesDisponiveis.map((interesse) => (
                    <div key={interesse} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`interesse-${interesse}`}
                        checked={formData.interesses.includes(interesse)}
                        onCheckedChange={(checked) => 
                          handleInteresseChange(interesse, checked as boolean)
                        }
                      />
                      <Label htmlFor={`interesse-${interesse}`}>{interesse}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="observacoes">Observações</Label>
                <Textarea 
                  id="observacoes" 
                  placeholder="Observações adicionais" 
                  className="min-h-[100px]"
                  value={formData.observacoes}
                  onChange={handleInputChange}
                />
              </div>
            </CardContent>
          </Card>

          {/* Ações */}
          <Card>
            <CardFooter className="flex justify-between p-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Salvando..." : "Salvar Alterações"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </form>
    </div>
  );
}
