import SetUpNavBar from "@/components/SetUpNavBar"

export default function SetUpLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <div>
        <SetUpNavBar/>
        {children}
      </div>
    )
  }