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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Building2, Package, Search, ShoppingCart, User, Check, Truck, FileUp, ExternalLink } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { pedidos } from "../data";

export function PedidoEditar() {
  const router = useRouter();
  const params = useParams();
  const pedidoId = params.id as string;
  const [loading, setLoading] = useState(false);

  // Find order details
  const pedido = pedidos.find(p => p.id === pedidoId);

  if (!pedido) {
    return (
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center text-muted-foreground">Pedido não encontrado</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (pedido.status !== 'Rascunho') {
    return (
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center text-muted-foreground">
              Este pedido não pode ser editado pois não está em status de rascunho.
            </div>
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
      router.push('/dashboard/pedidos');
    } catch (error) {
      console.error('Erro ao atualizar pedido:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePreview = () => {
    window.open('/dashboard/pedidos/preview', '_blank');
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <h2 className="text-3xl font-bold tracking-tight">Editar Pedido #{pedidoId}</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6">
          {/* Representada */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Representada
              </CardTitle>
              <CardDescription>
                Empresa para qual você está fazendo o pedido
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Select defaultValue={pedido.representada}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione uma representada" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Xalingo Brinquedos">Xalingo Brinquedos</SelectItem>
                  <SelectItem value="Athia Heroes">Athia Heroes</SelectItem>
                  <SelectItem value="Brasil Fit">Brasil Fit</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Cliente */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Cliente
              </CardTitle>
              <CardDescription>
                Dados do cliente
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nome/Razão Social</Label>
                  <Input value={pedido.cliente.nome} readOnly />
                </div>
                <div className="space-y-2">
                  <Label>Cidade/UF</Label>
                  <Input value={`${pedido.cliente.cidade}/${pedido.cliente.estado}`} readOnly />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Produtos */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Produtos
              </CardTitle>
              <CardDescription>
                Itens do pedido
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar produtos por código ou nome..."
                    className="pl-9"
                  />
                </div>
                <Button variant="outline" className="gap-2">
                  <FileUp className="h-4 w-4" />
                  Importar Itens
                </Button>
              </div>

              <div className="rounded-lg border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="py-3 px-4 text-left">Produto</th>
                      <th className="py-3 px-4 text-right">Preço Un.</th>
                      <th className="py-3 px-4 text-right">Qtd</th>
                      <th className="py-3 px-4 text-right">Total</th>
                      <th className="py-3 px-4 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium">Boneco Aventureiro</p>
                          <p className="text-sm text-muted-foreground">XLG-001</p>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right">R$ 89,90</td>
                      <td className="py-3 px-4 text-right">
                        <Input
                          type="number"
                          min="1"
                          value="2"
                          className="w-20"
                        />
                      </td>
                      <td className="py-3 px-4 text-right">R$ 179,80</td>
                      <td className="py-3 px-4 text-right">
                        <Button variant="destructive" size="sm">
                          Remover
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Transporte */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Transporte
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Transportadora</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a transportadora" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Transportadora Rápida</SelectItem>
                      <SelectItem value="2">Entrega Express</SelectItem>
                      <SelectItem value="3">Logística Brasil</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Tipo de Frete</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo de frete" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CIF">CIF - Pago pelo Remetente</SelectItem>
                      <SelectItem value="FOB">FOB - Pago pelo Destinatário</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Valor do Frete</Label>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0,00"
                />
              </div>
            </CardContent>
          </Card>

          {/* Ações */}
          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={handlePreview} className="gap-2">
              <ExternalLink className="h-4 w-4" />
              Visualizar Pedido
            </Button>
            <Button variant="outline" size="lg">
              Salvar Rascunho
            </Button>
            <Button type="submit" size="lg" className="gap-2" disabled={loading}>
              <ShoppingCart className="h-4 w-4" />
              {loading ? "Salvando..." : "Finalizar Pedido"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}