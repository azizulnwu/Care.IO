import { loginUser } from "@/action/server/auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { collections, dbConnection } from "./dbConnection";
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Credentials",
      // credentials: {
      //   email: { label: "Email", type: "email" },
      //   password: { label: "Password", type: "password" },
      // },
      async authorize(credentials, req) {
        const user = await loginUser(credentials.email, credentials.password);

        if (user) {
          return user;
        }

        return null;
      },
    }),
    // ...add more providers here

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // console.log("signin", user);
      const query = { email: user.email, provider: account.provider };

      const result = await dbConnection(collections.USERS).findOne(query);

      if (result) {
        return user;
      } else {
        const data = {
          role: "user",
          name: user?.name,
          email: user?.email,
          image: user?.image,
          provider: account?.provider,
          createAt: new Date().toISOString(),
        };

        const newUser = await dbConnection(collections.USERS).insertOne(data);
        if (newUser.acknowledged) {
          return newUser;
        }
      }

      // return true;
    },

    async session({ session, user, token }) {
      if (token) {
        session.email = token?.email;
        session.role = token?.role;
        session.contact = token?.contact;
        session.address = token?.address;
      }

      return session;
    },

    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        const query = { email: user.email, provider: account.provider };

        const dbUser = await dbConnection(collections.USERS).findOne(query);

        token.email = dbUser?.email;
        token.role = dbUser?.role;
        token.contact = user?.contact || "";
        token.address = user?.address || "";
      }

      return token;
    },
  },
};

export default NextAuth(authOptions);
