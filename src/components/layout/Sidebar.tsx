import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  AlertTriangle,
  BarChart3,
  Users,
  Settings,
  ChevronLeft,
  FileText,
  MapPin,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigationItems = [
  { title: "Dashboard", href: "/", icon: LayoutDashboard, color: "text-blue-500", active: "bg-blue-500 text-white" },
  { title: "Issues", href: "/issues", icon: AlertTriangle, color: "text-red-500", active: "bg-red-500 text-white" },
  { title: "Analytics", href: "/analytics", icon: BarChart3, color: "text-green-500", active: "bg-green-500 text-white" },
  { title: "Map View", href: "/map", icon: MapPin, color: "text-purple-500", active: "bg-purple-500 text-white" },
  { title: "Reports", href: "/reports", icon: FileText, color: "text-yellow-500", active: "bg-yellow-500 text-white" },
  { title: "Users", href: "/users", icon: Users, color: "text-pink-500", active: "bg-pink-500 text-white" },
  { title: "Settings", href: "/settings", icon: Settings, color: "text-gray-600", active: "bg-gray-600 text-white" },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={cn(
        "relative flex flex-col h-full bg-card border-r border-border transition-all duration-300 shadow-md",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center shadow-sm bg-gradient-to-r from-indigo-500 to-purple-500">
                                      <img 
                            src="/logo.jpg" 
                            alt="Logo" 
                        
                          />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground tracking-wide">
                समाधान-Admin
              </h1>
              <p className="text-xs text-muted-foreground">Municipal Portal</p>
            </div>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-md hover:bg-muted transition-colors"
        >
          <ChevronLeft
            className={cn(
              "w-4 h-4 transition-transform duration-200",
              collapsed && "rotate-180"
            )}
          />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            end={item.href === "/"}
            className={({ isActive }) =>
              cn(
                "relative flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                "hover:scale-[1.03] active:scale-95",
                isActive
                  ? `${item.active} shadow-md`
                  : `text-muted-foreground hover:bg-muted hover:${item.color}`,
                collapsed && "justify-center"
              )
            }
            title={collapsed ? item.title : undefined}
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <span
                    className={cn(
                      "absolute left-0 w-1 h-6 rounded-r-full",
                      item.active.split(" ")[0] // matches bg color
                    )}
                  />
                )}
                <item.icon className={cn("w-5 h-5 relative z-10", !isActive && item.color)} />
                {!collapsed && (
                  <span className="transition-opacity duration-300">
                    {item.title}
                  </span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border bg-muted/30">
        <div
          className={cn(
            "text-xs text-muted-foreground font-medium",
            collapsed && "text-center"
          )}
        >
          {!collapsed ? "Municipal Staff Portal v1.0" : "v1.0"}
        </div>
      </div>
    </div>
  );
}
