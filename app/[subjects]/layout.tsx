"use client"
import { Navbar } from "@/components/navbar"
// import { MobileHeader } from "@/components/mobile-header"
import { Sidebar } from "@/components/sidebar"
import { sidebarDynamicData } from "@/db/queries"
import { branch } from "@/db/schema"
import { countSlashes, lastItem, routeItem } from "@/lib/route-finder"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

type Props = {
  children: React.ReactNode,
  data: {
    id: number,
    title: string,
    route: string,
  }[]
}


const StartPageLayout = ({ children, data }: Props) => {
  const [newData, setNewData] = useState<typeof data>([])
  const pathName = usePathname()
  const countSlash = countSlashes(pathName)
  const routeItems = routeItem(pathName)
  const lastItm = lastItem(pathName)


  useEffect(() => {
    sidebarDynamicData(countSlash, routeItems)
      .then((result: any) => setNewData(result))
  }, [countSlash, routeItems])
  return (
    <div className="h-full">
      <Sidebar data={newData} href={lastItm} />
      <main className="lg:pl-[298px] lg:dark:pl-[300px] h-full pt-[60px]">
        <Navbar className="w-full lg:w-[1071px] mx-auto"/>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  )
}


export default StartPageLayout

