"use client";

import { useState } from "react";
import AddAccount from "./AddAccount";

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
            <AddAccount onDone={() => setOpen(false)} />
        </div>
    )    
}