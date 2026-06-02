import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Simple validation: if body contains `invalid: true` respond 400
    if (body?.invalid) {
      return new NextResponse('Validation error', { status: 400 });
    }
    return NextResponse.json({ message: 'ok' }, { status: 200 });
  } catch (e) {
    return new NextResponse('Bad Request', { status: 400 });
  }
}
