// src/app/genres/page.tsx
"use client";

import { useState } from "react";

export default function GenreForm() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      if (!res.ok) {
        throw new Error(await res.text());
      }

      setName("");
      setSuccess("Gênero cadastrado com sucesso!");
    } catch (err: any) {
      setError(err.message || "Erro ao cadastrar gênero");
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Cadastro de Gênero</h2>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-bold mb-2">Nome do Gênero:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 p-2 w-full rounded"
            required
          />
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
