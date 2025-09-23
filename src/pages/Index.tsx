import { 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  Users, 
  Star,
  MapPin,
  Filter
} from "lucide-react";
import { KPICard } from "@/components/dashboard/KPICard";
import { MapComponent } from "@/components/dashboard/MapComponent";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const Index = () => {
  const kpiData = [
    {
      title: "Total Issues",
      value: "1,247",
      description: "All reported issues",
      icon: AlertTriangle,
      trend: { value: 12, isPositive: true },
      variant: "default" as const,
    },
    {
      title: "Open Issues",
      value: "342",
      description: "Awaiting resolution",
      icon: Clock,
      trend: { value: 8, isPositive: false },
      variant: "warning" as const,
    },
    {
      title: "Resolved Today",
      value: "28",
      description: "Completed issues",
      icon: CheckCircle,
      trend: { value: 15, isPositive: true },
      variant: "success" as const,
    },
    {
      title: "Avg. Resolution Time",
      value: "4.2 days",
      description: "Current month average",
      icon: TrendingUp,
      trend: { value: 5, isPositive: true },
      variant: "default" as const,
    },
  ];

  const topPerformers = [
    { name: "Sarah Johnson", department: "Public Works", resolved: 23, rating: 4.8 },
    { name: "Mike Chen", department: "Parks & Recreation", resolved: 19, rating: 4.7 },
    { name: "Anna Rodriguez", department: "Traffic Management", resolved: 18, rating: 4.6 },
  ];

  const urgentIssues = [
    { id: "ISS-2024-1245", title: "Water main break on Main St", priority: "High", location: "Downtown", time: "2 hours ago" },
    { id: "ISS-2024-1243", title: "Traffic light malfunction", priority: "High", location: "5th & Oak", time: "4 hours ago" },
    { id: "ISS-2024-1240", title: "Pothole on Highway 12", priority: "Medium", location: "North District", time: "6 hours ago" },
  ];

  return (
    <div className="flex flex-col min-h-full">
      {/* Page Header */}
      <div className="px-6 py-4 border-b border-border bg-card">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Municipal Dashboard</h1>
            <p className="text-muted-foreground">Overview of civic issues and performance metrics</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button size="sm">
              <MapPin className="w-4 h-4 mr-2" />
              View Map
            </Button>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="flex-1 p-6 space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpiData.map((kpi, index) => (
            <KPICard key={index} {...kpi} />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Top Performers */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-primary" />
                Top Performers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {topPerformers.map((performer, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <p className="font-medium text-foreground">{performer.name}</p>
                    <p className="text-sm text-muted-foreground">{performer.department}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-foreground">{performer.resolved} resolved</p>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-warning mr-1" />
                      <span className="text-sm text-muted-foreground">{performer.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Priority Issues */}
          <Card className="xl:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-error" />
                Priority Issues
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {urgentIssues.map((issue, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm font-mono text-muted-foreground">{issue.id}</span>
                        <Badge 
                          variant={issue.priority === "High" ? "destructive" : "secondary"}
                          className="text-xs"
                        >
                          {issue.priority}
                        </Badge>
                      </div>
                      <p className="font-medium text-foreground">{issue.title}</p>
                      <div className="flex items-center space-x-4 mt-1 text-sm text-muted-foreground">
                        <span className="flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {issue.location}
                        </span>
                        <span>{issue.time}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Map and Additional Info */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <MapComponent />
          </div>
          
          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Department Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Public Works</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 h-2 bg-muted rounded-full">
                    <div className="w-12 h-2 bg-primary rounded-full"></div>
                  </div>
                  <span className="text-xs text-muted-foreground">75%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Parks & Recreation</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 h-2 bg-muted rounded-full">
                    <div className="w-14 h-2 bg-secondary rounded-full"></div>
                  </div>
                  <span className="text-xs text-muted-foreground">88%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Traffic Management</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 h-2 bg-muted rounded-full">
                    <div className="w-10 h-2 bg-accent rounded-full"></div>
                  </div>
                  <span className="text-xs text-muted-foreground">62%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Electrical</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 h-2 bg-muted rounded-full">
                    <div className="w-11 h-2 bg-warning rounded-full"></div>
                  </div>
                  <span className="text-xs text-muted-foreground">68%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
