{
  /* eslint-disable */
}
import type { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";

export const authConfig = {
  providers: [],
  callbacks: {
    authorized({ request, auth }: any) {
      //Array of regex patterns of paths we want to protect
      const protectedPaths = [
        /\/shipping-address/,
        /\/payment-method/,
        /\/profile/,
        /\/user\/(.*)/,
        /\/order\/(.*)/,
        /\/admin/,
      ];

      //Get pathname from the req URL object
      const { pathname } = request.nextUrl;

      //Check if user is not authenticated and accessing a protected path
      if (!auth && protectedPaths.some((p) => p.test(pathname))) return false;

      if (!request.cookies.get("sessionCartId")) {
        // Check for session cart cookie
        const sessionCartId = crypto.randomUUID();

        // Clone the req headers
        const newRequestHeaders = new Headers(request.headers);

        // Create new response
        const response = NextResponse.next({
          request: {
            headers: newRequestHeaders,
          },
        });

        //Set newly generated sessionCartId in the response cookies
        response.cookies.set("sessionCartId", sessionCartId);
        return response;
      } else {
        return true;
      }
    },
  },
} satisfies NextAuthConfig;
