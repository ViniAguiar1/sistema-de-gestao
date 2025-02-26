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
import {
  ArrowLeft,
  Building2,
  Mail,
  MapPin,
  Phone,
  Globe,
  DollarSign,
  Pencil,
  Trash,
  Tag,
  CreditCard,
  FileText
} from "lucide-react";
import { representadasData } from "./data";

export function RepresentadaDetalhes() {
  const router = useRouter();
  const params = useParams();
  const representadaId = Number(params.id);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const representada = representadasData.find(r => r.id === representadaId);

  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      // Aqui vai a lógica de deleção
      await new Promise(resolve => setTimeout(resolve, 1000));
      router.push('/dashboard/representadas');
    } catch (error) {
      console.error('Erro ao excluir representada:', error);
    } finally {
      setDeleteLoading(false);
    }
  };

  if (!representada) {
    return (
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Button variant="ghost" onClick={() => router.back()} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">Representada não encontrada</p>
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
          <h2 className="text-3xl font-bold tracking-tight">Detalhes da Representada</h2>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => router.push(`/dashboard/representadas/${representadaId}/editar`)}
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
                  Tem certeza que deseja excluir esta representada? Esta ação não pode ser desfeita.
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
                <p>{representada.razaoSocial}</p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Nome Fantasia</h4>
                <p>{representada.nomeFantasia}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">CNPJ</h4>
                <p>{representada.cnpj}</p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Inscrição Estadual</h4>
                <p>{representada.inscricaoEstadual}</p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Segmento</h4>
                <p>{representada.segmento}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Condições Comerciais */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Condições Comerciais
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="font-medium text-sm text-muted-foreground mb-4">Condições de Pagamento</h4>
              <div className="grid grid-cols-3 gap-4">
                {representada.condicoesPagamento.map((condicao, index) => (
                  <div key={index} className="p-4 rounded-lg border">
                    <p className="font-medium">{condicao.nome}</p>
                    {condicao.desconto > 0 && (
                      <p className="text-sm text-muted-foreground mt-1">
                        Desconto: {condicao.desconto}%
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-sm text-muted-foreground mb-4">Formas de Pagamento</h4>
              <div className="flex flex-wrap gap-2">
                {representada.formasPagamento.map((forma, index) => (
                  <div
                    key={index}
                    className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-secondary"
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    {forma.nome}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-sm text-muted-foreground mb-4">Tabelas de Preço</h4>
              <div className="grid grid-cols-2 gap-4">
                {representada.tabelasPreco.map((tabela, index) => (
                  <div key={index} className="p-4 rounded-lg border">
                    <p className="font-medium">{tabela.nome}</p>
                    <div className="grid grid-cols-2 gap-4 mt-2 text-sm text-muted-foreground">
                      <p>Desconto: {tabela.desconto}%</p>
                      <p>Comissão: {tabela.comissao}%</p>
                    </div>
                  </div>
                ))}
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
                <p>{representada.endereco}, {representada.numero}</p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Complemento</h4>
                <p>{representada.complemento}</p>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-6">
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Bairro</h4>
                <p>{representada.bairro}</p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">CEP</h4>
                <p>{representada.cep}</p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Cidade</h4>
                <p>{representada.cidade}</p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Estado</h4>
                <p>{representada.estado}</p>
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
                  {representada.telefone}
                </p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Fax</h4>
                <p>{representada.fax}</p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Telefone Adicional</h4>
                <p>{representada.telefoneAdicional}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Email</h4>
                <p className="flex items-center gap-1">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  {representada.email}
                </p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Email Financeiro</h4>
                <p className="flex items-center gap-1">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  {representada.emailFinanceiro}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Website</h4>
                <p className="flex items-center gap-1">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <a
                    href={`https://${representada.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {representada.website}
                  </a>
                </p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Instagram</h4>
                <p>{representada.instagram}</p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Facebook</h4>
                <p>{representada.facebook}</p>
              </div>
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
            <p className="text-muted-foreground">{representada.observacoes}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}