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
import { ArrowLeft, Building2, Mail, MapPin, Phone, Globe, DollarSign, Users } from "lucide-react";
import { clientesData } from "../data";

export function ClienteEditar() {
  const router = useRouter();
  const params = useParams();
  const clienteId = Number(params.id);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Find client details
  const cliente = clientesData.find(c => c.id === clienteId);

  if (!cliente) {
    return (
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center text-muted-foreground">Cliente não encontrado</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Aqui vai a lógica de atualização
      await new Promise(resolve => setTimeout(resolve, 1000));
      router.push(`/dashboard/clientes/${clienteId}`);
    } catch (err) {
      setError('Erro ao atualizar o cliente. Tente novamente.');
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
          <h2 className="text-3xl font-bold tracking-tight">Editar Cliente</h2>
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
                  defaultValue={cliente.tipo}
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
                      defaultChecked={cliente.classificacoes.includes('cliente')}
                    />
                    <Label htmlFor="cliente">Cliente</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="transportadora"
                      defaultChecked={cliente.classificacoes.includes('transportadora')}
                    />
                    <Label htmlFor="transportadora">Transportadora</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="fornecedor"
                      defaultChecked={cliente.classificacoes.includes('fornecedor')}
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
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="razaoSocial">Razão Social</Label>
                  <Input 
                    id="razaoSocial" 
                    defaultValue={cliente.razaoSocial}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nomeFantasia">Nome Fantasia</Label>
                  <Input 
                    id="nomeFantasia" 
                    defaultValue={cliente.nomeFantasia}
                    required 
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="cnpj">CNPJ</Label>
                  <Input 
                    id="cnpj" 
                    defaultValue={cliente.cnpj}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="inscricaoEstadual">Inscrição Estadual</Label>
                  <Input 
                    id="inscricaoEstadual" 
                    defaultValue={cliente.inscricaoEstadual}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="matriz">Matriz</Label>
                  <Select defaultValue={cliente.matriz}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="matriz">Matriz</SelectItem>
                      <SelectItem value="filial">Filial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="redeCliente">Rede de Cliente</Label>
                  <Select defaultValue={cliente.redeCliente}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Rede 1">Rede 1</SelectItem>
                      <SelectItem value="Rede 2">Rede 2</SelectItem>
                      <SelectItem value="Rede 3">Rede 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="limiteCredito">Limite de Crédito</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input 
                      id="limiteCredito" 
                      defaultValue={cliente.limiteCredito}
                      className="pl-9"
                      type="number"
                      step="0.01"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tipoContribuinte">Tipo de Contribuinte</Label>
                  <Select defaultValue={cliente.tipoContribuinte}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Contribuinte ICMS">Contribuinte ICMS</SelectItem>
                      <SelectItem value="Contribuinte ISENTO">Contribuinte ISENTO</SelectItem>
                      <SelectItem value="Não Contribuinte">Não Contribuinte</SelectItem>
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
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="endereco">Endereço</Label>
                  <Input 
                    id="endereco" 
                    defaultValue={cliente.endereco}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="numero">Número</Label>
                  <Input 
                    id="numero" 
                    defaultValue={cliente.numero}
                    required 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="complemento">Complemento</Label>
                  <Input 
                    id="complemento" 
                    defaultValue={cliente.complemento}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bairro">Bairro</Label>
                  <Input 
                    id="bairro" 
                    defaultValue={cliente.bairro}
                    required 
                  />
                </div>
              </div>

              <div className="grid grid-cols-4 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="cep">CEP</Label>
                  <Input 
                    id="cep" 
                    defaultValue={cliente.cep}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cidade">Cidade</Label>
                  <Input 
                    id="cidade" 
                    defaultValue={cliente.cidade}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="estado">Estado</Label>
                  <Select defaultValue={cliente.estado}>
                    <SelectTrigger>
                      <SelectValue />
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
              <div className="grid grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone Principal</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input 
                      id="telefone" 
                      defaultValue={cliente.telefone}
                      className="pl-9"
                      required 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fax">Fax</Label>
                  <Input 
                    id="fax" 
                    defaultValue={cliente.fax}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefoneAdicional">Telefone Adicional</Label>
                  <Input 
                    id="telefoneAdicional" 
                    defaultValue={cliente.telefoneAdicional}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input 
                      id="email" 
                      type="email" 
                      defaultValue={cliente.email}
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
                      defaultValue={cliente.emailFinanceiro}
                      className="pl-9"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input 
                      id="website" 
                      defaultValue={cliente.website}
                      className="pl-9"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input 
                    id="instagram" 
                    defaultValue={cliente.instagram}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="facebook">Facebook</Label>
                  <Input 
                    id="facebook" 
                    defaultValue={cliente.facebook}
                  />
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
              <div className="grid grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select defaultValue={cliente.status}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Ativo">Ativo</SelectItem>
                      <SelectItem value="Inativo">Inativo</SelectItem>
                      <SelectItem value="Bloqueado">Bloqueado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="classificacaoSV">Classificação SV</Label>
                  <Select defaultValue={cliente.classificacaoSV}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A">A</SelectItem>
                      <SelectItem value="B">B</SelectItem>
                      <SelectItem value="C">C</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="formaPagamento">Forma de Pagamento</Label>
                  <Select defaultValue={cliente.formaPagamento}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Boleto">Boleto</SelectItem>
                      <SelectItem value="Cartão">Cartão</SelectItem>
                      <SelectItem value="PIX">PIX</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="vendedor">Vendedor</Label>
                <Select defaultValue={cliente.vendedor}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Carlos Silva">Carlos Silva</SelectItem>
                    <SelectItem value="Ana Santos">Ana Santos</SelectItem>
                    <SelectItem value="Roberto Lima">Roberto Lima</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="categoria">Categoria</Label>
                <Select defaultValue={cliente.categoria}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Categoria 1">Categoria 1</SelectItem>
                    <SelectItem value="Categoria 2">Categoria 2</SelectItem>
                    <SelectItem value="Categoria 3">Categoria 3</SelectItem>
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
                defaultValue={cliente.observacoes}
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
                {loading ? "Salvando..." : "Salvar Alterações"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </form>
    </div>
  );
}