"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Package, Tag, Filter, FileDown, Mail, Phone } from "lucide-react";
import Image from "next/image";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

// Company info
const companyInfo = {
  name: "SuaGestão Representações",
  logo: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=200&h=100",
  email: "contato@suagestao.com",
  phone: "(11) 3456-7890",
  address: "Av. Paulista, 1000 - São Paulo, SP"
};

// Mock data for representadas with logos
const representadas = [
  { 
    id: 1, 
    nome: "Xalingo Brinquedos", 
    logo: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=300&h=300&auto=format&fit=crop",
    cor: "bg-red-500",
    descricao: "Brinquedos educativos e recreativos",
    contato: {
      email: "comercial@xalingo.com.br",
      telefone: "(51) 3456-7890"
    }
  },
  { 
    id: 2, 
    nome: "Athia Heroes", 
    logo: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=300&h=300&auto=format&fit=crop",
    cor: "bg-blue-500",
    descricao: "Games e entretenimento digital",
    contato: {
      email: "vendas@athia.com.br",
      telefone: "(11) 3456-7890"
    }
  },
  { 
    id: 3, 
    nome: "Brasil Fit", 
    logo: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=300&h=300&auto=format&fit=crop",
    cor: "bg-green-500",
    descricao: "Equipamentos esportivos e fitness",
    contato: {
      email: "comercial@brasilfit.com.br",
      telefone: "(41) 3456-7890"
    }
  },
  { 
    id: 4, 
    nome: "Sinteplast", 
    logo: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=300&h=300&auto=format&fit=crop",
    cor: "bg-yellow-500",
    descricao: "Tintas e revestimentos",
    contato: {
      email: "vendas@sinteplast.com.br",
      telefone: "(31) 3456-7890"
    }
  },
  { 
    id: 5, 
    nome: "Patta", 
    logo: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=300&h=300&auto=format&fit=crop",
    cor: "bg-purple-500",
    descricao: "Calçados esportivos e casuais",
    contato: {
      email: "comercial@patta.com.br",
      telefone: "(54) 3456-7890"
    }
  },
];

// Mock data for products
const produtos = [
  {
    id: 1,
    representadaId: 1, // Xalingo
    nome: "Boneco Aventureiro",
    codigo: "XLG-001",
    descricao: "Boneco articulado com acessórios de aventura",
    preco: 89.90,
    categoria: "Bonecos",
    imagem: "https://images.unsplash.com/photo-1558507334-57300f59f0bd?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: 2,
    representadaId: 1, // Xalingo
    nome: "Kit Médico Infantil",
    codigo: "XLG-002",
    descricao: "Kit com instrumentos médicos de brinquedo",
    preco: 59.90,
    categoria: "Kits Educativos",
    imagem: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: 3,
    representadaId: 1, // Xalingo
    nome: "Quebra-Cabeça Animais",
    codigo: "XLG-003",
    descricao: "Quebra-cabeça com 100 peças de animais da floresta",
    preco: 45.90,
    categoria: "Quebra-Cabeças",
    imagem: "https://images.unsplash.com/photo-1576076819613-26f8537ae375?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: 4,
    representadaId: 2, // Athia
    nome: "Console Portátil Hero X",
    codigo: "ATH-001",
    descricao: "Console portátil com 100 jogos pré-instalados",
    preco: 899.90,
    categoria: "Consoles",
    imagem: "https://images.unsplash.com/photo-1531525645387-7f14be1bdbbd?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: 5,
    representadaId: 2, // Athia
    nome: "Jogo Aventura Espacial",
    codigo: "ATH-002",
    descricao: "Jogo de aventura no espaço com gráficos 3D",
    preco: 199.90,
    categoria: "Jogos",
    imagem: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: 6,
    representadaId: 3, // Brasil Fit
    nome: "Esteira Elétrica Pro",
    codigo: "BF-001",
    descricao: "Esteira elétrica com 10 programas de treinamento",
    preco: 3499.90,
    categoria: "Equipamentos",
    imagem: "https://images.unsplash.com/photo-1570829053985-56e661df1ca2?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: 7,
    representadaId: 3, // Brasil Fit
    nome: "Kit Halteres 10kg",
    codigo: "BF-002",
    descricao: "Kit com dois halteres de 10kg cada",
    preco: 299.90,
    categoria: "Acessórios",
    imagem: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: 8,
    representadaId: 4, // Sinteplast
    nome: "Tinta Acrílica Premium 18L",
    codigo: "SP-001",
    descricao: "Tinta acrílica premium para interiores",
    preco: 289.90,
    categoria: "Tintas",
    imagem: "https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: 9,
    representadaId: 5, // Patta
    nome: "Tênis Runner Pro",
    codigo: "PT-001",
    descricao: "Tênis para corrida com amortecimento avançado",
    preco: 399.90,
    categoria: "Calçados",
    imagem: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: 10,
    representadaId: 5, // Patta
    nome: "Tênis Casual Urban",
    codigo: "PT-002",
    descricao: "Tênis casual para uso diário",
    preco: 299.90,
    categoria: "Calçados",
    imagem: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=400&auto=format&fit=crop"
  },
];

