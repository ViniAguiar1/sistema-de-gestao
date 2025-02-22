export type UserRole = 'admin' | 'representante' | 'promotor';

export interface Permission {
  view: boolean;
  create: boolean;
  edit: boolean;
  delete: boolean;
}

export interface ModulePermissions {
  dashboard: Permission;
  vendas: Permission;
  clientes: Permission;
  representadas: Permission;
  produtos: Permission;
  pedidos: Permission;
  financeiro: Permission;
  promotores: Permission;
  agenda: Permission;
  scripts: Permission;
  leads: Permission;
  relatorios: Permission;
  integracoes: Permission;
  usuarios: Permission;
  empresas: Permission;
  configuracoes: Permission;
}

export const rolePermissions: Record<UserRole, ModulePermissions> = {
  admin: {
    dashboard: { view: true, create: true, edit: true, delete: true },
    vendas: { view: true, create: true, edit: true, delete: true },
    clientes: { view: true, create: true, edit: true, delete: true },
    representadas: { view: true, create: true, edit: true, delete: true },
    produtos: { view: true, create: true, edit: true, delete: true },
    pedidos: { view: true, create: true, edit: true, delete: true },
    financeiro: { view: true, create: true, edit: true, delete: true },
    promotores: { view: true, create: true, edit: true, delete: true },
    agenda: { view: true, create: true, edit: true, delete: true },
    scripts: { view: true, create: true, edit: true, delete: true },
    leads: { view: true, create: true, edit: true, delete: true },
    relatorios: { view: true, create: true, edit: true, delete: true },
    integracoes: { view: true, create: true, edit: true, delete: true },
    usuarios: { view: true, create: true, edit: true, delete: true },
    empresas: { view: true, create: true, edit: true, delete: true },
    configuracoes: { view: true, create: true, edit: true, delete: true },
  },
  representante: {
    dashboard: { view: true, create: false, edit: false, delete: false },
    vendas: { view: true, create: true, edit: true, delete: false },
    clientes: { view: true, create: true, edit: true, delete: false },
    representadas: { view: true, create: false, edit: false, delete: false },
    produtos: { view: true, create: false, edit: false, delete: false },
    pedidos: { view: true, create: true, edit: true, delete: false },
    financeiro: { view: true, create: true, edit: false, delete: false },
    promotores: { view: true, create: true, edit: true, delete: true },
    agenda: { view: true, create: true, edit: true, delete: true },
    scripts: { view: true, create: true, edit: true, delete: true },
    leads: { view: true, create: true, edit: true, delete: true },
    relatorios: { view: true, create: false, edit: false, delete: false },
    integracoes: { view: false, create: false, edit: false, delete: false },
    usuarios: { view: false, create: false, edit: false, delete: false },
    empresas: { view: true, create: false, edit: false, delete: false },
    configuracoes: { view: true, create: false, edit: false, delete: false },
  },
  promotor: {
    dashboard: { view: true, create: false, edit: false, delete: false },
    vendas: { view: true, create: true, edit: false, delete: false },
    clientes: { view: true, create: true, edit: true, delete: false },
    representadas: { view: true, create: false, edit: false, delete: false },
    produtos: { view: true, create: false, edit: false, delete: false },
    pedidos: { view: true, create: true, edit: false, delete: false },
    financeiro: { view: false, create: false, edit: false, delete: false },
    promotores: { view: false, create: false, edit: false, delete: false },
    agenda: { view: true, create: true, edit: true, delete: false },
    scripts: { view: true, create: false, edit: false, delete: false },
    leads: { view: true, create: true, edit: true, delete: false },
    relatorios: { view: true, create: false, edit: false, delete: false },
    integracoes: { view: false, create: false, edit: false, delete: false },
    usuarios: { view: false, create: false, edit: false, delete: false },
    empresas: { view: false, create: false, edit: false, delete: false },
    configuracoes: { view: false, create: false, edit: false, delete: false },
  },
};

export function hasPermission(
  role: UserRole,
  module: keyof ModulePermissions,
  action: keyof Permission
): boolean {
  return rolePermissions[role][module][action];
}

// Hook para verificar permissões
export function usePermissions(role: UserRole) {
  return {
    can: (module: keyof ModulePermissions, action: keyof Permission) =>
      hasPermission(role, module, action),
    rolePermissions: rolePermissions[role],
  };
}