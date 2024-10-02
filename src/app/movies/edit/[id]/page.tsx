"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Mude aqui para usar 'next/navigation'
import { useParams } from 'next/navigation'; // Importando useParams
import 'bootstrap/dist/css/bootstrap.min.css';

interface Movie {
  id: number;
  title: string;
  year: number;
  release: string;
  director: string;
  genreId: number;
}

interface Genre {
  id: number;
  name: string;
}

export default function EditMovie() {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [release, setRelease] = useState("");
  const [director, setDirector] = useState("");
  const [genreId, setGenreId] = useState("");
  const [genres, setGenres] = useState<Genre[]>([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const { id } = useParams(); // Usando useParams para obter o ID

  // Carregar os dados do filme pelo ID
  useEffect(() => {
    if (id) {
      fetch(`/api/movie/${id}`)
        .then((res) => res.json())
        .then((data: Movie) => {
          setTitle(data.title);
          setYear(data.year.toString());
          setRelease(data.release);
          setDirector(data.director);
          setGenreId(data.genreId.toString());
        })
        .catch(() => setError("Erro ao carregar filme"));
    }
  }, [id]);

  // Carregar os gêneros para o select
  useEffect(() => {
    fetch("/api/genre")
      .then((res) => res.json())
      .then((data: Genre[]) => setGenres(data))
      .catch(() => setError("Erro ao carregar gêneros"));
  }, []);

  // Função para atualizar o filme
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!title || !year || !release || !director || !genreId) {
      setError("Todos os campos são obrigatórios");
      return;
    }

    try {
      const res = await fetch(`/api/movie/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          year: Number(year),
          release,
          director,
          genreId: Number(genreId),
        }),
      });

      if (!res.ok) {
        throw new Error(await res.text());
      }

      setSuccess("Filme atualizado com sucesso!");
      router.push("/movies"); // Redirecionando após a atualização
    } catch (err: any) {
      setError(err.message || "Erro ao atualizar filme");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Editar Filme</h2>
      {error && <p className="text-danger">{error}</p>}
      {success && <p className="text-success">{success}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-3">
          <label className="form-label">Título:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Ano:</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Data de Lançamento:</label>
          <input
            type="date"
            value={release}
            onChange={(e) => setRelease(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Diretor:</label>
          <input
            type="text"
            value={director}
            onChange={(e) => setDirector(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Gênero:</label>
          <select
            value={genreId}
            onChange={(e) => setGenreId(e.target.value)}
            className="form-select"
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
        <button type="submit" className="btn btn-primary w-100">
          Atualizar
        </button>
      </form>
    </div>
  );
}
