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
    <div className="h-full">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-2 gap-9">
        {newData.map(i => (
          <Card key={i.id} onClick={() => onClick(i.route)} className="aspect-square flex  bg-white dark:bg-black border-2 shadow-lg rounded-3xl">
            <p className="flex flex-col items-center justify-center p-10 sm:text-2xl md:text-2xl lg:text-2.5xl xl:text-3xl font-bold">{i.title}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BranchPage
