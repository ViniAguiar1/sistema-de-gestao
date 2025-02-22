"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Plus, Clock, MapPin, Users } from "lucide-react";

const eventos = [
  {
    id: 1,
    titulo: "Reunião com Cliente ABC",
    tipo: "Visita",
    data: "2025-02-20T10:00:00",
    local: "São Paulo, SP",
    participantes: ["João Silva", "Maria Santos"],
    promotor: "Carlos Silva",
    status: "Agendado",
  },
  {
    id: 2,
    titulo: "Apresentação Novos Produtos",
    tipo: "Apresentação",
    data: "2025-02-20T14:30:00",
    local: "Online",
    participantes: ["Pedro Costa", "Ana Lima"],
    promotor: "Ana Santos",
    status: "Confirmado",
  },
  {
    id: 3,
    titulo: "Follow-up Cliente XYZ",
    tipo: "Ligação",
    data: "2025-02-21T11:00:00",
    local: "Remoto",
    participantes: ["Roberto Lima"],
    promotor: "Carlos Silva",
    status: "Pendente",
  },
];

const statusStyles = {
  Agendado: "bg-blue-100 text-blue-800",
  Confirmado: "bg-emerald-100 text-emerald-800",
  Pendente: "bg-yellow-100 text-yellow-800",
  Cancelado: "bg-red-100 text-red-800",
};

export default function AgendaPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Agenda</h2>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Novo Evento
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Calendário</CardTitle>
            <CardDescription>
              Selecione uma data para ver os eventos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        <Card className="col-span-5">
          <CardHeader>
            <CardTitle>Eventos do Dia</CardTitle>
            <CardDescription>
              {date?.toLocaleDateString('pt-BR', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {eventos.map((evento) => (
                <div
                  key={evento.id}
                  className="flex items-start space-x-4 rounded-lg border p-4"
                >
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">{evento.titulo}</h4>
                      <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        statusStyles[evento.status as keyof typeof statusStyles]
                      }`}>
                        {evento.status}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {new Date(evento.data).toLocaleTimeString('pt-BR', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {evento.local}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <div className="flex items-center gap-2">
                        {evento.participantes.map((participante, index) => (
                          <span
                            key={index}
                            className="rounded-full bg-secondary px-2 py-1 text-xs"
                          >
                            {participante}
                          </span>
                        ))}
                      </div>
                    </div>
                    {evento.promotor && (
                      <p className="text-sm text-muted-foreground">
                        Promotor responsável: {evento.promotor}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}