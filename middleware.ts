import { NextResponse } from 'next/server';

const allowedOrigins = [
   'https://localhost:44356',
   'https://localhost:3000',
   'https://nuba-ui.vercel.app'
];

export function middleware(request: Request) {
    const origin = request.headers.get('origin') as string
    const response = NextResponse.next()

    if (allowedOrigins.includes(origin)) {
      response.headers.append('Access-Control-Allow-Origin', origin);
    }

    response.headers.append('Access-Control-Allow-Credentials', "true")
    response.headers.append("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
    response.headers.append("Access-Control-Max-Age", "86400")
    response.headers.append(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

    return response
 }

 export const config = {
    matcher: '/api/:path*',
 }
