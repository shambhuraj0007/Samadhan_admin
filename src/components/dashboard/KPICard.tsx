import { LucideIcon, ArrowUp, ArrowDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: "default" | "success" | "warning" | "error" | "primary";
}

export function KPICard({ 
  title, 
  value, 
  description, 
  icon: Icon, 
  trend, 
  variant = "default" 
}: KPICardProps) {
  const variantStyles = {
    default: "bg-gradient-to-r from-purple-200 via-pink-200 to-red-200 border-none",
    success: "bg-gradient-to-r from-green-200 via-green-300 to-green-400 border-none",
    warning: "bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-400 border-none",
    error: "bg-gradient-to-r from-red-200 via-red-300 to-red-400 border-none",
    primary: "bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 border-none",
  };

  const iconBg = {
    default: "bg-purple-100",
    success: "bg-green-100",
    warning: "bg-yellow-100",
    error: "bg-red-100",
    primary: "bg-indigo-100",
  };

  const trendIcon = trend?.isPositive ? ArrowUp : ArrowDown;

  return (
    <Card
      className={cn(
        "rounded-2xl overflow-hidden shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl",
        variantStyles[variant]
      )}
    >
      <CardHeader className="flex items-center justify-between pb-2">
        <CardTitle className="text-sm font-semibold text-gray-800">{title}</CardTitle>
        <div className={cn("p-2 rounded-full", iconBg[variant])}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="text-3xl font-bold text-gray-900">{value}</div>
        {description && (
          <p className="text-xs text-gray-700 mt-1">{description}</p>
        )}
        {trend && (
          <span
            className={cn(
              "inline-flex items-center px-2 py-1 mt-3 rounded-full text-sm font-medium",
              trend.isPositive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            )}
          >
            {trend.isPositive ? "+" : ""}{trend.value}%
          </span>
        )}
      </CardContent>
    </Card>
  );
}
