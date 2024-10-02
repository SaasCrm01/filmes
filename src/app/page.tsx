/* src/app/page.tsx */
"use client";

import Image from "next/image";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-[#202020] text-neutral-950">
      <main className="flex flex-col items-center text-center max-w-2xl">
        <Image
          className="mb-8"
          src="https://nextjs.org/icons/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <h1 className="text-4xl font-bold mb-4">Bem-vindo ao Sistema de Cadastro de Filmes</h1>
        <p className="text-lg mb-6">
          Este é um projeto de **Web1** desenvolvido para gerenciar o cadastro e a listagem de filmes e gêneros. Utilize as funcionalidades abaixo para adicionar, editar, visualizar e excluir registros de filmes e gêneros de forma simples e eficiente.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            className="btn btn-primary px-6 py-3 rounded text-black font-semibold"
            href="/genres"
          >
            Gerenciar Gêneros
          </a>
          <a
            className="btn btn-primary px-6 py-3 rounded text-black font-semibold"
            href="/movies"
          >
            Gerenciar Filmes
          </a>
        </div>
      </main>
      
      <footer className="mt-12">
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} Sistema de Cadastro de Filmes. Todos os direitos reservados.
        </p>
      </footer>
    </div>
  );
}
