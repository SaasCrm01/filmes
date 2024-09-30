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
    </div>
  );
}
