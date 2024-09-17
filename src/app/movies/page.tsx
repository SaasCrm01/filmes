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
  const [genres, setGenres] = useState<Genre[]>([]);
  const [error, setError] = useState<string | null>(null); // Adicionar feedback de erro
  const [success, setSuccess] = useState<string | null>(null); // Adicionar feedback de sucesso

  useEffect(() => {
    // Carregar gêneros
    const fetchGenres = async () => {
      const response = await fetch('/api/genre');
      const data: Genre[] = await response.json();
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
      const errorData = await response.json();
      setError(errorData.error); // Exibir mensagem de erro
    } else {
      setSuccess('Filme cadastrado com sucesso');
      setError(null); // Limpar erro em caso de sucesso
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
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </form>
  );
}
