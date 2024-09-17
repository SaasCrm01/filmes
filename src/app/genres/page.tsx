'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

type Genre = {
  id: number;
  name: string;
};

// Esquema de validação com Yup
const schema = yup.object().shape({
  name: yup.string().required('Nome do gênero é obrigatório'),
});

export default function GenreList() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Configuração do react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{ name: string }>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    const response = await fetch('/api/genre');
    const data = await response.json();
    setGenres(data);
  };

  const onSubmit = async (data: { name: string }) => {
    const url = editingId ? `/api/genre` : '/api/genre';
    const method = editingId ? 'PUT' : 'POST';

    const response = await fetch(url, {
      method,
      body: JSON.stringify(editingId ? { id: editingId, name: data.name } : { name: data.name }),
    });

    if (response.ok) {
      alert(editingId ? 'Gênero atualizado!' : 'Gênero cadastrado!');
      fetchGenres();
      reset();
      setEditingId(null);
    }
  };

  const handleEdit = (genre: Genre) => {
    reset({ name: genre.name });
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Nome do gênero"
          {...register('name')}
        />
        {errors.name && <span>{errors.name.message}</span>}
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
