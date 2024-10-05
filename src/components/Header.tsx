import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { Button } from './ui/button'
import {auth } from "@/auth"
import { handleSignOut } from '@/actions/authActions'
import { getSession, signOut, useSession } from 'next-auth/react'

export default  async function Header() {
  const session = await auth();
  // const {data:session} = useSession();


  return (
    <div className='flex justify-around items-center '>
      <Link href="/">
        <img src="/logo.svg" alt='logo'  width={50} height={50}/>
      </Link>


      <div className='flex gap-4 font-medium items-center justify-center'>
        <Link href="/">Home</Link>
        <Link href="/posts">Posts</Link>
        
        {!session ? <Link href="/login"><Button variant={'secondary'} className='font-semibold'>Login</Button></Link>
        :
        <form action={handleSignOut}><Button variant={'secondary'} className='font-semibold'>Sign Out</Button></form>
        // <Button onClick={()=>(signOut())} variant={'secondary'} className='font-semibold'>Sign Out</Button>
        }
        <Link href="signup"><Button variant={'secondary'} className='font-semibold'>Sign Up</Button></Link>
      </div>
    </div>
  )
}
