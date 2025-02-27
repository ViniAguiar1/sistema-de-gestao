"use client";

import { useState, useEffect } from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, User, Mail, Phone, Building2, Shield, Lock } from "lucide-react";

// Mock data for users
const usuariosData = [
  {
    id: 1,
    nome: "João Silva",
    email: "joao.silva@empresa.com",
    telefone: "(11) 98765-4321",
    cargo: "administrador",
    empresa: "Matriz",
    status: "ativo",
    dataCriacao: "2024-01-15",
    ultimoAcesso: "2025-02-19T14:30:00",
    permissoes: {
      dashboard: true,
      vendas: true,
      clientes: true,
      produtos: true,
      financeiro: true,
      relatorios: true,
      configuracoes: true,
    },
    observacoes: "Usuário administrador com acesso total ao sistema.",
  },
  {
    id: 2,
    nome: "Maria Santos",
    email: "maria.santos@filial1.com",
    telefone: "(11) 97654-3210",
    cargo: "vendedor",
    empresa: "Filial SP",
    status: "ativo",
    dataCriacao: "2024-02-01",
    ultimoAcesso: "2025-02-19T10:15:00",
    permissoes: {
      dashboard: true,
      vendas: true,
      clientes: true,
      produtos: true,
      financeiro: false,
      relatorios: true,
      configuracoes: false,
    },
    observacoes: "Vendedora responsável pela região de São Paulo.",
  },
  {
    id: 3,
    nome: "Pedro Costa",
    email: "pedro.costa@filial2.com",
    telefone: "(21) 96543-2109",
    cargo: "gerente",
    empresa: "Filial RJ",
    status: "inativo",
    dataCriacao: "2024-01-20",
    ultimoAcesso: "2025-02-18T16:45:00",
    permissoes: {
      dashboard: true,
      vendas: true,
      clientes: true,
      produtos: true,
      financeiro: true,
      relatorios: true,
      configuracoes: false,
    },
    observacoes: "Gerente da filial Rio de Janeiro.",
  },
];

// Mock data for cargos
const cargos = [
  { id: "administrador", nome: "Administrador" },
  { id: "gerente", nome: "Gerente" },
  { id: "vendedor", nome: "Vendedor" },
  { id: "promotor", nome: "Promotor" },
];

// Mock data for empresas
const empresas = [
  { id: "matriz", nome: "Matriz" },
  { id: "filial_sp", nome: "Filial SP" },
  { id: "filial_rj", nome: "Filial RJ" },
];

export function UsuarioEditar() {
  const router = useRouter();
  const params = useParams();
  const usuarioId = Number(params.id);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    cargo: "",
    empresa: "",
    status: "",
    observacoes: "",
    permissoes: {} as Record<string, boolean>,
  });

  // Find user details
  const usuario = usuariosData.find(u => u.id === usuarioId);

  // Load user data
  useEffect(() => {
    if (usuario) {
      setFormData({
        nome: usuario.nome,
        email: usuario.email,
        telefone: usuario.telefone,
        cargo: usuario.cargo,
        empresa: usuario.empresa.toLowerCase().replace(" ", "_"),
        status: usuario.status,
        observacoes: usuario.observacoes,
        permissoes: usuario.permissoes,
      });
    }
  }, [usuario]);

  if (!usuario) {
    return (
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center text-muted-foreground">Usuário não encontrado</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (id: string, value: string) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handlePermissionChange = (permission: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      permissoes: {
        ...prev.permissoes,
        [permission]: checked,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Aqui vai a lógica de atualização
      await new Promise(resolve => setTimeout(resolve, 1000));
      router.push(`/dashboard/usuarios/${usuarioId}`);
    } catch (err) {
      setError('Erro ao atualizar o usuário. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <h2 className="text-3xl font-bold tracking-tight">Editar Usuário</h2>
        </div>
      </div>

      {error && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center text-red-500">{error}</div>
          </CardContent>
        </Card>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6">
          {/* Informações Básicas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Informações Básicas
              </CardTitle>
              <CardDescription>
                Informações pessoais do usuário
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome Completo</Label>
                  <Input 
                    id="nome" 
                    placeholder="Nome completo" 
                    value={formData.nome}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select 
                    value={formData.status} 
                    onValueChange={(value) => handleSelectChange("status", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ativo">Ativo</SelectItem>
                      <SelectItem value="inativo">Inativo</SelectItem>
                      <SelectItem value="bloqueado">Bloqueado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="email@exemplo.com" 
                      className="pl-9"
                      value={formData.email}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input 
                      id="telefone" 
                      placeholder="(00) 00000-0000" 
                      className="pl-9"
                      value={formData.telefone}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Informações Profissionais */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Informações Profissionais
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cargo">Cargo</Label>
                  <Select 
                    value={formData.cargo} 
                    onValueChange={(value) => handleSelectChange("cargo", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o cargo" />
                    </SelectTrigger>
                    <SelectContent>
                      {cargos.map((cargo) => (
                        <SelectItem key={cargo.id} value={cargo.id}>
                          {cargo.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="empresa">Empresa</Label>
                  <Select 
                    value={formData.empresa} 
                    onValueChange={(value) => handleSelectChange("empresa", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a empresa" />
                    </SelectTrigger>
                    <SelectContent>
                      {empresas.map((empresa) => (
                        <SelectItem key={empresa.id} value={empresa.id}>
                          {empresa.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Permissões */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Permissões
              </CardTitle>
              <CardDescription>
                Configure as permissões de acesso do usuário
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Object.entries(formData.permissoes).map(([permission, enabled]) => (
                  <div key={permission} className="flex items-center justify-between space-x-2 p-4 border rounded-lg">
                    <Label htmlFor={permission} className="flex items-center space-x-2">
                      <Lock className="h-4 w-4" />
                      <span className="capitalize">{permission}</span>
                    </Label>
                    <Switch
                      id={permission}
                      checked={enabled}
                      onCheckedChange={(checked) => handlePermissionChange(permission, checked)}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Observações */}
          <Card>
            <CardHeader>
              <CardTitle>Observações</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea 
                id="observacoes" 
                placeholder="Observações adicionais" 
                className="min-h-[100px]"
                value={formData.observacoes}
                onChange={handleInputChange}
              />
            </CardContent>
          </Card>

          {/* Ações */}
          <Card>
            <CardFooter className="flex justify-between p-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Salvando..." : "Salvar Alterações"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </form>
    </div>
  );
}