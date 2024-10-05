import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { deletePost } from '@/actions/postActions'
import prisma from '@/lib/db'
import { notFound } from 'next/navigation'


interface paramsType {
    params:{
        slug:string;
    }
}


export default async function page({params}:paramsType) {

    const id = parseInt(params.slug);
    const story= await prisma.posts.findUnique({
        where:{
            id
        }
    });

    if(!story){
        notFound();
    }




    return (
        <main className='flex flex-col items-center mt-10 justify-center'>

            <div className=" flex flex-col gap-4 mt-10 max-w-screen-xl ">

                {
                    story && 
                    <Card>
                        <CardHeader>
                            <CardTitle>{story.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>{story.content}</p>
                        </CardContent>
                        <CardFooter className='flex items-center justify-center'>
                            <form action={deletePost}>
                            <input type="hidden" name='id' value={id} />
                            <Button id='delete'  variant={'destructive'} className='font-bold text-lg '>Delete</Button>

                            </form>
                        </CardFooter>
                    </Card>
                }


            </div>

        </main>
    )
}
