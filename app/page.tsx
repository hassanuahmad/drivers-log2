import { handleSignUp, handleLogin } from "@/app/auth/handleAuth";

import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = createClient();

  const { data } = await supabase.auth.getUser();

  return (
    <div className="flex justify-center align-middle items-center h-screen bg-black flex-col">
      <div>
        <form>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Your email"
            required
          />
          <div className="p-4">
            <button className="text-white" formAction={handleLogin}>
              Log In
            </button>
          </div>
        </form>
      </div>
      <div className="mt-8">
        <form>
          <div className="flex flex-col gap-2">
            <input
              id="first_name"
              name="first_name"
              type="text"
              placeholder="First Name"
              required
            />
            <input
              id="last_name"
              name="last_name"
              type="text"
              placeholder="Last Name"
            />
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Your email"
              required
            />
          </div>
          <div className="p-4 gap-2">
            <button className="text-white" formAction={handleSignUp}>
              Get Started
            </button>
          </div>
        </form>
      </div>
      <p className="text-white">
        Hello Testing User {data.user?.email || "No User"}
      </p>
    </div>
  );
}
