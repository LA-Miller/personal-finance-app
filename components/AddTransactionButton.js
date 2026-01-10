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
    const [category, setCategory] = useState("");
    const [merchant, setMerchant] = useState("");
    const [note, setNote] = useState("");
    const[kind, setKind] = useState("expense");
    const[error, setError] = useState("");

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

        router.refresh();

        onDone?.();
    }

    if(!open) {
        return(
            <button
            onClick={() => setOpen(true)}
            >Add a transaction</button>
        );

    }

    return (
       <form onSubmit={handleSubmit}>
         <div>
            {error && <p>{error}</p>}
        </div>
        <div>
            <label>Account</label>
            <select value={accountID} onChange={(e) => setAccountID(e.target.value)}>
                {accounts.map((a) => (
                    <option key={a.id} value={a.id}>
                        {a.name} ({a.type})
                    </option>
                ))}
            </select>
            
            <label>Amount</label>
            <input
                type="number"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <select
                value={kind}
                onChange={(e) => setKind(e.target.value)}
            >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
            </select>
        </div>
        <div>
            <label>Date</label>
            <input 
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />
        </div>

        <div>
            <label>Category</label>
            <input 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            />
        </div>

        <div>
            <label>Merchant</label>
            <input 
                value={merchant}
                onChange={(e) => setMerchant(e.target.value)}
            />
        </div>

        <div>
            <label>Note</label>
            <input 
                value={note}
                maxLength={200}
                onChange={(e) => setNote(e.target.value)}
            />
        </div>

        <button>Create Transaction</button>
       </form>

    )
}