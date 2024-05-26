import { cn } from "@/lib/utils";
import { DarkMode } from "./dark-mode";
import { SearchInput } from "./search-input";
import { Menu } from "lucide-react";

export const Navbar = ({className = ''}) => {
    return (
        <nav className={cn("fixed bg-white dark:bg-black dark:border-none top-0 h-[70px] shadow-sm rounded-lg border-2 flex items-center space-x-30 pr-2 justify-between pl-5 max-w-screen gap-x-5 mx-auto", className)}>
            <Menu className="lg:hidden flex h-8 w-8 text-muted-forground"/>
            <SearchInput />
            <DarkMode />
        </nav>

    );
};

