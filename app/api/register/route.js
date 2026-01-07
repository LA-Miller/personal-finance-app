import bcrypt from "bcrypt";
import { query } from "@/lib/db";

export async function POST(request) {
    const body = await request.json();
    const username = (body.username || "").trim();
    const password = body.password || "";

    // Basic validation
    if(!username || !password) {
        return Response.json({error: "Username and password are required."}, {status: 400});
    }
    if(username.length < 3) {
        return Response.json({error: "Username must be at least 3 characters long."}, {status: 400});
    }
    if(password.length < 6) {
        return Response.json({error: "Password must be at least 6 characters long."}, {status: 400});
    }

    // Check if user exists
    const existingUser = await query("SELECT id FROM users WHERE username = $1", [username]);
    if(existingUser.rows.length > 0) {
        return Response.json({error: "Username already taken."}, {status: 400});
    }

    // Hash and insert
    const passwordHash = await bcrypt.hash(password, 10);
    const created = await query(
        "INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING id, username",
        [username, passwordHash]
    );

    return Response.json({user: created.rows[0]}, {status: 201});
}
        
        