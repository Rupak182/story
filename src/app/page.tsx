import { Button } from "@/components/ui/button";
import Link from 'next/link'
import Image from "next/image";

export default function Home() {
  return (
 <main className="flex  items-center justify-center">
    <div className="hero flex gap-2 mt-10 max-w-screen-xl ">
      <div className="content w-1/2 p-10 flex gap-6 flex-col px-14 ">
        <h1 className="text-6xl font-bold ">Unleash Your Ideas: Dive into a World of Inspiring Stories</h1>
        <h2 className="text-3xl font-semibold">Create your post now. </h2>
        <Link href="/create-post"><Button size={"lg"} className="w-fit mt-4 text-xl font-bold ">Start Creating </Button></Link>
      </div >
      <div className="p-3 w-1/2">
      <Image src="/hero.jpeg" alt="hero" width={500} height={500} className="object-contain "/>
      </div>
    </div>
 </main>
  );
}
