import { cn } from "@/lib/utils";
import { DarkMode } from "./dark-mode";
import { Menu } from "lucide-react";
import { SearchInput } from "./search-input";

type Props = {
    query: string,
    className?: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const Navbar = ({ className, query, onChange }: Props) => {

    return (
        <nav className={cn("bg-white dark:bg-black dark:border-none top-0 h-[70px] shadow-sm rounded-lg border-2 flex items-center space-x-30 pr-2 justify-between pl-5 max-w-screen gap-x-5 mx-auto", className)}>
            <Menu className="lg:hidden flex h-8 w-8 text-muted-forground" />
            <SearchInput query={query} onChange={onChange}/>
            <DarkMode />
        </nav>

    );
};
