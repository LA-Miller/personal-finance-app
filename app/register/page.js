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
        <main>
            <div>
                <h1>Register</h1>
                {error && (
                    <div>{error}</div>
                )}

                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                        />
                    </div>

                    <div>
                        <label>Password</label>
                        <input
                            type="password"    
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                        />
                    </div>

                    <button>
                        Create Account
                    </button>

                    <p>
                        Already have an account?{" "}
                        <Link href="/login">Login here</Link>
                    </p>

                </form>
            </div>
        </main>
    )
}