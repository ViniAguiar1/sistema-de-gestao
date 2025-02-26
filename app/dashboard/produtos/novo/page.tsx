"use client";

import { useState, useRef } from "react";
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
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Building2, Package, DollarSign, Ruler, Box, Scale, Image as ImageIcon } from "lucide-react";

const representadas = [
  { id: 1, nome: "Xalingo Brinquedos" },
  { id: 2, nome: "Athia Heroes" },
  { id: 3, nome: "Brasil Fit" },
  { id: 4, nome: "Sinteplast" },
  { id: 5, nome: "Patta" },
];

const categorias = [
  "Brinquedos",
  "Games",
  "Fitness",
  "Tintas",
  "Calçados",
];

const unidadesMedida = [
  "Unidade",
  "Caixa",
  "Metro",
  "Litro",
  "Quilograma",
];

export default function NovoProdutoPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [precoCompra, setPrecoCompra] = useState<number>(0);
  const [markup, setMarkup] = useState<number>(2);
  const [margemLucro, setMargemLucro] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Calcula a margem de lucro baseada no preço de compra e markup
  const calcularMargemLucro = (precoCompra: number, markup: number) => {
    const precoVenda = precoCompra * markup;
    return ((precoVenda - precoCompra) / precoVenda) * 100;
  };

  // Atualiza a margem de lucro quando preço de compra ou markup mudam
  const handlePrecoCompraChange = (value: string) => {
    const preco = parseFloat(value) || 0;
    setPrecoCompra(preco);
    setMargemLucro(calcularMargemLucro(preco, markup));
  };

  const handleMarkupChange = (value: string) => {
    const markupValue = parseFloat(value) || 0;
    setMarkup(markupValue);
    setMargemLucro(calcularMargemLucro(precoCompra, markupValue));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Aqui vai a lógica de submissão
      const formData = new FormData();
      if (selectedFile) {
        formData.append("file", selectedFile);
      }
      // Adicione outros campos ao formData conforme necessário
      await new Promise(resolve => setTimeout(resolve, 1000));
      router.push('/dashboard/produtos');
    } catch (error) {
      console.error('Erro ao criar produto:', error);
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
          <h2 className="text-3xl font-bold tracking-tight">Novo Produto</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6">
          {/* Informações Básicas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Informações Básicas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="representada">Indústria (Representada)</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a representada" />
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

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sku">SKU</Label>
                  <Input id="sku" placeholder="Código do produto" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome do produto</Label>
                  <Input id="nome" placeholder="Nome do produto" required />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="precoVenda">Preço de venda</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input 
                      id="precoVenda" 
                      type="number" 
                      step="0.01" 
                      className="pl-9" 
                      required 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="precoPromocao">Preço em promoção</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input 
                      id="precoPromocao" 
                      type="number" 
                      step="0.01" 
                      className="pl-9" 
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ncm">NCM (Mercosul)</Label>
                  <Input id="ncm" placeholder="Código NCM" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="marca">Marca do produto</Label>
                  <Input id="marca" placeholder="Marca" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cores">Cores disponíveis</Label>
                <Input id="cores" placeholder="Ex: Vermelho, Azul, Verde" />
              </div>
            </CardContent>
          </Card>

          {/* Custo e Precificação */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Custo e Precificação
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="precoCompra">Preço de compra/fabricação</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input 
                      id="precoCompra" 
                      type="number" 
                      step="0.01" 
                      className="pl-9"
                      value={precoCompra || ''}
                      onChange={(e) => handlePrecoCompraChange(e.target.value)}
                      required 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="markup">Markup multiplicador</Label>
                  <Input 
                    id="markup" 
                    type="number" 
                    step="0.01"
                    value={markup || ''}
                    onChange={(e) => handleMarkupChange(e.target.value)}
                    required 
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="margemLucro">Margem de lucro (%)</Label>
                  <Input 
                    id="margemLucro" 
                    type="number" 
                    step="0.01"
                    value={margemLucro.toFixed(2)}
                    readOnly 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="margemSeguranca">Margem de segurança</Label>
                  <Input 
                    id="margemSeguranca" 
                    type="number" 
                    step="0.01" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="margemMinima">Margem de lucro mínima</Label>
                  <Input 
                    id="margemMinima" 
                    type="number" 
                    step="0.01" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="custoMedio">Cálculo do custo médio</Label>
                <Input 
                  id="custoMedio" 
                  type="number" 
                  step="0.01" 
                />
              </div>
            </CardContent>
          </Card>

          {/* Informações Complementares */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Box className="h-5 w-5" />
                Informações Complementares
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ipi">IPI (%)</Label>
                  <Input 
                    id="ipi" 
                    type="number" 
                    step="0.01" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unidadeMedida">Unidade de medida</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      {unidadesMedida.map((unidade) => (
                        <SelectItem key={unidade} value={unidade}>
                          {unidade}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="embalagem">Embalagem</Label>
                  <Input id="embalagem" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="categoria">Categoria</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      {categorias.map((categoria) => (
                        <SelectItem key={categoria} value={categoria}>
                          {categoria}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tabelaPreco">Tabela de preço</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="padrao">Tabela Padrão</SelectItem>
                      <SelectItem value="promocional">Tabela Promocional</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Dimensões da Unidade</h4>
                <div className="grid grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="altura">Altura (m)</Label>
                    <Input 
                      id="altura" 
                      type="number" 
                      step="0.01" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="largura">Largura (m)</Label>
                    <Input 
                      id="largura" 
                      type="number" 
                      step="0.01" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="comprimento">Comprimento (m)</Label>
                    <Input 
                      id="comprimento" 
                      type="number" 
                      step="0.01" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="peso">Peso líquido (kg)</Label>
                    <Input 
                      id="peso" 
                      type="number" 
                      step="0.01" 
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Dimensões da Caixa Master</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="alturaMaster">Altura</Label>
                    <Input 
                      id="alturaMaster" 
                      type="number" 
                      step="0.01" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="larguraMaster">Largura</Label>
                    <Input 
                      id="larguraMaster" 
                      type="number" 
                      step="0.01" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="comprimentoMaster">Comprimento</Label>
                    <Input 
                      id="comprimentoMaster" 
                      type="number" 
                      step="0.01" 
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fatorCubagem">Fator cubagem</Label>
                  <Input 
                    id="fatorCubagem" 
                    type="number" 
                    step="0.01" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fatorEmbalagem">Fator embalagem</Label>
                  <Input 
                    id="fatorEmbalagem" 
                    type="number" 
                    step="0.01" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="espessura">Espessura</Label>
                  <Input 
                    id="espessura" 
                    type="number" 
                    step="0.01" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="codigoOriginal">Código original</Label>
                  <Input id="codigoOriginal" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="referencia">Referência</Label>
                  <Input id="referencia" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="modelo">Modelo</Label>
                  <Input id="modelo" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="referenciaAgrupamento">Referência de agrupamento</Label>
                  <Input id="referenciaAgrupamento" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="icms">ICMS (%)</Label>
                  <Input 
                    id="icms" 
                    type="number" 
                    step="0.01" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ativo">Ativo</SelectItem>
                    <SelectItem value="inativo">Inativo</SelectItem>
                    <SelectItem value="promocao">Em Promoção</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="foto">Foto do produto</Label>
                <div className="flex items-center gap-4">
                  <div className="h-32 w-32 rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center">
                    {selectedFile ? (
                      <img
                        src={URL.createObjectURL(selectedFile)}
                        alt="Foto do produto"
                        className="h-full w-full object-cover rounded-lg"
                      />
                    ) : (
                      <ImageIcon className="h-8 w-8 text-gray-400" />
                    )}
                  </div>
                  <Button type="button" variant="outline" onClick={handleUploadClick}>
                    Selecionar foto
                  </Button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="observacoes">Observações</Label>
                <Textarea 
                  id="observacoes"
                  placeholder="Observações adicionais sobre o produto"
                  className="min-h-[100px]"
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
                {loading ? "Salvando..." : "Salvar Produto"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </form>
    </div>
  );
}