"use client";
import { useState } from "react";
import EditAccount from "./EditAccount";

export default function EditAccountButton(accounts) {
    const [open, setOpen] = useState(false);
    const[selectedAccount, setSelectedAccount] = useState("");
   


    const accountList = accounts.accounts;

if (!open) {
    return (
        <button
            onClick={() => {
                setOpen(true);
            }}
            className="inline-flex items-center gap-2 rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 transition"
        >
            ✏️ Edit accounts
        </button>
    );
}

return (
    <div className="mt-4 rounded-lg border border-zinc-200 bg-white shadow-sm">
        <ul className="divide-y divide-zinc-200">
            {accountList.map((acc) => {
                const amountUSD = (acc.balance_cents / 100).toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                });

                return (
                    <li
                        key={acc.id}
                        className="flex items-center justify-between px-4 py-3"
                    >
                        <div className="flex items-center gap-4">
                            <span className="font-medium text-zinc-900">
                                {acc.name}
                            </span>
                            <span className="text-sm text-zinc-500">
                                {amountUSD}
                            </span>
                        </div>

                        <button
                            type="button"
                            onClick={() => {
                                setSelectedAccount(acc);
                            } }
                            className="rounded-md p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 transition"
                            aria-label={`Edit ${acc.name}`}
                        >
                            ✏️
                        </button>
                    </li>
                );
            })}
            <div className="flex justify-end border-t border-zinc-200 px-4 py-3">
                {!selectedAccount &&
                    <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 transition"
                    >
                        Close
                    </button>
                }

            </div>
        </ul>

        {/* Modal / pop-up editor */}
        {selectedAccount && (
            <EditAccount
                account={selectedAccount}
                onDone={() => {
                    setSelectedAccount(null);
                }}
            />
        )}

       
    </div>
);
}