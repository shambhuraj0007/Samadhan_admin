import { Bell, Search, User, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

export function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-card border-b border-border relative">
      {/* Search - Left Side */}
      <div className="flex items-center space-x-4 flex-1 max-w-md">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-indigo-500 pointer-events-none" />
          <input
            type="text"
            placeholder="Search issues, locations, or staff..."
            className="w-full pl-12 pr-4 py-2.5 rounded-full 
                      bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50 
                      border border-transparent 
                      text-sm text-gray-700 placeholder-gray-500
                      focus:outline-none focus:ring-2 focus:ring-offset-1 
                      focus:ring-pink-400 focus:border-transparent 
                      shadow-sm hover:shadow-md transition-all duration-300"
          />
        </div>
      </div>

      {/* Centered Hindi Text */}
      <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex flex-col items-center">
        <div className="text-5xl font-bold text-primary leading-tight">
          समाधान-Admin
        </div>
        <div className="text-sm text-muted-foreground mt-1 flex items-end space-x-1">
          - आत्मनिर्भर भारत
        </div>
      </div>

      {/* Actions - Right Side */}
      <div className="flex items-center space-x-4">
        {/* Notifications with larger icon */}
        <Button variant="ghost" size="sm" className="relative p-3">
          <Bell className="w-7 h-7" />
          <Badge 
            variant="destructive" 
            className="absolute -top-1 -right-1 w-6 h-6 p-0 flex items-center justify-center text-xs"
          >
            3
          </Badge>
        </Button>

        {/* User Menu with larger icon */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-12 w-12 rounded-full p-0">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-primary-foreground" />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Aryan Bahubali</p>
                <p className="text-xs leading-none text-muted-foreground">
                  Department Head - Public Works
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-6" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
