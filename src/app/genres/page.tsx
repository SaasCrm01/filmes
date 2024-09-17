// src/app/genres/page.tsx
'use client';

import { useState, useEffect } from 'react';

type Genre = {
  id: number;
  name: string;
};

export default function GenreList() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [name, setName] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null); // Adicionar feedback de erro
  const [success, setSuccess] = useState<string | null>(null); // Adicionar feedback de sucesso

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    const response = await fetch('/api/genre');
    const data = await response.json();
    setGenres(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (name.trim() === '') {
      setError('O nome do gênero é obrigatório');
      return;
    }

    const response = await fetch('/api/genre', {
      method: editingId ? 'PUT' : 'POST',
      body: JSON.stringify(editingId ? { id: editingId, name } : { name }),
    });

    if (response.ok) {
      setSuccess(editingId ? 'Gênero atualizado com sucesso!' : 'Gênero cadastrado com sucesso!');
      setError(null); // Limpar erro em caso de sucesso
      fetchGenres();
      setName('');
      setEditingId(null);
    } else {
      const errorData = await response.json();
      setError(errorData.error); // Exibir mensagem de erro vinda do backend
    }
  };

  const handleEdit = (genre: Genre) => {
    setName(genre.name);
    setEditingId(genre.id);
  };

  const handleDelete = async (id: number) => {
    const response = await fetch('/api/genre', {
      method: 'DELETE',
      body: JSON.stringify({ id }),
    });

    if (response.ok) {
      setSuccess('Gênero excluído com sucesso!');
      setError(null);
      fetchGenres();
    } else {
      setError('Erro ao excluir gênero');
    }
  };

  return (
    <div>
      <h1>Gêneros</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome do gênero"
        />
        <button type="submit">{editingId ? 'Atualizar' : 'Cadastrar'}</button>
      </form>
      
      <ul>
        {genres.map((genre) => (
          <li key={genre.id}>
            {genre.name}
            <button onClick={() => handleEdit(genre)}>Editar</button>
            <button onClick={() => handleDelete(genre.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
