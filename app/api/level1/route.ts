import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { username, password } = await request.json();

  const isValid = username === 'guest' && password === 'Sesame';

  return NextResponse.json({ success: isValid });
}