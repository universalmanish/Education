"use client"
import { Card } from "@/components/ui/card";
import { levelData } from "@/db/queries";
import { heading, levels, subHeading } from "@/db/schema";
import { routeItem } from "@/lib/route-finder";
import { redirect, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// interface DataType {
//   headings?: { id: number; title: string; }[];
//   subHeadings?: { id: number; title: string; }[];
// }

// type DataTypes = {
//   data: { id: number, title: string, subHeading: { id: number, title: string }[] }[]
// }

type DataItem = {
  id: number;
  title: string;
  levelId: number;
  subHeading?: {
    id: number;
    title: string;
    subHeadingId: number;
  }[]; 
};

const LevelContent = () => {
  const [newData, setNewData] = useState<DataItem[]>([]);
  const pathName = usePathname();
  const item = routeItem(pathName);

  useEffect(() => {
    levelData(item)
    .then((result: any) => setNewData(result))
  }, [item]);

  return (
    <div className="pl-8 grid lg:grid-cols-2 sm:grid-cols-1 gap-7">
       {newData.map((heading) => (
          <Card key={heading.id} className="p-4 rounded-xl">
            <h1 className="text-2xl font-bold">{heading.title}</h1>
            <ul>
              {heading.subHeading?.map((subHeading => (
                <li key={subHeading.id}>
                  &#x2022; {subHeading.title}
                </li>
              )))}
            </ul>
          </Card>
       ))}
    </div>
  );
};

export default LevelContent;
