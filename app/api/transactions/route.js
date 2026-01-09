import {query} from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req) {
    const session = await getServerSession(authOptions);

    if(!session) {
        return Response.json({error: "Unauthorized" }, {status: 401});
    }

    const body = await req.json();
    const{accountID, amount, date, category, merchant, note, kind} = body;

    if(!accountID || !amount || !date) {
        return Response.json(
            {error: "Account, amount, and date are required fields."},
            {state: 400}
        );
    }

    let amountCents = Math.round(Number(amount) * 100);

    if(Number.isNaN(amountCents)) {
        return Response.json(
            {error: "Invalid amount."},
            {status: 400}
        );
    }

    if(kind == 'expense') {
        amountCents = (-Math.abs(amountCents));
    }

    await query (
        `
        INSERT INTO transactions (user_id, account_id, amount_cents, occurred_on, category, merchant, note)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        `,
        [session.user.id, accountID, amountCents, date, category, merchant, note]
    );

    return Response.json({success: true}, {status: 201});
}