"use client";

import { useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Plus, Trash, AlertCircle, CheckCircle2 } from "lucide-react";

// Tipos de perguntas disponíveis
const tiposPerguntas = [
  { id: "aberta", nome: "Resposta Aberta" },
  { id: "multipla", nome: "Múltipla Escolha" },
  { id: "booleano", nome: "Sim/Não" },
  { id: "escala", nome: "Escala (1-5)" },
];

export default function NovoScriptPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    titulo: "",
    descricao: "",
    perguntas: [
      {
        id: 1,
        pergunta: "",
        tipo: "aberta",
        opcoes: [""],
        obrigatoria: true,
      },
    ],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handlePerguntaChange = (index: number, field: string, value: any) => {
    const updatedPerguntas = [...formData.perguntas];
    updatedPerguntas[index] = {
      ...updatedPerguntas[index],
      [field]: value,
    };
    setFormData(prev => ({ ...prev, perguntas: updatedPerguntas }));
  };

  const handleOpcaoChange = (perguntaIndex: number, opcaoIndex: number, value: string) => {
    const updatedPerguntas = [...formData.perguntas];
    const updatedOpcoes = [...updatedPerguntas[perguntaIndex].opcoes];
    updatedOpcoes[opcaoIndex] = value;
    updatedPerguntas[perguntaIndex].opcoes = updatedOpcoes;
    setFormData(prev => ({ ...prev, perguntas: updatedPerguntas }));
  };

  const adicionarPergunta = () => {
    const novaId = formData.perguntas.length > 0 
      ? Math.max(...formData.perguntas.map(p => p.id)) + 1 
      : 1;
    
    setFormData(prev => ({
      ...prev,
      perguntas: [
        ...prev.perguntas,
        {
          id: novaId,
          pergunta: "",
          tipo: "aberta",
          opcoes: [""],
          obrigatoria: true,
        },
      ],
    }));
  };

  const adicionarOpcao = (perguntaIndex: number) => {
    const updatedPerguntas = [...formData.perguntas];
    updatedPerguntas[perguntaIndex].opcoes = [
      ...updatedPerguntas[perguntaIndex].opcoes,
      "",
    ];
    setFormData(prev => ({ ...prev, perguntas: updatedPerguntas }));
  };

  const removerPergunta = (index: number) => {
    const updatedPerguntas = formData.perguntas.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, perguntas: updatedPerguntas }));
  };

  const removerOpcao = (perguntaIndex: number, opcaoIndex: number) => {
    const updatedPerguntas = [...formData.perguntas];
    updatedPerguntas[perguntaIndex].opcoes = updatedPerguntas[perguntaIndex].opcoes.filter(
      (_, i) => i !== opcaoIndex
    );
    setFormData(prev => ({ ...prev, perguntas: updatedPerguntas }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simulando envio para API
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log("Script criado:", formData);
      router.push("/dashboard/scripts");
    } catch (error) {
      console.error("Erro ao criar script:", error);
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
          <h2 className="text-3xl font-bold tracking-tight">Novo Script</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6">
          {/* Informações Básicas */}
          <Card>
            <CardHeader>
              <CardTitle>Informações Básicas</CardTitle>
              <CardDescription>
                Defina o título e a descrição do script
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="titulo">Título do Script</Label>
                <Input 
                  id="titulo" 
                  placeholder="Ex: Abordagem Inicial" 
                  value={formData.titulo}
                  onChange={handleInputChange}
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="descricao">Descrição</Label>
                <Textarea 
                  id="descricao" 
                  placeholder="Descreva o objetivo deste script" 
                  className="min-h-[100px]"
                  value={formData.descricao}
                  onChange={handleInputChange}
                  required 
                />
              </div>
            </CardContent>
          </Card>

          {/* Perguntas */}
          <Card>
            <CardHeader>
              <CardTitle>Perguntas</CardTitle>
              <CardDescription>
                Adicione as perguntas que compõem o script
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {formData.perguntas.map((pergunta, index) => (
                <div key={pergunta.id} className="space-y-4 border rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Pergunta {index + 1}</h3>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removerPergunta(index)}
                      disabled={formData.perguntas.length === 1}
                    >
                      <Trash className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`pergunta-${index}`}>Texto da Pergunta</Label>
                    <Input 
                      id={`pergunta-${index}`} 
                      placeholder="Digite a pergunta" 
                      value={pergunta.pergunta}
                      onChange={(e) => handlePerguntaChange(index, "pergunta", e.target.value)}
                      required 
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`tipo-${index}`}>Tipo de Resposta</Label>
                      <Select 
                        value={pergunta.tipo} 
                        onValueChange={(value) => handlePerguntaChange(index, "tipo", value)}
                      >
                        <SelectTrigger id={`tipo-${index}`}>
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          {tiposPerguntas.map((tipo) => (
                            <SelectItem key={tipo.id} value={tipo.id}>
                              {tipo.nome}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`obrigatoria-${index}`} className="block mb-2">
                        Pergunta Obrigatória
                      </Label>
                      <div className="flex items-center space-x-2">
                        <Switch 
                          id={`obrigatoria-${index}`}
                          checked={pergunta.obrigatoria}
                          onCheckedChange={(checked) => 
                            handlePerguntaChange(index, "obrigatoria", checked)
                          }
                        />
                        <Label htmlFor={`obrigatoria-${index}`}>
                          {pergunta.obrigatoria ? (
                            <span className="flex items-center text-sm text-red-500">
                              <AlertCircle className="h-4 w-4 mr-1" />
                              Obrigatória
                            </span>
                          ) : (
                            <span className="flex items-center text-sm text-muted-foreground">
                              <CheckCircle2 className="h-4 w-4 mr-1" />
                              Opcional
                            </span>
                          )}
                        </Label>
                      </div>
                    </div>
                  </div>
                  
                  {/* Opções para perguntas de múltipla escolha */}
                  {pergunta.tipo === "multipla" && (
                    <div className="space-y-4 mt-4">
                      <Label>Opções de Resposta</Label>
                      {pergunta.opcoes.map((opcao, opcaoIndex) => (
                        <div key={opcaoIndex} className="flex items-center gap-2">
                          <Input 
                            placeholder={`Opção ${opcaoIndex + 1}`} 
                            value={opcao}
                            onChange={(e) => 
                              handleOpcaoChange(index, opcaoIndex, e.target.value)
                            }
                            required 
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removerOpcao(index, opcaoIndex)}
                            disabled={pergunta.opcoes.length === 1}
                          >
                            <Trash className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => adicionarOpcao(index)}
                        className="mt-2"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Adicionar Opção
                      </Button>
                    </div>
                  )}
                </div>
              ))}
              
              <Button
                type="button"
                variant="outline"
                onClick={adicionarPergunta}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Pergunta
              </Button>
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
                {loading ? "Salvando..." : "Salvar Script"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </form>
    </div>
  );
}