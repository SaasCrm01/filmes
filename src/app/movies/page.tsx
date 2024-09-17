// src/app/movies/page.tsx
'use client';

import { useState, useEffect } from 'react';

type Genre = {
  id: number;
  name: string;
};

export default function MovieForm() {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [release, setRelease] = useState('');
  const [director, setDirector] = useState('');
  const [genreId, setGenreId] = useState('');
  const [genres, setGenres] = useState<Genre[]>([]); // Adicionar o tipo 'Genre[]'

  useEffect(() => {
    // Carregar gêneros
    const fetchGenres = async () => {
      const response = await fetch('/api/genre');
      const data: Genre[] = await response.json(); // Definir o tipo 'Genre[]' para os dados
      setGenres(data);
    };
    fetchGenres();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/movie', {
      method: 'POST',
      body: JSON.stringify({ title, year, release, director, genreId }),
    });

    if (!response.ok) {
      alert('Erro ao cadastrar filme');
    } else {
      alert('Filme cadastrado com sucesso');
      setTitle('');
      setYear('');
      setRelease('');
      setDirector('');
      setGenreId('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Título:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Ano:</label>
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Data de Lançamento:</label>
        <input
          type="date"
          value={release}
          onChange={(e) => setRelease(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Diretor:</label>
        <input
          type="text"
          value={director}
          onChange={(e) => setDirector(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Gênero:</label>
        <select
          value={genreId}
          onChange={(e) => setGenreId(e.target.value)}
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
      <button type="submit">Cadastrar Filme</button>
    </form>
  );
}
