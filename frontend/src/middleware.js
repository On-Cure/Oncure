import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Always allow these paths
  if (
    pathname === '/login' ||
    pathname === '/register' ||
    pathname === '/feed' ||  // Allow feed page - client-side auth will handle it
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next();
  }
  
  // Check for session token for other protected routes
  const sessionToken = request.cookies.get('session_token')?.value;
  
  if (!sessionToken) {
    // No session - redirect to login
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // Has session token - allow access
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)']
};