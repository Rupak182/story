import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import email from "next-auth/providers/email";
import { LoginSchema } from "./schema";
import { error } from "console";
import { NextResponse } from "next/server";
import prisma from "./lib/db";
import bcryptjs from "bcryptjs"

const publicRoutes = ["/login","/signup" ,"/"]
const authRoutes = ["/login","/signup"]

export const {handlers,signIn,signOut,auth} = NextAuth({
    providers:[
        Credentials({
            credentials:{
                username:{label:"username", type:"text", placeholder:"John D" },
                password:{label:"password", type:"password", placeholder:"********"}
            },
            async authorize(credentials) {     // user passed credentials  ->  successful return user object
          
                let user =null;

                const parsedCredentials = LoginSchema.safeParse(credentials);

                if(!parsedCredentials.success){
                    console.error("Invalid credentials:" , parsedCredentials.error.errors);
                    return null;
                }


                user = await prisma.user.findUnique({
                    where:{
                        username: credentials.username as string
                    }
                });


                if(!user){
                    console.log("Invalid credentials");
                    return null;
                }

                const isPasswordValid =await bcryptjs.compare(credentials.password as string ,user.password);

                if(!isPasswordValid){
                    console.log("Invalid password");
                    return null;
                }


                // user={
                //     id:"1",
                //     username:"test",
                //     email:"test@test.com",
                //     password:"test12345"
                // }

                
                
                return user;
            }  

        })
    ],

    callbacks: {
        authorized({ request: { nextUrl }, auth }) {
            const isLoggedIn = !!auth?.user;

            const {pathname}= nextUrl;
            if(publicRoutes.includes(pathname)){
                return true;
            }

            if(authRoutes.includes(pathname)){
                if(isLoggedIn){
                    return Response.redirect(new URL("/",nextUrl));
                }
                return true;  // auth routes and not logged in ,let the user access it
            }

            return isLoggedIn;   // redirects to login page

  
        },
    },

    pages:{
        signIn:"/login"
    },

   
    
})