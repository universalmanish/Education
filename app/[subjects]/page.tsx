"use client"
import { Card } from "@/components/ui/card";
import { pageDynamicData } from "@/db/queries";
import { branch } from "@/db/schema";
import { countSlashes, routeItem } from "@/lib/route-finder";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  data: {
    id: number,
    title: string,
    route: string,
    imageUrl?: string
  }[]
}


const BranchPage = ({data}: Props) => {
  const [newData, setNewData] = useState<typeof data>([])
  const router = useRouter()
  const pathName = usePathname()
  const countSlash = countSlashes(pathName)
  const routeItems = routeItem(pathName)


  useEffect(() => {
    pageDynamicData(countSlash, routeItems)
      .then((result: any) => setNewData(result))
  }, [countSlash, routeItems])

  const onClick = (route: string) => {
    router.push(`${pathName}/${route}`)
  }

  return (
    <div className="pl-10">
      <div className="grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-9">
        {newData.map(i => (
          <Card key={i.id} onClick={() => onClick(i.route)} className="aspect-square flex items-center justify-center font-bold text-3xl bg-gradient-to-r from-amber-300 to-pink-500 rounded-3xl">
            {i.title}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BranchPage
