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
import { ArrowLeft, Building2, Mail, Phone, MapPin, User, Calendar, ThermometerSun, Target } from "lucide-react";

// Mock data for promotores
const promotores = [
  { id: 1, nome: "Carlos Silva" },
  { id: 2, nome: "Ana Santos" },
  { id: 3, nome: "Roberto Lima" },
];

// Mock data for origens
const origens = [
  { id: "indicacao", nome: "Indicação" },
  { id: "linkedin", nome: "LinkedIn" },
  { id: "site", nome: "Site" },
  { id: "feira", nome: "Feira" },
  { id: "ligacao", nome: "Ligação Fria" },
  { id: "email", nome: "Email Marketing" },
  { id: "anuncio", nome: "Anúncio" },
  { id: "outro", nome: "Outro" },
];

// Mock data for interesses
const interessesDisponiveis = [
  { id: "produtos_premium", nome: "Produtos Premium" },
  { id: "linha_corporativa", nome: "Linha Corporativa" },
  { id: "servicos_instalacao", nome: "Serviços de Instalação" },
  { id: "distribuicao_exclusiva", nome: "Distribuição Exclusiva" },
  { id: "produtos_basicos", nome: "Produtos Linha Básica" },
  { id: "condicoes_especiais", nome: "Condições Especiais" },
  { id: "pagamento_flexivel", nome: "Condições de Pagamento Flexíveis" },
  { id: "suporte_tecnico", nome: "Suporte Técnico" },
  { id: "treinamento", nome: "Treinamento" },
];

export default function NovoLeadPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
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
    status: "morno",
    promotor: "",
    ultimoContato: new Date().toISOString().split('T')[0],
    proximoContato: "",
    observacoes: "",
    interesses: [] as string[],
    potencialCompra: "medio",
    previsaoFechamento: "",
  });

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
      // Aqui vai a lógica de submissão do formulário
      console.log("Dados do formulário:", formData);
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulando uma requisição
      router.push("/dashboard/leads");
    } catch (error) {
      console.error("Erro ao criar lead:", error);
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
          <h2 className="text-3xl font-bold tracking-tight">Novo Lead</h2>
        </div>
      </div>

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
                        <SelectItem key={origem.id} value={origem.id}>
                          {origem.nome}
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
                      <SelectItem value="quente">
                        <div className="flex items-center">
                          <ThermometerSun className="h-4 w-4 mr-2 text-red-500" />
                          Quente
                        </div>
                      </SelectItem>
                      <SelectItem value="morno">
                        <div className="flex items-center">
                          <ThermometerSun className="h-4 w-4 mr-2 text-yellow-500" />
                          Morno
                        </div>
                      </SelectItem>
                      <SelectItem value="frio">
                        <div className="flex items-center">
                          <ThermometerSun className="h-4 w-4 mr-2 text-blue-500" />
                          Frio
                        </div>
                      </SelectItem>
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
                      <SelectItem value="alto">Alto</SelectItem>
                      <SelectItem value="medio">Médio</SelectItem>
                      <SelectItem value="baixo">Baixo</SelectItem>
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
                <Target className="h-5 w-5" />
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
                        <SelectItem key={promotor.id} value={promotor.id.toString()}>
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
                    required 
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
                    <div key={interesse.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`interesse-${interesse.id}`}
                        checked={formData.interesses.includes(interesse.id)}
                        onCheckedChange={(checked) => 
                          handleInteresseChange(interesse.id, checked as boolean)
                        }
                      />
                      <Label htmlFor={`interesse-${interesse.id}`}>{interesse.nome}</Label>
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
                {loading ? "Salvando..." : "Salvar Lead"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </form>
    </div>
  );
}