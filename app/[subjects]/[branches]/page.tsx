"use client"
import { Card } from "@/components/ui/card";
import { pageDynamicData } from "@/db/queries";
import { countSlashes, routeItem } from "@/lib/route-finder";
import { Star } from "lucide-react";
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


const LevelPage = ({ data }: Props) => {
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
    <div className="p-2">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-2 gap-9">
        {newData.map(i => (
          <Card key={i.id} onClick={() => onClick(i.route)} className="aspect-square flex flex-col items-center justify-center font-bold sm:text-xl lg:text-3xl md:text-2xl bg-white dark:bg-black shadow-lg rounded-3xl gap-y-6">
            <Star className="lg:h-[50px] lg:w-[50px] md:h-[30px] md:w-[30px]"/>
            {i.title}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LevelPage;