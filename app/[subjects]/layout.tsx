"use client"
import { MobileHeader } from "@/components/mobile-header"
import { Sidebar } from "@/components/sidebar"
import { getDynamicSubjects } from "@/db/queries"
import { branches } from "@/db/schema"
import { countSlashes, lastItem, routeItem} from "@/lib/route-finder"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

type Props = {
  children: React.ReactNode,
  Data: typeof branches.$inferSelect[]
}


const StartPageLayout = ({children, Data }: Props) => {
  const [data, setData] = useState<typeof Data>([])
  const pathName = usePathname()
  const countSlash = countSlashes(pathName)
  const routeItems = routeItem(pathName)
  const lastItm = lastItem(pathName)
  
  
  useEffect(() => {
    getDynamicSubjects(countSlash, routeItems)
    .then(result => setData(result))
  },[countSlash, routeItems])
  return (
    <>
      <MobileHeader />
      <Sidebar data={data} href={lastItm}/>
      <main className="lg:pl-[256px] h-full w-full lg:pt-0 pt-[20px]">
        <div className="lg:pl-[50px] sm:pl-[30px] pt-8 h-full w-full pr-8">
          {children}
        </div>
      </main>
    </>
  )
}


export default StartPageLayout

