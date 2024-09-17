// src/app/api/movie/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// POST: Criar um novo filme com validações mais robustas
export async function POST(req: Request) {
  const { title, year, release, director, genreId } = await req.json();

  // Verificar se todos os campos estão presentes
  if (!title || !year || !release || !director || !genreId) {
    return NextResponse.json({ error: 'Todos os campos são obrigatórios' }, { status: 400 });
  }

  // Validação de tipo para ano
  if (isNaN(year) || year < 1888 || year > new Date().getFullYear()) {
    return NextResponse.json({ error: 'Ano inválido. O ano deve ser entre 1888 e o ano atual.' }, { status: 400 });
  }

  // Verificação de formato de data de lançamento
  if (isNaN(Date.parse(release))) {
    return NextResponse.json({ error: 'Data de lançamento inválida' }, { status: 400 });
  }

  // Limitação de tamanho de título e diretor
  if (title.length > 100) {
    return NextResponse.json({ error: 'O título não pode ter mais de 100 caracteres' }, { status: 400 });
  }

  if (director.length > 100) {
    return NextResponse.json({ error: 'O nome do diretor não pode ter mais de 100 caracteres' }, { status: 400 });
  }

  // Criar filme
  const movie = await prisma.movie.create({
    data: {
      title,
      year: parseInt(year),
      release: new Date(release),
      director,
      genreId: parseInt(genreId),
    },
  });

  return NextResponse.json(movie);
}

// GET: Listar todos os filmes
export async function GET() {
  const movies = await prisma.movie.findMany({
    include: { genre: true },
  });
  return NextResponse.json(movies);
}

// PUT: Atualizar um filme
export async function PUT(req: Request) {
  const { id, title, year, release, director, genreId } = await req.json();

  if (!id || !title || !year || !release || !director || !genreId) {
    return NextResponse.json({ error: "Todos os campos são obrigatórios" }, { status: 400 });
  }

  const updatedMovie = await prisma.movie.update({
    where: { id: Number(id) },
    data: { title, year: Number(year), release: new Date(release), director, genreId: Number(genreId) },
  });

  return NextResponse.json(updatedMovie);
}

// DELETE: Excluir um filme
export async function DELETE(req: Request) {
  const { id } = await req.json();

  if (!id) {
    return NextResponse.json({ error: "ID é obrigatório" }, { status: 400 });
  }

  await prisma.movie.delete({
    where: { id: Number(id) },
  });

  return NextResponse.json({ message: "Filme excluído com sucesso" });
}
