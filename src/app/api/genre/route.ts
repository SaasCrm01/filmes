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
