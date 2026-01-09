import { getToken } from "next-auth/jwt";

export async function proxy(req) {
    const { pathname, search } = req.nextUrl;

    const token = await getToken({req});

    const isLoggedIn = !!token;

    const isDashboard = pathname === "/dashboard" || pathname.startsWith("/dashboard");
    const isLogin = pathname === "/login";

    if(!isLoggedIn && isDashboard) {
        const url = req.nextUrl.clone();
        url.pathname = "/login";
        url.searchParams.set("next", pathname + (search || ""));
        return Response.redirect(url);
    }

    if(isLoggedIn && isLogin) {
        const url = req.nextUrl.clone();
        url.pathname = "/dashboard";
        url.search = "";
        return Response.redirect(url);
    }

    return;
}

export const config = {
    matcher: ["/dashboard/:path*", "/login"],
};