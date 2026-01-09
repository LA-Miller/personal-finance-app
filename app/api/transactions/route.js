import {query} from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getClient } from "@/lib/db";

export async function POST(req) {
    const session = await getServerSession(authOptions);
    const client = await getClient();

    if(!session) {
        return Response.json({error: "Unauthorized" }, {status: 401});
    }

    const body = await req.json();
    const{accountID, amount, date, category, merchant, note, kind} = body;

    if(!accountID || !amount || !date) {
        return Response.json(
            {error: "Account, amount, and date are required fields."},
            {status: 400}
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
    else(amountCents = Math.abs(amountCents));

    try {
        await client.query("BEGIN");

        // Make sure account belongs to user
        const own = await client.query(
            `SELECT 1 FROM accounts WHERE id = $1 AND user_id = $2`,
            [accountID, session.user.id]
        );
        if(own.rowCount === 0) {
            throw new Error("Account not found");
        }

        await client.query (
        `
        INSERT INTO transactions (
        user_id, 
        account_id, 
        amount_cents, 
        occurred_on, category, 
        merchant, 
        note
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        `,
        [session.user.id, accountID, amountCents, date, category, merchant, note]
    );

    await client.query (
        `
        UPDATE accounts
        SET balance_cents = balance_cents + $1
        WHERE id = $2 AND user_id = $3
        `,
        [amountCents, accountID, session.user.id]
    );

    await client.query("COMMIT");

    return Response.json({success: true}, {status: 201});
    } catch(err) {
        await client.query("ROLLBACK");
        console.error(err);
        return Response.json(
            {error: "Failed to add transaction."},
            {status: 500}
        );
    } finally {
        client.release();
    }
}