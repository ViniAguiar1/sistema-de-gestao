# SuaGestão - Sistema de Gestão para Representantes Comerciais

Sistema especializado para representantes comerciais gerenciarem suas representadas, catálogos de produtos, pedidos e equipe comercial.

![SuaGestão](https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426&ixlib=rb-4.0.3)

## 🚀 Funcionalidades

### Gestão de Representadas
- Cadastro completo de indústrias representadas
- Controle de tabelas de preços
- Gestão de comissões
- Condições comerciais por representada
- Integração com sistemas das representadas
- Múltiplas tabelas de preço por representada
- Controle de condições de pagamento
- Gestão de documentação

### Gestão de Produtos
- Catálogo digital completo
- Precificação e margens
- Controle de dimensões e embalagens
- Múltiplas tabelas de preço
- Fotos e especificações técnicas
- Controle de estoque
- Códigos de barras e SKUs
- Categorização e filtros
- Importação em massa

### Gestão de Pedidos
- Emissão de pedidos
- Controle de status
- Acompanhamento de faturamento
- Histórico por cliente
- Relatórios de vendas
- Cálculo automático de preços
- Validação de estoque
- Múltiplos formatos de envio
- Integração com transportadoras

### Gestão de Promotores
- Cadastro de equipe comercial
- Controle de territórios
- Metas e comissões
- Agenda de visitas
- Scripts de vendas
- Gestão de leads
- Roteiros otimizados
- Relatórios de desempenho
- Controle de despesas

### Gestão de Clientes
- Cadastro completo
- Histórico de compras
- Limites de crédito
- Condições especiais
- Classificação de clientes
- Gestão de contatos
- Documentação fiscal
- Integração com CRM

### Integrações
- APIs das representadas
- Sistemas de ERP
- Plataformas de e-commerce
- Transportadoras
- CRMs
- Sistemas fiscais
- Ferramentas de BI
- Gateways de pagamento

## 💻 Tecnologias

