// src/app/layout.tsx

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <title>Sistema de Cadastro de Filmes</title>
        <meta name="description" content="Cadastro de Filmes e Gêneros" />
      </head>
      <body className="bg-gray-100 text-gray-900">
        <Navbar />
        <main className="container mx-auto p-6 mt-8 bg-white rounded-lg shadow-md">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
