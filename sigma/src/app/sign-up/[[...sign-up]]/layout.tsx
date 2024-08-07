import Navbar from "@/components/Navbar"

export default function SignUpLayout({
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