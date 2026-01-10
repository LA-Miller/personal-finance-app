"use client";

import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="w-full bg-white border-b border-zinc-200">
            <div className="max-w-6x1 mx-auto px-4 h-14 flex items-center justify-between">
                <Link href="/" className="text-lg font-semibold">
                Stack</Link>

                <div className="flex items-center gap-4 text-sm">
                    <Link href="/login" className="text-zinc-600 hover:text-zinc-900">
                    Log in
                    </Link>
                    
                    <Link href="/register" className="bg-zinc-900 text-white px-3 py-1.5 rounded lg hover:bg-zinc-800">
                    Sign up
                    </Link>
                </div>
            </div>

        </nav>
    )
}