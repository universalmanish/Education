"use client"
import { Card } from "@/components/ui/card";
import { getDynamicLevels } from "@/db/queries";
import { levels } from "@/db/schema";
import { createList } from "@/lib/create-list";
import { countSlashes, routeItem } from "@/lib/route-finder";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  children: React.ReactNode,
  Data: typeof levels.$inferSelect[]
}


const LevelContent = ({ Data }: Props) => {
  const [data, setData] = useState<typeof Data>([])
  const pathName = usePathname()
  const countSlash = countSlashes(pathName)
  const routeItems = routeItem(pathName)


  useEffect(() => {
    getDynamicLevels(countSlash, routeItems)
      .then(result => setData(result))
  }, [countSlash, routeItems])

  return (
    <div className="pl-8 grid lg:grid-cols-2 sm:grid-cols-1 gap-7">
      {data.map(item => (
        <Card key={item.id} className="rounded-xl p-5">
          <h1 className="text-xl font-bold">{item.heading}</h1>
          <ul>
            {item.subHeading.split(',').map((subItem, index) => (
              <li key={index}>&#8226; {subItem.trim()}</li>
            ))}
          </ul>
        </Card>
      ))}
    </div>
  );
};

export default LevelContent;
