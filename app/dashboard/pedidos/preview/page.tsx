"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

// Mock data for preview
const orderPreview = {
  numero: "PED001",
  data: "20/02/2025",
  empresa: {
    nome: "SuaGestão Ltda",
    cnpj: "12.345.678/0001-90",
    endereco: "Av. Paulista, 1000",
    cidade: "São Paulo",
    estado: "SP",
    telefone: "(11) 3456-7890",
    email: "contato@suagestao.com",
  },
  cliente: {
    nome: "Empresa ABC Ltda",
    cnpj: "98.765.432/0001-21",
    endereco: "Rua do Comércio, 500",
    cidade: "São Paulo",
    estado: "SP",
    telefone: "(11) 98765-4321",
    email: "contato@abc.com",
  },
  representada: {
    nome: "Xalingo Brinquedos",
    cnpj: "45.678.901/0001-23",
  },
  transportadora: {
    nome: "Transportadora Rápida",
    tipoFrete: "CIF - Pago pelo Remetente",
  },
  itens: [
    {
      codigo: "7001",
      nome: "Boneco Aventureiro",
      quantidade: 10,
      peso: 5.00,
      preco: 89.90,
      total: 899.00,
    },
    {
      codigo: "7002",
      nome: "Carrinho de Controle",
      quantidade: 5,
      peso: 4.00,
      preco: 129.90,
      total: 649.50,
    },
  ],
  totais: {
    subtotal: 1548.50,
    acrescimo: 0,
    desconto: 50,
    frete: 35,
    total: 1533.50,
    pesoTotal: 9,
  },
  condicoesPagamento: "Boleto 30/60/90 dias",
  observacoes: "Entrega em horário comercial.",
};

export default function PedidoPreviewPage() {
  const router = useRouter();

  // Auto-print on component mount
  useEffect(() => {
    // Small delay to ensure content is rendered
    const timer = setTimeout(() => {
      window.print();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <div className="print:hidden flex justify-end p-4">
        <Button onClick={handlePrint}>
          <Printer className="h-4 w-4 mr-2" />
          Imprimir
        </Button>
      </div>

      <div className="max-w-[21cm] mx-auto bg-white p-8 print:p-0 print:max-w-none">
        {/* Cabeçalho */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-xl font-bold">Pedido #{orderPreview.numero}</h1>
              <p className="text-sm">Data: {orderPreview.data}</p>
            </div>
            <div className="text-right">
              <h2 className="font-bold">{orderPreview.empresa.nome}</h2>
              <p className="text-sm">CNPJ: {orderPreview.empresa.cnpj}</p>
              <p className="text-sm">{orderPreview.empresa.endereco}</p>
              <p className="text-sm">{orderPreview.empresa.telefone}</p>
              <p className="text-sm">{orderPreview.empresa.email}</p>
            </div>
          </div>
        </div>

        {/* Cliente e Representada */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="font-bold mb-2">Cliente</h3>
            <p className="text-sm">{orderPreview.cliente.nome}</p>
            <p className="text-sm">CNPJ: {orderPreview.cliente.cnpj}</p>
            <p className="text-sm">{orderPreview.cliente.endereco}</p>
            <p className="text-sm">{orderPreview.cliente.telefone}</p>
            <p className="text-sm">{orderPreview.cliente.email}</p>
          </div>
          <div>
            <h3 className="font-bold mb-2">Representada</h3>
            <p className="text-sm">{orderPreview.representada.nome}</p>
            <p className="text-sm">CNPJ: {orderPreview.representada.cnpj}</p>
          </div>
        </div>

        {/* Itens do Pedido */}
        <div className="mb-8">
          <h3 className="font-bold mb-4">Itens do Pedido</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Código</th>
                <th className="text-left py-2">Produto</th>
                <th className="text-right py-2">Qtde</th>
                <th className="text-right py-2">Peso</th>
                <th className="text-right py-2">Preço Un.</th>
                <th className="text-right py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {orderPreview.itens.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2">{item.codigo}</td>
                  <td className="py-2">{item.nome}</td>
                  <td className="text-right py-2">{item.quantidade}</td>
                  <td className="text-right py-2">{item.peso.toFixed(2)} Kg</td>
                  <td className="text-right py-2">
                    {item.preco.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    })}
                  </td>
                  <td className="text-right py-2">
                    {item.total.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Transporte e Totais */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="font-bold mb-2">Transporte</h3>
            <p className="text-sm">Transportadora: {orderPreview.transportadora.nome}</p>
            <p className="text-sm">Tipo de Frete: {orderPreview.transportadora.tipoFrete}</p>
            <p className="text-sm">Peso Total: {orderPreview.totais.pesoTotal} Kg</p>
          </div>
          <div>
            <table className="w-full text-sm">
              <tbody>
                <tr>
                  <td className="py-1">Subtotal:</td>
                  <td className="text-right">
                    {orderPreview.totais.subtotal.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    })}
                  </td>
                </tr>
                <tr>
                  <td className="py-1">Acréscimo:</td>
                  <td className="text-right">
                    {orderPreview.totais.acrescimo.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    })}
                  </td>
                </tr>
                <tr>
                  <td className="py-1">Desconto:</td>
                  <td className="text-right">
                    {orderPreview.totais.desconto.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    })}
                  </td>
                </tr>
                <tr>
                  <td className="py-1">Frete:</td>
                  <td className="text-right">
                    {orderPreview.totais.frete.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    })}
                  </td>
                </tr>
                <tr className="font-bold border-t">
                  <td className="py-1">Total Final:</td>
                  <td className="text-right">
                    {orderPreview.totais.total.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    })}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Condições de Pagamento */}
        <div className="mb-8">
          <h3 className="font-bold mb-2">Condições de Pagamento</h3>
          <p className="text-sm">{orderPreview.condicoesPagamento}</p>
        </div>

        {/* Observações */}
        <div className="mb-8">
          <h3 className="font-bold mb-2">Observações</h3>
          <p className="text-sm">{orderPreview.observacoes}</p>
        </div>

        {/* Assinaturas */}
        <div className="grid grid-cols-2 gap-8 mt-16">
          <div className="text-center">
            <div className="border-t pt-2">
              <p className="text-sm">Assinatura do Vendedor</p>
            </div>
          </div>
          <div className="text-center">
            <div className="border-t pt-2">
              <p className="text-sm">Assinatura do Cliente</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}