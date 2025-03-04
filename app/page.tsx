"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, ChevronDown, Star, Building, BarChart, Users, ShoppingCart, Briefcase, DollarSign } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import logo from '@/assets/1x/logo.png'

export default function Home() {
  const [expandedPlans, setExpandedPlans] = useState<{[key: string]: boolean}>({
    "Bronze": false,
    "Prata": false,
    "Ouro": false
  });

  const togglePlanExpansion = (planName: string) => {
    setExpandedPlans(prev => ({
      ...prev,
      [planName]: !prev[planName]
    }));
  };

  const renderFeatures = (plan: any) => {
    const featureLimit = expandedPlans[plan.name] ? plan.features.length : 7;
    const hasMoreFeatures = plan.features.length > 7;

    return (
      <>
        <ul className="space-y-4 flex-1">
          {plan.features.slice(0, featureLimit).map((feature: string, featureIndex: number) => (
            <li key={featureIndex} className="flex items-start">
              <Star className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <span className="ml-3 text-sm text-gray-600">{feature}</span>
            </li>
          ))}
        </ul>
        {hasMoreFeatures && (
          <Button 
            variant="ghost" 
            className="mt-4 text-primary hover:text-primary/80 flex items-center justify-center w-full"
            onClick={() => togglePlanExpansion(plan.name)}
          >
            {expandedPlans[plan.name] ? "Ver menos" : "Ver mais recursos"}
            <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${expandedPlans[plan.name] ? 'rotate-180' : ''}`} />
          </Button>
        )}
      </>
    );
  };

  const heroSlides = [
    {
      title: "Simplifique a Gestão do Seu Negócio",
      description: "Controle vendas, estoque e finanças em um só lugar. Comece agora com 14 dias grátis, sem necessidade de cartão de crédito.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2940&auto=format&fit=crop",
      alt: "Gestão de negócios"
    },
    {
      title: "Aumente suas Vendas com Ferramentas Inteligentes",
      description: "Utilize relatórios avançados e insights de dados para tomar decisões estratégicas e impulsionar seu crescimento.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
      alt: "Análise de dados de vendas"
    },
    {
      title: "Gerencie sua Equipe com Eficiência",
      description: "Acompanhe o desempenho, defina metas e otimize a produtividade da sua equipe de vendas.",
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2940&auto=format&fit=crop",
      alt: "Equipe de trabalho"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <nav className="border-b bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <div className="h-10 w-32 flex items-center justify-center">
                {/* <span className="font-bold text-gray-700">Tavrus</span> */}
                <Image src={logo} alt="Tavrus" width={100} height={40} />
              </div>
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

      {/* Hero Section with Full-width Carousel */}
      <section className="relative">
        <Carousel className="w-full" opts={{ loop: true }}>
          <CarouselContent>
            {heroSlides.map((slide, index) => (
              <CarouselItem key={index} className="relative min-h-[600px] w-full">
                {/* Background Image */}
                <div className="absolute inset-0 w-full h-full">
                  <Image 
                    src={slide.image} 
                    alt={slide.alt} 
                    fill 
                    className="object-cover"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
                </div>
                
                {/* Content Overlay */}
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
                  <div className="max-w-2xl text-white py-20">
                    <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
                      {slide.title}
                    </h1>
                    <p className="text-xl text-white/90 mb-10">
                      {slide.description}
                    </p>
                    <Link href="/register">
                      <Button size="lg" className="px-8 bg-white text-primary hover:bg-white/90">
                        Teste Grátis por 14 Dias
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          {/* Carousel Navigation */}
          <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-20">
            {heroSlides.map((_, index) => (
              <div 
                key={index} 
                className="w-3 h-3 rounded-full bg-white/50 hover:bg-white cursor-pointer"
                onClick={() => {
                  const carousel = document.querySelector('[data-carousel]');
                  if (carousel) {
                    (carousel as any).scrollTo({ left: index * carousel.clientWidth, behavior: 'smooth' });
                  }
                }}
              ></div>
            ))}
          </div>
          
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-20" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-20" />
        </Carousel>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-y">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-4xl font-bold text-primary">+5000</p>
              <p className="mt-2 text-gray-600">Usuários Ativos</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-primary">98%</p>
              <p className="mt-2 text-gray-600">Satisfação</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-primary">+30%</p>
              <p className="mt-2 text-gray-600">Aumento em Vendas</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-primary">24/7</p>
              <p className="mt-2 text-gray-600">Suporte</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Recursos Completos para o Seu Negócio
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              A plataforma Tavrus oferece todas as ferramentas que você precisa para gerenciar seu negócio com eficiência
            </p>
          </div>
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div key={index} className="relative bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-4 mb-4">
                  {feature.icon}
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                </div>
                <p className="text-gray-600">{feature.description}</p>
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
          
          {/* Plan Descriptions */}
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-lg font-medium text-gray-900">Ótimo para?</h3>
              <p className="mt-2 text-gray-600">
                Representantes que estão começando, trabalham sozinho ou as representadas não possuem regras comerciais complexas.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-lg font-medium text-gray-900">Ótimo para?</h3>
              <p className="mt-2 text-gray-600">
                Representantes que buscam automatizar a emissão e gestão dos pedidos e acompanhar indicadores de vendas importantes, como a gestão da carteira de clientes.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-lg font-medium text-gray-900">Ótimo para?</h3>
              <p className="mt-2 text-gray-600">
                Representantes que buscam expandir os negócios, analisar indicadores, otimizar o atendimento de clientes, automatizar processos e ativar o e-commerce b2b.
              </p>
            </div>
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
                  {plan.additionalUserPrice && (
                    <p className="mt-2 text-sm text-gray-600">
                      + R${plan.additionalUserPrice}/mês por usuário adicional
                    </p>
                  )}
                </div>
                
                {/* Lista de recursos com limite inicial */}
                <ul className="space-y-4 flex-1">
                  {plan.features.slice(0, expandedPlans[plan.name] ? plan.features.length : 7).map((feature: string, featureIndex: number) => (
                    <li key={featureIndex} className="flex items-start">
                      <Star className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="ml-3 text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {/* Botão único para expandir/recolher */}
                {plan.features.length > 7 && (
                  <Button 
                    variant="ghost" 
                    className="mt-4 text-primary hover:text-primary/80 flex items-center justify-center w-full"
                    onClick={() => togglePlanExpansion(plan.name)}
                  >
                    {expandedPlans[plan.name] ? "Ver menos" : "Ver mais recursos"}
                    <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${expandedPlans[plan.name] ? 'rotate-180' : ''}`} />
                  </Button>
                )}
                
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

      {/* Testimonials Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              O Que Nossos Clientes Dizem
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Veja como a Tavrus tem ajudado representantes a crescerem seus negócios
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                    <Users className="h-6 w-6 text-gray-500" />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">&quot;{testimonial.quote}&quot;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-primary-foreground">
            Pronto para Transformar seu Negócio?
          </h2>
          <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Junte-se a milhares de representantes que já estão usando a Tavrus para crescer
          </p>
          <div className="mt-10">
            <Link href="/register">
              <Button size="lg" variant="outline" className="bg-white hover:bg-gray-100 text-primary">
                Comece seu Teste Grátis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="h-10 w-32 flex items-center justify-center">
                {/* <span className="font-bold text-gray-700">Tavrus</span> */}
                <Image src={logo} alt="Tavrus" width={100} height={40} />
              </div>
              <p className="mt-4 text-sm text-gray-500">
                Soluções completas para representantes comerciais.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Produto</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-sm text-gray-500 hover:text-gray-900">Recursos</Link></li>
                <li><Link href="#" className="text-sm text-gray-500 hover:text-gray-900">Preços</Link></li>
                <li><Link href="#" className="text-sm text-gray-500 hover:text-gray-900">Integrações</Link></li>
                <li><Link href="#" className="text-sm text-gray-500 hover:text-gray-900">Atualizações</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Empresa</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-sm text-gray-500 hover:text-gray-900">Sobre nós</Link></li>
                <li><Link href="#" className="text-sm text-gray-500 hover:text-gray-900">Blog</Link></li>
                <li><Link href="#" className="text-sm text-gray-500 hover:text-gray-900">Carreiras</Link></li>
                <li><Link href="#" className="text-sm text-gray-500 hover:text-gray-900">Contato</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Suporte</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-sm text-gray-500 hover:text-gray-900">Central de Ajuda</Link></li>
                <li><Link href="#" className="text-sm text-gray-500 hover:text-gray-900">Documentação</Link></li>
                <li><Link href="#" className="text-sm text-gray-500 hover:text-gray-900">Status</Link></li>
                <li><Link href="#" className="text-sm text-gray-500 hover:text-gray-900">Política de Privacidade</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">© 2024 Tavrus. Todos os direitos reservados.</p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <Link href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </Link>
            </div>
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
    icon: <ShoppingCart className="h-6 w-6 text-primary" />
  },
  {
    title: "Gestão de Estoque",
    description: "Controle seu estoque, receba alertas de produtos baixos e faça pedidos automaticamente.",
    icon: <Building className="h-6 w-6 text-primary" />
  },
  {
    title: "Relatórios Financeiros",
    description: "Acompanhe receitas, despesas e lucros com relatórios detalhados e gráficos intuitivos.",
    icon: <BarChart className="h-6 w-6 text-primary" />
  },
  {
    title: "Controle de Clientes",
    description: "Mantenha um cadastro completo dos seus clientes e histórico de compras.",
    icon: <Users className="h-6 w-6 text-primary" />
  },
  {
    title: "Gestão de Fornecedores",
    description: "Organize seus fornecedores, pedidos e pagamentos em um só lugar.",
    icon: <Briefcase className="h-6 w-6 text-primary" />
  },
  {
    title: "Fluxo de Caixa",
    description: "Controle entradas, saídas e tenha uma visão clara da saúde financeira do seu negócio.",
    icon: <DollarSign className="h-6 w-6 text-primary" />
  },
];

