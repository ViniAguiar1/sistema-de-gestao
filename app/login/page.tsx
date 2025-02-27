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
import { Mail, Lock, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import logo from "@/assets/SVG/logo.svg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate successful login
    const data = {
      token: "fake-token",
    };

    // Salva o token no localStorage
    localStorage.setItem("token", data.token);
    // Exibe notificação de sucesso
    toast.success("Login realizado com sucesso!");
    // Redireciona para a página do dashboard
    router.push("/dashboard");
  };

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen flex flex-col md:flex-row">
        {/* Left Side - Form */}
        <div className="flex-1 flex items-center justify-center p-6 bg-white">
          <Card className="w-full max-w-md border-none shadow-none">
            <CardHeader className="space-y-4">
              <div className="flex justify-center mb-4">
                <Link href="/" className="flex items-center">
                  <Image style={{ width: 150, height: 100, marginBottom: -40 }} src={logo} alt="SuaGestão Logo" className="h-6" />
                </Link>
              </div>
              <CardTitle className="text-3xl font-bold text-center">Bem-vindo de volta!</CardTitle>
              <CardDescription className="text-center text-base">
                Acesse sua conta para continuar gerenciando seu negócio
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleLogin}>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-base">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="seu@email.com" 
                      className="pl-10 py-6"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
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
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
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
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" />
                    <label
                      htmlFor="remember"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Lembrar-me
                    </label>
                  </div>
                  <Link 
                    href="/recuperar-senha" 
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    Esqueceu sua senha?
                  </Link>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button type="submit" className="w-full py-6 text-base">
                  Entrar na minha conta
                </Button>
                <div className="flex items-center gap-4 w-full">
                  <Separator className="flex-1" />
                  <span className="text-sm text-gray-500">ou</span>
                  <Separator className="flex-1" />
                </div>
                <div className="text-sm text-center text-gray-600">
                  Ainda não tem uma conta?{" "}
                  <Link href="/register" className="text-primary hover:underline font-medium">
                    Criar conta grátis
                  </Link>
                </div>
              </CardFooter>
            </form>
          </Card>
        </div>

        {/* Right Side - Banner */}
        <div className="hidden md:flex md:w-1/2 bg-primary p-12 items-center justify-center">
          <div className="max-w-md text-white">
            <h2 className="text-3xl font-bold mb-6">
              Gerencie seu negócio de forma inteligente
            </h2>
            <p className="text-lg mb-8 text-primary-foreground/90">
              Com o SuaGestão, você tem todas as ferramentas necessárias para fazer
              seu negócio crescer. Controle vendas, estoque e finanças em um só lugar.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <p className="text-primary-foreground/90">Controle completo das suas vendas</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <p className="text-primary-foreground/90">Gestão de estoque simplificada</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <p className="text-primary-foreground/90">Relatórios financeiros detalhados</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
