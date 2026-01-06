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
        <main>
            <div>
                <h1>Sign in</h1>
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
                        Sign In
                    </button>
                    
                    <p>
                        Don't have an account?{" "}
                        <Link href="/register">Register here</Link>
                    </p>
                </form>
            </div>
        </main>
    )
}