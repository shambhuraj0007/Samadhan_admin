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
  MapPin
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigationItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Issues",
    href: "/issues",
    icon: AlertTriangle,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    title: "Map View",
    href: "/map",
    icon: MapPin,
  },
  {
    title: "Reports",
    href: "/reports",
    icon: FileText,
  },
  {
    title: "Users",
    href: "/users",
    icon: Users,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={cn(
        "relative flex flex-col h-full bg-card border-r border-border transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">CivicManager</h1>
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
                "flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                "hover:bg-muted hover:text-foreground",
                isActive
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground",
                collapsed && "justify-center"
              )
            }
            title={collapsed ? item.title : undefined}
          >
            <item.icon className="w-5 h-5" />
            {!collapsed && <span>{item.title}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <div className={cn("text-xs text-muted-foreground", collapsed && "text-center")}>
          {!collapsed ? "Municipal Staff Portal v1.0" : "v1.0"}
        </div>
      </div>
    </div>
  );
}