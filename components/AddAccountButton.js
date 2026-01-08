"use client";

import { useState } from "react";
import Onboarding from "@/app/dashboard/Onboarding";

export default function AddAccountButton() {
    const [open, setOpen] = useState(false);

    if(!open) {
        return(
            <button
            onClick={() => setOpen(true)}>
            Add an account</button>
        );
    }

    return (
        <div className="mt-4">
            <div className="mb-2 flex items-center justify-between">
                <p className="text-sm text-zinc-700">Add a new account</p>
                <button
                    onClick={() => setOpen(false)}
                    className="text-sm text-zinc-600 underline underline-offset-4 hover:text-zinc-900"
                >
                    Cancel
                </button>
            </div>

            <Onboarding onDone={() => setOpen(false)} />
        </div>
    )    
}