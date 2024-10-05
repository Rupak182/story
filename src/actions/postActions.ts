
"use server"
import prisma from '@/lib/db';
import { CreatePostSchema } from '@/schema';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {z} from 'zod'


export async function createPost({title,content}:z.infer<typeof CreatePostSchema>) {

    try {
        await prisma.posts.create({
            data:{
                title,
                content
            }
        });

        revalidatePath('/posts');
        redirect("/posts");

    } catch (error) {
        console.log(error);

            throw error;
    }

}



export async function resetCounter() {

    try {
        await prisma.posts.deleteMany({
            where:{

            }
        })
        await prisma.$queryRaw`UPDATE SQLITE_SEQUENCE SET seq = 0 WHERE name = 'posts'`;
    } catch (error) {
        console.log(error);

            throw error;
    }

}


export async function getPosts(){
    try {
        const res =await prisma.posts.findMany({
            where:{}
        })

        return res;
    } catch (error) {
        throw {};
    }
}


export async function deletePost(formData:FormData) {

    const id =parseInt(formData.get("id") as string);
    
    try {
        await prisma.posts.delete({
            where:{
                id:id
            }
        });

        revalidatePath('/posts');
        redirect("/posts");

    } catch (error) {
        console.log(error);

            throw error;
    }

}
