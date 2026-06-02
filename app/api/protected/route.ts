import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const auth = request.headers.get('authorization');
  if (!auth) {
    return new NextResponse('Missing token', { status: 401 });
  }
  if (auth === 'Bearer VALID_JWT_TOKEN') {
    return NextResponse.json({ message: 'authorized' }, { status: 200 });
  }
  return new NextResponse('Invalid token', { status: 403 });
}
