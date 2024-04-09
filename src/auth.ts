import NextAuth from "next-auth"
import authConfig from "./auth.config"
import {PrismaAdapter} from '@auth/prisma-adapter'
import { db } from "@/lib/db"
import { getUserByEmail, getUserById } from "../data/user"


export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  callbacks:{
    //TODO LATER
    // async signIn({user}){
    //   const existingUser = await getUserById(user.id!);
    //   if(!existingUser || !existingUser.emailVerified){
    //     return false;
    //   }
    //   return true;
    // },
    //assign role to session.user by token.role and assign id to session.user by token.sub
    async session({token,session}){
      console.log("Session token: ",{token})
     
      if(session.user && token.sub){
        session.user.id = token.sub;
      }

      if(token.role && session.user){
        session.user.role = token.role as "ADMIN" | "USER";
      }
      return session;
    },

    //get user by id from token.sub to check if user is logged in, if exists then assign a role
    async jwt ({token }){
      if(!token.sub) return token;
      const existingUser = await getUserById(token.sub);
      if(!existingUser) return token;
      token.role = existingUser.role;
      return token;
    }
  },
  adapter: PrismaAdapter(db),
  session: {
    strategy: 'jwt'
  },
  ...authConfig,
})