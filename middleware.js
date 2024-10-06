import { NextResponse } from 'next/server';

export async function middleware(request) {
    const url = request.nextUrl.clone();
    const isAuthenticated = !!request.cookies.get('user-token'); // Check for user authentication
    const hasNavAccess = request.cookies.get('nav-access'); // Check if the user has navigated through the UI

    // Allow access to the confirmation page if the user is not authenticated
    if (!isAuthenticated && url.pathname === '/confirmation' && url.searchParams.has('registered')) {
        return NextResponse.next();
    }

    // Redirect if the user is not authenticated and tries to access the confirmation page
    if (!isAuthenticated && url.pathname === '/confirmation') {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // Protect the shop pag

    // Allow access to other pages without restrictions
    return NextResponse.next();
}
