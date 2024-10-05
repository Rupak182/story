"use client"

import React, { useState } from 'react'
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

import { CreatePostSchema } from '@/schema'
import { Textarea } from '@/components/ui/textarea'
import { createPost } from '@/actions/postActions'
import ErrorMessage from '@/components/ErrorMessage'
import LoadingButton from '@/components/loading-btn'

export default function CreatePost() {

  const [globalError,setGlobalError]= useState<string>("");


  const form = useForm<z.infer<typeof CreatePostSchema>>({
    resolver: zodResolver(CreatePostSchema),
    defaultValues: {
        title:"",
        content:""
    }
  });

  const onSubmit = async (data:z.infer<typeof CreatePostSchema>) => {
    setGlobalError("")

          try {
            await createPost(data);
          } catch (error) {
            setGlobalError("An error occured")
          }
  };

  return (
    <main className='flex flex-col items-center mt-10 justify-center'>

      <div className=" flex flex-col gap-4 mt-10 max-w-screen-xl w-full justify-center items-center p-10">
      {globalError && <ErrorMessage error={globalError} />}

      <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 w-1/2">
         
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter a title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter the content here ...." {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='text-center py-5 w-full'>
            <LoadingButton pending={form.formState.isSubmitting } text="Create"/>

            </div>
          </form>
        </Form>

        
      </div>
    </main>
  )
}
