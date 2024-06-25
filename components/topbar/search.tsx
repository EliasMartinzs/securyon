import { Input } from "../ui/input";
import { Search as SearchIcon } from "lucide-react";

export const Search = () => {
  return (
    <div className="relative w-full">
      <Input
        className="h-10 rounded-full bg-accent/50 outline-none"
        placeholder="Buscar por items..."
      />
      <SearchIcon className="absolute top-2 right-4" />
    </div>
  );
};
