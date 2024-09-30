import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET: Obter um único filme por ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
  const id = params.id;

  const movie = await prisma.movie.findUnique({
    where: { id: Number(id) },
    include: { genre: true },
  });

  if (!movie) {
    return NextResponse.json({ error: 'Filme não encontrado' }, { status: 404 });
  }

  return NextResponse.json(movie);
}

// PUT: Atualizar um filme
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const id = params.id;
  const { title, year, release, director, genreId } = await req.json();

  if (!title || !year || !release || !director || !genreId) {
    return NextResponse.json({ error: 'Todos os campos são obrigatórios' }, { status: 400 });
  }

  const updatedMovie = await prisma.movie.update({
    where: { id: Number(id) },
    data: { title, year: Number(year), release: new Date(release), director, genreId: Number(genreId) },
  });

  return NextResponse.json(updatedMovie);
}

// DELETE: Excluir um filme
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const id = params.id;

  await prisma.movie.delete({ where: { id: Number(id) } });
  return NextResponse.json({ message: 'Filme excluído com sucesso' });
}
