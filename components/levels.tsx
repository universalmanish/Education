import { generateLevels } from "@/lib/generate-levels";
import Link from "next/link";
import { Card } from "./card-gradient";
import { Star } from "lucide-react";
import { absoluteUrl } from "@/lib/utils";

interface LevelsProps {
    level: number,
    href: string
}
export const Levels = ({level, href}: LevelsProps) => {
    const createArray = generateLevels(level)

    return (
        <div className="h-full w-full p-8 overflow-auto">
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-7">
                {createArray.map(level => (
                    <Link key={level} href={`${absoluteUrl}/${href}/${level}`}>
                        <Card className="flex flex-col items-center justify-center gap-y-5 pt-2 pb-2">
                            <Star className="h-10 w-10" />
                            <span className="text-2xl font-bold">Level {level}</span>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
};

