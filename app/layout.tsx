import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap', // Add display swap
  fallback: ['system-ui', 'arial'], // Add fallback fonts
  preload: true // Ensure preloading
});

export const metadata: Metadata = {
  title: 'Tavrus - Sistema de Gestão para Representantes',
  description: 'Sistema completo de gestão para representantes comerciais',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
    </html>
  );
}