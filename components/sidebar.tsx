"use client"
import { cn } from "@/lib/utils"
import { SidebarItem } from "./sidebar-item"

type Props = {
    href: string,
    className?: string,
    data: {
        id: number;
        title: string;
        route: string;
      }[];
}

export const Sidebar = ({ className, data, href }: Props) => {
    return (
        <div className={cn("flex-col h-full lg:fixed lg:w-[300px] left-0 top-0 border-r-2 hidden lg:flex", className)}>
            <div className="pt-6">
                <SidebarItem data={data} href={href}/>
            </div>
        </div>
    )
}