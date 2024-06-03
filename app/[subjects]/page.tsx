"use client"
import { List } from "@/components/list";
import { Card } from "@/components/ui/card";
import { pageDynamicData } from "@/db/queries";
import { branch } from "@/db/schema";
import { countSlashes, routeItem } from "@/lib/route-finder";
import { useQuery } from "@/store/useQuery";
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
  const {query, setQuery} = useQuery()
  const pathName = usePathname()
  const slash = countSlashes(pathName)
  const routeItems = routeItem(pathName)

  useEffect(() => {
    if (query.length == 0) {
      pageDynamicData(slash, routeItems)
      .then((result: any) => setNewData(result))
    } else {
      fetch(`/api/2?q=${query}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setNewData(data);

        })
    }
  }, [query, data, slash, routeItems]);


  return (
    <div className="h-full">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-9">
        <List pathName={pathName} data={newData}/>
      </div>
    </div>
  );
};

export default BranchPage
