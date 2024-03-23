"use client"
import { Card } from "@/components/ui/card";
import { getSubjects } from "@/db/queries";
import { subjects } from "@/db/schema";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {
  Data: typeof subjects.$inferSelect[]
}
const MainPage = ({Data}:Props) => {
  const [data, setData] = useState<typeof Data>([])
 
  useEffect(() => {
    getSubjects()
    .then(result => setData(result))
  },[])

  return (
    <div className="h-full w-full p-8">
      <div className="grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-8 pb-8">
        {data.map(i => (
          <Link href={i.route} key={i.id}>
           <Card className="aspect-square flex-col gap-y-4 bg-gradient-to-r from-purple-500 to-green-400 flex items-center justify-center font-bold text-4xl rounded-2xl">
            <Image 
              src="/mathematics/chemistry.png"
              alt="image"
              height={150}
              width={150}
            />
            {i.title}
           </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MainPage;