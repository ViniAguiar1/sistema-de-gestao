export interface User {
    id: number;
    nome: string;
    email: string;
    senha: string;
    cargo: 'admin' | 'representante' | 'promotor';
    empresa: string;
    status: 'Ativo' | 'Inativo';
  }
  
  export const mockUsers: User[] = [
    {
      id: 1,
      nome: "Admin Sistema",
      email: "admin@suagestao.com",
      senha: "admin123",
      cargo: "admin",
      empresa: "SuaGestão",
      status: "Ativo"
    },
    {
      id: 2,
      nome: "João Silva",
      email: "joao.silva@empresa.com",
      senha: "rep123",
      cargo: "representante",
      empresa: "Representações Silva",
      status: "Ativo"
    },
    {
      id: 3,
      nome: "Carlos Santos",
      email: "carlos.santos@empresa.com",
      senha: "promo123",
      cargo: "promotor",
      empresa: "Representações Silva",
      status: "Ativo"
    }
  ];
  
  // Função para simular autenticação
  export function authenticateUser(email: string, password: string): User | null {
    return mockUsers.find(user => 
      user.email === email && user.senha === password
    ) || null;
  }