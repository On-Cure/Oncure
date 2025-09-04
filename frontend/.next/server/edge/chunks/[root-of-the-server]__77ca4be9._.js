(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/[root-of-the-server]__77ca4be9._.js",
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[project]/frontend/src/middleware.js [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "config",
    ()=>config,
    "middleware",
    ()=>middleware
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/esm/server/web/exports/index.js [middleware-edge] (ecmascript)");
;
const API_URL = ("TURBOPACK compile-time value", "http://localhost:8080") || "http://localhost:8080";
// Helper function to validate session with Go backend
async function validateSession(sessionToken) {
    try {
        const response = await fetch(`${API_URL}/api/auth/session`, {
            method: "GET",
            headers: {
                "Cookie": `session_token=${sessionToken}`,
                "Content-Type": "application/json"
            },
            credentials: "include"
        });
        return response.ok;
    } catch (error) {
        // Don't log errors for session validation - this is expected when not logged in
        return false;
    }
}
async function middleware(request) {
    const { pathname } = request.nextUrl;
    // Get the session cookie
    const sessionCookie = request.cookies.get("session_token");
    // Auth pages that should redirect to feed if already logged in
    const authPages = [
        "/login",
        "/register"
    ];
    // Protected pages that require authentication
    const protectedPages = [
        "/feed",
        "/profile",
        "/groups",
        "/notifications",
        "/chat",
        "/posts"
    ];
    // Public pages that don't need authentication
    const publicPages = [
        "/about",
        "/contact",
        "/terms",
        "/privacy"
    ];
    // Skip validation for public pages and static assets
    if (publicPages.some((page)=>pathname.startsWith(page)) || pathname.startsWith("/_next") || pathname.startsWith("/api") || pathname.includes(".")) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
    }
    // Validate session with backend if cookie exists
    let isAuthenticated = false;
    if (sessionCookie) {
        isAuthenticated = await validateSession(sessionCookie.value);
        // If session is invalid, clear the cookie
        if (!isAuthenticated) {
            const response = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL("/login", request.url));
            response.cookies.delete("session_token");
            return response;
        }
    }
    // Handle root path
    if (pathname === "/") {
        if (isAuthenticated) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL("/feed", request.url));
        } else {
            return __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL("/login", request.url));
        }
    }
    // Redirect authenticated users away from auth pages
    if (authPages.some((page)=>pathname.startsWith(page)) && isAuthenticated) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL("/feed", request.url));
    }
    // Redirect unauthenticated users to login for protected pages
    if (protectedPages.some((page)=>pathname.startsWith(page)) && !isAuthenticated) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL("/login", request.url));
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
}
const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|.*\\..*|api).*)"
    ]
};
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__77ca4be9._.js.map