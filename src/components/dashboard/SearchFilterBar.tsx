import React, { useState } from "react";
import { Search, Filter, MapPin, Droplet } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";

interface SearchFilterBarProps {
  onSearch?: (query: string) => void;
  onFilterChange?: (filters: FilterOptions) => void;
}

interface FilterOptions {
  bloodType: string;
  location: string;
  urgencyLevel: string[];
}

const SearchFilterBar = ({
  onSearch = () => {},
  onFilterChange = () => {},
}: SearchFilterBarProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterOptions>({
    bloodType: "",
    location: "",
    urgencyLevel: [],
  });

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleFilterChange = (newFilters: Partial<FilterOptions>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const toggleUrgencyLevel = (level: string) => {
    const updatedLevels = filters.urgencyLevel.includes(level)
      ? filters.urgencyLevel.filter((l) => l !== level)
      : [...filters.urgencyLevel, level];

    handleFilterChange({ urgencyLevel: updatedLevels });
  };

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-sm border border-gray-100">
      <div className="flex flex-col md:flex-row gap-3 items-center">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search for donors, hospitals, or blood banks..."
            className="pl-10 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>

        <div className="flex flex-wrap md:flex-nowrap gap-2">
          <Select
            value={filters.bloodType}
            onValueChange={(value) => handleFilterChange({ bloodType: value })}
          >
            <SelectTrigger className="w-[110px]">
              <div className="flex items-center gap-2">
                <Droplet className="h-4 w-4 text-red-500" />
                <SelectValue placeholder="Blood Type" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="A+">A+</SelectItem>
              <SelectItem value="A-">A-</SelectItem>
              <SelectItem value="B+">B+</SelectItem>
              <SelectItem value="B-">B-</SelectItem>
              <SelectItem value="AB+">AB+</SelectItem>
              <SelectItem value="AB-">AB-</SelectItem>
              <SelectItem value="O+">O+</SelectItem>
              <SelectItem value="O-">O-</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.location}
            onValueChange={(value) => handleFilterChange({ location: value })}
          >
            <SelectTrigger className="w-[130px]">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <SelectValue placeholder="Location" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="nearby">Nearby</SelectItem>
              <SelectItem value="5miles">Within 5 miles</SelectItem>
              <SelectItem value="10miles">Within 10 miles</SelectItem>
              <SelectItem value="25miles">Within 25 miles</SelectItem>
              <SelectItem value="50miles">Within 50 miles</SelectItem>
            </SelectContent>
          </Select>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                <span>Urgency</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuCheckboxItem
                checked={filters.urgencyLevel.includes("critical")}
                onCheckedChange={() => toggleUrgencyLevel("critical")}
              >
                Critical
              </DropdownMenuCheckboxItem>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={filters.urgencyLevel.includes("urgent")}
                onCheckedChange={() => toggleUrgencyLevel("urgent")}
              >
                Urgent
              </DropdownMenuCheckboxItem>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={filters.urgencyLevel.includes("standard")}
                onCheckedChange={() => toggleUrgencyLevel("standard")}
              >
                Standard
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            onClick={handleSearch}
            className="bg-red-600 hover:bg-red-700"
          >
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchFilterBar;
