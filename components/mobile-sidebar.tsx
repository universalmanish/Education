// "use client"
// import { Menu } from "lucide-react"
// import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
// import { Sidebar } from "./sidebar"
// import { branches } from "@/db/schema"
// import { useEffect, useState } from "react"
// import { usePathname } from "next/navigation"
// import { countSlashes, lastItem, routeItem } from "@/lib/route-finder"
// import { getDynamicSubjects } from "@/db/queries"


// export const MobileSidebar = () => {
//     const [data, setData] = useState<typeof branches.$inferSelect[]>([])
//     const pathName = usePathname()
//     const countSlash = countSlashes(pathName)
//     const routeItems = routeItem(pathName)
//     const lastItm = lastItem(pathName)


//     useEffect(() => {
//         getDynamicSubjects(countSlash, routeItems)
//             .then(result => setData(result))
//     }, [countSlash, routeItems])
//     return (
//         <Sheet>
//             <SheetTrigger>
//                 <Menu />
//             </SheetTrigger>
//             <SheetContent side="left" className="bg-white p-0 z-[100]">
//                 <Sidebar data={data} href={lastItm} />
//             </SheetContent>
//         </Sheet>
//     )
// }