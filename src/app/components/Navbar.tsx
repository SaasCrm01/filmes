// src/app/components/Navbar.tsx
export default function Navbar() {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white font-bold text-xl">Sistema de Filmes</h1>
        <ul className="flex space-x-6">
          <li>
            <a href="/genres" className="text-white hover:underline">Gêneros</a>
          </li>
          <li>
            <a href="/movies" className="text-white hover:underline">Filmes</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
