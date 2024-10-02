"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import 'bootstrap/dist/css/bootstrap.min.css';

interface Genre {
  id: number;
  name: string;
}

export default function EditGenre() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  const { id } = useParams(); 
  const router = useRouter();

  
  useEffect(() => {
    if (id) {
      fetch(`/api/genre/${id}`)
        .then((res) => res.json())
        .then((data: Genre) => setName(data.name))
        .catch(() => setError("Erro ao carregar gênero"));
    }
  }, [id]);

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name.trim()) {
      setError("O nome do gênero é obrigatório");
      return;
    }

    try {
      const res = await fetch(`/api/genre/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      if (!res.ok) {
        throw new Error(await res.text());
      }

      setSuccess("Gênero atualizado com sucesso!");
      router.push("/genres"); 
    } catch (err: any) {
      setError(err.message || "Erro ao atualizar gênero");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Editar Gênero</h2>
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
          Atualizar
        </button>
      </form>
    </div>
  );
}
