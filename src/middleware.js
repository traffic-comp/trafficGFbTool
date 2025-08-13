import { NextResponse } from 'next/server';
import { chekAuth } from './fetch/user';

export async function middleware(request) {
  const token = request.cookies.get('authToken')?.value;
  const path = request.nextUrl.pathname;
  const { isAuth } = await chekAuth(token);

  if (!isAuth && (path.startsWith('/fb') || path.startsWith('/tt'))) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/fb/:path*', '/tt/:path*'],
};
