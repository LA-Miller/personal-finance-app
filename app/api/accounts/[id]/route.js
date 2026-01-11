import { query } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function PATCH(req) {
    const session = await getServerSession(authOptions);
    const body = await req.json();
    const{accountId, userId, name, type} = body;
    const allowedTypes = ["checking", "savings", "credit", "cash"];


    if(!session) {
        return Response.json({error: "Unauthorized"}, {status: 401});
    }

    if(!session?.user?.id) {
        return Response.json({ error: "No session ID"}, {status: 401});
    }

    if(session?.user?.id != userId){
        return Response.json({ error: "Account does not belong to user."}, {status: 401});
    }

    if(!allowedTypes.includes(type)) {
        return Response.json(
            {error: "Invalid account type."},
            {status: 400}
        );
    }

    if(!name) {
        return Response.json(
            {error: "Name required."},
            {status: 400}
        );
    }

    await query(
        `
        UPDATE accounts
        SET
            name = $1,
            type = $2
        WHERE
            id = $3 AND user_id = $4
        `,
        [name, type, accountId, userId]
    );

    return Response.json({success: true}, {status: 201});
}