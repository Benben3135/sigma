import Navbar from "@/components/Navbar"
import SideNavBar from '@/components/SideNavBar';

export default function DashboardLayout({
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