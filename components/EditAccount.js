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
            <div className="flex items-center justify-between">
                {error && (
                    <p>
                        {error}
                    </p>
                )}
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

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name: </label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />   
                </div>
                <div>
                    <label>Type: </label>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    >
                        <option value="checking">Checking</option>
                        <option value="savings">Saving</option>
                        <option value="credit">Credit Card</option>
                        <option value="cash">Cash</option>
                    </select>
                </div>
                <div>
                    <label>Balance: $</label>
                    <span>{balanceUsd}</span>
                    <p>Note: You cannot edit an account's balance directly.</p>
                </div>                            
                <button>Submit</button>
            </form>
        </div>
    )
}