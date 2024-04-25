import { Search } from "lucide-react";
import { DarkMode } from "./dark-mode";
import { Input } from "./ui/input";
import { SearchInput } from "./search-input";

export const Navbar = () => {
    return (
        <nav className="lg:ml-[298px] fixed w-full lg:w-[1051px] bg-white dark:bg-black top-0 h-[70px] shadow-sm rounded-lg border-2 flex items-center space-x-30 pr-2 justify-between pl-5 max-w-screen gap-x-5">
            <SearchInput />
            <DarkMode />
        </nav>

    );
};

