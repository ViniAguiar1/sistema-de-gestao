"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowLeft,
  Building2,
  Mail,
  MapPin,
  Phone,
  Globe,
  DollarSign,
  Users,
  Pencil,
  Trash,
  ExternalLink,
  FileText,
  Tag,
  CreditCard
} from "lucide-react";
import Link from "next/link";
import { clientesData } from "./data";

function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
      <div className="grid gap-6">
        {[1, 2, 3, 4, 5].map((i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-[200px]" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function ClienteDetalhes() {
  const router = useRouter();
  const params = useParams();
  const clienteId = Number(params.id);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Find client details
  const clienteDetalhes = clientesData.find(c => c.id === clienteId);

  // Simulate loading
  useState(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  });

  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      // Aqui iria a lógica de deleção
      await new Promise(resolve => setTimeout(resolve, 1000));
      router.push('/dashboard/clientes');
    } catch (err) {
      setError('Erro ao excluir o cliente. Tente novamente.');
    } finally {
      setDeleteLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 space-y-4 p-8 pt-6">
        <LoadingSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center text-red-500">{error}</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!clienteDetalhes) {
    return (
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center text-muted-foreground">Cliente não encontrado</div>
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
          <h2 className="text-3xl font-bold tracking-tight">Detalhes do Cliente</h2>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => router.push(`/dashboard/clientes/${clienteId}/editar`)}
          >
            <Pencil className="h-4 w-4" />
            Editar
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="gap-2">
                <Trash className="h-4 w-4" />
                Excluir
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                <AlertDialogDescription>
                  Tem certeza que deseja excluir este cliente? Esta ação não pode ser desfeita.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} disabled={deleteLoading}>
                  {deleteLoading ? "Excluindo..." : "Excluir"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div className="grid gap-6">
        {/* Dados Principais */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Dados Principais
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Razão Social</h4>
                <p>{clienteDetalhes.razaoSocial}</p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Nome Fantasia</h4>
                <p>{clienteDetalhes.nomeFantasia}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">CNPJ</h4>
                <p>{clienteDetalhes.cnpj}</p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Inscrição Estadual</h4>
                <p>{clienteDetalhes.inscricaoEstadual}</p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Matriz/Filial</h4>
                <p>{clienteDetalhes.matriz}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Rede de Cliente</h4>
                <p>{clienteDetalhes.redeCliente}</p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Limite de Crédito</h4>
                <p className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  {clienteDetalhes.limiteCredito.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  })}
                </p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Tipo de Contribuinte</h4>
                <p>{clienteDetalhes.tipoContribuinte}</p>
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
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Endereço</h4>
                <p>{clienteDetalhes.endereco}, {clienteDetalhes.numero}</p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Complemento</h4>
                <p>{clienteDetalhes.complemento}</p>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-6">
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Bairro</h4>
                <p>{clienteDetalhes.bairro}</p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">CEP</h4>
                <p>{clienteDetalhes.cep}</p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Cidade</h4>
                <p>{clienteDetalhes.cidade}</p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Estado</h4>
                <p>{clienteDetalhes.estado}</p>
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
            <div className="grid grid-cols-3 gap-6">
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Telefone</h4>
                <p className="flex items-center gap-1">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  {clienteDetalhes.telefone}
                </p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Fax</h4>
                <p>{clienteDetalhes.fax}</p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Telefone Adicional</h4>
                <p>{clienteDetalhes.telefoneAdicional}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Email</h4>
                <p className="flex items-center gap-1">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  {clienteDetalhes.email}
                </p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Email Financeiro</h4>
                <p className="flex items-center gap-1">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  {clienteDetalhes.emailFinanceiro}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Website</h4>
                <p className="flex items-center gap-1">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <a
                    href={`https://${clienteDetalhes.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline flex items-center gap-1"
                  >
                    {clienteDetalhes.website}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Instagram</h4>
                <p>{clienteDetalhes.instagram}</p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Facebook</h4>
                <p>{clienteDetalhes.facebook}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Comercial */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Comercial
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-3 gap-6">
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Status</h4>
                <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${clienteDetalhes.status === 'Ativo'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-gray-100 text-gray-800'
                  }`}>
                  {clienteDetalhes.status}
                </div>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Classificação SV</h4>
                <p className="flex items-center gap-1">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  {clienteDetalhes.classificacaoSV}
                </p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Forma de Pagamento</h4>
                <p className="flex items-center gap-1">
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                  {clienteDetalhes.formaPagamento}
                </p>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-sm text-muted-foreground mb-2">Vendedor</h4>
              <p className="flex items-center gap-1">
                <Users className="h-4 w-4 text-muted-foreground" />
                {clienteDetalhes.vendedor}
              </p>
            </div>
            <div>
              <h4 className="font-medium text-sm text-muted-foreground mb-2">Categoria</h4>
              <p>{clienteDetalhes.categoria}</p>
            </div>
          </CardContent>
        </Card>

        {/* Observações */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Observações
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{clienteDetalhes.observacoes}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}