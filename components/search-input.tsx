"use client"

import { Search } from "lucide-react"
import { Input } from "./ui/input"

type Props = {
    query: string,
    className?: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}
export const SearchInput = ({query, onChange}:Props) => {
    return (
        <div className="w-full relative">
            <Search
                className="absolute top-1/2 left-3 transform -translate-y-1/2 text-muted-foreground h-4 w-4"
            />
            <Input
                className="w-full pl-9"
                onChange={onChange}
                value={query}
                placeholder="Search..."
            />
        </div>
    )
}
