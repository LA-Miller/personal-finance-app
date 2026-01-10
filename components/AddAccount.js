"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddAccount({ onDone }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [type, setType] = useState("checking");
  const [balance, setBalance] = useState("0");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/accounts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        type,
        balanceUSD: balance,
      }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Failed to create account");
      return;
    }

    router.refresh();

    onDone?.();
  }

  return (
    <div className="max-w-md rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-zinc-900">
        Add account
      </h2>

      {error && (
        <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Account Name */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-zinc-700">
            Account name
          </label>
          <input
            className="rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Checking, Savings, etc."
          />
        </div>

        {/* Type */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-zinc-700">
            Type
          </label>
          <select
            className="rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="checking">Checking</option>
            <option value="savings">Savings</option>
            <option value="credit">Credit Card</option>
            <option value="cash">Cash</option>
          </select>
        </div>

        {/* Starting Balance */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-zinc-700">
            Starting balance
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-zinc-500">
              $
            </span>
            <input
              type="number"
              step="0.01"
              className="w-full rounded-md border border-zinc-300 py-2 pl-7 pr-3 text-sm focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
              placeholder="0.00"
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="mt-2 w-full rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-1"
        >
          Add account
        </button>

        {/* Cancel */}
        <button
        type="button"
        onClick={() => onDone?.() }
          className="mt-2 w-full rounded-md bg-red-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-1"
        >
          Cancel
        </button>
      </form>
    </div>
  );
}