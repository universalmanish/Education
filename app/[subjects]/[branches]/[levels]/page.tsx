"use client"
import { Card } from "@/components/ui/card";
import { levelData } from "@/db/queries";
import { heading, levels, subHeading } from "@/db/schema";
import { routeItem } from "@/lib/route-finder";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface DataType {
  headings?: { id: number; title: string; }[];
  subHeadings?: { id: number; title: string; }[];
}

const LevelContent = () => {
  const [newData, setNewData] = useState<DataType>({})
  const pathName = usePathname()
  const item = routeItem(pathName)

  useEffect(() => {
    levelData(item)
      .then((result: any) => setNewData(result || {}))
  }, [item]);

  return (
    <div className="pl-8 grid lg:grid-cols-2 sm:grid-cols-1 gap-7">
     {newData.headings && newData.headings.map((heading) => (
        <div key={heading.id}>
          <Card>
            <h1 className="text-2xl font-bold">{heading.title}</h1>
            <p>
              {newData.subHeadings && newData.subHeadings
                .filter((subHeading) => subHeading.id === heading.id)
                .map((filteredSubHeading) => (
                  <div key={filteredSubHeading.id}>{filteredSubHeading.title}</div>
                ))}
            </p>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default LevelContent;


