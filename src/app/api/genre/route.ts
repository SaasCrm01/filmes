// src/app/api/genre/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// POST: Criar um novo gênero
export async function POST(req: Request) {
  const { name } = await req.json();

  if (!name || name.trim() === '') {
    return NextResponse.json({ error: 'Nome do gênero é obrigatório' }, { status: 400 });
  }

  if (name.length < 3 || name.length > 50) {
    return NextResponse.json({ error: 'O nome do gênero deve ter entre 3 e 50 caracteres' }, { status: 400 });
  }

  const genre = await prisma.genre.create({ data: { name } });
  return NextResponse.json(genre);
}

// GET: Listar todos os gêneros
export async function GET() {
  const genres = await prisma.genre.findMany();
  return NextResponse.json(genres);
}

// PUT: Atualizar um gênero
export async function PUT(req: Request) {
  const { id, name } = await req.json();

  if (!id || !name) {
    return NextResponse.json({ error: 'ID e nome são obrigatórios' }, { status: 400 });
  }

  const updatedGenre = await prisma.genre.update({
    where: { id: Number(id) },
    data: { name },
  });

  return NextResponse.json(updatedGenre);
}

// DELETE: Excluir um gênero
export async function DELETE(req: Request) {
  const { id } = await req.json();

  if (!id) {
    return NextResponse.json({ error: 'ID é obrigatório' }, { status: 400 });
  }

  await prisma.genre.delete({ where: { id: Number(id) } });
  return NextResponse.json({ message: 'Gênero excluído com sucesso' });
}
