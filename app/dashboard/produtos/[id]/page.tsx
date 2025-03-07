"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Package, DollarSign, Box, Image as ImageIcon } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ProdutoDetalhesPage() {
  const router = useRouter();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [produto, setProduto] = useState<any>(null);
  const [representadas, setRepresentadas] = useState<any[]>([]);
  const [selectedRepresentada, setSelectedRepresentada] = useState<string>("");

  useEffect(() => {
    const fetchProduto = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const produtoResponse = await fetch(`https://apicloud.tavrus.com.br/api/produtos/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!produtoResponse.ok) {
          throw new Error("Erro ao carregar produto");
        }
        const produtoData = await produtoResponse.json();
        setProduto(produtoData);
        setSelectedRepresentada(produtoData.representada);

        const representadasResponse = await fetch("https://apicloud.tavrus.com.br/api/representadas", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!representadasResponse.ok) {
          throw new Error("Erro ao carregar representadas");
        }
        const representadasData = await representadasResponse.json();
        setRepresentadas(representadasData);
      } catch (error) {
        console.error("Erro ao buscar produto:", error);
        toast.error("Erro ao carregar os dados do produto.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduto();
  }, [id, router]);

  if (loading) {
    return (
      <div className="flex-1 space-y-6 p-8 pt-6">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-6 w-1/4" />
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-6 w-1/4" />
      </div>
    );
  }

  if (!produto) {
    return (
      <div className="flex-1 space-y-6 p-8 pt-6">
        <p>Produto não encontrado.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <h2 className="text-3xl font-bold tracking-tight">Detalhes do Produto</h2>
        </div>
      </div>

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
                <Input id="sku" name="sku" placeholder="Código do produto" defaultValue={produto.sku} readOnly />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nome">Nome do produto</Label>
                <Input id="nome" name="nome" placeholder="Nome do produto" defaultValue={produto.nome} readOnly />
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
                    defaultValue={produto.precoVenda}
                    readOnly 
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
                    defaultValue={produto.precoPromocao}
                    readOnly 
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ncm">NCM (Mercosul)</Label>
                <Input id="ncm" name="ncm" placeholder="Código NCM" defaultValue={produto.ncm} readOnly />
              </div>
              <div className="space-y-2">
                <Label htmlFor="marca">Marca do produto</Label>
                <Input id="marca" name="marca" placeholder="Marca" defaultValue={produto.marca} readOnly />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cores">Cores disponíveis</Label>
              <Input id="cores" name="cores" placeholder="Ex: Vermelho, Azul, Verde" defaultValue={produto.coresDisponiveis} readOnly />
            </div>
          </CardContent>
        </Card>

        {/* Exibição da Imagem do Produto */}
        {produto.foto && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5" />
                Imagem do Produto
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <img
                  src={produto.foto}
                  alt={produto.nome}
                  className="h-auto max-w-full rounded-lg shadow-lg"
                />
              </div>
            </CardContent>
          </Card>
        )}

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
                    defaultValue={produto.precoCompra}
                    readOnly 
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
                  defaultValue={produto.markupMultiplicador}
                  readOnly 
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
                  defaultValue={produto.margemLucro}
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
                  defaultValue={produto.margemSeguranca}
                  readOnly 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="margemMinima">Margem de lucro mínima</Label>
                <Input 
                  id="margemMinima"
                  name="margemMinima"
                  type="number"
                  step="0.01"
                  defaultValue={produto.margemLucroMinima}
                  readOnly 
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
                defaultValue={produto.custoMedio}
                readOnly 
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
                  defaultValue={produto.ipi}
                  readOnly 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="unidadeMedida">Unidade de medida</Label>
                <Select value={produto.unidadeMedida} readOnly>
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
                  defaultValue={produto.categoria}
                  readOnly 
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tabelaPreco">Tabela de preço</Label>
              <Select value={produto.tabelaPreco} readOnly>
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
                <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                  produto.status === 'Ativo' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {produto.status}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
