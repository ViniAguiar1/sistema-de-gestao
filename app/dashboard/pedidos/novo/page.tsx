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
import { Separator } from "@/components/ui/separator";
import { Building2, Package, Search, ShoppingCart, User, Check, Truck, FileUp, ExternalLink } from "lucide-react";
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
    codigo: "7001",
    nome: "Boneco Aventureiro",
    preco: 89.90,
    estoque: 150,
    peso: 0.5,
  },
  {
    id: 2,
    codigo: "7002",
    nome: "Carrinho de Controle",
    preco: 129.90,
    estoque: 80,
    peso: 0.8,
  },
  {
    id: 3,
    codigo: "7003",
    nome: "Jogo de Tabuleiro",
    preco: 59.90,
    estoque: 200,
    peso: 1.2,
  },
  {
    id: 4,
    codigo: "7061",
    nome: "Boneca Fashion",
    preco: 79.90,
    estoque: 100,
    peso: 0.4,
  },
  {
    id: 5,
    codigo: "7062",
    nome: "Kit Maquiagem",
    preco: 45.90,
    estoque: 120,
    peso: 0.3,
  },
];

const transportadoras = [
  {
    id: 1,
    nome: "Transportadora Rápida",
    prazo: "2-3 dias úteis",
    valorMinimo: 25.00,
  },
  {
    id: 2,
    nome: "Entrega Express",
    prazo: "1-2 dias úteis",
    valorMinimo: 35.00,
  },
  {
    id: 3,
    nome: "Logística Brasil",
    prazo: "3-5 dias úteis",
    valorMinimo: 20.00,
  },
];

const tiposFrete = [
  { id: 1, nome: "CIF - Pago pelo Remetente" },
  { id: 2, nome: "FOB - Pago pelo Destinatário" },
];

