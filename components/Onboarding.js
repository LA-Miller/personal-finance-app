// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function Onboarding( { onDone }) {
//     const router = useRouter();
//     const [name, setName] = useState("Checking");
//     const[type, setType] = useState("checking");
//     const [balance, setBalance] = useState("0");
//     const [error, setError] = useState("");

//     async function handleSubmit(e) {
//         e.preventDefault();
//         setError("");

//         const res = await fetch("/api/accounts", {
//             method: "POST",
//             headers: {"Content-Type": "application/json"},
//             body: JSON.stringify({
//                 name,
//                 type,
//                 balanceUSD: balance,
//             }),
//         });

//         if(!res.ok) {
//             const data = await res.json().catch(() => ({}));
//             setError(data.error || "Failed to create account");
//             return;
//         }

//         router.refresh();

//         onDone?.();
//     }

//     return (
//           <div>

//       {error && <p style={{ color: "red" }}>{error}</p>}

//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Account name</label>
//           <input
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//         </div>

//         <div>
//           <label>Type</label>
//           <select
//             value={type}
//             onChange={(e) => setType(e.target.value)}
//           >
//             <option value="checking">Checking</option>
//             <option value="savings">Savings</option>
//             <option value="credit">Credit Card</option>
//             <option value="cash">Cash</option>
//           </select>
//         </div>

//         <div>
//           <label>Starting balance (USD)</label>
//           <input
//             type="number"
//             step="0.01"
//             value={balance}
//             onChange={(e) => setBalance(e.target.value)}
//           />
//         </div>

//         <button>Create account</button>
//       </form>
//     </div>
//     )
// }