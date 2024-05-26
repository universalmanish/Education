"use client"
import { Navbar } from "@/components/navbar";
import { Card } from "@/components/ui/card";
import { getSubjects } from "@/db/queries";
import { subject } from "@/db/schema";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {
  Data: typeof subject.$inferSelect[]
}
const MainPage = ({ Data }: Props) => {
  const [data, setData] = useState<typeof Data>([])

  useEffect(() => {
    getSubjects()
      .then(result => setData(result))
  }, [])

  return (
    <>
      <Navbar className="w-full"/>
        <div className="h-full w-full pt-20 p-8 mt-3">
          <div className="grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-8 pb-8">
            {data.map(i => (
              <Link href={i.route} key={i.id}>
                <Card className="flex flex-col bg-white dark:bg-black font-bold text-4xl items-center justify-center gap-y-3 rounded-xl pb-7 pt-5 border-2 shadow-lg">
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
    </>
  );
};

export default MainPage;