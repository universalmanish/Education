"use client"

import { Star } from "lucide-react";
import { Card } from "./ui/card"
import {  useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

type Props = {
    className?: string,
    pathName: string,
    star?: boolean,
    data: {
        id: number,
        title: string,
        route: string,
        imageUrl?: string | null
    }[]
}

export const List = ({ data, pathName, star, className }: Props) => {
    const router = useRouter()
    const onClick = (route: string) => {
        router.push(`${pathName}/${route}`)
    }

    return (
        <div className="h-full w-full">
            <div className={cn("grid absolute lg:space-x-6 items-center justify-center lg:grid-cols-4 sm:grid-cols-1 md:grid-cols-2 gap-8 pb-8", className)}>
                {data.map(i => (
                    <Card
                        className="w-64 h-64 bg-white dark:bg-black shadow-lg rounded-xl overflow-hidden p-8 flex flex-col gap-y-5 items-center justify-center"
                        key={i.id}
                        onClick={() => onClick(i.route)}
                    >
                        {star && (<Star className="h-10 w-10"/>)}
                        <p className="dark:text-white text-center font-bold text-2xl">{i.title}</p>
                    </Card>
                ))}
            </div>
        </div>
    )
}
