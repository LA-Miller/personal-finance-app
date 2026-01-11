"use client";
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function EditAccount({account, onDone}) {
    const router = useRouter();
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [balance, setBalance] = useState("0");
    const [error, setError] = useState("");

    // async function handleSubmit(e) {
    //     e.preventDefault();
    //     setError("");

    //     const res = await fetch("/api/accounts", {

    //     })
    // }

    return (
        <div className="mt-4 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-zinc-900">
                    Editing: {account.name}
                </h3>
                <button
                    type="button"
                    onClick={onDone}
                    className="rounded-md px-2 py-1 text-sm text-zinc-600 hover:bg-zinc-100"
                >
                    Close
                </button>
            </div>

            <p className="mt-2 text-sm text-zinc-600">
                (Form goes here)
            </p>
        </div>
    )
}