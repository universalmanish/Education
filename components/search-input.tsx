import { Search } from "lucide-react";
import { Input } from "./ui/input";

export const SearchInput = () => {
  return (
    <div className="w-full relative">
      <Search className="absolute top-1/4 left-3 text-muted-foreground h-4 w-4"/>
      <Input className="pl-9 h-8 rounded" placeholder="Search..."/>
    </div>
  );
};

