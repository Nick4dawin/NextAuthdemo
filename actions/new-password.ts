'use server';

import { getPasswordResetTokenByToken } from "../data/password-reset-token";
import { getUserByEmail } from "../data/user";
import { NewPasswordSchema } from "../schemas";

import * as z from "zod";
export const newPassword = async (values: z.infer<typeof NewPasswordSchema>,token?: string | null) => {
    if(!token){
        return {error: "Missing Token!"};
    }

    const validatedFields = NewPasswordSchema.safeParse(values);
    if(!validatedFields.success){
        return {error: "Invalid Fields!"};
    }
    const {password} = validatedFields.data;

    const existingToken = await getPasswordResetTokenByToken(token);
    if(!existingToken){
        return {error: "Invalid Token!"};
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if(hasExpired){
        return {error: "Token has expired!"};
    }

    const existingUser = await getUserByEmail(existingToken.email);
    if(!existingUser){
        return {error: "Email does not exist!"};
    }

     

}