import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import SignOutButton from "@/components/SignOutButton"
import { userHasAccounts } from "@/lib/account";

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);
    const hasAccounts = await userHasAccounts(session.user.id);

    if(!session) {
        redirect("/login");
    }

    if(!hasAccounts) {
        return <p>test</p>;
    }
    return (
        <main>
            <h1>Dashboard</h1>
            <p>Welcome, {session.user?.name}</p>
            <SignOutButton />
            <pre>{JSON.stringify({ hasAccounts }, null, 2)}</pre>
        </main>
    )
}