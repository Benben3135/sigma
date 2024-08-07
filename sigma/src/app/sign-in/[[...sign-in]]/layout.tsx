import Navbar from "@/components/Navbar"

export default function SignInLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <div>
        <Navbar />
        {children}
      </div>
    )
  }