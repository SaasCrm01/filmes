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
    const url = editingId ? `/api/genre` : '/api/genre';
    const method = editingId ? 'PUT' : 'POST';

    const response = await fetch(url, {
      method,
      body: JSON.stringify(editingId ? { id: editingId, name } : { name }),
    });

    if (response.ok) {
      alert(editingId ? 'Gênero atualizado!' : 'Gênero cadastrado!');
      fetchGenres();
      setName('');
      setEditingId(null);
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
      alert('Gênero excluído!');
      fetchGenres();
    }
  };

  return (
    <div>
      <h1>Gêneros</h1>
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
