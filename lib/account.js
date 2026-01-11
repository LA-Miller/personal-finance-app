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
        SELECT id, user_id, name, type, balance_cents
        FROM accounts
        WHERE user_id = $1
        ORDER BY created_at ASC
        `,
        [userId]
    );

    return rows;
}

export async function getUserTransactions(userId) {
    const { rows } = await query (
        `
        SELECT *
        FROM transactions
        WHERE user_id = $1
        ORDER BY occurred_on DESC, created_at DESC
        `,
        [userId]
    );

    return rows;
}

export async function getTransactionsByCategory(userId, beginDate, endDate) {
    const { rows } = await query (
        `
        SELECT 
            category, 
            SUM(-amount_cents) AS spent_cents
        FROM transactions
        WHERE 
            user_id = $1 
            AND occurred_on >= $2 
            AND occurred_on <= $3
            AND amount_cents < 0
            AND category NOT IN ('transfer', 'adjustment')
        GROUP BY category
        ORDER BY 
            spent_cents DESC
        `,
        [userId, beginDate, endDate]
    );

    const cleaned = rows.map((row) => ({
        category: row.category,
        spent_cents: Number(row.spent_cents),
    }));

    return cleaned;
}