- [Next.js 13](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn/ui](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)
- [Recharts](https://recharts.org/)
- [NextAuth.js](https://next-auth.js.org/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [Date-fns](https://date-fns.org/)

## 🛠️ Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/suagestao.git

# Entre no diretório
cd suagestao

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env.local

# Inicie o servidor de desenvolvimento
npm run dev
```

## 👥 Usuários de Teste

### Administrador
- Email: admin@suagestao.com
- Senha: admin123
- Acesso total ao sistema

### Representante
- Email: joao.silva@empresa.com
- Senha: rep123
- Acesso às funcionalidades de vendas e equipe

### Promotor
- Email: carlos.santos@empresa.com
- Senha: promo123
- Acesso à agenda e pedidos

## 🔐 Controle de Acesso

### Administrador
- Acesso completo a todas as funcionalidades
- Gerenciamento de usuários
- Configurações do sistema
- Gestão de integrações
- Relatórios gerenciais
- Auditoria do sistema

### Representante
- Gestão de pedidos
- Controle de promotores
- Catálogo de produtos
- Relatórios de vendas
- Gestão de clientes
- Configurações básicas
- Integrações com representadas

### Promotor
- Emissão de pedidos
- Agenda de visitas
- Catálogo de produtos
- Registro de atividades
- Gestão de leads
- Scripts de vendas
- Roteiros comerciais

## 📱 Módulos Principais

### Dashboard
- Visão geral do negócio
- Indicadores principais
- Gráficos de desempenho
- Alertas e notificações
- Tarefas pendentes
- Metas e objetivos

### Representadas
- Cadastro de indústrias
- Tabelas de preço
- Condições comerciais
- Controle de comissões
- Documentação
- Integrações
- Histórico de pedidos
- Faturamento por representada

### Produtos
- Cadastro detalhado
- Precificação e custos
- Dimensões e especificações
- Fotos e documentação
- Múltiplas categorias
- Cálculo de margens
- Controle de estoque
- Importação em massa
- Códigos de barras

### Pedidos
- Emissão de pedidos
- Controle de status
- Histórico por cliente
- Relatórios de vendas
- Cálculo de preços
- Validação de estoque
- Integração com transportadoras
- Documentação fiscal
- Rastreamento de entregas

### Promotores
- Cadastro de equipe
- Territórios de atuação
- Metas e comissões
- Agenda de visitas
- Roteiros comerciais
- Despesas
- Relatórios de desempenho
- Scripts de vendas
- Gestão de leads

### Agenda
- Visitas programadas
- Roteiros comerciais
- Histórico de atendimentos
- Sincronização com equipe
- Lembretes e alertas
- Geolocalização
- Relatórios de visitas
- Integração com calendário

### Scripts
- Templates de abordagem
- Questionários
- Roteiros de apresentação
- Objeções e respostas
- Argumentos de venda
- Checklist de visita
- Avaliação de efetividade
- Treinamento da equipe

### Leads
- Cadastro de prospects
- Funil de vendas
- Histórico de contatos
- Classificação
- Tarefas de follow-up
- Conversão em clientes
- Integração com CRM
- Relatórios de conversão

### Integrações
- APIs das representadas
- Configuração de conexões
- Sincronização de dados
- Monitoramento
- Logs de execução
- Tratamento de erros
- Backup de dados
- Documentação técnica

## 📊 Relatórios

### Vendas
- Por representada
- Por promotor
- Por região
- Por período
- Por cliente
- Por produto
- Comparativos
- Projeções

### Financeiro
- Comissões a receber
- Despesas da equipe
- Faturamento
- Margem de lucro
- Ticket médio
- Inadimplência
- Fluxo de caixa
- DRE

### Desempenho
- Metas vs Realizado
- Ranking de vendedores
- Efetividade de visitas
- Conversão de leads
- Tempo médio de venda
- Produtos mais vendidos
- Regiões mais lucrativas
- NPS

## 🔄 Fluxo de Trabalho

1. **Cadastros Básicos**
   - Representadas
   - Produtos
   - Tabelas de preço
   - Equipe comercial
   - Territórios
   - Scripts de venda

2. **Prospecção**
   - Cadastro de leads
   - Qualificação
   - Agendamento de visitas
   - Apresentação de produtos
   - Follow-up
   - Conversão em cliente

3. **Vendas**
   - Visitas a clientes
   - Apresentação de produtos
   - Negociação
   - Emissão de pedidos
   - Aprovação
   - Faturamento

4. **Pós-Venda**
   - Acompanhamento de entrega
   - Pesquisa de satisfação
   - Resolução de problemas
   - Manutenção do cliente
   - Cross-selling
   - Up-selling

5. **Gestão**
   - Análise de vendas
   - Controle de comissões
   - Avaliação de desempenho
   - Ajustes de metas
   - Treinamento da equipe
   - Planejamento estratégico

## 🔧 Configuração

### Variáveis de Ambiente

```env
# Autenticação
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key

# Banco de Dados
DATABASE_URL=your-database-url

# APIs
API_KEY=your-api-key
API_SECRET=your-api-secret

# Integrações
INTEGRATION_URL=your-integration-url
INTEGRATION_TOKEN=your-integration-token
```

### Banco de Dados

```sql
-- Criar tabelas principais
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  role VARCHAR(50)
);

CREATE TABLE representadas (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  cnpj VARCHAR(14),
  status VARCHAR(50)
);

-- Mais exemplos de schema no diretório /database
```

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🤝 Suporte

### Canais de Atendimento
- Email: suporte@suagestao.com
- WhatsApp: (11) 99999-9999
- Chat online: chat.suagestao.com
- Horário: Seg-Sex, 8h-18h

### Documentação
- [Manual do Usuário](docs/manual.md)
- [API Reference](docs/api.md)
- [FAQ](docs/faq.md)
- [Changelog](CHANGELOG.md)

### Treinamento
- Vídeos tutoriais
- Base de conhecimento
- Webinars mensais
- Consultoria personalizada

---

Desenvolvido com ❤️ pela equipe SuaGestão