import { Menu } from "lucide-react"
import { MobileSidebar } from "./mobile-sidebar"

export const MobileHeader = () => {
    return (
        <nav className="top-0 border-b-2 h-[45px] lg:ml-[300px] z-50 shadow-sm">
           <div className="lg:hidden sm:flex pt-2 pl-2">
            <MobileSidebar/>
           </div>
        </nav>
    )
}