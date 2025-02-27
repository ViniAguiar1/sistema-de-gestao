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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Plus, Clock, MapPin, Users } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

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
  const [isNewEventOpen, setIsNewEventOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    titulo: "",
    tipo: "",
    data: "",
    hora: "",
    local: "",
    cliente: "",
    descricao: "",
  });

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você implementaria a lógica para salvar o evento
    console.log("Novo evento:", newEvent);
    setIsNewEventOpen(false);
    // Limpar o formulário
    setNewEvent({
      titulo: "",
      tipo: "",
      data: "",
      hora: "",
      local: "",
      cliente: "",
      descricao: "",
    });
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Agenda</h2>
        <Dialog open={isNewEventOpen} onOpenChange={setIsNewEventOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Novo Evento
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <form onSubmit={handleCreateEvent}>
              <DialogHeader>
                <DialogTitle>Novo Evento</DialogTitle>
                <DialogDescription>
                  Preencha os detalhes do novo evento
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="titulo">Título</Label>
                    <Input
                      id="titulo"
                      placeholder="Título do evento"
                      value={newEvent.titulo}
                      onChange={(e) => setNewEvent({ ...newEvent, titulo: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="tipo">Tipo</Label>
                    <Select
                      value={newEvent.tipo}
                      onValueChange={(value) => setNewEvent({ ...newEvent, tipo: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="visita">Visita</SelectItem>
                        <SelectItem value="ligacao">Ligação</SelectItem>
                        <SelectItem value="reuniao">Reunião</SelectItem>
                        <SelectItem value="apresentacao">Apresentação</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cliente">Cliente</Label>
                    <Input
                      id="cliente"
                      placeholder="Nome do cliente"
                      value={newEvent.cliente}
                      onChange={(e) => setNewEvent({ ...newEvent, cliente: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="data">Data</Label>
                    <Input
                      id="data"
                      type="date"
                      value={newEvent.data}
                      onChange={(e) => setNewEvent({ ...newEvent, data: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hora">Hora</Label>
                    <Input
                      id="hora"
                      type="time"
                      value={newEvent.hora}
                      onChange={(e) => setNewEvent({ ...newEvent, hora: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="local">Local</Label>
                  <Input
                    id="local"
                    placeholder="Local do evento"
                    value={newEvent.local}
                    onChange={(e) => setNewEvent({ ...newEvent, local: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="descricao">Descrição</Label>
                  <Textarea
                    id="descricao"
                    placeholder="Descrição do evento"
                    value={newEvent.descricao}
                    onChange={(e) => setNewEvent({ ...newEvent, descricao: e.target.value })}
                    className="min-h-[100px]"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsNewEventOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">Salvar Evento</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
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