"use client";

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
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Link as LinkIcon,
  Building2,
  FileText
} from "lucide-react";
import { compromissosData } from "./data";

export function CompromissoDetalhes() {
  const router = useRouter();
  const params = useParams();
  const compromissoId = Number(params.id);

  const compromisso = compromissosData.find(c => c.id === compromissoId);

  if (!compromisso) {
    return (
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Button variant="ghost" onClick={() => router.back()} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">Compromisso não encontrado</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <Button variant="ghost" onClick={() => router.back()} className="mb-4">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Voltar
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>{compromisso.titulo}</CardTitle>
          <CardDescription>{compromisso.tipo}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                Data
              </div>
              <p className="font-medium">{compromisso.data}</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                Hora
              </div>
              <p className="font-medium">{compromisso.hora}</p>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Building2 className="h-4 w-4" />
              Cliente
            </div>
            <p className="font-medium">{compromisso.cliente}</p>
          </div>

          {compromisso.endereco && (
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                Endereço
              </div>
              <p className="font-medium">{compromisso.endereco}</p>
            </div>
          )}

          {compromisso.telefone && (
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                Telefone
              </div>
              <p className="font-medium">{compromisso.telefone}</p>
            </div>
          )}

          {compromisso.link && (
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <LinkIcon className="h-4 w-4" />
                Link da Reunião
              </div>
              <a 
                href={compromisso.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-medium text-primary hover:underline"
              >
                {compromisso.link}
              </a>
            </div>
          )}

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <FileText className="h-4 w-4" />
              Descrição
            </div>
            <p className="font-medium">{compromisso.descricao}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}