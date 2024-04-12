'use client';
import React, { useState } from 'react';
import CardWrapper from './card-wrapper'
import * as z from 'zod';
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { NewPasswordSchema } from '../../../schemas';
import { Form,FormControl,FormField,FormItem,FormLabel,FormMessage} from '../ui/form'
import { Input } from '../ui/input';
import {Button} from '../ui/button';
import FormError from '../form-error';
import FormSuccess from '../form-success';
import {newPassword} from '../../../actions/new-password';
import { useTransition } from 'react';
import { useSearchParams } from 'next/navigation';



const NewPasswordForm = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
   
    const [error,setError] = useState< string | undefined>('');
    const [success,setSuccess] = useState< string | undefined>('');
const [isPending,startTransition] = useTransition();
    const form = useForm<z.infer<typeof NewPasswordSchema>>({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues:{
            password:'',
        }
    });
    const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
        setError("");
        setSuccess("");
        console.log(values);
        startTransition(async () => {
            newPassword(values,token)
            .then((data)=>{
                setError(data?.error);
                //TODO: add when we add 2FA
                setSuccess(data?.success);
            })      
            })
        
    }
  return (
    <CardWrapper headerLabel='Enter a new password' backButtonLabel='Back to Login' backButtonHref='/auth/login' >

       <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <div className='space-y-4'>
                <FormField
                control={form.control}
                name='password'
                render={({field}) =>(
                    <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <Input {...field} 
                            disabled={isPending}
                            placeholder='******' type='password'/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
                />
                
            </div>
            <FormError message={error}/>
            <FormSuccess message={success}/>
            <Button disabled={isPending} type='submit' className='w-full'>Reset Password</Button>
        </form>
       </Form>
    </CardWrapper>
  )
}

export default NewPasswordForm