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
