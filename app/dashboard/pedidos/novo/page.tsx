"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, Package, Search, ShoppingCart, User, Check } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

// Mock data
const clientes = [
  {
    id: 1,
    razaoSocial: "Empresa ABC Ltda",
    cnpj: "12.345.678/0001-90",
    email: "contato@abc.com",
    telefone: "(11) 98765-4321",
    cidade: "São Paulo",
    estado: "SP",
  },
  {
    id: 2,
    razaoSocial: "Distribuidora XYZ",
    cnpj: "23.456.789/0001-89",
    email: "contato@xyz.com",
    telefone: "(21) 98765-4321",
    cidade: "Rio de Janeiro",
    estado: "RJ",
  },
  {
    id: 3,
    razaoSocial: "Comércio Sul",
    cnpj: "34.567.890/0001-78",
    email: "contato@sul.com",
    telefone: "(51) 98765-4321",
    cidade: "Porto Alegre",
    estado: "RS",
  },
];

const representadas = [
  {
    id: 1,
    nome: "Xalingo Brinquedos",
    segmento: "Brinquedos",
    comissao: 8,
  },
  {
    id: 2,
    nome: "Athia Heroes",
    segmento: "Games e Entretenimento",
    comissao: 10,
  },
  {
    id: 3,
    nome: "Brasil Fit",
    segmento: "Equipamentos Esportivos",
    comissao: 12,
  },
];

const produtos = [
  {
    id: 1,
    codigo: "XLG-001",
    nome: "Boneco Aventureiro",
    preco: 89.90,
    estoque: 150,
  },
  {
    id: 2,
    codigo: "XLG-002",
    nome: "Carrinho de Controle",
    preco: 129.90,
    estoque: 80,
  },
  {
    id: 3,
    codigo: "XLG-003",
    nome: "Jogo de Tabuleiro",
    preco: 59.90,
    estoque: 200,
  },
];