export default function NovoPedidoPage() {
  const router = useRouter();
  const [selectedRepresentada, setSelectedRepresentada] = useState("");
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [searchProduct, setSearchProduct] = useState("");
  const [openProductSearch, setOpenProductSearch] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<typeof clientes[0] | null>(null);
  const [clientSearch, setClientSearch] = useState("");
  const [selectedTransportadora, setSelectedTransportadora] = useState("");
  const [selectedTipoFrete, setSelectedTipoFrete] = useState("");
  const [valorFrete, setValorFrete] = useState(0);
  const [acrescimo, setAcrescimo] = useState(0);
  const [desconto, setDesconto] = useState(0);

  const handleAddItem = (produto: any) => {
    if (!selectedItems.find(item => item.id === produto.id)) {
      setSelectedItems([...selectedItems, { ...produto, quantidade: 1 }]);
    }
    setOpenProductSearch(false);
    setSearchProduct("");
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

  const handleSelectClient = (client: typeof clientes[0]) => {
    setSelectedClient(client);
    setOpen(false);
  };

  const filteredClientes = clientes.filter((client) =>
    client.razaoSocial.toLowerCase().includes(clientSearch.toLowerCase()) ||
    client.cnpj.includes(clientSearch)
  );

  const filteredProdutos = produtos.filter((produto) =>
    produto.codigo.toLowerCase().includes(searchProduct.toLowerCase()) ||
    produto.nome.toLowerCase().includes(searchProduct.toLowerCase())
  );

  const handleImportItems = () => {
    // Aqui implementaríamos a lógica de importação
    console.log("Importando itens...");
  };

  const handlePreviewOrder = () => {
    // Aqui abriríamos o pedido em nova guia
    window.open("/dashboard/pedidos/preview", "_blank");
  };

  // Cálculos dos totais
  const subtotal = selectedItems.reduce(
    (total, item) => total + item.preco * item.quantidade,
    0
  );

  const pesoTotal = selectedItems.reduce(
    (total, item) => total + item.peso * item.quantidade,
    0
  );

  const totalComAcrescimo = subtotal + acrescimo;
  const totalComDesconto = totalComAcrescimo - desconto;
  const totalFinal = totalComDesconto + valorFrete;

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
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Popover open={openProductSearch} onOpenChange={setOpenProductSearch}>
                  <PopoverTrigger asChild>
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Buscar produtos por código ou nome..."
                        value={searchProduct}
                        onChange={(e) => setSearchProduct(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-[400px] p-0" align="start">
                    <Command>
                      <CommandInput 
                        placeholder="Digite o código ou nome do produto..." 
                        value={searchProduct}
                        onValueChange={setSearchProduct}
                      />
                      <CommandEmpty>Nenhum produto encontrado.</CommandEmpty>
                      <CommandGroup>
                        {filteredProdutos.map((produto) => (
                          <CommandItem
                            key={produto.id}
                            value={`${produto.codigo} ${produto.nome}`}
                            onSelect={() => handleAddItem(produto)}
                            className="flex flex-col items-start py-3"
                          >
                            <div className="flex items-center w-full">
                              <span className="font-medium">{produto.codigo} - {produto.nome}</span>
                              {selectedItems.find(item => item.id === produto.id) && (
                                <Check className="ml-auto h-4 w-4" />
                              )}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                              <span>
                                {produto.preco.toLocaleString('pt-BR', {
                                  style: 'currency',
                                  currency: 'BRL'
                                })}
                              </span>
                              <span>Estoque: {produto.estoque}</span>
                            </div>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
              <Button variant="outline" className="gap-2" onClick={handleImportItems}>
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
                    <th className="py-3 px-4 text-right">Peso</th>
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
                        {(item.peso * item.quantidade).toFixed(2)} Kg
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
          </CardContent>
        </Card>

        {/* Transporte */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5" />
              Transporte
            </CardTitle>
            <CardDescription>
              Selecione a transportadora e o tipo de frete
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Transportadora</Label>
                <Select value={selectedTransportadora} onValueChange={setSelectedTransportadora}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a transportadora" />
                  </SelectTrigger>
                  <SelectContent>
                    {transportadoras.map((transportadora) => (
                      <SelectItem key={transportadora.id} value={transportadora.id.toString()}>
                        <div className="flex flex-col">
                          <span>{transportadora.nome}</span>
                          <span className="text-sm text-muted-foreground">
                            Prazo: {transportadora.prazo}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Tipo de Frete</Label>
                <Select value={selectedTipoFrete} onValueChange={setSelectedTipoFrete}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo de frete" />
                  </SelectTrigger>
                  <SelectContent>
                    {tiposFrete.map((tipo) => (
                      <SelectItem key={tipo.id} value={tipo.id.toString()}>
                        {tipo.nome}
                      </SelectItem>
                    ))}
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
                value={valorFrete}
                onChange={(e) => setValorFrete(Number(e.target.value))}
                placeholder="0,00"
              />
            </div>
          </CardContent>
        </Card>

        {/* Totais */}
        <Card>
          <CardHeader>
            <CardTitle>Totais do Pedido</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-6">
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Qtde. Itens:</span>
                  <span>{selectedItems.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Qtde. Produtos:</span>
                  <span>
                    {selectedItems.reduce((total, item) => total + item.quantidade, 0)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Peso Líquido:</span>
                  <span>{pesoTotal.toFixed(3)} Kg</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total IPI:</span>
                  <span>R$ 0,00</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Acréscimo:</span>
                  <span>
                    {acrescimo.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    })}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Peso Bruto:</span>
                  <span>{pesoTotal.toFixed(3)} Kg</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total S/ Impostos:</span>
                  <span>
                    {subtotal.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    })}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Frete:</span>
                  <span>
                    {valorFrete.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    })}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Desconto:</span>
                  <span>
                    {desconto.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    })}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total S/:</span>
                  <span>
                    {totalComDesconto.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    })}
                  </span>
                </div>
                <div className="flex justify-between font-medium text-lg pt-2 border-t">
                  <span>Total Final:</span>
                  <span>
                    {totalFinal.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    })}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ações */}
        <div className="flex justify-end gap-4">
          <Button variant="outline" size="lg" onClick={handlePreviewOrder} className="gap-2">
            <ExternalLink className="h-4 w-4" />
            Visualizar Pedido
          </Button>
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