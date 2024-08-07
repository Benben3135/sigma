import { SignUp } from "@clerk/nextjs";

export default function page() {
    return (
      <div className='h-screen flex items-center justify-center flex-col gap-10'>
          <SignUp />
      </div>
  )
  }
  