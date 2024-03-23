"use client"
import { MobileHeader } from "@/components/mobile-header";
import { Card } from "@/components/ui/card";
import { getDynamicBranches } from "@/db/queries";
import { branches } from "@/db/schema";
import { countSlashes, routeItem } from "@/lib/route-finder";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  children: React.ReactNode,
  Data: typeof branches.$inferSelect[]
}


const BranchPage = ({ Data }: Props) => {
  const [data, setData] = useState<typeof Data>([])
  const router = useRouter()
  const pathName = usePathname()
  const countSlash = countSlashes(pathName)
  const routeItems = routeItem(pathName)


  useEffect(() => {
    getDynamicBranches(countSlash, routeItems)
      .then(result => setData(result))
  }, [countSlash, routeItems])

  const onClick = (route: string) => {
    router.push(`${pathName}/${route}`)
  }

  return (
    <div className="pl-10">
      <div className="grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-9">
        {data.map(i => (
          <Card key={i.id} onClick={() => onClick(i.route)} className="aspect-square flex items-center justify-center font-bold text-3xl bg-gradient-to-r from-amber-300 to-pink-500 rounded-3xl">
            {i.title}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BranchPage