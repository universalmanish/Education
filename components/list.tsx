"use client"

import { Card } from "./ui/card"
import {  useRouter } from "next/navigation";

type Props = {
    pathName: string,
    data: {
        id: number,
        title: string,
        route: string,
        imageUrl?: string | null
    }[]
}

export const List = ({ data, pathName }: Props) => {
    const router = useRouter()
    const onClick = (route: string) => {
        router.push(`${pathName}/${route}`)
    }

    return (
        <div className="h-full w-full pt-2 p-4">
            <div className="grid lg:grid-cols-4 sm:grid-cols-1 md:grid-cols-2 gap-8 pb-8">
                {data.map(i => (
                    <Card
                        className="w-64 h-64 bg-white dark:bg-black shadow-lg rounded-xl overflow-hidden p-8  flex items-center justify-center"
                        key={i.id}
                        onClick={() => onClick(i.route)}
                    >
                        <p className="dark:text-white text-center font-bold text-2xl">{i.title}</p>
                    </Card>
                ))}
            </div>
        </div>
    )
}
