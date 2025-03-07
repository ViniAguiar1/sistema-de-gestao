// @ts-nocheck
"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
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
import { ArrowLeft, Package, DollarSign, Box, Image as ImageIcon } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Checkbox } from "@/components/ui/checkbox";

interface Representada {
  codigo: number;
  nomeFantasia: string;
}

export default function NovoProdutoPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [precoCompra, setPrecoCompra] = useState<number>(0);
  const [markup, setMarkup] = useState<number>(2);
  const [margemLucro, setMargemLucro] = useState<number>(0);
  const [selectedRepresentada, setSelectedRepresentada] = useState<string>("");
  const [representadas, setRepresentadas] = useState<Representada[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [ativo, setAtivo] = useState(true);
  const [descontinuado, setDescontinuado] = useState(0);
  const [aDescontinuar, setADescontinuar] = useState(0);

  useEffect(() => {
    const fetchRepresentadas = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch("https://apicloud.tavrus.com.br/api/representadas", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Erro ao buscar representadas");
        }
        const data = await response.json();
        setRepresentadas(data);
      } catch (error) {
        console.error("Erro ao buscar representadas:", error);
        toast.error("Erro ao carregar representadas");
      }
    };

    fetchRepresentadas();
  }, []);

  const calcularMargemLucro = (precoCompra: number, markup: number) => {
    const precoVenda = precoCompra * markup;
    return ((precoVenda - precoCompra) / precoVenda) * 100;
  };

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
    if (e.target.files?.[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    const formData = new FormData();
    const formElement = e.currentTarget;

    // Adicionando todos os campos ao FormData
    formData.append("nome", formElement.nome.value);
    formData.append("sku", formElement.sku.value);
    formData.append("precoVenda", formElement.precoVenda.value);
    formData.append("precoPromocao", formElement.precoPromocao.value || "0");
    formData.append("quantidade", formElement.quantidade?.value || "0");
    formData.append("ncm", formElement.ncm.value);
    formData.append("marca", formElement.marca.value);
    formData.append("coresDisponiveis", formElement.cores.value);
    formData.append("precoCompra", precoCompra.toString());
    formData.append("markupMultiplicador", markup.toString());
    formData.append("margemLucro", margemLucro.toString());
    formData.append("margemSeguranca", formElement.margemSeguranca.value || "0");
    formData.append("margemLucroMinima", formElement.margemMinima.value || "0");
    formData.append("custoMedio", formElement.custoMedio.value || "0");
    formData.append("ipi", formElement.ipi.value || "0");
    formData.append("categoria", formElement.categoria.value);
    formData.append("unidadeMedida", formElement.unidadeMedida.value);
    formData.append("tabelaPreco", formElement.tabelaPreco.value);
    formData.append("alturaUnidade", formElement.altura.value || "0");
    formData.append("larguraUnidade", formElement.largura.value || "0");
    formData.append("comprimentoUnidade", formElement.comprimento.value || "0");
    formData.append("pesoLiquido", formElement.peso.value || "0");
    formData.append("fatorCubagem", formElement.fatorCubagem.value || "0");
    formData.append("fatorEmbalagem", formElement.fatorEmbalagem.value || "0");
    formData.append("codigoOriginal", formElement.codigoOriginal.value);
    formData.append("referencia", formElement.referencia.value);
    formData.append("modelo", formElement.modelo.value);
    formData.append("referenciaAgrupamento", formElement.referenciaAgrupamento.value);
    formData.append("icms", formElement.icms.value || "0");
    formData.append("status", formElement.status.value);
    formData.append("observacoes", formElement.observacoes.value);
    formData.append("lixeira", "0");
    formData.append("ativo", ativo ? "1" : "0");
    formData.append("descontinuado", "0");
    formData.append("aDescontinuar", "0");
    formData.append("representada", selectedRepresentada);

    if (selectedFile) {
      formData.append("foto", selectedFile);
    }

    // Log detalhado dos dados antes do envio
    console.log('Dados do FormData:');
    const formDataObj: Record<string, any> = {};
    for (let [key, value] of formData.entries()) {
      formDataObj[key] = value;
      console.log(`${key}: ${value}`);
    }
    console.log('Objeto completo:', formDataObj);

    try {
      const response = await fetch("https://apicloud.tavrus.com.br/api/produtos", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Erro ao criar produto");
      }

      toast.success("Produto criado com sucesso!");
      router.push("/dashboard/produtos");
    } catch (error) {
      console.error("Erro ao criar produto:", error);
      toast.error("Erro ao criar produto");
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
                <Select value={selectedRepresentada} onValueChange={setSelectedRepresentada}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a representada" />
                  </SelectTrigger>
                  <SelectContent>
                    {representadas.map((representada) => (
                      <SelectItem key={representada.codigo} value={representada.codigo.toString()}>
                        {representada.nomeFantasia}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sku">SKU</Label>
                  <Input id="sku" name="sku" placeholder="Código do produto" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome do produto</Label>
                  <Input id="nome" name="nome" placeholder="Nome do produto" required />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="precoVenda">Preço de venda</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input 
                      id="precoVenda"
                      name="precoVenda"
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
                      name="precoPromocao"
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
                  <Input id="ncm" name="ncm" placeholder="Código NCM" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="marca">Marca do produto</Label>
                  <Input id="marca" name="marca" placeholder="Marca" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cores">Cores disponíveis</Label>
                <Input id="cores" name="cores" placeholder="Ex: Vermelho, Azul, Verde" />
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
                      name="precoCompra"
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
                    name="markup"
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
                    name="margemLucro"
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
                    name="margemSeguranca"
                    type="number"
                    step="0.01"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="margemMinima">Margem de lucro mínima</Label>
                  <Input 
                    id="margemMinima"
                    name="margemMinima"
                    type="number"
                    step="0.01"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="custoMedio">Cálculo do custo médio</Label>
                <Input 
                  id="custoMedio"
                  name="custoMedio"
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
                    name="ipi"
                    type="number"
                    step="0.01"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unidadeMedida">Unidade de medida</Label>
                  <Select name="unidadeMedida">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      {["Unidade", "Caixa", "Metro", "Litro", "Quilograma"].map((unidade) => (
                        <SelectItem key={unidade} value={unidade}>
                          {unidade}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="categoria">Categoria</Label>
                  <Input 
                    id="categoria"
                    name="categoria"
                    placeholder="Digite a categoria"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tabelaPreco">Tabela de preço</Label>
                <Select name="tabelaPreco">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="padrao">Tabela Padrão</SelectItem>
                    <SelectItem value="promocional">Tabela Promocional</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Status do Produto</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="ativo"
                        checked={ativo}
                        onCheckedChange={(checked) => setAtivo(checked as boolean)}
                      />
                      <Label htmlFor="ativo">Ativo</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="descontinuado"
                        checked={descontinuado === 1}
                        onCheckedChange={(checked) => setDescontinuado(checked ? 1 : 0)}
                      />
                      <Label htmlFor="descontinuado">Descontinuado</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="aDescontinuar"
                        checked={aDescontinuar === 1}
                        onCheckedChange={(checked) => setADescontinuar(checked ? 1 : 0)}
                      />
                      <Label htmlFor="aDescontinuar">A Descontinuar</Label>
                    </div>
                  </div>
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
                      name="altura"
                      type="number"
                      step="0.01"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="largura">Largura (m)</Label>
                    <Input 
                      id="largura"
                      name="largura"
                      type="number"
                      step="0.01"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="comprimento">Comprimento (m)</Label>
                    <Input 
                      id="comprimento"
                      name="comprimento"
                      type="number"
                      step="0.01"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="peso">Peso líquido (kg)</Label>
                    <Input 
                      id="peso"
                      name="peso"
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
                    name="fatorCubagem"
                    type="number"
                    step="0.01"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fatorEmbalagem">Fator embalagem</Label>
                  <Input 
                    id="fatorEmbalagem"
                    name="fatorEmbalagem"
                    type="number"
                    step="0.01"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quantidade">Quantidade</Label>
                  <Input 
                    id="quantidade"
                    name="quantidade"
                    type="number"
                    step="1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="codigoOriginal">Código original</Label>
                  <Input id="codigoOriginal" name="codigoOriginal" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="referencia">Referência</Label>
                  <Input id="referencia" name="referencia" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="modelo">Modelo</Label>
                  <Input id="modelo" name="modelo" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="referenciaAgrupamento">Referência de agrupamento</Label>
                  <Input id="referenciaAgrupamento" name="referenciaAgrupamento" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="icms">ICMS (%)</Label>
                  <Input 
                    id="icms"
                    name="icms"
                    type="number"
                    step="0.01"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select name="status">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Ativo</SelectItem>
                    <SelectItem value="0">Inativo</SelectItem>
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
                    accept="image/*"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="observacoes">Observações</Label>
                <Textarea 
                  id="observacoes"
                  name="observacoes"
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