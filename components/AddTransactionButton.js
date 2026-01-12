"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddTransactionButton( {accounts, onDone }) {
    const[open, setOpen] = useState(false);
    const router = useRouter();
    const [userID, setUserID] = useState("");
    const[accountID, setAccountID] = useState(accounts?.[0]?.id ?? "");
    const [amount, setAmount] = useState("0");
    const [date, setDate] = useState(() => 
        new Date().toISOString().slice(0, 10));
    const [category, setCategory] = useState("uncategorized");
    const [merchant, setMerchant] = useState("");
    const [note, setNote] = useState("");
    const[kind, setKind] = useState("expense");
    const[error, setError] = useState("");

    const categoryArray = ["uncategorized", "groceries", "dining", "gas", "rent", "utilities", "shopping", "subscriptions", "healthcare", "travel", "entertainment", "income", "transfer", "adjustment"];

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        const res = await fetch("/api/transactions", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                userID,
                accountID,
                amount,
                date,
                category,
                merchant,
                note,
                kind
            }),
        });

        if(!res.ok) {
            const data = await res.json().catch(() => ({}));
            setError(data.error || "Failed to add transaction");
            return;
        }

        if(!categoryArray.includes(category)) {
            setError("Not a valid category.");
            return;
        }

        if(amount === '0') {
            setError("Transaction cannot be $0.00.");
            return;
        }

        router.refresh();

        onDone?.();
    }

    if(!open) {
        return(
            <button
            className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
            onClick={() => setOpen(true)}
            >+ Add transaction</button>
        );

    }

    return (
       <form
            onSubmit={handleSubmit}
            className="mt-4 max-w-xl rounded-lg border border-zinc-200 bg-white p-6 shadow-sm space-y-5"
        >
            {error && (
                <div className="rounded-md bg-red-50 p-3 text-sm text-red-700 border border-red-200">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-zinc-700">
                        Account
                    </label>
                    <select
                        value={accountID}
                        onChange={(e) => setAccountID(e.target.value)}
                        className="rounded-md border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {accounts.map((a) => (
                            <option key={a.id} value={a.id}>
                                {a.name} ({a.type})
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-zinc-700">
                        Amount
                    </label>
                    <div className="flex gap-2">
                        <input
                            type="number"
                            step="0.01"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <select
                            value={kind}
                            onChange={(e) => setKind(e.target.value)}
                            className="rounded-md border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="expense">Expense</option>
                            <option value="income">Income</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-zinc-700">
                    Date
                </label>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="rounded-md border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-zinc-700">
                    Category
                </label>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="rounded-md border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="uncategorized">Uncategorized</option>
                    <option value="groceries">Groceries</option>
                    <option value="dining">Dining</option>
                    <option value="gas">Gas</option>
                    <option value="rent">Rent</option>
                    <option value="utilities">Utilities</option>
                    <option value="shopping">Shopping</option>
                    <option value="subscriptions">Subscriptions</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="travel">Travel</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="income">Income</option>
                    <option value="transfer">Transfer</option>
                    <option value="adjustment">Adjustment</option>
                </select>
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-zinc-700">
                    Merchant
                </label>
                <input
                    value={merchant}
                    onChange={(e) => setMerchant(e.target.value)}
                    className="rounded-md border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-zinc-700">
                    Note
                </label>
                <input
                    value={note}
                    maxLength={200}
                    onChange={(e) => setNote(e.target.value)}
                    className="rounded-md border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-zinc-200">
                <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="rounded-md border border-zinc-300 bg-white px-5 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 transition"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    className="rounded-md bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700 transition"
                >
                    Create Transaction
                </button>
            </div>
        </form>

    )
}