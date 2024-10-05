import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
// import { stories } from '@/data'
import Link from 'next/link'
import { getPosts } from '@/actions/postActions'

export default async function PostsPage() {


    const stories = await getPosts();
    return (
        <main className='flex flex-col items-center mt-10 justify-center '>



            <h1 className='text-6xl font-bold'>All Posts</h1>

            <div className=" flex flex-col gap-4 mt-10 max-w-screen-xl ">
                {

                    stories.length==0 ? <h1 className='text-3xl'>No stories found</h1> :
                    stories.map((story,i) => (
                        <Link key={i} href={`/post/${story.id}`}><Card >
                            <CardHeader>
                                <CardTitle>{story.title}</CardTitle>
                                <CardDescription>{story.content && story.content.slice(0, 500)}...</CardDescription>
                            </CardHeader>
                        </Card></Link>

                    ))
                    
                }
            </div>
        </main>
    )
}
