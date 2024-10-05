"use server"


import { signIn, signOut } from "@/auth"
import prisma from "@/lib/db"
import { SignUpSchema } from "@/schema"

import { AuthError } from "next-auth"
import bcryptjs from "bcryptjs";
import { revalidatePath } from "next/cache"

export async function handleCredentialsSignin({ username, password }: { username: string, password: string }) {

    try {
        await signIn("credentials", { username, password, redirectTo: "/" });  // credentails signin and a object


    } catch (error) {

        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return {
                        message: 'Invalid credentials'
                    }

                default:
                    return {
                        message:"Something went wrong"
                    }
            }

        }
        throw error; // important -> otherwise won't work reliabily
    }
}


export async function handleSignOut(){
    await signOut();
    
}



export async function handleSignUp({username,email,password,confirmPassword}:{username:string,email:string,password:string,confirmPassword:string}){
    try {
        const parsedCredentials= SignUpSchema.safeParse({email,username,password,confirmPassword});  // validation

        if(!parsedCredentials.success){
            return {success:false,message:"Invalid data."}
        }

        const existingEmail =await prisma.user.findUnique({
                where:{
                    email
                }
        })

        if(existingEmail){
            return {success:false,message:"Email Taken."}

        }
        const existingName =await prisma.user.findUnique({
            where:{
                username
            }
    })

    if(existingName){
        return {success:false,message:"Username Taken."}

    }


    const hashedPassword =await bcryptjs.hash(password,10);

    await prisma.user.create({
        data:{
            username,
            email,
            password:hashedPassword
        }
    })


        return {success:true,message:"Accout created successfully"}

    } catch (error) {
        console.log("Error creating account: ", error);
        return {success:false,message:"An unexpected error occured. Please try again."}

    }
}