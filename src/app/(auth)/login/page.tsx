
import CustomForm from "@/components/custom-form";
import Link from "next/link";



export default function Login() {

  return (
    <main className='flex flex-col items-center mt-10 justify-center'>

    
        <CustomForm/>
        <div className="text-sm text-gray-500">
          Don't have an account ? <Link className="underline" href="/signup">Signup</Link>
        </div>
    </main>
  )
}