export default function NovoPedidoPage() {
  const [selectedRepresentada, setSelectedRepresentada] = useState("");
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [searchProduct, setSearchProduct] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<typeof clientes[0] | null>(null);
  const [clientSearch, setClientSearch] = useState("");

  const handleAddItem = (produto: any) => {
    if (!selectedItems.find(item => item.id === produto.id)) {
      setSelectedItems([...selectedItems, { ...produto, quantidade: 1 }]);
    }
  };

  const handleUpdateQuantity = (id: number, quantidade: number) => {
    if (quantidade > 0) {
      setSelectedItems(
        selectedItems.map((item) =>
          item.id === id ? { ...item, quantidade } : item
        )
      );
    }
  };

  const handleRemoveItem = (id: number) => {
    setSelectedItems(selectedItems.filter((item) => item.id !== id));
  };

  const totalPedido = selectedItems.reduce(
    (total, item) => total + item.preco * item.quantidade,
    0
  );

  const handleSelectClient = (client: typeof clientes[0]) => {
    setSelectedClient(client);
    setOpen(false);
  };

  const filteredClientes = clientes.filter((client) =>
    client.razaoSocial.toLowerCase().includes(clientSearch.toLowerCase()) ||
    client.cnpj.includes(clientSearch)
  );

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Novo Pedido</h2>
      </div>

      <div className="grid gap-6">
        {/* Seleção da Representada */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Selecione a Representada
            </CardTitle>
            <CardDescription>
              Escolha a empresa para qual você está fazendo o pedido
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Select value={selectedRepresentada} onValueChange={setSelectedRepresentada}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione uma representada" />
              </SelectTrigger>
              <SelectContent>
                {representadas.map((representada) => (
                  <SelectItem key={representada.id} value={representada.id.toString()}>
                    <div className="flex flex-col">
                      <span>{representada.nome}</span>
                      <span className="text-sm text-muted-foreground">
                        {representada.segmento} - Comissão: {representada.comissao}%
                      </span>
                    </div>
                  </SelectItem>
                ))}
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
              Busque um cliente existente ou cadastre um novo
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between"
                >
                  {selectedClient ? selectedClient.razaoSocial : "Buscar cliente..."}
                  <User className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[400px] p-0">
                <Command>
                  <CommandInput 
                    placeholder="Digite o nome ou CNPJ do cliente..." 
                    value={clientSearch}
                    onValueChange={setClientSearch}
                  />
                  <CommandEmpty>Nenhum cliente encontrado.</CommandEmpty>
                  <CommandGroup>
                    {filteredClientes.map((client) => (
                      <CommandItem
                        key={client.id}
                        value={client.razaoSocial}
                        onSelect={() => handleSelectClient(client)}
                        className="flex flex-col items-start py-3"
                      >
                        <div className="flex items-center w-full">
                          <span className="font-medium">{client.razaoSocial}</span>
                          {selectedClient?.id === client.id && (
                            <Check className="ml-auto h-4 w-4" />
                          )}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          CNPJ: {client.cnpj}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {client.cidade}/{client.estado}
                        </span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>

            {selectedClient ? (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nome/Razão Social</Label>
                  <Input value={selectedClient.razaoSocial} readOnly />
                </div>
                <div className="space-y-2">
                  <Label>CNPJ/CPF</Label>
                  <Input value={selectedClient.cnpj} readOnly />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input value={selectedClient.email} readOnly />
                </div>
                <div className="space-y-2">
                  <Label>Telefone</Label>
                  <Input value={selectedClient.telefone} readOnly />
                </div>
              </div>
            ) : (
              <div className="rounded-lg border-2 border-dashed p-4">
                <p className="text-center text-muted-foreground">
                  Busque um cliente existente ou{" "}
                  <Button variant="link" className="px-1 h-auto">
                    cadastre um novo cliente
                  </Button>
                </p>
              </div>
            )}
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
              Adicione os produtos ao pedido
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar produtos..."
                className="pl-8"
                value={searchProduct}
                onChange={(e) => setSearchProduct(e.target.value)}
              />
            </div>

            <div className="rounded-lg border">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="py-3 px-4 text-left">Produto</th>
                    <th className="py-3 px-4 text-right">Preço</th>
                    <th className="py-3 px-4 text-right">Estoque</th>
                    <th className="py-3 px-4 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {produtos
                    .filter((produto) =>
                      produto.nome.toLowerCase().includes(searchProduct.toLowerCase())
                    )
                    .map((produto) => (
                      <tr key={produto.id} className="border-b">
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium">{produto.nome}</p>
                            <p className="text-sm text-muted-foreground">
                              {produto.codigo}
                            </p>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right">
                          {produto.preco.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                          })}
                        </td>
                        <td className="py-3 px-4 text-right">{produto.estoque}</td>
                        <td className="py-3 px-4 text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleAddItem(produto)}
                          >
                            Adicionar
                          </Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            <Separator />

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
                  {selectedItems.map((item) => (
                    <tr key={item.id} className="border-b">
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium">{item.nome}</p>
                          <p className="text-sm text-muted-foreground">
                            {item.codigo}
                          </p>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right">
                        {item.preco.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL'
                        })}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Input
                          type="number"
                          min="1"
                          max={item.estoque}
                          value={item.quantidade}
                          onChange={(e) =>
                            handleUpdateQuantity(item.id, parseInt(e.target.value))
                          }
                          className="w-20"
                        />
                      </td>
                      <td className="py-3 px-4 text-right">
                        {(item.preco * item.quantidade).toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL'
                        })}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          Remover
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between items-center pt-4">
              <div>
                <p className="text-lg font-semibold">Total do Pedido:</p>
                <p className="text-sm text-muted-foreground">
                  {selectedItems.length} itens
                </p>
              </div>
              <div className="text-2xl font-bold">
                {totalPedido.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ações */}
        <div className="flex justify-end gap-4">
          <Button variant="outline" size="lg">
            Salvar Rascunho
          </Button>
          <Button size="lg" className="gap-2">
            <ShoppingCart className="h-4 w-4" />
            Finalizar Pedido
          </Button>
        </div>
      </div>
    </div>
  );
}