import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Heart, Bell, User, Menu } from "lucide-react";

export function Header() {
  const navigate = useNavigate();

  return (
    <header className="w-full bg-gray-900 text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-red-500" />
            <h1 className="text-xl font-bold hidden md:block">LifeFlow</h1>
            <h1 className="text-xl font-bold md:hidden">LF</h1>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="text-white">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white">
              <User className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
