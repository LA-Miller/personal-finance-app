"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function RegisterPage() {
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

        if(username.length < 3) {
            setError("Username must be at least 3 characters.");
            return;
        }

        if(password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;    
        }

        const result = await fetch("/api/register", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({username, password}),
        });

        const data = await result.json().catch(() => ({}));

        if(!result.ok) {
            setError(data.error || "Registration failed.");
            return;
        }

        const login = await signIn("credentials", {
            username,
            password,
            redirect: false,
        });

        if(!login?.ok) {
            setError("Account created, but login failed. Try logging in again.");
            router.push("/login");
            return;
        }

        router.push("/dashboard");
    };

     return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-50 to-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white border border-zinc-200 rounded-2xl shadow-sm p-6 sm:p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
              Create account
            </h1>
            <p className="mt-1 text-sm text-zinc-600">
              Create an account to start tracking your finances.
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
                placeholder="Choose a username"
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
                placeholder="Create a password"
                autoComplete="new-password"
                className="mt-1 w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-zinc-900 placeholder:text-zinc-400 shadow-sm outline-none focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10"
              />
              <p className="mt-1 text-xs text-zinc-500">
                Must be at least 6 characters.
              </p>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-zinc-900 px-4 py-2.5 text-md font-medium text-white shadow-sm hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-900/20 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Create Account
            </button>

            <p className="text-center text-sm text-zinc-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-zinc-900 underline underline-offset-4 hover:text-zinc-700"
              >
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
    )
}