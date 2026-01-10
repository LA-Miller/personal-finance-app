"use client";

import { useState } from "react";

export default function TransactionList(transactions) {
    const list = transactions.transactions;
    // console.log("list: ", list);

    if (list.length === 0) {
        return (
            <div>
                <p className="text-sm text-zinc-500">
                    Your recent transactions will appear here.
                </p>

            </div>
        )
    }

      // Shared grid layout (header + rows)
  const gridCols =
    "grid grid-cols-[110px_130px_140px_160px_1fr] items-center gap-6";

    return (
        <div className="mt-2">
            {/* Header */}
            <div
                className={`${gridCols} px-2 pb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500`}
            >
                <span>Date</span>
                <span className="text-right">Amount</span>
                <span>Category</span>
                <span>Merchant</span>
                <span>Note</span>
            </div>

            {/* Rows */}
            <ul className="divide-y divide-zinc-200">
                {list.map((x) => {
                    const amountUSD = (x.amount_cents / 100).toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                    });

                    const dateStr = new Date(x.occurred_on).toLocaleDateString("en-US");

                    return (
                        <li
                            key={x.id}
                            className={`${gridCols} px-2 py-3 text-sm hover:bg-zinc-50 rounded-md`}
                        >
                            <span className="text-zinc-700">{dateStr}</span>

                            <span
                                className={`text-right font-medium tabular-nums ${x.amount_cents < 0 ? "text-red-600" : "text-green-600"
                                    }`}
                            >
                                {amountUSD}
                            </span>

                            <span className="text-zinc-700">
                                {x.category || <span className="text-zinc-400">—</span>}
                            </span>

                            <span className="text-zinc-700">
                                {x.merchant || <span className="text-zinc-400">—</span>}
                            </span>

                            <span className="text-zinc-700 truncate">
                                {x.note || <span className="text-zinc-400">—</span>}
                            </span>
                        </li>
                    );
                })}
            </ul>
        </div>
    )

}