"use client"
// import { MobileHeader } from "@/components/mobile-header"
import { Sidebar } from "@/components/sidebar"
import { sidebarDynamicData } from "@/db/queries"
import { branch } from "@/db/schema"
import { countSlashes, lastItem, routeItem} from "@/lib/route-finder"
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


const StartPageLayout = ({children, data }: Props) => {
  const [newData, setNewData] = useState<typeof data>([])
  const pathName = usePathname()
  const countSlash = countSlashes(pathName)
  const routeItems = routeItem(pathName)
  const lastItm = lastItem(pathName)
  
  
  useEffect(() => {
    sidebarDynamicData(countSlash, routeItems)
    .then((result: any) => setNewData(result))
  },[countSlash, routeItems])
  return (
    <>
      {/* <MobileHeader /> */}
      <Sidebar data={newData} href={lastItm}/>
      <main className="lg:pl-[256px] h-full w-full lg:pt-0 pt-[20px]">
        <div className="lg:pl-[50px] sm:pl-[30px] pt-8 h-full w-full pr-8">
          {children}
        </div>
      </main>
    </>
  )
}


export default StartPageLayout

