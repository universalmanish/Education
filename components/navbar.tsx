import { DarkMode } from "./dark-mode";
import { Input } from "./ui/input";

export const Navbar = () => {
    return (
        <nav className="lg:ml-[298px] fixed w-full lg:w-[1051px] bg-white dark:bg-black top-0 h-[50px] rounded-lg border-2 flex items-center space-x-30 pr-2 justify-between pl-5 max-w-screen">
            <Input placeholder="Search..." className="h-8 w-200 border-slate-300 rounded-xl"/>
            <DarkMode />
        </nav>

    );
};

