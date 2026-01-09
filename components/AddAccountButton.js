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
        <div>
            <div>
                <p>Add a new account</p>
                <button
                    onClick={() => setOpen(false)}
                >
                    Cancel
                </button>
            </div>

            <Onboarding onDone={() => setOpen(false)} />
        </div>
    )    
}