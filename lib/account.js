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

export async function getTotalBalanceCents(userId) {
    const { rows } = await query (
        `
        SELECT COALESCE(SUM(balance_cents), 0) AS total_cents
        FROM accounts
        WHERE user_id = $1
        `,
        [userId]
    );

    return rows[0].total_cents;
}

export async function getAccountsForUser(userId) {
    const { rows } = await query(
        `
        SELECT id, name, type, balance_cents
        FROM accounts
        WHERE user_id = $1
        ORDER BY created_at ASC
        `,
        [userId]
    );

    return rows;
}