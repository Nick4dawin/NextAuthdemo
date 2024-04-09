'use server';
import { LoginSchema } from '../schemas';
import * as z from 'zod'
import { signIn } from '@/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { AuthError } from 'next-auth';

/**
 * Validates the input values using LoginSchema and returns an error if the fields are invalid. Otherwise, it returns a success message.
 *
 * @param {typeof LoginSchema} values - the input values to be validated
 * @return {object} an object containing either an error message or a success message
 */
export const login = async (values : z.infer<typeof LoginSchema>) =>{
    const validatedFields = LoginSchema.safeParse(values);
    if(!validatedFields.success){
        return {error: "Invalid Fields"};
    }
    const {email,password} = validatedFields.data;

    try{
        await signIn('credentials',{
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT
        })
    }
    catch(error){
        if(error instanceof AuthError){
            switch (error.type){
                case "CredentialsSignin":
                    return {error: "Invalid Email or Password"}
                default:
                    return {error: "Something went wrong!"}
            }
        }
        throw error;
    }

}