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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowLeft, Building2, Mail, MapPin, Phone, Globe, DollarSign, Users, Plus, Trash } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Mock data for payment conditions
const condicoesPagamento = [
  { id: 1, nome: "À Vista", prazo: 0, desconto: 5 },
  { id: 2, nome: "30 Dias", prazo: 30, desconto: 0 },
  { id: 3, nome: "30/60 Dias", prazo: [30, 60], desconto: 0 },
  { id: 4, nome: "30/60/90 Dias", prazo: [30, 60, 90], desconto: 0 },
];

// Mock data for payment methods
const formasPagamento = [
  { id: 1, nome: "Boleto Bancário" },
  { id: 2, nome: "PIX" },
  { id: 3, nome: "Cartão de Crédito" },
  { id: 4, nome: "Transferência Bancária" },
];

export default function NovaRepresentadaPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [tipo, setTipo] = useState("empresa");
  const [estado, setEstado] = useState("");
  const [classificacao, setClassificacao] = useState<string[]>([]);
  const [tabelasPreco, setTabelasPreco] = useState([
    { nome: "Tabela Padrão", desconto: 0, comissao: 5 }
  ]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("token");

    const formData = new FormData(e.currentTarget);
    const data = {
      codigoREPRESENTADA: crypto.randomUUID(),
      razaoSocialREPRESENTADA: formData.get("razaoSocial"),
      nomeFantasiaREPRESENTADA: formData.get("nomeFantasia"),
      cnpjREPRESENTADA: formData.get("cnpj"),
      inscricaoEstadualREPRESENTADA: formData.get("inscricaoEstadual"),
      segmentoREPRESENTADA: formData.get("segmento"),
      ativoREPRESENTADA: true,
      cidadeREPRESENTADA: formData.get("cidade"),
      estadoREPRESENTADA: estado,
      enderecoREPRESENTADA: formData.get("endereco"),
      numeroREPRESENTADA: formData.get("numero"),
      complementoREPRESENTADA: formData.get("complemento"),
      bairroREPRESENTADA: formData.get("bairro"),
      cepREPRESENTADA: formData.get("cep"),
      telefonePrincipalREPRESENTADA: formData.get("telefone"),
      faxREPRESENTADA: formData.get("fax"),
      telefoneAdicionalREPRESENTADA: formData.get("telefoneAdicional"),
      emailREPRESENTADA: formData.get("email"),
      emailFinanceiroREPRESENTADA: formData.get("emailFinanceiro"),
      websiteREPRESENTADA: formData.get("website"),
      instagramREPRESENTADA: formData.get("instagram"),
      facebookREPRESENTADA: formData.get("facebook"),
      observacoesREPRESENTADA: formData.get("observacoes"),
    };

    console.log(data); // Log the data being sent

    try {
      const response = await fetch("https://apicloud.tavrus.com.br/api/representadas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Erro ao criar representada");
      }

      toast.success("Representada criada com sucesso!");
      router.push("/dashboard/representadas");
    } catch (error) {
      console.error("Erro ao criar representada:", error);
      toast.error("Erro ao criar representada");
    } finally {
      setLoading(false);
    }
  };

  const adicionarTabelaPreco = () => {
    setTabelasPreco([...tabelasPreco, { nome: "", desconto: 0, comissao: 5 }]);
  };

  const removerTabelaPreco = (index: number) => {
    setTabelasPreco(tabelasPreco.filter((_, i) => i !== index));
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <h2 className="text-3xl font-bold tracking-tight">Nova Representada</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6">
          {/* Dados Principais */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Dados Principais
              </CardTitle>
              <CardDescription>
                Informações principais da representada
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="razaoSocial">Razão Social</Label>
                  <Input 
                    id="razaoSocial"
                    name="razaoSocial"
                    placeholder="Razão Social"
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nomeFantasia">Nome Fantasia</Label>
                  <Input 
                    id="nomeFantasia"
                    name="nomeFantasia"
                    placeholder="Nome Fantasia"
                    required 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cnpj">CNPJ</Label>
                  <Input 
                    id="cnpj"
                    name="cnpj"
                    placeholder="00.000.000/0000-00"
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="inscricaoEstadual">Inscrição Estadual</Label>
                  <Input 
                    id="inscricaoEstadual"
                    name="inscricaoEstadual"
                    placeholder="Inscrição Estadual"
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="segmento">Segmento</Label>
                  <Input 
                    id="segmento"
                    name="segmento"
                    placeholder="Segmento de atuação"
                    required 
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Condições de Pagamento */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Condições de Pagamento
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label>Condições Disponíveis</Label>
                <div className="grid grid-cols-2 gap-4">
                  {condicoesPagamento.map((condicao) => (
                    <div key={condicao.id} className="flex items-center space-x-2">
                      <Checkbox id={`condicao-${condicao.id}`} />
                      <Label htmlFor={`condicao-${condicao.id}`}>
                        {condicao.nome}
                        {condicao.desconto > 0 && ` (${condicao.desconto}% desconto)`}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <Label>Formas de Pagamento</Label>
                <div className="grid grid-cols-2 gap-4">
                  {formasPagamento.map((forma) => (
                    <div key={forma.id} className="flex items-center space-x-2">
                      <Checkbox id={`forma-${forma.id}`} />
                      <Label htmlFor={`forma-${forma.id}`}>{forma.nome}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabelas de Preço */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Tabelas de Preço
              </CardTitle>
              <CardDescription>
                Configure as tabelas de preço e comissões
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome da Tabela</TableHead>
                    <TableHead>Desconto (%)</TableHead>
                    <TableHead>Comissão (%)</TableHead>
                    <TableHead className="w-[100px]">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tabelasPreco.map((tabela, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Input 
                          value={tabela.nome}
                          onChange={(e) => {
                            const newTabelas = [...tabelasPreco];
                            newTabelas[index].nome = e.target.value;
                            setTabelasPreco(newTabelas);
                          }}
                          placeholder="Nome da tabela"
                        />
                      </TableCell>
                      <TableCell>
                        <Input 
                          type="number"
                          min="0"
                          max="100"
                          value={tabela.desconto}
                          onChange={(e) => {
                            const newTabelas = [...tabelasPreco];
                            newTabelas[index].desconto = Number(e.target.value);
                            setTabelasPreco(newTabelas);
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Input 
                          type="number"
                          min="0"
                          max="100"
                          value={tabela.comissao}
                          onChange={(e) => {
                            const newTabelas = [...tabelasPreco];
                            newTabelas[index].comissao = Number(e.target.value);
                            setTabelasPreco(newTabelas);
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => removerTabelaPreco(index)}
                          disabled={index === 0}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Button
                type="button"
                variant="outline"
                onClick={adicionarTabelaPreco}
                className="gap-2"
              >
                <Plus className="h-4 w-4" />
                Adicionar Tabela
              </Button>
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
                    name="endereco"
                    placeholder="Rua, Avenida"
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="numero">Número</Label>
                  <Input 
                    id="numero"
                    name="numero"
                    placeholder="Número"
                    required 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="complemento">Complemento</Label>
                  <Input 
                    id="complemento"
                    name="complemento"
                    placeholder="Complemento"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bairro">Bairro</Label>
                  <Input 
                    id="bairro"
                    name="bairro"
                    placeholder="Bairro"
                    required 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cep">CEP</Label>
                  <Input 
                    id="cep"
                    name="cep"
                    placeholder="00000-000"
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cidade">Cidade</Label>
                  <Input 
                    id="cidade"
                    name="cidade"
                    placeholder="Cidade"
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="estado">Estado</Label>
                  <Select value={estado} onValueChange={setEstado} required>
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

          {/* Contato */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Contato
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone Principal</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input 
                      id="telefone"
                      name="telefone"
                      placeholder="(00) 0000-0000"
                      className="pl-9"
                      required 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fax">Fax</Label>
                  <Input 
                    id="fax"
                    name="fax"
                    placeholder="(00) 0000-0000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefoneAdicional">Telefone Adicional</Label>
                  <Input 
                    id="telefoneAdicional"
                    name="telefoneAdicional"
                    placeholder="(00) 0000-0000"
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
                      name="email"
                      type="email"
                      placeholder="email@empresa.com"
                      className="pl-9"
                      required 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emailFinanceiro">Email Financeiro</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input 
                      id="emailFinanceiro"
                      name="emailFinanceiro"
                      type="email"
                      placeholder="financeiro@empresa.com"
                      className="pl-9"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input 
                      id="website"
                      name="website"
                      placeholder="www.empresa.com"
                      className="pl-9"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input 
                    id="instagram"
                    name="instagram"
                    placeholder="@empresa"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="facebook">Facebook</Label>
                  <Input 
                    id="facebook"
                    name="facebook"
                    placeholder="facebook.com/empresa"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Observações */}
          <Card>
            <CardHeader>
              <CardTitle>Observações</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea 
                id="observacoes"
                name="observacoes"
                placeholder="Digite aqui observações importantes..."
                className="min-h-[100px]"
              />
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
                {loading ? "Salvando..." : "Salvar"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </form>
    </div>
  );
}