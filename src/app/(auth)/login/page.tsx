// "use client"

import CustomForm from "@/components/custom-form";

// import React from 'react'
// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import { z } from "zod"

// import { Button } from "@/components/ui/button"
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"

// import { LoginSchema } from '@/schema'
// import LoadingButton from '@/components/loading-btn'
// import { handleCredentialsSignin } from '@/actions/authActions'
// import { log } from 'console'
// import CustomForm from '@/components/custom-form'

export default function Login() {
  // const form = useForm<z.infer<typeof LoginSchema>>({
  //   resolver: zodResolver(LoginSchema),
  //   defaultValues: {
  //     username: "",
  //     password: ""
  //   }
  // });

  // const onSubmit = async (values:z.infer<typeof LoginSchema>) => {
  //     try {
  //       const res = await handleCredentialsSignin(values);
  //     } catch (error) {
  //       console.log("An unexpected error occured.Please try again .");
        
  //     }
  // }

  return (
    <main className='flex flex-col items-center mt-10 justify-center'>

    
        <CustomForm/>
    </main>
  )
}
