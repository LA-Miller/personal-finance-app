import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import SignOutButton from "@/components/SignOutButton"

export default async function DashboardPage() {
    let session = await getServerSession(authOptions);
    if(!session) {
        redirect("/login");
    }
    return (
        <main>
            <h1>Dashboard</h1>
            <p>Welcome, {session.user?.name}</p>
            <SignOutButton />
        </main>
    )
}