export default function CatalogoPage() {
  const [selectedRepresentada, setSelectedRepresentada] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategoria, setSelectedCategoria] = useState<string | null>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const pdfContentRef = useRef<HTMLDivElement>(null);
  const companyLogoRef = useRef<HTMLImageElement>(null);
  const representadaLogoRef = useRef<HTMLImageElement>(null);

  // Get all unique categories for the selected representada
  const categorias = selectedRepresentada 
    ? [...new Set(produtos
        .filter(p => p.representadaId === selectedRepresentada)
        .map(p => p.categoria))]
    : [];

  // Filter products based on selected representada, search term, and category
  const filteredProdutos = produtos.filter(produto => {
    // Filter by representada
    if (selectedRepresentada && produto.representadaId !== selectedRepresentada) {
      return false;
    }
    
    // Filter by search term
    if (searchTerm && !produto.nome.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !produto.codigo.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Filter by category
    if (selectedCategoria && produto.categoria !== selectedCategoria) {
      return false;
    }
    
    return true;
  });

  // Handle representada selection
  const handleSelectRepresentada = (id: number) => {
    setSelectedRepresentada(id);
    setSelectedCategoria(null); // Reset category filter when changing representada
  };

  // Handle back to selection
  const handleBackToSelection = () => {
    setSelectedRepresentada(null);
    setSearchTerm("");
    setSelectedCategoria(null);
  };

  // Function to load an image and convert it to base64
  const loadImageAsBase64 = (url: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "Anonymous"; // Enable CORS
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          resolve(canvas.toDataURL("image/png"));
        } else {
          reject(new Error("Could not get canvas context"));
        }
      };
      img.onerror = (e) => reject(e);
      img.src = url;
    });
  };

  // Generate PDF from the current view
  const generatePDF = async () => {
    if (!pdfContentRef.current) return;
    
    setIsGeneratingPDF(true);
    
    try {
      // Create a new jsPDF instance
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      
      // Load company logo
      let companyLogoBase64;
      try {
        companyLogoBase64 = await loadImageAsBase64(companyInfo.logo);
      } catch (error) {
        console.error("Error loading company logo:", error);
      }
      
      // Load representada logo if selected
      let representadaLogoBase64;
      if (selectedRepresentada) {
        const representada = representadas.find(r => r.id === selectedRepresentada);
        if (representada) {
          try {
            representadaLogoBase64 = await loadImageAsBase64(representada.logo);
          } catch (error) {
            console.error("Error loading representada logo:", error);
          }
        }
      }
      
      // Add company logo and info
      if (companyLogoBase64) {
        pdf.addImage(companyLogoBase64, 'PNG', 15, 10, 30, 15);
      }
      
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text(companyInfo.name, 50, 15);
      
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`Email: ${companyInfo.email}`, 50, 20);
      pdf.text(`Telefone: ${companyInfo.phone}`, 50, 25);
      pdf.text(`Endereço: ${companyInfo.address}`, 50, 30);
      
      // Add date
      const today = new Date();
      pdf.text(`Data: ${today.toLocaleDateString('pt-BR')}`, pageWidth - 60, 15);
      
      // Add representada info if selected
      let startY = 40;
      if (selectedRepresentada) {
        const representada = representadas.find(r => r.id === selectedRepresentada);
        if (representada) {
          // Add separator line
          pdf.setDrawColor(200, 200, 200);
          pdf.line(15, 35, pageWidth - 15, 35);
          
          // Add representada logo
          if (representadaLogoBase64) {
            pdf.addImage(representadaLogoBase64, 'PNG', 15, 40, 20, 20);
            pdf.setFontSize(14);
            pdf.setFont('helvetica', 'bold');
            pdf.text(`Catálogo: ${representada.nome}`, 40, 45);
            pdf.setFontSize(10);
            pdf.setFont('helvetica', 'normal');
            pdf.text(`Email: ${representada.contato.email}`, 40, 50);
            pdf.text(`Telefone: ${representada.contato.telefone}`, 40, 55);
            pdf.text(`${representada.descricao}`, 40, 60);
          } else {
            pdf.setFontSize(14);
            pdf.setFont('helvetica', 'bold');
            pdf.text(`Catálogo: ${representada.nome}`, 15, 45);
            pdf.setFontSize(10);
            pdf.setFont('helvetica', 'normal');
            pdf.text(`Email: ${representada.contato.email}`, 15, 50);
            pdf.text(`Telefone: ${representada.contato.telefone}`, 15, 55);
            pdf.text(`${representada.descricao}`, 15, 60);
          }
          
          startY = 70; // Adjust starting position for products
        }
      }
      
      // Add another separator line
      pdf.setDrawColor(200, 200, 200);
      pdf.line(15, startY - 5, pageWidth - 15, startY - 5);
      
      // Convert the products grid to canvas
      const canvas = await html2canvas(pdfContentRef.current, {
        scale: 1,
        useCORS: true,
        logging: false,
        allowTaint: true
      });
      
      // Calculate the number of pages needed
      const imgHeight = canvas.height * pageWidth / canvas.width;
      let heightLeft = imgHeight;
      let position = startY; // Start after the header
      
      // Add the first page
      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', 10, position, pageWidth - 20, imgHeight);
      heightLeft -= (pageHeight - position);
      
      // Add new pages if needed
      while (heightLeft > 0) {
        position = 0;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 10, position - imgHeight + (pageHeight - position), pageWidth - 20, imgHeight);
        heightLeft -= pageHeight;
      }
      
      // Add footer with page numbers
      const pageCount = pdf.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        pdf.setPage(i);
        pdf.setFontSize(8);
        pdf.text(`Página ${i} de ${pageCount}`, pageWidth - 30, pageHeight - 10);
      }
      
      // Save the PDF
      const fileName = selectedRepresentada 
        ? `catalogo_${representadas.find(r => r.id === selectedRepresentada)?.nome.replace(/\s+/g, '_').toLowerCase()}.pdf`
        : 'catalogo_completo.pdf';
      
      pdf.save(fileName);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Catálogo de Produtos</h2>
        {selectedRepresentada && (
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={handleBackToSelection}
            >
              Voltar para Seleção
            </Button>
            <Button 
              onClick={generatePDF}
              disabled={isGeneratingPDF}
              className="gap-2"
            >
              <FileDown className="h-4 w-4" />
              {isGeneratingPDF ? "Gerando PDF..." : "Salvar em PDF"}
            </Button>
          </div>
        )}
      </div>

      {/* Hidden images for PDF generation */}
      <div className="hidden">
        <img 
          ref={companyLogoRef} 
          src={companyInfo.logo} 
          alt="Company Logo" 
          crossOrigin="anonymous"
        />
        {selectedRepresentada && (
          <img 
            ref={representadaLogoRef} 
            src={representadas.find(r => r.id === selectedRepresentada)?.logo} 
            alt="Representada Logo" 
            crossOrigin="anonymous"
          />
        )}
      </div>

      {!selectedRepresentada ? (
        // Representada Selection Screen (Character Selection Style)
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-6 text-center">Selecione uma Representada</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {representadas.map((representada) => (
              <div 
                key={representada.id}
                className="cursor-pointer transform transition-all duration-300 hover:scale-105"
                onClick={() => handleSelectRepresentada(representada.id)}
              >
                <Card className="overflow-hidden border-2 hover:border-primary">
                  <div className={`h-2 ${representada.cor}`}></div>
                  <CardContent className="p-6 flex flex-col items-center">
                    <div className="relative w-40 h-40 rounded-full overflow-hidden mb-4 border-4 border-gray-100 shadow-lg">
                      <Image
                        src={representada.logo}
                        alt={representada.nome}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardTitle className="text-center mb-2">{representada.nome}</CardTitle>
                    <CardDescription className="text-center">{representada.descricao}</CardDescription>
                  </CardContent>
                  <CardFooter className="bg-gray-50 p-4 flex justify-center">
                    <Button>Ver Produtos</Button>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        </div>
      ) : (
        // Products Display for Selected Representada
        <>
          <div className="flex flex-col md:flex-row gap-4 items-start">
            {/* Search and Filters */}
            <div className="w-full md:w-64 space-y-4">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Buscar produtos..." 
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Filtros</CardTitle>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0"
                      onClick={() => setShowFilters(!showFilters)}
                    >
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                {showFilters && (
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Categorias</h4>
                        <div className="space-y-2">
                          <div 
                            className={`px-3 py-2 rounded-md text-sm cursor-pointer ${
                              selectedCategoria === null ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'
                            }`}
                            onClick={() => setSelectedCategoria(null)}
                          >
                            Todas
                          </div>
                          {categorias.map((categoria) => (
                            <div 
                              key={categoria}
                              className={`px-3 py-2 rounded-md text-sm cursor-pointer ${
                                selectedCategoria === categoria ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'
                              }`}
                              onClick={() => setSelectedCategoria(categoria)}
                            >
                              {categoria}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">
                    {representadas.find(r => r.id === selectedRepresentada)?.nome}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative w-full h-32 rounded-md overflow-hidden mb-4">
                    <Image
                      src={representadas.find(r => r.id === selectedRepresentada)?.logo || ""}
                      alt={representadas.find(r => r.id === selectedRepresentada)?.nome || ""}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {representadas.find(r => r.id === selectedRepresentada)?.descricao}
                  </p>
                  <div className="mt-4 space-y-1 text-sm">
                    <p className="flex items-center gap-1">
                      <Mail className="h-3 w-3 text-muted-foreground" />
                      {representadas.find(r => r.id === selectedRepresentada)?.contato.email}
                    </p>
                    <p className="flex items-center gap-1">
                      <Phone className="h-3 w-3 text-muted-foreground" />
                      {representadas.find(r => r.id === selectedRepresentada)?.contato.telefone}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Products Grid */}
            <div className="flex-1" ref={pdfContentRef}>
              {filteredProdutos.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProdutos.map((produto) => (
                    <Card key={produto.id} className="overflow-hidden">
                      <div className="relative h-48 w-full">
                        <Image
                          src={produto.imagem}
                          alt={produto.nome}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{produto.nome}</CardTitle>
                            <CardDescription className="flex items-center gap-1 mt-1">
                              <Package className="h-3 w-3" />
                              {produto.codigo}
                            </CardDescription>
                          </div>
                          <div className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-secondary">
                            <Tag className="h-3 w-3 mr-1" />
                            {produto.categoria}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                          {produto.descricao}
                        </p>
                        <p className="font-bold text-lg">
                          {produto.preco.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                          })}
                        </p>
                      </CardContent>
                      <CardFooter className="bg-gray-50 flex justify-between">
                        <Button variant="outline" size="sm">Detalhes</Button>
                        <Button size="sm">Adicionar ao Pedido</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-64 border rounded-lg">
                  <div className="text-center">
                    <p className="text-muted-foreground">Nenhum produto encontrado</p>
                    <Button 
                      variant="link" 
                      onClick={() => {
                        setSearchTerm("");
                        setSelectedCategoria(null);
                      }}
                    >
                      Limpar filtros
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}