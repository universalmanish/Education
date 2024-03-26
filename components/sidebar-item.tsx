
import Link from "next/link"
import { Card } from "./ui/card"
import { cn } from "@/lib/utils";


type Props = {
  href: string,
  data: {
    id: number;
    title: string;
    route: string;
  }[];
};


export const SidebarItem = ({data, href}: Props) => {
  return (
    <div className="pl-3 pr-5">
      <Link href="/">
        <h1 className="text-3xl font-bold text-amber-500">Origin</h1>
      </Link>
      <div className="pt-5 flex flex-col gap-y-3">
        {data.map(sub => (
          <Link key={sub.id} href={sub.route}>
            <Card className={cn("rounded text-xl font-bold hover:bg-slate-300  flex items-center justify-start pl-7 h-20", href === sub.route ? "bg-slate-300" : "bg-white")}>
              {sub.title}
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}