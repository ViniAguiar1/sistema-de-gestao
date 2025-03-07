"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Image as ImageIcon, ArrowLeft } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

export default function ProdutoEditarPage() {
    const router = useRouter();
    const { id } = useParams();
    const [produto, setProduto] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        async function fetchProduto() {
            const token = localStorage.getItem("token");
            try {
                const response = await fetch(`https://apicloud.tavrus.com.br/api/produtos/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error(`Erro na requisição: ${response.status}`);
                }
                const data = await response.json();
                setProduto(data);
            } catch (error) {
                console.error("Erro ao buscar produto:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchProduto();
    }, [id]);

    const handleSave = async () => {
        setSaving(true);
        const token = localStorage.getItem("token");

        const formData = new FormData();
        Object.keys(produto).forEach((key) => {
            if (produto[key] !== null) {
                formData.append(key, produto[key]);
            }
        });

        if (selectedFile) {
            formData.append("foto", selectedFile);
        }

        try {
            const response = await fetch(`https://apicloud.tavrus.com.br/api/produtos/${id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Erro ao salvar o produto");
            }

            toast.success("Produto salvo com sucesso!");
            router.push("/dashboard/produtos");
        } catch (error) {
            console.error("Erro ao salvar produto:", error);
            toast.error("Erro ao salvar o produto");
        } finally {
            setSaving(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    if (loading) {
        return (
            <div className="flex-1 space-y-4 p-8 pt-6">
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
            <div className="flex-1 space-y-4 p-8 pt-6">
                <p>Produto não encontrado.</p>
            </div>
        );
    }

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" onClick={() => router.back()}>
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Voltar
                    </Button>
                    <h2 className="text-3xl font-bold tracking-tight">Editar Produto</h2>
                </div>
            </div>

            <form onSubmit={(e) => e.preventDefault()}>
                <div className="grid gap-6">
                    {/* Imagem do Produto */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <ImageIcon className="h-5 w-5" />
                                Imagem do Produto
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-4">
                                <div className="h-32 w-32 rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center">
                                    {produto.foto || selectedFile ? (
                                        <img
                                            src={selectedFile ? URL.createObjectURL(selectedFile) : produto.foto}
                                            alt="Foto do produto"
                                            className="h-full w-full object-cover rounded-lg"
                                        />
                                    ) : (
                                        <ImageIcon className="h-8 w-8 text-gray-400" />
                                    )}
                                </div>
                                <div>
                                    <Input
                                        id="foto"
                                        name="foto"
                                        type="text"
                                        placeholder="URL da foto"
                                        value={produto.foto}
                                        onChange={(e) => setProduto({ ...produto, foto: e.target.value })}
                                        className="ml-4"
                                        style={{ display: "none" }}
                                    />
                                    <div className="mt-2">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => fileInputRef.current?.click()}
                                        >
                                            {selectedFile ? "Alterar Imagem" : "Selecionar Imagem"}
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
                            </div>
                        </CardContent>
                    </Card>

                    {/* Informações Básicas */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">Informações Básicas</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="nome">Nome do produto</Label>
                                    <Input
                                        id="nome"
                                        name="nome"
                                        placeholder="Nome do produto"
                                        value={produto.nome}
                                        onChange={(e) => setProduto({ ...produto, nome: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="sku">SKU</Label>
                                    <Input
                                        id="sku"
                                        name="sku"
                                        placeholder="Código do produto"
                                        value={produto.sku}
                                        onChange={(e) => setProduto({ ...produto, sku: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="precoVenda">Preço de Venda</Label>
                                    <Input
                                        id="precoVenda"
                                        name="precoVenda"
                                        type="number"
                                        value={produto.precoVenda}
                                        onChange={(e) => setProduto({ ...produto, precoVenda: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="precoPromocao">Preço de Promoção</Label>
                                    <Input
                                        id="precoPromocao"
                                        name="precoPromocao"
                                        type="number"
                                        value={produto.precoPromocao}
                                        onChange={(e) => setProduto({ ...produto, precoPromocao: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="ncm">NCM (Mercosul)</Label>
                                    <Input
                                        id="ncm"
                                        name="ncm"
                                        value={produto.ncm}
                                        onChange={(e) => setProduto({ ...produto, ncm: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="marca">Marca</Label>
                                    <Input
                                        id="marca"
                                        name="marca"
                                        value={produto.marca}
                                        onChange={(e) => setProduto({ ...produto, marca: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="coresDisponiveis">Cores Disponíveis</Label>
                                    <Input
                                        id="coresDisponiveis"
                                        name="coresDisponiveis"
                                        value={produto.coresDisponiveis}
                                        onChange={(e) => setProduto({ ...produto, coresDisponiveis: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="categoria">Categoria</Label>
                                    <Input
                                        id="categoria"
                                        name="categoria"
                                        value={produto.categoria}
                                        onChange={(e) => setProduto({ ...produto, categoria: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-4 items-center justify-center">
                                <div className="space-y-2 flex flex-col items-center">
                                    <Label htmlFor="ativo">Ativo</Label>
                                    <Switch
                                        checked={produto.ativo === 1}
                                        onCheckedChange={(checked) => setProduto({ ...produto, ativo: checked ? 1 : 0 })}
                                    />
                                </div>

                                <div className="space-y-2 flex flex-col items-center">
                                    <Label htmlFor="descontinuado">Descontinuado</Label>
                                    <Switch
                                        checked={produto.descontinuado === 1}
                                        onCheckedChange={(checked) => setProduto({ ...produto, descontinuado: checked ? 1 : 0 })}
                                    />
                                </div>

                                <div className="space-y-2 flex flex-col items-center">
                                    <Label htmlFor="aDescontinuar">A Descontinuar</Label>
                                    <Switch
                                        checked={produto.aDescontinuar === 1}
                                        onCheckedChange={(checked) => setProduto({ ...produto, aDescontinuar: checked ? 1 : 0 })}
                                    />
                                </div>
                            </div>

                        </CardContent>
                    </Card>

                    {/* Custo e Precificação */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">Custo e Precificação</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="precoCompra">Preço de Compra</Label>
                                    <Input
                                        id="precoCompra"
                                        name="precoCompra"
                                        type="number"
                                        value={produto.precoCompra}
                                        onChange={(e) => setProduto({ ...produto, precoCompra: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="markupMultiplicador">Markup Multiplicador</Label>
                                    <Input
                                        id="markupMultiplicador"
                                        name="markupMultiplicador"
                                        type="number"
                                        value={produto.markupMultiplicador}
                                        onChange={(e) => setProduto({ ...produto, markupMultiplicador: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="margemLucro">Margem de Lucro (%)</Label>
                                    <Input
                                        id="margemLucro"
                                        name="margemLucro"
                                        type="number"
                                        value={produto.margemLucro}
                                        onChange={(e) => setProduto({ ...produto, margemLucro: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="margemSeguranca">Margem de Segurança</Label>
                                    <Input
                                        id="margemSeguranca"
                                        name="margemSeguranca"
                                        type="number"
                                        value={produto.margemSeguranca}
                                        onChange={(e) => setProduto({ ...produto, margemSeguranca: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="margemLucroMinima">Margem de Lucro Mínima</Label>
                                    <Input
                                        id="margemLucroMinima"
                                        name="margemLucroMinima"
                                        type="number"
                                        value={produto.margemLucroMinima}
                                        onChange={(e) => setProduto({ ...produto, margemLucroMinima: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="quantidade">Quantidade</Label>
                                    <Input
                                        id="quantidade"
                                        name="quantidade"
                                        type="number"
                                        value={produto.quantidade}
                                        onChange={(e) => setProduto({ ...produto, quantidade: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="custoMedio">Custo Médio</Label>
                                    <Input
                                        id="custoMedio"
                                        name="custoMedio"
                                        type="number"
                                        value={produto.custoMedio}
                                        onChange={(e) => setProduto({ ...produto, custoMedio: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Informações Complementares */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">Informações Complementares</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="unidadeMedida">Unidade de Medida</Label>
                                    <Select
                                        value={produto.unidadeMedida}
                                        onValueChange={(value) => setProduto({ ...produto, unidadeMedida: value })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione a unidade de medida" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Unidade">Unidade</SelectItem>
                                            <SelectItem value="Caixa">Caixa</SelectItem>
                                            <SelectItem value="Litro">Litro</SelectItem>
                                            <SelectItem value="Metro">Metro</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="tabelaPreco">Tabela de Preço</Label>
                                    <Select
                                        value={produto.tabelaPreco}
                                        onValueChange={(value) => setProduto({ ...produto, tabelaPreco: value })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione a tabela" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="padrao">Tabela Padrão</SelectItem>
                                            <SelectItem value="promocional">Tabela Promocional</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Demais campos */}
                            <div className="grid grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="alturaUnidade">Altura da Unidade</Label>
                                    <Input
                                        id="alturaUnidade"
                                        name="alturaUnidade"
                                        type="number"
                                        value={produto.alturaUnidade}
                                        onChange={(e) => setProduto({ ...produto, alturaUnidade: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="larguraUnidade">Largura da Unidade</Label>
                                    <Input
                                        id="larguraUnidade"
                                        name="larguraUnidade"
                                        type="number"
                                        value={produto.larguraUnidade}
                                        onChange={(e) => setProduto({ ...produto, larguraUnidade: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="comprimentoUnidade">Comprimento da Unidade</Label>
                                    <Input
                                        id="comprimentoUnidade"
                                        name="comprimentoUnidade"
                                        type="number"
                                        value={produto.comprimentoUnidade}
                                        onChange={(e) => setProduto({ ...produto, comprimentoUnidade: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="pesoLiquido">Peso Líquido</Label>
                                    <Input
                                        id="pesoLiquido"
                                        name="pesoLiquido"
                                        type="number"
                                        value={produto.pesoLiquido}
                                        onChange={(e) => setProduto({ ...produto, pesoLiquido: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="fatorCubagem">Fator de Cubagem</Label>
                                    <Input
                                        id="fatorCubagem"
                                        name="fatorCubagem"
                                        type="number"
                                        value={produto.fatorCubagem}
                                        onChange={(e) => setProduto({ ...produto, fatorCubagem: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="fatorEmbalagem">Fator de Embalagem</Label>
                                    <Input
                                        id="fatorEmbalagem"
                                        name="fatorEmbalagem"
                                        type="number"
                                        value={produto.fatorEmbalagem}
                                        onChange={(e) => setProduto({ ...produto, fatorEmbalagem: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                {/* Código Original */}
                                <div className="space-y-2">
                                    <Label htmlFor="codigoOriginal">Código Original</Label>
                                    <Input
                                        id="codigoOriginal"
                                        name="codigoOriginal"
                                        value={produto.codigoOriginal}
                                        onChange={(e) => setProduto({ ...produto, codigoOriginal: e.target.value })}
                                    />
                                </div>

                                {/* Referência */}
                                <div className="space-y-2">
                                    <Label htmlFor="referencia">Referência</Label>
                                    <Input
                                        id="referencia"
                                        name="referencia"
                                        value={produto.referencia}
                                        onChange={(e) => setProduto({ ...produto, referencia: e.target.value })}
                                    />
                                </div>

                                {/* Modelo */}
                                <div className="space-y-2">
                                    <Label htmlFor="modelo">Modelo</Label>
                                    <Input
                                        id="modelo"
                                        name="modelo"
                                        value={produto.modelo}
                                        onChange={(e) => setProduto({ ...produto, modelo: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                {/* Referência Agrupamento */}
                                <div className="space-y-2">
                                    <Label htmlFor="referenciaAgrupamento">Referência Agrupamento</Label>
                                    <Input
                                        id="referenciaAgrupamento"
                                        name="referenciaAgrupamento"
                                        value={produto.referenciaAgrupamento}
                                        onChange={(e) => setProduto({ ...produto, referenciaAgrupamento: e.target.value })}
                                    />
                                </div>

                                {/* ICMS */}
                                <div className="space-y-2">
                                    <Label htmlFor="icms">ICMS (%)</Label>
                                    <Input
                                        id="icms"
                                        name="icms"
                                        type="number"
                                        value={produto.icms}
                                        onChange={(e) => setProduto({ ...produto, icms: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="ipi">IPI (%)</Label>
                                    <Input
                                        id="ipi"
                                        name="ipi"
                                        type="number"
                                        value={produto.ipi}
                                        onChange={(e) => setProduto({ ...produto, ipi: e.target.value })}
                                    />
                                </div>
                            </div>


                            {/* Observações */}
                            <div className="space-y-2">
                                <Label htmlFor="observacoes">Observações</Label>
                                <Input
                                    id="observacoes"
                                    name="observacoes"
                                    value={produto.observacoes}
                                    onChange={(e) => setProduto({ ...produto, observacoes: e.target.value })}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex justify-between space-x-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.push("/dashboard/produtos")}
                        >
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={saving} onClick={handleSave}>
                            {saving ? "Salvando..." : "Salvar Produto"}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}
