"use client";
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function EditAccount({account, onDone}) {
    const router = useRouter();

    const [accountId, setAccountId] = useState(account.id);
    const[userId, setUserId] = useState(account.user_id);
    const [name, setName] = useState(account.name);
    const [type, setType] = useState("");
    const[balanceUsd, setBalanceUsd] = useState((account.balance_cents / 100).toFixed(2));
    const [error, setError] = useState("");

    // Resets form fields when a different account is selected 
    useEffect(() => {
        if(!account) return;

        setError("");
        setName(account.name ?? "");
        setType(account.type ?? "checking");
        setBalanceUsd((account.balance_cents / 100).toFixed(2));
    }, [account]);

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        const res = await fetch(`/api/accounts/${account.id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                accountId,
                userId,
                name,
                type,
            }),
        });

        if(!res.ok) {
            const data = await res.json().catch(() => ({}));
            setError(data.error || "Failed to edit account");
            return;
        }

        router.refresh();

        onDone?.();
    }

return (
    <div className="mt-4 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
        <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
                <h3 className="text-sm font-semibold text-zinc-900">
                    Editing: {account.name}
                </h3>
                {error && (
                    <p className="mt-1 text-sm text-red-600">
                        {error}
                    </p>
                )}
            </div>

            <button
                type="button"
                onClick={onDone}
                className="shrink-0 rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-sm font-medium text-zinc-700 hover:bg-zinc-100 transition"
            >
                Close
            </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-zinc-700">
                    Name
                </label>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="rounded-md border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-zinc-700">
                    Type
                </label>
                <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="rounded-md border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="checking">Checking</option>
                    <option value="savings">Saving</option>
                    <option value="credit">Credit Card</option>
                    <option value="cash">Cash</option>
                </select>
            </div>

            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3">
                <div className="flex items-baseline justify-between gap-3">
                    <label className="text-sm font-medium text-zinc-700">
                        Balance
                    </label>
                    <span className="text-sm font-semibold text-zinc-900">
                        {balanceUsd}
                    </span>
                </div>
                <p className="mt-2 text-xs text-zinc-500">
                    Note: You cannot edit an account&apos;s balance directly.
                </p>
            </div>

            <div className="flex justify-end pt-2">
                <button
                    className="rounded-md bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700 transition"
                >
                    Submit
                </button>
            </div>
        </form>
    </div>
);
}