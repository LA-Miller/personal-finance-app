import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if(!credentials) return null;
                const {username, password} = credentials;

                if(username === "demo" && password === "demo") {
                    return { id: '1', name: "Demo User" };
                }

                return null;
            },
        }),
    ],
});

export { handler as GET, handler as POST };