"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Gem, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  User, 
  Building2, 
  Phone,
  CheckCircle2 
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import logo from "@/assets/SVG/logo.svg"

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side - Banner */}
      <div className="hidden md:flex md:w-1/2 bg-primary p-12 items-center justify-center">
        <div className="max-w-md text-white">
          <h2 className="text-3xl font-bold mb-6">
            Comece seu teste gratuito hoje
          </h2>
          <p className="text-lg mb-8 text-primary-foreground/90">
            Experimente todas as funcionalidades do SuaGestão por 14 dias, sem compromisso.
            Não é necessário cartão de crédito.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <p className="text-primary-foreground/90">Acesso a todas as funcionalidades</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <p className="text-primary-foreground/90">Suporte completo durante o teste</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <p className="text-primary-foreground/90">Cancele quando quiser</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-white">
        <Card className="w-full max-w-md border-none shadow-none">
          <CardHeader className="space-y-4">
            <div className="flex justify-center mb-4">
              <Link href="/" className="flex items-center">
                {/* <Gem className="h-8 w-8 text-primary" />
                <span className="ml-2 text-2xl font-bold">SuaGestão</span> */}
                <Image style={{ width: 150, height: 100, marginBottom: -40}} src={logo} alt="SuaGestão Logo" className="h-6" />
              </Link>
            </div>
            <CardTitle className="text-3xl font-bold text-center">Crie sua conta grátis</CardTitle>
            <CardDescription className="text-center text-base">
              Comece seu período de teste gratuito de 14 dias
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-base">Nome</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input 
                    id="firstName" 
                    placeholder="João" 
                    className="pl-10 py-6"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-base">Sobrenome</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input 
                    id="lastName" 
                    placeholder="Silva" 
                    className="pl-10 py-6"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-base">Email comercial</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="seu@empresa.com" 
                  className="pl-10 py-6"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-base">Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input 
                  id="password" 
                  type={showPassword ? "text" : "password"}
                  className="pl-10 pr-10 py-6"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="company" className="text-base">Nome da empresa</Label>
              <div className="relative">
                <Building2 className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input 
                  id="company" 
                  placeholder="Sua empresa" 
                  className="pl-10 py-6"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-base">Telefone</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input 
                  id="phone" 
                  placeholder="(11) 99999-9999" 
                  className="pl-10 py-6"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm text-gray-600"
              >
                Eu concordo com os{" "}
                <Link href="/termos" className="text-primary hover:underline">
                  Termos de Serviço
                </Link>{" "}
                e{" "}
                <Link href="/privacidade" className="text-primary hover:underline">
                  Política de Privacidade
                </Link>
              </label>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button className="w-full py-6 text-base">Criar minha conta grátis</Button>
            <div className="flex items-center gap-4 w-full">
              <Separator className="flex-1" />
              <span className="text-sm text-gray-500">ou</span>
              <Separator className="flex-1" />
            </div>
            <div className="text-sm text-center text-gray-600">
              Já tem uma conta?{" "}
              <Link href="/login" className="text-primary hover:underline font-medium">
                Fazer login
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}