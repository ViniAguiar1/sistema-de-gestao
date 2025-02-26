export const representadasData = [
    {
      id: 1,
      razaoSocial: "Xalingo Indústria e Comércio Ltda",
      nomeFantasia: "Xalingo Brinquedos",
      cnpj: "12.345.678/0001-90",
      inscricaoEstadual: "123.456.789",
      segmento: "Brinquedos",
      endereco: "Rua Industrial, 1000",
      numero: "1000",
      complemento: "Bloco A",
      bairro: "Distrito Industrial",
      cep: "96815-901",
      cidade: "Santa Cruz do Sul",
      estado: "RS",
      telefone: "(51) 3456-7890",
      fax: "(51) 3456-7891",
      telefoneAdicional: "(51) 98765-4321",
      email: "comercial@xalingo.com.br",
      emailFinanceiro: "financeiro@xalingo.com.br",
      website: "www.xalingo.com.br",
      instagram: "@xalingobrinquedos",
      facebook: "xalingobrinquedos",
      condicoesPagamento: [
        { id: 1, nome: "À Vista", prazo: 0, desconto: 5 },
        { id: 2, nome: "30 Dias", prazo: 30, desconto: 0 },
        { id: 3, nome: "30/60 Dias", prazo: [30, 60], desconto: 0 }
      ],
      formasPagamento: [
        { id: 1, nome: "Boleto Bancário" },
        { id: 2, nome: "PIX" }
      ],
      tabelasPreco: [
        { nome: "Tabela Padrão", desconto: 0, comissao: 8 },
        { nome: "Tabela Especial", desconto: 5, comissao: 10 }
      ],
      observacoes: "Representada desde 2020. Líder no segmento de brinquedos educativos.",
    },
    {
      id: 2,
      razaoSocial: "Athia Games Desenvolvimento de Software Ltda",
      nomeFantasia: "Athia Heroes",
      cnpj: "23.456.789/0001-89",
      inscricaoEstadual: "234.567.890",
      segmento: "Games e Entretenimento",
      endereco: "Av. Paulista",
      numero: "1000",
      complemento: "Andar 10",
      bairro: "Bela Vista",
      cep: "01310-100",
      cidade: "São Paulo",
      estado: "SP",
      telefone: "(11) 3456-7890",
      fax: "",
      telefoneAdicional: "(11) 98765-4321",
      email: "vendas@athia.com.br",
      emailFinanceiro: "financeiro@athia.com.br",
      website: "www.athia.com.br",
      instagram: "@athiaheroes",
      facebook: "athiaheroes",
      condicoesPagamento: [
        { id: 1, nome: "À Vista", prazo: 0, desconto: 10 },
        { id: 2, nome: "30 Dias", prazo: 30, desconto: 0 }
      ],
      formasPagamento: [
        { id: 1, nome: "Cartão de Crédito" },
        { id: 2, nome: "PIX" }
      ],
      tabelasPreco: [
        { nome: "Tabela Padrão", desconto: 0, comissao: 10 },
        { nome: "Tabela Premium", desconto: 0, comissao: 12 }
      ],
      observacoes: "Empresa inovadora no setor de games mobile.",
    }
  ];