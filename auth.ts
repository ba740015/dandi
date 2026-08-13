import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth }) {
      // Middleware only matches /dashboards — require a session there
      return !!auth?.user;
    },
  },
  trustHost: true,
});
