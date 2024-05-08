import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = createClient();

    const { error } = await supabase.auth.exchangeCodeForSession(code);
    // TODO: handle the redirect properly according to the docs
    if (!error) {
      return NextResponse.redirect(
        new URL("/instructor/dashboard", request.url),
      );
    }
  }

  // TODO: handle error properly
  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
