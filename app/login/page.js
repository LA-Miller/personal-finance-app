"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function LoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!username || !password) {
            setError("Both fields are required.");
            return;
        }

        const result = await signIn("credentials", {
            username,
            password,
            redirect: false,
        });

        if(result?.error) {
            setError("Invalid username or password.");
            return;
        }

        router.push("/dashboard");
    };

    return (
         <main className="min-h-screen bg-gradient-to-b from-zinc-50 to-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white border border-zinc-200 rounded-2xl shadow-sm p-6 sm:p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
              Sign in
            </h1>
            <p className="mt-1 text-sm text-zinc-600">
              Welcome back — enter your credentials to continue.
            </p>
          </div>

          {error && (
            <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-800">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                autoComplete="username"
                className="mt-1 w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-zinc-900 placeholder:text-zinc-400 shadow-sm outline-none focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-800">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
                className="mt-1 w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-zinc-900 placeholder:text-zinc-400 shadow-sm outline-none focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-zinc-900 px-4 py-2.5 text-md font-medium text-white shadow-sm hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-900/20 disabled:cursor-not-allowed disabled:opacity-60"
            >
                Login
            </button>

            <p className="text-center text-sm text-zinc-600">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-medium text-zinc-900 underline underline-offset-4 hover:text-zinc-700"
              >
                Register here
              </Link>
            </p>
          </form>
        </div>

        {/* Footer hint */}
        <p className="mt-6 text-center text-xs text-zinc-500">
          Tip: Use your demo user or create a new account to test the flow.
        </p>
      </div>
    </main>
    )
}