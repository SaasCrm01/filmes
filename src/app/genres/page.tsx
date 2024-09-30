"use client";

import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

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
      .then((data: Genre[]) => setGenres(data))
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
    <div className="container mt-5">
      <h2 className="text-center mb-4">Cadastro de Gênero</h2>
      {error && <p className="text-danger">{error}</p>}
      {success && <p className="text-success">{success}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-3">
          <label className="form-label">Nome do Gênero:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Cadastrar
        </button>
      </form>

      {/* Listagem de Gêneros */}
      <h2 className="text-center mt-5">Listagem de Gêneros</h2>
      <ul className="list-group">
        {genres.map((genre) => (
          <li key={genre.id} className="list-group-item d-flex justify-content-between align-items-center">
            {genre.name}
            <div>
              <button onClick={() => handleDelete(genre.id)} className="btn btn-danger me-2">
                Excluir
              </button>
              <a href={`/genres/edit/${genre.id}`} className="btn btn-primary">
                Atualizar
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
