"use client"
import { List } from "@/components/list";
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
  const pathName = usePathname()
  const countSlash = countSlashes(pathName)
  const routeItems = routeItem(pathName)


  useEffect(() => {
    pageDynamicData(countSlash, routeItems)
      .then((result: any) => setNewData(result))
  }, [countSlash, routeItems])

  return (
    <div className="p-2">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-9">
        <List star={true} pathName={pathName} data={newData}/>
      </div>
    </div>
  );
};

export default LevelPage;