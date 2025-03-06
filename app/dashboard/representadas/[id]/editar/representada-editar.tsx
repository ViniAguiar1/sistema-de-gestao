"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowLeft, Building2, Mail, MapPin, Phone, Globe, DollarSign, Plus, Trash } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Representada {
  codigo: number;
  nomeFantasia: string;
  cidade: string;
  estado: string;
  segmento: string;
  razaoSocial: string;
  telefonePrincipal: string;
  email: string;
  cnpj?: string;
  inscricaoEstadual?: string;
  endereco?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cep?: string;
  fax?: string;
  telefoneAdicional?: string;
  emailFinanceiro?: string;
  website?: string;
  instagram?: string;
  facebook?: string;
  observacoes?: string;
}

export function RepresentadaEditar({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [representada, setRepresentada] = useState<Representada | null>(null);
  const [estado, setEstado] = useState(representada?.estado || "");

  useEffect(() => {
    const fetchRepresentada = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(`https://apicloud.tavrus.com.br/api/representadas/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Erro ao buscar dados da representada");
        }
        const data = await response.json();
        setRepresentada(data);
        setEstado(data.estado);
      } catch (error) {
        console.error("Erro ao buscar representada:", error);
        toast.error("Erro ao carregar dados da representada");
      }
    };

    if (typeof window !== "undefined") {
      fetchRepresentada();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("token");

    const formData = new FormData(e.currentTarget);
    const updatedData = {
      nomeFantasia: formData.get("nomeFantasia"),
      razaoSocial: formData.get("razaoSocial"),
      segmento: formData.get("segmento"),
      cidade: formData.get("cidade"),
      estado: estado,
      telefonePrincipal: formData.get("telefone"),
      email: formData.get("email"),
      cnpj: formData.get("cnpj"),
      inscricaoEstadual: formData.get("inscricaoEstadual"),
      endereco: formData.get("endereco"),
      numero: formData.get("numero"),
      complemento: formData.get("complemento"),
      bairro: formData.get("bairro"),
      cep: formData.get("cep"),
      fax: formData.get("fax"),
      telefoneAdicional: formData.get("telefoneAdicional"),
      emailFinanceiro: formData.get("emailFinanceiro"),
      website: formData.get("website"),
      instagram: formData.get("instagram"),
      facebook: formData.get("facebook"),
      observacoes: formData.get("observacoes"),
    };

    try {
      const response = await fetch(`https://apicloud.tavrus.com.br/api/representadas/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar representada");
      }

      toast.success("Representada atualizada com sucesso!");
      router.push("/dashboard/representadas");
    } catch (error) {
      console.error("Erro ao atualizar representada:", error);
      toast.error("Erro ao atualizar representada");
    } finally {
      setLoading(false);
    }
  };

  if (!representada) {
    return (
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center text-muted-foreground">Carregando...</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <h2 className="text-3xl font-bold tracking-tight">Editar Representada</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6">
          {/* Dados Principais */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Dados Principais
              </CardTitle>
              <CardDescription>
                Informações principais da representada
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="razaoSocial">Razão Social</Label>
                  <Input 
                    id="razaoSocial"
                    name="razaoSocial"
                    defaultValue={representada.razaoSocial}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nomeFantasia">Nome Fantasia</Label>
                  <Input 
                    id="nomeFantasia"
                    name="nomeFantasia"
                    defaultValue={representada.nomeFantasia}
                    required 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cnpj">CNPJ</Label>
                  <Input 
                    id="cnpj"
                    name="cnpj"
                    defaultValue={representada.cnpj}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="inscricaoEstadual">Inscrição Estadual</Label>
                  <Input 
                    id="inscricaoEstadual"
                    name="inscricaoEstadual"
                    defaultValue={representada.inscricaoEstadual}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="segmento">Segmento</Label>
                  <Input 
                    id="segmento"
                    name="segmento"
                    defaultValue={representada.segmento}
                    required 
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Endereço */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Endereço
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="endereco">Endereço</Label>
                  <Input 
                    id="endereco"
                    name="endereco"
                    defaultValue={representada.endereco}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="numero">Número</Label>
                  <Input 
                    id="numero"
                    name="numero"
                    defaultValue={representada.numero}
                    required 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="complemento">Complemento</Label>
                  <Input 
                    id="complemento"
                    name="complemento"
                    defaultValue={representada.complemento}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bairro">Bairro</Label>
                  <Input 
                    id="bairro"
                    name="bairro"
                    defaultValue={representada.bairro}
                    required 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cep">CEP</Label>
                  <Input 
                    id="cep"
                    name="cep"
                    defaultValue={representada.cep}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cidade">Cidade</Label>
                  <Input 
                    id="cidade"
                    name="cidade"
                    defaultValue={representada.cidade}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="estado">Estado</Label>
                  <Select value={estado} onValueChange={setEstado}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"].map((uf) => (
                        <SelectItem key={uf} value={uf}>{uf}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contato */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Contato
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone Principal</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input 
                      id="telefone"
                      name="telefone"
                      defaultValue={representada.telefonePrincipal}
                      className="pl-9"
                      required 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fax">Fax</Label>
                  <Input 
                    id="fax"
                    name="fax"
                    defaultValue={representada.fax}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefoneAdicional">Telefone Adicional</Label>
                  <Input 
                    id="telefoneAdicional"
                    name="telefoneAdicional"
                    defaultValue={representada.telefoneAdicional}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input 
                      id="email"
                      name="email"
                      type="email"
                      defaultValue={representada.email}
                      className="pl-9"
                      required 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emailFinanceiro">Email Financeiro</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input 
                      id="emailFinanceiro"
                      name="emailFinanceiro"
                      type="email"
                      defaultValue={representada.emailFinanceiro}
                      className="pl-9"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input 
                      id="website"
                      name="website"
                      defaultValue={representada.website}
                      className="pl-9"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input 
                    id="instagram"
                    name="instagram"
                    defaultValue={representada.instagram}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="facebook">Facebook</Label>
                  <Input 
                    id="facebook"
                    name="facebook"
                    defaultValue={representada.facebook}
                  />
                </div>
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
                name="observacoes"
                defaultValue={representada.observacoes}
                className="min-h-[100px]"
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