const commonFeatures = [
  "Portal do cliente",
  "Aplicativo online e offline",
  "Agenda de visitas, ligações e outras atividades",
  "Catálogo de produtos com foto",
  "Categoria de produtos",
  "Emissão e faturamento com histórico de pedidos",
  "Importação de clientes e produtos",
  "Rede de clientes e segmentação",
  "CRM integrado",
  "Relatório de atendimentos",
  "Relatório de comissões",
  "Relatórios de pedidos enviados",
  "Relatório de vendas",
  "Relatório gerencial por representada",
  "Relatório de clientes",
  "Controle de comissões",
  "Histórico de atendimentos realizados",
  "Indicadores personalizados",
  "Campos personalizados",
  "Sugestão de reposição durante venda"
];

const silverFeatures = [
  "Automação de emissão de pedidos",
  "Gestão avançada de carteira de clientes",
  "Indicadores de vendas detalhados",
  "Bloqueio de Clientes",
  "Destaque ilimitado de produtos no catálogo",
  "Condição de pagamento por cliente",
  "Relatório de Positivação",
  "Relatório de produtos mais vendidos em quantidade",
  "Relatório de situação de carteira",
  "Relatório de faturamento",
  "Controle de metas",
  "Representada por cliente",
  "Tipo de pedido",
  "Valor mínimo por condição de pagamento",
  "Promoções ilimitadas"
];

