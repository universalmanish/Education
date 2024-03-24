"use client"
import { Card } from "@/components/ui/card";
import { getDynamicLevels } from "@/db/queries";
import { levels } from "@/db/schema";
import { countSlashes, routeItem } from "@/lib/route-finder";
import { Star } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  Data: typeof levels.$inferSelect[]
}


const LevelPage = ({ Data }: Props) => {
  const [data, setData] = useState<typeof Data>([])
  const router = useRouter()
  const pathName = usePathname()
  const countSlash = countSlashes(pathName)
  const routeItems = routeItem(pathName)


  useEffect(() => {
    getDynamicLevels(countSlash, routeItems)
      .then(result => setData(result))
  }, [countSlash, routeItems])

  const onClick = (route: string) => {
    router.push(`${pathName}/${route}`)
  }
  return (
    <div className="pl-10">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-9">
        {data.map(i => (
          <Card key={i.id} onClick={() => onClick(i.route)} className="aspect-square flex flex-col items-center justify-center font-bold text-3xl bg-gradient-to-r from-amber-300 to-pink-500 rounded-3xl gap-y-6">
            <Star className="h-[50px] w-[50px]"/>
            {i.title}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LevelPage;