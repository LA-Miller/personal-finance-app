import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import SignOutButton from "@/components/SignOutButton"
import { userHasAccounts, getTotalBalanceCents, getAccountsForUser, getUserTransactions } from "@/lib/account";
import AddAccountButton from "@/components/AddAccountButton";
import AddTransactionButton from "@/components/AddTransactionButton";
import AddAccount from "@/components/AddAccount";
import TransactionList from "@/components/TransactionList";

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);
    const hasAccounts = await userHasAccounts(session.user.id);

    if(!session) {
        redirect("/login");
    }

    if (!hasAccounts) {
        return (
            <main className="min-h-screen bg-zinc-100 flex items-center justify-center px-4 text-black">
                <div className="w-full max-w-lg bg-white rounded-xl shadow p-6 space-y-4">
                    <h1 className="text-2xl font-semibold">Dashboard</h1>
                    <p className="text-zinc-600">
                        Welcome, <span className="font-medium">{session.user?.name}</span>
                    </p>

                    <div className="border-t pt-4 space-y-2">
                        <h2 className="text-lg font-medium">Let’s set up your first account</h2>
                        <p className="text-sm text-zinc-600">
                            Add an account to start tracking your money.
                        </p>
                        <AddAccount />
                    </div>

                    <div className="pt-4">
                        <SignOutButton />
                    </div>
                </div>
            </main>
        )
    }

    const totalCents = await getTotalBalanceCents(session.user.id);

    const totalUSD = (totalCents / 100).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
    });

    const accounts = await getAccountsForUser(session.user.id);

    const transactions = await getUserTransactions(session.user.id);
    console.log("trans:", transactions);
    
    return (
        <main className="min-h-screen bg-zinc-100 px-4 py-8 text-black">
            <div className="max-w-5xl mx-auto space-y-8">

                {/* Header */}
                <header className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-semibold">Dashboard</h1>
                        <p className="text-zinc-600">
                            Welcome, <span className="font-medium">{session.user?.name}</span>
                        </p>
                    </div>
                    <SignOutButton />
                </header>

                {/* Summary cards */}
                <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white rounded-xl shadow p-4">
                        <p className="text-sm text-zinc-500">Total Balance</p>
                        <p className="text-2xl font-semibold">{totalUSD}</p>
                    </div>

                    <div className="bg-white rounded-xl shadow p-4">
                        <p className="text-sm text-zinc-500">Monthly Income</p>
                        <p className="text-2xl font-semibold text-green-600">—</p>
                    </div>

                    <div className="bg-white rounded-xl shadow p-4">
                        <p className="text-sm text-zinc-500">Monthly Spending</p>
                        <p className="text-2xl font-semibold text-red-600">—</p>
                    </div>
                </section>

                {/* Actions */}
                <section className="flex flex-wrap gap-4">
                    <AddAccountButton />
                    <AddTransactionButton accounts={accounts} />
                </section>

                {/* Transactions placeholder */}
                <section className="bg-white rounded-xl shadow p-6">
                    <h2 className="text-xl font-medium mb-2">Transactions</h2>
                    <TransactionList transactions={transactions}/>
                </section>

            </div>
        </main>
    )
}