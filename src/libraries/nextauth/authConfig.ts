import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { signup } from "~/applications/Authentication/Api/signup";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [Google],
  trustHost: true,
  callbacks: {
    jwt: async (props) => {
      let user = props.user;

      if (props.trigger === "signIn") {
        const registeredUser = await signup({
          email: props.profile!.email!,
          name: props.profile!.name!,
          image: props.profile!.picture
        });

        user = {
          ...user,
          ...registeredUser
        };
      }
      return props;
    }
  }
});
