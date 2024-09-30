// src/app/components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-gray-800 p-4 mt-8">
      <div className="container mx-auto text-center text-white">
        <p>&copy; {new Date().getFullYear()} Sistema de Cadastro de Filmes. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
