// src/app/movies/page.tsx
"use client";

import { useState, useEffect } from "react";

interface Genre {
  id: number;
  name: string;
}

export default function MovieForm() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [release, setRelease] = useState("");
  const [director, setDirector] = useState("");
  const [genreId, setGenreId] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetch("/api/genre")
      .then((res) => res.json())
      .then((data) => setGenres(data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!title || !year || !release || !director || !genreId) {
      setError("Todos os campos são obrigatórios");
      return;
    }

    try {
      const res = await fetch("/api/movie", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, year, release, director, genreId }),
      });

      if (!res.ok) {
        throw new Error(await res.text());
      }

      setTitle("");
      setYear("");
      setRelease("");
      setDirector("");
      setGenreId("");
      setSuccess("Filme cadastrado com sucesso!");
    } catch (err: any) {
      setError(err.message || "Erro ao cadastrar filme");
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Cadastro de Filme</h2>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-bold mb-2">Título:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 p-2 w-full rounded"
            required
          />
        </div>
        <div>
          <label className="block font-bold mb-2">Ano:</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="border border-gray-300 p-2 w-full rounded"
            required
          />
        </div>
        <div>
          <label className="block font-bold mb-2">Data de Lançamento:</label>
          <input
            type="date"
            value={release}
            onChange={(e) => setRelease(e.target.value)}
            className="border border-gray-300 p-2 w-full rounded"
            required
          />
        </div>
        <div>
          <label className="block font-bold mb-2">Diretor:</label>
          <input
            type="text"
            value={director}
            onChange={(e) => setDirector(e.target.value)}
            className="border border-gray-300 p-2 w-full rounded"
            required
          />
        </div>
        <div>
          <label className="block font-bold mb-2">Gênero:</label>
          <select
            value={genreId}
            onChange={(e) => setGenreId(e.target.value)}
            className="border border-gray-300 p-2 w-full rounded"
            required
          >
            <option value="">Selecione um gênero</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}
