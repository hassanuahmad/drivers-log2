import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";

export async function middleware(request: NextRequest) {
    let { user, response } = await updateSession(request);

    const pathname = request.nextUrl.pathname;

    // If user is not logged in, redirect to home if trying to access /instructor or /access
    if (!user) {
        if (
            pathname.startsWith("/instructor") ||
            pathname.startsWith("/access")
        ) {
            return NextResponse.redirect(new URL("/", request.url));
        }
    } else {
        // If user is logged in but does not have access, redirect to /access if trying to access any other page
        if (user.user_metadata.has_access === false) {
            if (pathname !== "/access") {
                return NextResponse.redirect(new URL("/access", request.url));
            }
        }

        // If user is logged in and has access, redirect to /instructor/lessons if trying to access other routes
        if (user.user_metadata.has_access === true) {
            if (!pathname.startsWith("/instructor")) {
                return NextResponse.redirect(
                    new URL("/instructor/lessons", request.url)
                );
            }
        }
    }

    response = NextResponse.next();
    return response;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Feel free to modify this pattern to include more paths.
         */
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};
