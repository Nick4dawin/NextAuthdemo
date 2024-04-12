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
  events:{
    async linkAccount({user}){
      await db.user.update ({
        where: {
          id: user.id
        },
        data: {
          emailVerified: new Date()
        }
      })
    }
  },
  callbacks:{
    //TODO LATER
    async signIn({user,account}){
      //Allow Oauth without email Verification
      console.log(account,user);
     if(account?.provider !== 'credentials') return true;
      const existingUser = await getUserById(user.id!);
      //Prevent signin without email verification
      if(!existingUser || !existingUser.emailVerified){
        return false;
        //Add 2FA check
      }
      return true;
    },
    //assign role to session.user by token.role and assign id to session.user by token.sub
    async session({token,session}){
      //console.log("Session token: ",{token})
     
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