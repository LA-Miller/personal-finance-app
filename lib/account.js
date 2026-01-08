import {query} from "./db";

export async function userHasAccounts(userId) {
    const { rows } = await query(
        `SELECT EXISTS (
            SELECT 1 FROM accounts WHERE user_id = $1
    ) AS has_accounts
        `,
        [userId]
    );

    return rows[0].has_accounts;
}