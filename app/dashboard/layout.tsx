"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ChevronLeft,
  LayoutDashboard,
  Users,
  ShoppingCart,
  Building2,
  Wallet,
  LogOut,
  Menu,
  Gem,
  Bell,
  User,
  FileText,
  Package,
  DollarSign,
  ClipboardList,
  Boxes,
  Cable,
  Settings,
  UserCog,
  Building,
  Calendar,
  UserCheck,
  ScrollText,
  Target,
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    title: "Vendas",
    icon: ShoppingCart,
    href: "/dashboard/vendas",
  },
  {
    title: "Clientes",
    icon: Users,
    href: "/dashboard/clientes",
  },
  {
    title: "Representadas",
    icon: Building2,
    href: "/dashboard/representadas",
  },
  {
    title: "Produtos",
    icon: Package,
    href: "/dashboard/produtos",
  },
  {
    title: "Pedidos",
    icon: ClipboardList,
    href: "/dashboard/pedidos",
  },
  {
    title: "Financeiro",
    icon: Wallet,
    href: "/dashboard/financeiro",
  },
];

const vendasItems = [
  {
    title: "Gestão de Vendas",
    icon: ShoppingCart,
    items: [
      {
        title: "Promotores",
        href: "/dashboard/promotores",
        icon: UserCheck,
      },
      {
        title: "Agenda",
        href: "/dashboard/agenda",
        icon: Calendar,
      },
      {
        title: "Scripts",
        href: "/dashboard/scripts",
        icon: ScrollText,
      },
      {
        title: "Leads",
        href: "/dashboard/leads",
        icon: Target,
      },
    ],
  },
];

const relatoriosItems = [
  {
    title: "Relatórios",
    icon: FileText,
    items: [
      {
        title: "Vendas",
        href: "/dashboard/relatorios/vendas",
      },
      {
        title: "Comissões",
        href: "/dashboard/relatorios/comissoes",
      },
      {
        title: "Pedidos",
        href: "/dashboard/relatorios/pedidos",
      },
      {
        title: "Produtos",
        href: "/dashboard/relatorios/produtos",
      },
    ],
  },
];

const configItems = [
  {
    title: "Integrações",
    icon: Cable,
    href: "/dashboard/integracoes",
  },
  {
    title: "Usuários",
    icon: UserCog,
    href: "/dashboard/usuarios",
  },
  {
    title: "Empresas",
    icon: Building,
    href: "/dashboard/empresas",
  },
  {
    title: "Configurações",
    icon: Settings,
    href: "/dashboard/configuracoes",
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>("main");
  const pathname = usePathname();

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="min-h-screen bg-gray-100/40">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center px-4 md:px-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="mr-2"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <Gem className="h-6 w-6" />
            <span className={cn("font-semibold", collapsed && "md:hidden")}>
              SuaGestão
            </span>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <Button variant="ghost" size="sm" className="gap-2">
              <User className="h-5 w-5" />
              <span className="hidden md:inline-block">João Silva</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={cn(
            "fixed left-0 top-14 z-30 h-[calc(100vh-3.5rem)] w-64 border-r bg-background transition-all duration-300",
            collapsed && "w-16"
          )}
        >
          <div className="flex h-full flex-col gap-4 py-4">
            <nav className="grid gap-1 px-2">
              {/* Menu Principal */}
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900",
                    pathname === item.href && "bg-gray-100 text-gray-900",
                    collapsed && "justify-center"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span className={cn("text-sm", collapsed && "hidden")}>
                    {item.title}
                  </span>
                </Link>
              ))}

              {/* Seção de Gestão de Vendas */}
              <Separator className="my-4" />
              {vendasItems.map((section, index) => (
                <div key={index}>
                  <button
                    onClick={() => toggleSection('sales')}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900",
                      collapsed && "justify-center"
                    )}
                  >
                    <section.icon className="h-5 w-5" />
                    <span className={cn("text-sm", collapsed && "hidden")}>
                      {section.title}
                    </span>
                  </button>
                  {!collapsed && openSection === 'sales' && (
                    <div className="ml-4 mt-1 grid gap-1">
                      {section.items.map((item, itemIndex) => (
                        <Link
                          key={itemIndex}
                          href={item.href}
                          className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-500 transition-all hover:text-gray-900",
                            pathname === item.href && "bg-gray-100 text-gray-900"
                          )}
                        >
                          <item.icon className="h-4 w-4" />
                          {item.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Seção de Relatórios */}
              <Separator className="my-4" />
              {relatoriosItems.map((section, index) => (
                <div key={index}>
                  <button
                    onClick={() => toggleSection('reports')}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900",
                      collapsed && "justify-center"
                    )}
                  >
                    <section.icon className="h-5 w-5" />
                    <span className={cn("text-sm", collapsed && "hidden")}>
                      {section.title}
                    </span>
                  </button>
                  {!collapsed && openSection === 'reports' && (
                    <div className="ml-4 mt-1 grid gap-1">
                      {section.items.map((item, itemIndex) => (
                        <Link
                          key={itemIndex}
                          href={item.href}
                          className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-500 transition-all hover:text-gray-900",
                            pathname === item.href && "bg-gray-100 text-gray-900"
                          )}
                        >
                          {item.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Configurações e Integrações */}
              <Separator className="my-4" />
              {configItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900",
                    pathname === item.href && "bg-gray-100 text-gray-900",
                    collapsed && "justify-center"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span className={cn("text-sm", collapsed && "hidden")}>
                    {item.title}
                  </span>
                </Link>
              ))}
            </nav>

            <div className="mt-auto px-2">
              <Separator className="mb-4" />
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-3 text-gray-500",
                  collapsed && "justify-center"
                )}
              >
                <LogOut className="h-5 w-5" />
                <span className={cn("text-sm", collapsed && "hidden")}>
                  Sair
                </span>
              </Button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main
          className={cn(
            "flex-1 transition-all duration-300",
            collapsed ? "ml-16" : "ml-64"
          )}
        >
          {children}
        </main>
      </div>
    </div>
  );
}