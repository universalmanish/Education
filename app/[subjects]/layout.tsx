"use client"
import { Navbar } from "@/components/navbar"
import { Sidebar } from "@/components/sidebar"
import { sidebarDynamicData } from "@/db/queries"
import { countSlashes, lastItem, routeItem } from "@/lib/route-finder"
import { useQuery } from "@/store/useQuery"
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
  const { query, setQuery } = useQuery()
  const pathName = usePathname()
  const countSlash = countSlashes(pathName)
  const routeItems = routeItem(pathName)
  const lastItm = lastItem(pathName)


  useEffect(() => {
    sidebarDynamicData(countSlash, routeItems)
      .then((result: any) => setNewData(result))
  }, [countSlash, routeItems])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
    console.log(event.target.value)
  };


  return (
      <div className="h-full">
        <Sidebar data={newData} href={lastItm} />
        <main className="lg:pl-[298px] lg:dark:pl-[300px] h-full pt-0">
          <Navbar query={query} onChange={handleInputChange} className="w-full lg:w-[1071px] mx-auto" />
          <div className="p-10">
            {children}
          </div>
        </main>
      </div>
  )
}


export default StartPageLayout

