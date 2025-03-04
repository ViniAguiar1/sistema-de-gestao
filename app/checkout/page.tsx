"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  CreditCard, 
  CheckCircle2, 
  ArrowLeft, 
  ShieldCheck, 
  Calendar, 
  CreditCardIcon,
  Building,
  Landmark,
  Receipt,
  Star,
  CheckCircle,
  Mail,
  Phone
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/SVG/logo.svg";

export default function CheckoutPage() {
  const [selectedPlan, setSelectedPlan] = useState("prata");
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const plans = {
    bronze: {
      name: "Bronze",
      price: 84.90,
      users: 1,
      additionalUserPrice: 44.90,
      features: [
        "1 usuário incluído",
        "Limite de 100 clientes",
        "Limite de 500 produtos",
        "Portal do cliente",
        "Aplicativo online e offline",
      ]
    },
    prata: {
      name: "Prata",
      price: 139.90,
      users: 2,
      additionalUserPrice: 57.90,
      features: [
        "2 usuários incluídos",
        "Limite de 500 clientes",
        "Limite de 2000 produtos",
        "Automação de emissão de pedidos",
        "Gestão avançada de carteira de clientes",
      ]
    },
    ouro: {
      name: "Ouro",
      price: 244.90,
      users: 3,
      additionalUserPrice: 69.90,
      features: [
        "3 usuários incluídos",
        "Clientes ilimitados",
        "Produtos ilimitados",
        "E-commerce B2B integrado",
        "Automação avançada de processos",
      ]
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulando processamento de pagamento
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-bold">Assinatura Confirmada!</CardTitle>
            <CardDescription className="text-base">
              Seu período de teste gratuito de 14 dias começou
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{plans[selectedPlan as keyof typeof plans].name}</h3>
                  <p className="text-gray-500">Plano selecionado</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">R${plans[selectedPlan as keyof typeof plans].price.toFixed(2)}/mês</p>
                  <p className="text-sm text-gray-500">após período de teste</p>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="space-y-2">
                <p className="text-sm font-medium">Detalhes importantes:</p>
                <ul className="space-y-2">
                  <li className="flex items-start text-sm">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Seu teste gratuito termina em 14 dias (10/07/2024)</span>
                  </li>
                  <li className="flex items-start text-sm">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Você não será cobrado durante o período de teste</span>
                  </li>
                  <li className="flex items-start text-sm">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Você pode cancelar a qualquer momento</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              <Link href="/dashboard">
                <Button className="w-full">Ir para o Dashboard</Button>
              </Link>
              <Link href="/account/settings">
                <Button variant="outline" className="w-full">Configurações da Conta</Button>
              </Link>
            </div>
            <p className="text-sm text-center text-gray-500 mt-4">
              Precisa de ajuda? <Link href="/support" className="text-primary hover:underline">Entre em contato com o suporte</Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Image style={{ width: 120, height: 80, marginBottom: -20, marginTop: -20 }} src={logo} alt="Tavrus Logo" className="h-6" />
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/register" className="flex items-center text-sm text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Voltar
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <h1 className="text-2xl font-bold mb-6">Finalize sua assinatura</h1>
            
            <Tabs defaultValue="plan" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="plan">Plano</TabsTrigger>
                <TabsTrigger value="payment">Pagamento</TabsTrigger>
                <TabsTrigger value="confirm">Confirmação</TabsTrigger>
              </TabsList>
              
              <TabsContent value="plan">
                <Card>
                  <CardHeader>
                    <CardTitle>Escolha seu plano</CardTitle>
                    <CardDescription>
                      Selecione o plano que melhor atende às necessidades do seu negócio
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <RadioGroup 
                      defaultValue={selectedPlan} 
                      onValueChange={setSelectedPlan}
                      className="space-y-4"
                    >
                      {Object.entries(plans).map(([key, plan]) => (
                        <div key={key} className={`border rounded-lg p-4 transition-all ${selectedPlan === key ? 'border-primary bg-primary/5' : 'border-gray-200'}`}>
                          <RadioGroupItem 
                            value={key} 
                            id={`plan-${key}`} 
                            className="sr-only" 
                          />
                          <Label 
                            htmlFor={`plan-${key}`}
                            className="flex flex-col sm:flex-row sm:items-center justify-between w-full cursor-pointer"
                          >
                            <div className="flex items-start space-x-3">
                              <div className={`w-5 h-5 rounded-full border flex-shrink-0 mt-1 ${selectedPlan === key ? 'bg-primary border-primary' : 'border-gray-300'}`}>
                                {selectedPlan === key && (
                                  <CheckCircle2 className="h-5 w-5 text-white" />
                                )}
                              </div>
                              <div>
                                <p className="font-medium">{plan.name}</p>
                                <p className="text-sm text-gray-500">{plan.users} usuário{plan.users > 1 ? 's' : ''} incluído{plan.users > 1 ? 's' : ''}</p>
                              </div>
                            </div>
                            <div className="text-right mt-2 sm:mt-0">
                              <p className="font-bold">R${plan.price.toFixed(2)}/mês</p>
                              <p className="text-xs text-gray-500">após período de teste</p>
                            </div>
                          </Label>
                          
                          {selectedPlan === key && (
                            <div className="mt-4 pl-8">
                              <p className="text-sm font-medium mb-2">Recursos incluídos:</p>
                              <ul className="space-y-2">
                                {plan.features.map((feature, index) => (
                                  <li key={index} className="flex items-start text-sm">
                                    <Star className="h-4 w-4 text-primary mr-2 flex-shrink-0 mt-0.5" />
                                    <span>{feature}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      ))}
                    </RadioGroup>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" asChild>
                      <Link href="/">Cancelar</Link>
                    </Button>
                    <Button asChild>
                      <Link href="#payment" onClick={() => (document.querySelector('[data-value="payment"]') as HTMLElement)?.click()}>
                        Continuar para Pagamento
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="payment">
                <Card>
                  <CardHeader>
                    <CardTitle>Informações de Pagamento</CardTitle>
                    <CardDescription>
                      Adicione seus dados de pagamento para após o período de teste
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <Label className="text-base">Método de Pagamento</Label>
                      <RadioGroup 
                        defaultValue={paymentMethod} 
                        onValueChange={setPaymentMethod}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                      >
                        <div className={`border rounded-lg p-4 transition-all ${paymentMethod === 'credit' ? 'border-primary bg-primary/5' : 'border-gray-200'}`}>
                          <RadioGroupItem 
                            value="credit" 
                            id="payment-credit" 
                            className="sr-only" 
                          />
                          <Label 
                            htmlFor="payment-credit"
                            className="flex items-center space-x-3 cursor-pointer"
                          >
                            <div className={`w-5 h-5 rounded-full border flex-shrink-0 ${paymentMethod === 'credit' ? 'bg-primary border-primary' : 'border-gray-300'}`}>
                              {paymentMethod === 'credit' && (
                                <CheckCircle2 className="h-5 w-5 text-white" />
                              )}
                            </div>
                            <div className="flex items-center">
                              <CreditCardIcon className="h-5 w-5 mr-2 text-gray-600" />
                              <span>Cartão de Crédito</span>
                            </div>
                          </Label>
                        </div>
                        
                        <div className={`border rounded-lg p-4 transition-all ${paymentMethod === 'boleto' ? 'border-primary bg-primary/5' : 'border-gray-200'}`}>
                          <RadioGroupItem 
                            value="boleto" 
                            id="payment-boleto" 
                            className="sr-only" 
                          />
                          <Label 
                            htmlFor="payment-boleto"
                            className="flex items-center space-x-3 cursor-pointer"
                          >
                            <div className={`w-5 h-5 rounded-full border flex-shrink-0 ${paymentMethod === 'boleto' ? 'bg-primary border-primary' : 'border-gray-300'}`}>
                              {paymentMethod === 'boleto' && (
                                <CheckCircle2 className="h-5 w-5 text-white" />
                              )}
                            </div>
                            <div className="flex items-center">
                              <Receipt className="h-5 w-5 mr-2 text-gray-600" />
                              <span>Boleto Bancário</span>
                            </div>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    {paymentMethod === 'credit' && (
                      <form className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="cardName">Nome no Cartão</Label>
                          <Input id="cardName" placeholder="Nome como aparece no cartão" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Número do Cartão</Label>
                          <div className="relative">
                            <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex space-x-1">
                              <div className="w-8 h-5 bg-gray-200 rounded"></div>
                              <div className="w-8 h-5 bg-gray-200 rounded"></div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiry">Data de Expiração</Label>
                            <div className="relative">
                              <Input id="expiry" placeholder="MM/AA" />
                              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvc">CVC</Label>
                            <Input id="cvc" placeholder="123" />
                          </div>
                        </div>
                      </form>
                    )}
                    
                    {paymentMethod === 'boleto' && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="cpfCnpj">CPF/CNPJ</Label>
                          <Input id="cpfCnpj" placeholder="000.000.000-00 ou 00.000.000/0000-00" />
                        </div>
                        
                        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                          <p className="text-sm text-yellow-800">
                            O boleto será gerado após o período de teste gratuito. Você receberá instruções por email.
                          </p>
                        </div>
                      </div>
                    )}
                    
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                      <div className="flex items-start">
                        <ShieldCheck className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-gray-600">
                          Seus dados de pagamento estão seguros. Utilizamos criptografia de ponta a ponta para proteger suas informações.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={() => (document.querySelector('[data-value="plan"]') as HTMLElement)?.click()}>
                      Voltar
                    </Button>
                    <Button onClick={() => (document.querySelector('[data-value="confirm"]') as HTMLElement)?.click()}>
                      Revisar e Confirmar
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="confirm">
                <Card>
                  <CardHeader>
                    <CardTitle>Revise sua assinatura</CardTitle>
                    <CardDescription>
                      Confirme os detalhes antes de finalizar
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="font-medium">Detalhes do Plano</h3>
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">{plans[selectedPlan as keyof typeof plans].name}</p>
                            <p className="text-sm text-gray-500">{plans[selectedPlan as keyof typeof plans].users} usuário{plans[selectedPlan as keyof typeof plans].users > 1 ? 's' : ''} incluído{plans[selectedPlan as keyof typeof plans].users > 1 ? 's' : ''}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">R${plans[selectedPlan as keyof typeof plans].price.toFixed(2)}/mês</p>
                            <p className="text-xs text-gray-500">após período de teste</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="font-medium">Método de Pagamento</h3>
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                        <div className="flex items-center">
                          {paymentMethod === 'credit' ? (
                            <>
                              <CreditCardIcon className="h-5 w-5 mr-2 text-gray-600" />
                              <span>Cartão de Crédito terminando em 3456</span>
                            </>
                          ) : (
                            <>
                              <Receipt className="h-5 w-5 mr-2 text-gray-600" />
                              <span>Boleto Bancário</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="font-medium">Termos da Assinatura</h3>
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 space-y-2">
                        <p className="text-sm">
                          Ao confirmar, você concorda com os seguintes termos:
                        </p>
                        <ul className="space-y-2">
                          <li className="flex items-start text-sm">
                            <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span>Seu teste gratuito começa hoje e dura 14 dias</span>
                          </li>
                          <li className="flex items-start text-sm">
                            <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span>Você não será cobrado durante o período de teste</span>
                          </li>
                          <li className="flex items-start text-sm">
                            <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span>Após o período de teste, sua assinatura será renovada automaticamente</span>
                          </li>
                          <li className="flex items-start text-sm">
                            <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span>Você pode cancelar a qualquer momento sem taxas adicionais</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={() => (document.querySelector('[data-value="payment"]') as HTMLElement)?.click()}>
                      Voltar
                    </Button>
                    <Button 
                      onClick={handleSubmit}
                      disabled={isProcessing}
                    >
                      {isProcessing ? "Processando..." : "Confirmar Assinatura"}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg border border-gray-200 sticky top-8">
              <h2 className="text-lg font-bold mb-4">Resumo</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Plano</span>
                  <span className="font-medium">{plans[selectedPlan as keyof typeof plans].name}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Preço</span>
                  <span className="font-medium">R${plans[selectedPlan as keyof typeof plans].price.toFixed(2)}/mês</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Usuários incluídos</span>
                  <span className="font-medium">{plans[selectedPlan as keyof typeof plans].users}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Usuário adicional</span>
                  <span className="font-medium">R${plans[selectedPlan as keyof typeof plans].additionalUserPrice.toFixed(2)}/mês</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>R${plans[selectedPlan as keyof typeof plans].price.toFixed(2)}/mês</span>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                  <div className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-green-800">14 dias grátis</p>
                      <p className="text-xs text-green-700">
                        Você não será cobrado durante o período de teste
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 space-y-4">
                <h3 className="font-medium text-sm">Precisa de ajuda?</h3>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Mail className="h-4 w-4" />
                  <span>suporte@tavrus.com.br</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Phone className="h-4 w-4" />
                  <span>(11) 3456-7890</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-white border-t py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">© 2024 Tavrus. Todos os direitos reservados.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/termos" className="text-sm text-gray-500 hover:text-gray-900">
                Termos de Serviço
              </Link>
              <Link href="/privacidade" className="text-sm text-gray-500 hover:text-gray-900">
                Política de Privacidade
              </Link>
              <Link href="/suporte" className="text-sm text-gray-500 hover:text-gray-900">
                Suporte
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}