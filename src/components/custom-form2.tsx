'use client'
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

import { SignUpSchema } from '@/schema'
import LoadingButton from '@/components/loading-btn'
import { handleCredentialsSignin, handleSignUp } from '@/actions/authActions'
import ErrorMessage from './ErrorMessage'
import Web3 from 'web3'




export default function CustomForm2() {
    const [globalError,setGlobalError] = useState<string>("");
    const [isconnected,setIsConnected ] = useState(false);
    const [ethBalance,setEthBalance] =useState("")
    const [account, setAccount] = useState("");
    const [isloading,setIsLoading]=useState(false);



    const form = useForm<z.infer<typeof SignUpSchema>>({
      resolver: zodResolver(SignUpSchema),
      defaultValues: {
        username: "",
        password: "",
        email:"",
        confirmPassword:""
      }
    });
    
      const onSubmit = async (values:z.infer<typeof SignUpSchema>) => {

          try {
            const res:ServerActionResponse = await handleSignUp(values);
            console.log(res);

            if(res.success){
              console.log("Account created successfully");

              const valuesForLogin={
                email:values.email,
                password:values.password,
                username:values.username
              };

              await handleCredentialsSignin(valuesForLogin);
            }

            else{
              setGlobalError(res.message)
            }
            
          } catch (error) {
            setGlobalError("An unexpected error occured.Please try again .");
            
          }
      }
  
   const detectCurrentProvider = ()=>{
      let provider;

      if(window.ethereum){
        provider=window.ethereum;
      }
      else{
        throw new Error;
      }

      return provider;
    };


    const onConnect = async()=>{
      try{
        setIsLoading(true);
        const currentProvider =detectCurrentProvider();
        if(currentProvider){
            await currentProvider.request({method:'eth_requestAccounts'});
            const web3= new Web3(currentProvider);
            const userAccount = await web3.eth.getAccounts();
            const account = userAccount[0];
            const ethBalance = await web3.eth.getBalance(account);
            setEthBalance(ethBalance.toString());
            setAccount(userAccount[0]);
            setIsConnected(true);
            setIsLoading(false);

        }
      }
      catch (error){
        console.log(error);
      }
      
    }
      if(!window.ethereum){
        return (
          <div className='flex min-h-screen h-screen w-full items-center justify-center'>
            <h1 className='text-4xl font-bold '>Metamask not found</h1>
          </div>
        )
      }

  return (
    <div className='flex flex-col items-center mt-10 justify-center w-full'>
        {globalError && <ErrorMessage error={globalError} />}
      {  !isconnected ? <Button onClick={onConnect}>{isloading?"Connecting...":"Connect to your wallet"}</Button>
      :  <div className='flex flex-col text-center'>
        {
          
          <div className='flex flex-col text-center'>
            <span>You are connected to your wallet</span>
        <span>Address:{account}</span>
        <span>Balance:{ethBalance}</span>
          </div>
        }
      </div>
      }
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 w-1/3">
          <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="johndoe@mail.com" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="**********" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />


          
<FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="**********" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
              
            <div className='text-center py-5 w-full'>
                <LoadingButton pending={form.formState.isSubmitting || !isconnected } text="Signup"/>
            </div>
          </form>

          </Form>

          
  </div>
  
  )
}
