import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import SignOutButton from "@/components/SignOutButton"
import { userHasAccounts, getTotalBalanceCents } from "@/lib/account";
import Onboarding from "./Onboarding";
import AddAccountButton from "@/components/AddAccountButton";
import AddTransactionButton from "@/components/AddTransactionButton";
import { getAccountsForUser } from "@/lib/account";

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);
    const hasAccounts = await userHasAccounts(session.user.id);

    if(!session) {
        redirect("/login");
    }

    if (!hasAccounts) {
        return (
            <main>
                <h1>Dashboard</h1>
                <p>Welcome, {session.user?.name}</p>
                <h2>Let’s set up your first account</h2>
                <p>Add an account to start tracking your money.</p>
                <Onboarding />
                <SignOutButton />
            </main>
        )
    }

    const totalCents = await getTotalBalanceCents(session.user.id);

    const totalUSD = (totalCents / 100).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
    });

    const accounts = await getAccountsForUser(session.user.id);
    
    return (
        <main>
            <div>
            <h1>Dashboard</h1>
            <p>Welcome, {session.user?.name}</p>
            <p>Balance: {totalUSD}</p>
            <p>Monthly income:</p>
            <p>Spending:</p>
            <p>Net:</p>
            <AddAccountButton />
            <br></br>
            <SignOutButton />
            </div>

            <div>
                <h1>Track your transactions here</h1>
                <AddTransactionButton accounts={accounts} />

            </div>


        </main>
    )
}