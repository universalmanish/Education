"use client"
import { Card } from "@/components/ui/card";
import { getLevelContent } from "@/db/queries";
import { levelContent,  } from "@/db/schema";
import { routeItem } from "@/lib/route-finder";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  schema: typeof levelContent.$inferSelect[]
}


const LevelContent = ({ schema }: Props) => {
  const [data, setData] = useState<typeof schema>([])
  const pathName = usePathname()
  const item = routeItem(pathName)

  useEffect(() => {
    getLevelContent(item)
      .then(result => setData(result))
  }, [item]);

  if (data === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pl-8 grid lg:grid-cols-2 sm:grid-cols-1 gap-7">
      {data.map(item =>
        <Card key={item.id} className="rounded-xl p-5">
          <h1 className="text-xl font-bold">{item.heading}</h1>
          <ul>
            {item.subHeading.split(',').map((subItem: string, index: number) => (
              <li key={index}>{subItem.trim()}</li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
};

export default LevelContent;


// {!data ? (<div>Loading...</div>) :
//         data.map((item) => (
//           <Card key={item.id} className="rounded-xl p-5">
//             <h1 className="text-xl font-bold">{item.heading}</h1>
//             <ul>
//               {item.subHeading.split(',').map((subItem, index) => (
//                 <li key={index}>{subItem.trim()}</li>
//               ))}
//             </ul>
//           </Card>
//         ))}
