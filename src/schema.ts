import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"


export const LoginSchema = z.object({
    username:z.string({required_error:"Username is required"}).min(3,{
        message:"Username must be atleast 3 characters long."
    }),

    // email:z.string().email(),

    password:z.string({required_error:"Password is required"}).min(5,{
        message:"Password must be 5 characters long."
    })

});



export const SignUpSchema = z.object({
    username:z.string({required_error:"Username is required"}).min(3,{
        message:"Username must be atleast 3 characters long."
    }),

    email:z.string().email("Invalid email "),

    password:z.string().min(5,{
        message:"Password must be 5 characters long."
    }),


    confirmPassword:z.string().min(5,{
        message:"Password must be 5 characters long."
    })

}) .refine((data)=>data.password === data.confirmPassword ,{
    message:"Password don't match",
    path:["confirmPassword"]
});


export const CreatePostSchema = z.object({
    title:z.string().min(5,{
        message:"Title must be atleast 5 characters long."
    }),

    content:z.string()


})    ;