const goldFeatures = [
  "E-commerce B2B integrado",
  "Automação avançada de processos",
  "Análise de indicadores em tempo real",
  "Otimização de atendimento ao cliente"
];

const goldExclusiveFeatures = [
  "Tabela de preço por cliente",
  "Situação da carteira de clientes por região",
  "Relatório de curva ABC de clientes",
  "Relatório de estoque",
  "Desconto e acréscimo maximo por vendedor",
  "Tabela de preços por vendedor",
  "Check-in e Check-out",
  "Roterização",
  "Equipes",
  "Status de pedido",
  "Categorias por cliente",
  "Controle de estoque",
  "Saldo flex",
  "Políticas comerciais de descontos"
];

const plans = [
  {
    name: "Bronze",
    description: "Para representantes iniciantes",
    price: 84.90,
    additionalUserPrice: 44.90,
    popular: false,
    features: [
      "1 usuário incluído",
      "Usuários adicionais: R$44,90/mês cada",
      "Limite de 100 clientes",
      "Limite de 500 produtos",
      ...commonFeatures
    ],
  },
  {
    name: "Prata",
    description: "Para representantes em crescimento",
    price: 139.90,
    additionalUserPrice: 57.90,
    popular: true,
    features: [
      "2 usuários incluídos",
      "Usuários adicionais: R$57,90/mês cada",
      "Limite de 500 clientes",
      "Limite de 2000 produtos",
      ...silverFeatures,
      ...commonFeatures
    ],
  },
  {
    name: "Ouro",
    description: "Para representantes estabelecidos",
    price: 244.90,
    additionalUserPrice: 69.90,
    popular: false,
    features: [
      "3 usuários incluídos",
      "Usuários adicionais: R$69,90/mês cada",
      "Clientes ilimitados",
      "Produtos ilimitados",
      ...goldExclusiveFeatures,
      ...goldFeatures,
      ...silverFeatures,
      ...commonFeatures
    ],
  },
];

const testimonials = [
  {
    name: "Carlos Silva",
    role: "Representante Comercial",
    quote: "A Tavrus transformou meu negócio. Consigo gerenciar meus clientes e pedidos de forma muito mais eficiente, o que me permitiu aumentar minhas vendas em 40% no primeiro ano."
  },
  {
    name: "Ana Oliveira",
    role: "Gerente de Vendas",
    quote: "O controle que temos agora sobre nossa equipe de vendas é impressionante. Os relatórios nos ajudam a tomar decisões estratégicas com base em dados reais."
  },
  {
    name: "Roberto Santos",
    role: "Proprietário de Distribuidora",
    quote: "Desde que implementamos a Tavrus, reduzimos erros em pedidos em 95% e melhoramos significativamente o relacionamento com nossos clientes."
  }
];