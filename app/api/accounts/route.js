import { query } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req) {
    const session = await getServerSession(authOptions);

    if(!session) {
        return Response.json({error: "Unauthorized"}, {status: 401});
    }

    if (!session?.user?.id) {
        return Response.json({ error: "No session Id" }, { status: 401 });
    }

    const body = await req.json();
    const{name, type, balanceUSD} = body;

    // Validate 
    if(!name || !type) {
        return Response.json(
            {error: "Name and type of account are required."}, 
            {status: 400}
        );
    }

    const allowedTypes = ["checking", "savings", "credit", "cash"];
    if(!allowedTypes.includes(type)) {
        return Response.json(
            {error: "Invalid account type."},
            {status: 400}
        );
    }

    const balanceCents = Math.round(Number(balanceUSD || 0) * 100)

    if(Number.isNaN(balanceCents)) {
        return Response.json(
            {error: "Invalid starting balance."},
            {status: 400}
        );
    }

    await query(
        `
        INSERT INTO accounts (user_id, name, type, balance_cents)
        VALUES ($1, $2, $3, $4)
        `,
        [session.user.id, name, type, balanceCents]
    );

    return Response.json({success: true}, {status: 201});
}