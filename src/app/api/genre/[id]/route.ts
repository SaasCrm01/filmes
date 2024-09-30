import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET: Obter um único gênero por ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
  const id = params.id;

  const genre = await prisma.genre.findUnique({ where: { id: Number(id) } });

  if (!genre) {
    return NextResponse.json({ error: 'Gênero não encontrado' }, { status: 404 });
  }

  return NextResponse.json(genre);
}

// PUT: Atualizar um gênero
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const id = params.id;
  const { name } = await req.json();

  if (!name) {
    return NextResponse.json({ error: 'Nome é obrigatório' }, { status: 400 });
  }

  const updatedGenre = await prisma.genre.update({
    where: { id: Number(id) },
    data: { name },
  });

  return NextResponse.json(updatedGenre);
}

// DELETE: Excluir um gênero
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const id = params.id;

  await prisma.genre.delete({ where: { id: Number(id) } });
  return NextResponse.json({ message: 'Gênero excluído com sucesso' });
}
