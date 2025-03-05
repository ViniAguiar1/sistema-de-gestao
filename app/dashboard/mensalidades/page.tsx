"use client";

import React, { useState, useEffect } from 'react';
import { Calendar, Clock, AlertCircle, CheckCircle, Info, X } from 'lucide-react';
import QRCode from 'react-qr-code';

function Mensalidades() {
  const [mensalidades, setMensalidades] = useState<any[]>([]);
  const [selectedMensalidade, setSelectedMensalidade] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);

  useEffect(() => {
    // Mock data for mensalidades with additional fields
    const mockData = [
      {
        id: 1,
        title: "Mensalidade Janeiro",
        description: "Mensalidade referente ao mês de Janeiro",
        value: "R$ 200,00",
        dueDate: "2025-01-10",
        status: "paid", // paid, pending, late
        paymentDate: "2025-01-08",
        paymentMethod: "Cartão de Crédito",
        invoice: "INV-2025-001",
      },
      {
        id: 2,
        title: "Mensalidade Fevereiro",
        description: "Mensalidade referente ao mês de Fevereiro",
        value: "R$ 200,00",
        dueDate: "2025-02-10",
        status: "pending",
        paymentMethod: "Pendente",
        invoice: "INV-2025-002",
      },
      {
        id: 3,
        title: "Mensalidade Março",
        description: "Mensalidade referente ao mês de Março",
        value: "R$ 200,00",
        dueDate: "2025-03-10",
        status: "late",
        paymentMethod: "Pendente",
        invoice: "INV-2025-003",
      },
    ];
    setMensalidades(mockData);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'late':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid':
        return 'Pago';
      case 'pending':
        return 'Pendente';
      case 'late':
        return 'Atrasado';
      default:
        return 'Desconhecido';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="w-4 h-4 mr-1" />;
      case 'pending':
        return <Clock className="w-4 h-4 mr-1" />;
      case 'late':
        return <AlertCircle className="w-4 h-4 mr-1" />;
      default:
        return <Info className="w-4 h-4 mr-1" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const openModal = (mensalidade: any) => {
    setSelectedMensalidade(mensalidade);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setShowQRCode(false);
  };

  const handlePayNow = () => {
    setShowQRCode(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Mensalidades</h1>
        <div className="h-px bg-gray-200 mb-4"></div>
        <div className="grid gap-4">
          {mensalidades.length > 0 ? (
            mensalidades.map((mensalidade) => (
              <div key={mensalidade.id} className="p-4 border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold">{mensalidade.title}</h2>
                    <p className="text-gray-600 mb-2">{mensalidade.description}</p>
                    <div className="flex items-center text-gray-600 mb-1">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>Vencimento: {formatDate(mensalidade.dueDate)}</span>
                    </div>
                    <p className="font-medium">Valor: {mensalidade.value}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(mensalidade.status)}`}>
                      {getStatusIcon(mensalidade.status)}
                      {getStatusText(mensalidade.status)}
                    </span>
                    {mensalidade.status === 'pending' && (
                      <span className="text-sm mt-2 text-yellow-600">
                        {getDaysUntilDue(mensalidade.dueDate) > 0 
                          ? `Vence em ${getDaysUntilDue(mensalidade.dueDate)} dias` 
                          : "Vence hoje"}
                      </span>
                    )}
                    {mensalidade.status === 'late' && (
                      <span className="text-sm mt-2 text-red-600">
                        {Math.abs(getDaysUntilDue(mensalidade.dueDate))} dias de atraso
                      </span>
                    )}
                  </div>
                </div>
                <div className="mt-3 flex justify-end">
                  <button 
                    onClick={() => openModal(mensalidade)}
                    className="text-sm px-3 py-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors"
                  >
                    Ver detalhes
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>Nenhuma mensalidade encontrada.</p>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && selectedMensalidade && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
            
            <h3 className="text-xl font-bold mb-4">{selectedMensalidade.title}</h3>
            <div className="h-px bg-gray-200 mb-4"></div>
            
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Descrição</p>
                <p>{selectedMensalidade.description}</p>
              </div>
              
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-gray-500">Valor</p>
                  <p className="font-medium">{selectedMensalidade.value}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedMensalidade.status)}`}>
                    {getStatusIcon(selectedMensalidade.status)}
                    {getStatusText(selectedMensalidade.status)}
                  </span>
                </div>
              </div>
              
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-gray-500">Data de Vencimento</p>
                  <p>{formatDate(selectedMensalidade.dueDate)}</p>
                </div>
                {selectedMensalidade.status === 'paid' && (
                  <div>
                    <p className="text-sm text-gray-500">Data de Pagamento</p>
                    <p>{formatDate(selectedMensalidade.paymentDate)}</p>
                  </div>
                )}
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Método de Pagamento</p>
                <p>{selectedMensalidade.paymentMethod}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Número da Fatura</p>
                <p>{selectedMensalidade.invoice}</p>
              </div>
            </div>
            
            <div className="mt-6 flex flex-col items-center">
              {selectedMensalidade.status !== 'paid' && (
                <>
                  <button 
                    onClick={handlePayNow}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors w-full mb-4"
                  >
                    Pagar Agora
                  </button>
                  
                  {showQRCode && (
                    <div className="mt-4 mb-4 flex flex-col items-center">
                      <p className="text-sm text-gray-500 mb-2">Escaneie o QR Code para pagar</p>
                      <QRCode 
                        value={`pix://payment?amount=200&invoice=${selectedMensalidade.invoice}`} 
                        size={200}
                        level="H"
                      />
                      <p className="text-xs text-gray-500 mt-2">Valor: {selectedMensalidade.value}</p>
                    </div>
                  )}
                </>
              )}
              <button 
                onClick={closeModal}
                className={`px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors ${selectedMensalidade.status !== 'paid' ? 'w-full' : ''}`}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Mensalidades;