// src/app/api/movie/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// POST: Criar um novo filme
export async function POST(req: Request) {
  const { title, year, release, director, genreId } = await req.json();

  if (!title || !year || !release || !director || !genreId) {
    return NextResponse.json({ error: 'Todos os campos são obrigatórios' }, { status: 400 });
  }

  const movie = await prisma.movie.create({
    data: { title, year: parseInt(year), release: new Date(release), director, genreId: parseInt(genreId) },
  });

  return NextResponse.json(movie);
}

// GET: Listar todos os filmes
export async function GET() {
  const movies = await prisma.movie.findMany({ include: { genre: true } });
  return NextResponse.json(movies);
}

// PUT: Atualizar um filme
export async function PUT(req: Request) {
  const { id, title, year, release, director, genreId } = await req.json();

  if (!id || !title || !year || !release || !director || !genreId) {
    return NextResponse.json({ error: 'Todos os campos são obrigatórios' }, { status: 400 });
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
    return NextResponse.json({ error: 'ID é obrigatório' }, { status: 400 });
  }

  await prisma.movie.delete({ where: { id: Number(id) } });
  return NextResponse.json({ message: 'Filme excluído com sucesso' });
}
