'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Esquema de validação para o formulário de filmes
const schema = yup.object({
  title: yup.string().required('Título é obrigatório'),
  year: yup.number().required('Ano é obrigatório').min(1888, 'Ano inválido'),
  release: yup.date().required('Data de lançamento é obrigatória'),
  director: yup.string().required('Diretor é obrigatório'),
  genreId: yup.string().required('Gênero é obrigatório'),
}).required();

export default function MovieForm() {
  const [genres, setGenres] = useState([]);

  // Configuração do React Hook Form com validação Yup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
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

  const onSubmit = async (data) => {
    const response = await fetch('/api/movie', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      alert('Erro ao cadastrar filme');
    } else {
      alert('Filme cadastrado com sucesso');
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Título:</label>
        <input type="text" {...register('title')} />
        {errors.title && <span>{errors.title.message}</span>}
      </div>
      <div>
        <label>Ano:</label>
        <input type="number" {...register('year')} />
        {errors.year && <span>{errors.year.message}</span>}
      </div>
      <div>
        <label>Data de Lançamento:</label>
        <input type="date" {...register('release')} />
        {errors.release && <span>{errors.release.message}</span>}
      </div>
      <div>
        <label>Diretor:</label>
        <input type="text" {...register('director')} />
        {errors.director && <span>{errors.director.message}</span>}
      </div>
      <div>
        <label>Gênero:</label>
        <select {...register('genreId')}>
          <option value="">Selecione um gênero</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
        {errors.genreId && <span>{errors.genreId.message}</span>}
      </div>
      <button type="submit">Cadastrar Filme</button>
    </form>
  );
}
