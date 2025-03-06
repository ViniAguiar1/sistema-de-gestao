"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, LayoutDashboard, Users, ShoppingCart, Building2, Wallet, LogOut, Menu, Gem, Bell, User, FileText, Package, DollarSign, ClipboardList, Boxes, Cable, Settings, UserCog, Building, Calendar, UserCheck, ScrollText, Target, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import IconOng from "@/assets/1x/icon.png";
import logo from "@/assets/SVG/logo.svg";
import {jwtDecode} from "jwt-decode"; // Importar a biblioteca jwt-decode

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    title: "Empresas e Pessoas",
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
    title: "Catálogo",
    icon: BookOpen,
    href: "/dashboard/catalogo",
  },
  {
    title: "Pedidos",
    icon: ShoppingCart,
    href: "/dashboard/pedidos",
  },
  {
    title: "Financeiro",
    icon: Wallet,
    href: "/dashboard/financeiro",
  },
  {
    title: "Mensalidades",
    icon: DollarSign,
    href: "/dashboard/mensalidades",
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
    title: "Configurações",
    icon: Settings,
    items: [
      {
        title: "Integrações",
        href: "/dashboard/integracoes",
      },
      {
        title: "Usuários",
        href: "/dashboard/usuarios",
      },
      {
        title: "Empresas",
        href: "/dashboard/empresas",
      },
      {
        title: "Configurações",
        href: "/dashboard/configuracoes",
      },
    ]
  }
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>("main");
  const [userName, setUserName] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Recupera o token armazenado no localStorage
    const token = localStorage.getItem("token");
    
    if (token) {
      // Decodifica o token para obter as informações do usuário
      const decodedToken: any = jwtDecode(token);
      
      // Extrai o nome do usuário do payload do token
      setUserName(decodedToken?.nome || "Usuário");
    }
  }, []);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const renderMenuItems = (items: any[], section: string | null = null) => {
    return items.map((item, index) => (
      <div key={index}>
        {item.items ? (
          <>
            <button
              onClick={() => toggleSection(section || item.title)}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900",
                collapsed && "justify-center"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className={cn("text-sm", collapsed && "hidden")}>
                {item.title}
              </span>
            </button>
            {!collapsed && openSection === (section || item.title) && (
              <div className="ml-4 mt-1 grid gap-1">
                {renderMenuItems(item.items, section || item.title)}
              </div>
            )}
          </>
        ) : (
          <Link
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900",
              pathname === item.href && "bg-gray-100 text-gray-900",
              collapsed && "justify-center"
            )}
          >
            {item.icon && <item.icon className="h-5 w-5" />}
            <span className={cn("text-sm", collapsed && "hidden")}>
              {item.title}
            </span>
          </Link>
        )}
      </div>
    ));
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
          <div className="flex items-center gap-2 justify-center">
            <Image style={{ width: 120, height: 30 }} src={logo} alt="SuaGestão Logo" className="h-6" />
          </div>

          <div className="ml-auto flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <Button variant="ghost" size="sm" className="gap-2">
              <User className="h-5 w-5" />
              <span className="hidden md:inline-block">{userName || "Carregando..."}</span>
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
          <div className="flex h-full flex-col gap-4 py-4 overflow-y-auto custom-scrollbar">
            <nav className="grid gap-1 px-2">
              {/* Menu Principal */}
              {renderMenuItems(menuItems)}

              {/* Seção de Gestão de Vendas */}
              <Separator className="my-4" />
              {renderMenuItems(vendasItems, 'sales')}

              {/* Seção de Relatórios */}
              <Separator className="my-4" />
              {renderMenuItems(relatoriosItems, 'reports')}

              {/* Configurações e Integrações */}
              <Separator className="my-4" />
              {renderMenuItems(configItems)}
            </nav>

            <div className="mt-auto px-2">
              <Separator className="mb-4" />
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-3 text-gray-500",
                  collapsed && "justify-center"
                )}
                onClick={handleLogout}
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

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </div>
  );
}
