import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';  // Criamos uma sidebar para a dashboard
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <title>Sistema de Cadastro de Filmes - Dashboard</title>
        <meta name="description" content="Cadastro de Filmes e Gêneros" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" />
      </head>
      <body className="d-flex bg-light">
        <Sidebar />
        <div className="main-content p-4 flex-grow-1">
          {/* <Navbar /> */}
          <main className="container mt-4 bg-white p-4 rounded shadow">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
