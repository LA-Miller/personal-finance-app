"use client";

import { useState } from "react";
import AddAccount from "./AddAccount";

export default function AddAccountButton() {
    const [open, setOpen] = useState(false);

    if(!open) {
        return(
            <button
            className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
            onClick={() => setOpen(true)}>
            + Add account</button>
        );
    }

    return (
        <div>
            <AddAccount onDone={() => setOpen(false)} />
        </div>
    )    
}