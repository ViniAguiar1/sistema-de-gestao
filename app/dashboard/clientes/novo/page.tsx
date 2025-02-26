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
import { ArrowLeft, Building2, Mail, MapPin, Phone, User, Globe, DollarSign, Users } from "lucide-react";

export default function NovoClientePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [tipo, setTipo] = useState("empresa"); // empresa ou pessoa
  const [classificacao, setClassificacao] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Aqui vai a lógica de submissão do formulário
    setTimeout(() => {
      setLoading(false);
      router.push("/dashboard/clientes");
    }, 2000);
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <h2 className="text-3xl font-bold tracking-tight">Novo Cadastro</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6">
          {/* Tipo de Cadastro */}
          <Card>
            <CardHeader>
              <CardTitle>Tipo de Cadastro</CardTitle>
              <CardDescription>
                Selecione o tipo e a classificação do cadastro
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label>Tipo</Label>
                <RadioGroup
                  defaultValue="empresa"
                  onValueChange={setTipo}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="empresa" id="empresa" />
                    <Label htmlFor="empresa">Empresa</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="pessoa" id="pessoa" />
                    <Label htmlFor="pessoa">Pessoa Física</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-4">
                <Label>Classificação</Label>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="cliente"
                      checked={classificacao.includes('cliente')}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setClassificacao([...classificacao, 'cliente']);
                        } else {
                          setClassificacao(classificacao.filter(c => c !== 'cliente'));
                        }
                      }}
                    />
                    <Label htmlFor="cliente">Cliente</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="transportadora"
                      checked={classificacao.includes('transportadora')}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setClassificacao([...classificacao, 'transportadora']);
                        } else {
                          setClassificacao(classificacao.filter(c => c !== 'transportadora'));
                        }
                      }}
                    />
                    <Label htmlFor="transportadora">Transportadora</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="fornecedor"
                      checked={classificacao.includes('fornecedor')}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setClassificacao([...classificacao, 'fornecedor']);
                        } else {
                          setClassificacao(classificacao.filter(c => c !== 'fornecedor'));
                        }
                      }}
                    />
                    <Label htmlFor="fornecedor">Fornecedor</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dados Principais */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Dados Principais
              </CardTitle>
              <CardDescription>
                Informações principais do cadastro
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="razaoSocial">
                    {tipo === 'empresa' ? 'Razão Social' : 'Nome Completo'}
                  </Label>
                  <Input 
                    id="razaoSocial" 
                    placeholder={tipo === 'empresa' ? 'Razão Social' : 'Nome Completo'} 
                    required 
                  />
                </div>
                {tipo === 'empresa' && (
                  <div className="space-y-2">
                    <Label htmlFor="nomeFantasia">Nome Fantasia</Label>
                    <Input id="nomeFantasia" placeholder="Nome Fantasia" required />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="documento">
                    {tipo === 'empresa' ? 'CNPJ' : 'CPF'}
                  </Label>
                  <Input 
                    id="documento" 
                    placeholder={tipo === 'empresa' ? '00.000.000/0000-00' : '000.000.000-00'} 
                    required 
                  />
                </div>
                {tipo === 'empresa' && (
                  <div className="space-y-2">
                    <Label htmlFor="inscricaoEstadual">Inscrição Estadual</Label>
                    <Input id="inscricaoEstadual" placeholder="Inscrição Estadual" />
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="matriz">Matriz</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="matriz">Matriz</SelectItem>
                      <SelectItem value="filial">Filial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="redeCliente">Rede de Cliente</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rede1">Rede 1</SelectItem>
                      <SelectItem value="rede2">Rede 2</SelectItem>
                      <SelectItem value="rede3">Rede 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="limiteCredito">Limite de Crédito</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input 
                      id="limiteCredito" 
                      placeholder="0,00" 
                      className="pl-9"
                      type="number"
                      step="0.01"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tipoContribuinte">Tipo de Contribuinte</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Contribuinte ICMS</SelectItem>
                      <SelectItem value="2">Contribuinte ISENTO</SelectItem>
                      <SelectItem value="9">Não Contribuinte</SelectItem>
                    </SelectContent>
                  </Select>
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
                  <Input id="endereco" placeholder="Rua, Avenida" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="numero">Número</Label>
                  <Input id="numero" placeholder="Número" required />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="complemento">Complemento</Label>
                  <Input id="complemento" placeholder="Complemento" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bairro">Bairro</Label>
                  <Input id="bairro" placeholder="Bairro" required />
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cep">CEP</Label>
                  <Input id="cep" placeholder="00000-000" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cidade">Cidade</Label>
                  <Input id="cidade" placeholder="Cidade" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="estado">Estado</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="UF" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AC">AC</SelectItem>
                      <SelectItem value="AL">AL</SelectItem>
                      <SelectItem value="AP">AP</SelectItem>
                      <SelectItem value="AM">AM</SelectItem>
                      <SelectItem value="BA">BA</SelectItem>
                      <SelectItem value="CE">CE</SelectItem>
                      <SelectItem value="DF">DF</SelectItem>
                      <SelectItem value="ES">ES</SelectItem>
                      <SelectItem value="GO">GO</SelectItem>
                      <SelectItem value="MA">MA</SelectItem>
                      <SelectItem value="MT">MT</SelectItem>
                      <SelectItem value="MS">MS</SelectItem>
                      <SelectItem value="MG">MG</SelectItem>
                      <SelectItem value="PA">PA</SelectItem>
                      <SelectItem value="PB">PB</SelectItem>
                      <SelectItem value="PR">PR</SelectItem>
                      <SelectItem value="PE">PE</SelectItem>
                      <SelectItem value="PI">PI</SelectItem>
                      <SelectItem value="RJ">RJ</SelectItem>
                      <SelectItem value="RN">RN</SelectItem>
                      <SelectItem value="RS">RS</SelectItem>
                      <SelectItem value="RO">RO</SelectItem>
                      <SelectItem value="RR">RR</SelectItem>
                      <SelectItem value="SC">SC</SelectItem>
                      <SelectItem value="SP">SP</SelectItem>
                      <SelectItem value="SE">SE</SelectItem>
                      <SelectItem value="TO">TO</SelectItem>
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
                      placeholder="(00) 0000-0000" 
                      className="pl-9"
                      required 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fax">Fax</Label>
                  <Input id="fax" placeholder="(00) 0000-0000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefoneAdicional">Telefone Adicional</Label>
                  <Input id="telefoneAdicional" placeholder="(00) 0000-0000" />
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
                      placeholder="www.empresa.com" 
                      className="pl-9"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input id="instagram" placeholder="@empresa" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="facebook">Facebook</Label>
                  <Input id="facebook" placeholder="facebook.com/empresa" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Comercial */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Comercial
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ativo">Ativo</SelectItem>
                      <SelectItem value="inativo">Inativo</SelectItem>
                      <SelectItem value="bloqueado">Bloqueado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="classificacaoSV">Classificação</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="a">A</SelectItem>
                      <SelectItem value="b">B</SelectItem>
                      <SelectItem value="c">C</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="formaPagamento">Forma de Pagamento</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="boleto">Boleto</SelectItem>
                      <SelectItem value="cartao">Cartão</SelectItem>
                      <SelectItem value="pix">PIX</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="vendedores">Vendedores</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vendedor1">Carlos Silva</SelectItem>
                    <SelectItem value="vendedor2">Ana Santos</SelectItem>
                    <SelectItem value="vendedor3">Roberto Lima</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="categorias">Categorias</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cat1">Categoria 1</SelectItem>
                    <SelectItem value="cat2">Categoria 2</SelectItem>
                    <SelectItem value="cat3">Categoria 3</SelectItem>
                  </SelectContent>
                </Select>
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