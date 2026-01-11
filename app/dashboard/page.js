import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import SignOutButton from "@/components/SignOutButton"
import { userHasAccounts, getTotalBalanceCents, getAccountsForUser, getUserTransactions, getTransactionsByCategory } from "@/lib/account";
import AddAccountButton from "@/components/AddAccountButton";
import AddTransactionButton from "@/components/AddTransactionButton";
import AddAccount from "@/components/AddAccount";
import TransactionList from "@/components/TransactionList";
import EditAccountButton from "@/components/EditAccountButton";
import CategoryCharts from "@/components/CategoryCharts";

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

                    <div className="space-y-2">
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

    function monthlyIncome() {
        let income = 0;
        for(let i = 0; i < transactions.length; i++) {
            if(transactions[i].amount_cents > 0) {
                income = income + transactions[i].amount_cents;      
            }
        }
        return (income / 100).toFixed(2);
    } 

    function monthlySpending() {
        let spending = 0;
        for(let i = 0; i < transactions.length; i++) {
            if(transactions[i].amount_cents < 0) {
                spending = spending - transactions[i].amount_cents;
            }
        }
        return (spending / 100).toFixed(2);
    }

    function netIncome() {
        const net = monthlyIncome() - monthlySpending();
        return net;
    }

    const totalIncome = netIncome();

    const spendingByCategory = await getTransactionsByCategory(session.user.id, '2026-01-01', '2026-01-30');
    console.log("Teeeehee", spendingByCategory);
    
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

                <section>
                    <AddAccountButton />
                    <EditAccountButton accounts={accounts}/>
                </section>

                {/* Summary cards */}
                <section className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div className="bg-white rounded-xl shadow p-4">
                        <p className="text-sm text-zinc-500">Total Balance</p>
                        <p className="text-2xl font-semibold">{totalUSD}</p>
                    </div>

                    <div className="bg-white rounded-xl shadow p-4">
                        <p className="text-sm text-zinc-500">Monthly Income</p>
                        <p className="text-2xl font-semibold text-green-600">${monthlyIncome()}</p>
                    </div>

                    <div className="bg-white rounded-xl shadow p-4">
                        <p className="text-sm text-zinc-500">Monthly Spending</p>
                        <p className="text-2xl font-semibold text-red-600">${monthlySpending()}</p>
                    </div>

                    <div className="bg-white rounded-xl shadow p-4">
                        <p className="text-sm text-zinc-500">Net Income</p>
                        <p className={`text-2xl font-semibold ${totalIncome < 0 ? "text-red-600" : "text-green-600"}`}>{totalIncome.toLocaleString("en-US", {style: "currency", currency: "USD"})}</p>
                    </div>
                </section>

                {/* Actions */}
                <section className="flex flex-wrap gap-4">
                    <AddTransactionButton accounts={accounts} />
                </section>

                {/* Transactions */}
                <section className="bg-white rounded-xl shadow p-6">
                    <h2 className="text-xl font-medium mb-2">Transactions</h2>
                    <TransactionList transactions={transactions}/>
                </section>

                {/* Spending by category */}
                <section>
                    <h2>Spending by Category</h2>
                    <CategoryCharts data={spendingByCategory}/>
                </section>
            </div>
        </main>
    )
}