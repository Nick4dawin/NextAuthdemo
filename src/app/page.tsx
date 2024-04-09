import { Button } from '@/components/ui/button'
import React from 'react'
import { Poppins } from 'next/font/google'
const poppins = Poppins({ subsets: ['latin'],weight:['600'] })
import { cn } from '@/lib/utils'
import { LoginButton } from '@/components/auth/login-button'
const Home = async () => {
  return (
    <main className='flex flex-col items-center justify-center h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-sky-400 to-blue-800'>
      <div className='space-y-6 text-center '>
        <h1 className={cn('text-6xl font-semibold text-white drop-shadow-md',poppins.className)}> 🔐 Auth</h1>
        <p className='text-white text-lg'>A simple authentication service</p>
        <div>
          <LoginButton>
          <Button variant={'secondary'} size={'lg'}>Sign In</Button>
          </LoginButton>
          
        </div>
      </div>
    </main>
  )
}

export default Home