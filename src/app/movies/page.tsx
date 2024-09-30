"use client";

import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

// Definir a interface para os filmes
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

export default function MovieForm() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]); // Para listar filmes
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [release, setRelease] = useState("");
  const [director, setDirector] = useState("");
  const [genreId, setGenreId] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Carregar gêneros para o select
  useEffect(() => {
    fetch("/api/genre")
      .then((res) => res.json())
      .then((data: Genre[]) => setGenres(data));
  }, []);

  // Carregar filmes para a listagem
  useEffect(() => {
    fetch("/api/movie")
      .then((res) => res.json())
      .then((data: Movie[]) => setMovies(data))
      .catch((err) => setError("Erro ao carregar filmes"));
  }, []);

  // Função para cadastrar um novo filme
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

      const newMovie = await res.json();
      setMovies((prev) => [...prev, newMovie]); // Atualiza a lista com o novo filme
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

  // Função para excluir um filme
  const handleDelete = async (id: number) => {
    try {
      await fetch("/api/movie", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      setMovies((prev) => prev.filter((movie) => movie.id !== id));
      setSuccess("Filme excluído com sucesso!");
    } catch (err) {
      setError("Erro ao excluir filme");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Cadastro de Filme</h2>
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
          Cadastrar
        </button>
      </form>

      {/* Listagem de Filmes */}
      <h2 className="text-center mt-5">Listagem de Filmes</h2>
      <ul className="list-group">
        {movies.map((movie) => (
          <li key={movie.id} className="list-group-item d-flex justify-content-between align-items-center">
            {movie.title} - {movie.year}
            <div>
              <button onClick={() => handleDelete(movie.id)} className="btn btn-danger me-2">
                Excluir
              </button>
              <a href={`/movies/edit/${movie.id}`} className="btn btn-primary">
                Atualizar
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
