import { NextResponse } from "next/server"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"

// Helper function to validate session with Go backend
async function validateSession(sessionToken) {
  try {
    const response = await fetch(`${API_URL}/api/auth/session`, {
      method: "GET",
      headers: {
        "Cookie": `session_token=${sessionToken}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
    })

    return response.ok
  } catch (error) {
    // Don't log errors for session validation - this is expected when not logged in
    return false
  }
}

export async function middleware(request) {
  // Temporarily disable middleware for testing
  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\..*|api).*)",
  ],
}
