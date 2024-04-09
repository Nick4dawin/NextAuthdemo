'use server';
import { LoginSchema } from '../schemas';
import * as z from 'zod'
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
    return{
        success: "Email Sent!"
    }


}