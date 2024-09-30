// src/app/genres/page.tsx
"use client";

import { useState, useEffect } from "react";

// Definir a interface para o gênero
interface Genre {
  id: number;
  name: string;
}

export default function GenreForm() {
  const [name, setName] = useState(""); // Para cadastrar o novo gênero
  const [genres, setGenres] = useState<Genre[]>([]); // Para listar gêneros
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Função para carregar os gêneros da API
  useEffect(() => {
    fetch("/api/genre")
      .then((res) => res.json())
      .then((data: Genre[]) => setGenres(data))  // Definir o tipo do dado recebido
      .catch((err) => setError("Erro ao carregar gêneros"));
  }, []);

  // Função para cadastrar um novo gênero
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name.trim()) {
      setError("O nome do gênero é obrigatório");
      return;
    }

    try {
      const res = await fetch("/api/genre", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      if (!res.ok) {
        throw new Error(await res.text());
      }

      const newGenre = await res.json();
      setGenres((prev) => [...prev, newGenre]); // Atualiza a lista com o novo gênero
      setName("");
      setSuccess("Gênero cadastrado com sucesso!");
    } catch (err: any) {
      setError(err.message || "Erro ao cadastrar gênero");
    }
  };

  // Função para excluir um gênero
  const handleDelete = async (id: number) => {
    try {
      await fetch("/api/genre", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      setGenres((prev) => prev.filter((genre) => genre.id !== id));
      setSuccess("Gênero excluído com sucesso!");
    } catch (err) {
      setError("Erro ao excluir gênero");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Cadastro de Gênero</h2>
      {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
      {success && <p className="text-green-600 mb-4 text-center">{success}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-semibold text-gray-700 mb-2">Nome do Gênero:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 p-3 w-full rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Cadastrar
        </button>
      </form>

      {/* Listagem de Gêneros */}
      <h2 className="text-2xl font-bold mt-10">Listagem de Gêneros</h2>
      <ul>
        {genres.map((genre) => (
          <li key={genre.id} className="mb-4">
            {genre.name}
            <button
              onClick={() => handleDelete(genre.id)}
              className="ml-4 bg-red-500 text-white p-2 rounded"
            >
              Excluir
            </button>
            <a
              href={`/genres/edit/${genre.id}`}
              className="ml-4 bg-blue-500 text-white p-2 rounded"
            >
              Atualizar
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
