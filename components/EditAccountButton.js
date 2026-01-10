"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditAccountButton(accounts) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const[accountId, setAccountId] = useState("");
    


    const accountList = accounts.accounts;
    console.log("Accountssss", accountList);

    if(!open) {
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
                return  (
                    <div>
                        <span>{acc.name}</span>
                        <span>{amountUSD}</span>
                        <input
                            type="checkbox"
                        ></input>
                    </div>    
                )
            })}
        </ul>
            <button
                type="button"
                onClick={() => setOpen(false)}
            >
                Cancel
            </button>
        </div>
    )
}