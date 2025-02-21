"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Gem, Star } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <nav className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Gem className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold">SuaGestão</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="ghost">Entrar</Button>
              </Link>
              <Link href="/register">
                <Button>Começar Agora</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Simplifique a Gestão do Seu Negócio
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
              Controle vendas, estoque e finanças em um só lugar. Comece agora com 14 dias grátis,
              sem necessidade de cartão de crédito.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/register">
                <Button size="lg" className="px-8">
                  Teste Grátis por 14 Dias
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div key={index} className="relative">
                <div className="flex items-center space-x-4">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                </div>
                <p className="mt-4 text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Planos que Cabem no Seu Bolso
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Comece gratuitamente e escolha o plano ideal para o seu negócio
            </p>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {plans.map((plan, index) => (
              <div
                key={index}
                className="relative rounded-2xl border bg-white p-8 shadow-sm flex flex-col"
              >
                <div className="mb-6">
                  {plan.popular && (
                    <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-medium bg-primary text-primary-foreground">
                        Mais Popular
                      </span>
                    </div>
                  )}
                  <h3 className="text-lg font-semibold leading-6">{plan.name}</h3>
                  <p className="mt-4 text-sm text-gray-600">{plan.description}</p>
                  <p className="mt-8">
                    <span className="text-4xl font-bold tracking-tight">R${plan.price}</span>
                    <span className="text-base font-medium text-gray-500">/mês</span>
                  </p>
                </div>
                <ul className="space-y-4 flex-1">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Star className="h-5 w-5 text-primary" />
                      <span className="ml-3 text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/register" className="mt-8">
                  <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                    Começar Agora
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Gem className="h-6 w-6 text-primary" />
              <span className="ml-2 text-lg font-semibold">SuaGestão</span>
            </div>
            <p className="text-sm text-gray-500">© 2024 SuaGestão. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

const features = [
  {
    title: "Controle de Vendas",
    description: "Gerencie suas vendas com facilidade, emita notas fiscais e acompanhe o desempenho em tempo real.",
  },
  {
    title: "Gestão de Estoque",
    description: "Controle seu estoque, receba alertas de produtos baixos e faça pedidos automaticamente.",
  },
  {
    title: "Relatórios Financeiros",
    description: "Acompanhe receitas, despesas e lucros com relatórios detalhados e gráficos intuitivos.",
  },
  {
    title: "Controle de Clientes",
    description: "Mantenha um cadastro completo dos seus clientes e histórico de compras.",
  },
  {
    title: "Gestão de Fornecedores",
    description: "Organize seus fornecedores, pedidos e pagamentos em um só lugar.",
  },
  {
    title: "Fluxo de Caixa",
    description: "Controle entradas, saídas e tenha uma visão clara da saúde financeira do seu negócio.",
  },
];

const plans = [
  {
    name: "Iniciante",
    description: "Perfeito para pequenos negócios",
    price: 0,
    popular: false,
    features: [
      "14 dias de teste grátis",
      "Controle de vendas básico",
      "Até 100 produtos",
      "1 usuário",
      "Suporte por email",
    ],
  },
  {
    name: "Profissional",
    description: "Para negócios em crescimento",
    price: 97,
    popular: true,
    features: [
      "Tudo do plano Iniciante",
      "Produtos ilimitados",
      "Até 5 usuários",
      "Controle financeiro completo",
      "Relatórios avançados",
      "Suporte prioritário",
    ],
  },
  {
    name: "Empresarial",
    description: "Para empresas estabelecidas",
    price: 197,
    popular: false,
    features: [
      "Tudo do plano Profissional",
      "Usuários ilimitados",
      "API disponível",
      "Suporte 24/7",
      "Treinamento personalizado",
      "Gestor de conta dedicado",
    ],
  },
];