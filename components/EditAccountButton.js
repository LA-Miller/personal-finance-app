"use client";
import { useState } from "react";
import EditAccount from "./EditAccount";

export default function EditAccountButton(accounts) {
    const [open, setOpen] = useState(false);
    const[selectedAccount, setSelectedAccount] = useState("");
   


    const accountList = accounts.accounts;
    console.log("Accountssss", accountList);

    // function handleEdit(acc) {
    //     console.log(acc);
    //     return (
    //         <EditAccount account={acc} />
    //     )
    // }

    if (!open) {
        return (
            <button
                onClick={() => setOpen(true)}
            >
                Edit accounts
            </button>
        )
    }

    return (
        <div>
            <ul>
                {accountList.map((acc) => {
                    const amountUSD = (acc.balance_cents / 100).toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                    });
                    return (
                        <li
                            key={acc.id}
                        >
                            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                                <span>{acc.name}</span>
                                <span>{amountUSD}</span>

                                <button
                                    type="button"
                                    onClick={() => setSelectedAccount(acc)}
                                    className="rounded-md p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
                                    aria-label={`Edit ${acc.name}`}
                                >
                                    ✏️
                                </button>
                            </div>

                        </li>
                    )
                })}
            </ul>

            {/* This is what makes it “pop up” */}
            {selectedAccount && (
                <EditAccount
                    account={selectedAccount}
                    onDone={() => setSelectedAccount(null)}
                />
            )}
            <button
                type="button"
                onClick={() => setOpen(false)}
            >
                Cancel
            </button>
        </div>
    )
}