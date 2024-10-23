import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { prisma } from "~/libraries/prisma";

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google
    // Credentials({
    //   name: "Credentials",
    //   credentials: {
    //     email: { label: "email", type: "text" },
    //     password: { label: "password", type: "password" }
    //   },

    //   async authorize(credentials, req) {
    //     try {
    //       const client = (await connectDB).db("YOURDBNAME");
    //       const user = await client.collection("USERCOLLECTION").findOne({ email: credentials.email });
    //       console.log("Authorize User Credentials: ", user);
    //       if (user !== null) {
    //         const res = await bcrypt.compare(credentials.password, user.password);
    //         if (res === true) {
    //           const userAccount = {
    //             id: user._id.toString(),
    //             name: user.username, //name & email properties are required (strange)
    //             email: user.email
    //           };
    //           console.log("UserAccount created: ", userAccount);
    //           return userAccount;
    //         } else {
    //           console.log("Wrong password");
    //           return null;
    //         }
    //       } else {
    //         return null;
    //       }
    //     } catch (err) {
    //       console.log("authorize error :", err);
    //     }
    //   }
    // })
  ],
  trustHost: true,
  callbacks: {
    async session({ session, user }) {
      session.user = user;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    }
  }
});
