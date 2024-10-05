"use client"

import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { SignUpSchema } from '@/schema'
import CustomForm2 from '@/components/custom-form2'

export default function Signup() {
  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      username: "",
      password: "",
      email:""
    }
  });

  const onSubmit = () => {

  }

  return (
    <main className='flex flex-col items-center mt-10 justify-center'>

      <div className=" flex flex-col gap-4 mt-10 max-w-screen-xl w-full justify-center items-center p-10">
        <CustomForm2/>
      </div>
    </main>
  )
}
