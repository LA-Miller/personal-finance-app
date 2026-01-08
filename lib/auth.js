import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { query } from "@/lib/db";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials) return null;

                const username = (credentials.username || "").trim();
                const password = credentials.password || "";

                if (!username || !password) return null;

                // Find user in db
                const result = await query(
                    "SELECT id, username, password_hash FROM users WHERE username = $1",
                    [username]
                );

                if (result.rows.length === 0) return null;

                const user = result.rows[0];

                // Check password
                const ok = await bcrypt.compare(password, user.password_hash);
                if (!ok) return null;

                return {
                    id: user.id,
                    name: user.username,
                };      
            },
        }),
    ],

    session: {
        strategy: "jwt",
    },

    callbacks: {
        async jwt({ token, user }) {
            // Runs at login
            if (user?.id) {
                token.id = user.id;
            }
            return token;
        },

        async session({ session, token }) {
            // Expose id on session.user
            if (session.user) {
                session.user.id = token.id;
            }
            return session;
        },
    },
};