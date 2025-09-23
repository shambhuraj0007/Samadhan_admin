import { 
  BarChart3, 
  TrendingUp, 
  PieChart, 
  Calendar,
  Download,
  FileText
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IssueDistributionChart } from "@/components/analytics/IssueDistributionChart";
import { ResolutionTimeChart } from "@/components/analytics/ResolutionTimeChart";
import { DepartmentPerformanceChart } from "@/components/analytics/DepartmentPerformanceChart";
import { Badge } from "@/components/ui/badge";

const Analytics = () => {
  return (
    <div className="flex flex-col min-h-full">
      {/* Page Header */}
      <div className="px-6 py-4 border-b border-border bg-card">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Analytics & Reports</h1>
            <p className="text-muted-foreground">Performance insights and trend analysis</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Calendar className="w-4 h-4 mr-2" />
              Date Range
            </Button>
            <Button size="sm">
              Export Report
            </Button>
          </div>
        </div>
      </div>

      {/* Analytics Content */}
      <div className="flex-1 p-6 space-y-6">
        {/* KPI Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Issues</p>
                  <p className="text-2xl font-bold">1,247</p>
                </div>
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <Badge variant="outline" className="mt-2">
                +12% from last month
              </Badge>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Resolution</p>
                  <p className="text-2xl font-bold">3.2 days</p>
                </div>
                <Calendar className="w-8 h-8 text-primary" />
              </div>
              <Badge variant="outline" className="mt-2">
                -0.5 days improved
              </Badge>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Satisfaction</p>
                  <p className="text-2xl font-bold">4.2/5</p>
                </div>
                <BarChart3 className="w-8 h-8 text-primary" />
              </div>
              <Badge variant="outline" className="mt-2">
                +0.3 improvement
              </Badge>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Staff</p>
                  <p className="text-2xl font-bold">84</p>
                </div>
                <PieChart className="w-8 h-8 text-primary" />
              </div>
              <Badge variant="outline" className="mt-2">
                12 departments
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <IssueDistributionChart />
          <ResolutionTimeChart />
        </div>

        <DepartmentPerformanceChart />

        {/* Additional Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Geographic Hotspots</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium">Downtown District</p>
                    <p className="text-sm text-muted-foreground">High traffic area</p>
                  </div>
                  <Badge variant="destructive">89 issues</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium">Industrial Zone</p>
                    <p className="text-sm text-muted-foreground">Infrastructure issues</p>
                  </div>
                  <Badge variant="secondary">67 issues</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium">Residential North</p>
                    <p className="text-sm text-muted-foreground">Utility problems</p>
                  </div>
                  <Badge variant="outline">45 issues</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Water & Utilities Issues</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 h-2 bg-muted rounded-full">
                      <div className="w-16 h-2 bg-primary rounded-full"></div>
                    </div>
                    <span className="text-sm text-muted-foreground">↑ 15%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Road Maintenance</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 h-2 bg-muted rounded-full">
                      <div className="w-14 h-2 bg-secondary rounded-full"></div>
                    </div>
                    <span className="text-sm text-muted-foreground">↓ 8%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Parks & Recreation</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 h-2 bg-muted rounded-full">
                      <div className="w-10 h-2 bg-accent rounded-full"></div>
                    </div>
                    <span className="text-sm text-muted-foreground">↑ 3%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Export Options */}
        <Card>
          <CardHeader>
            <CardTitle>Export Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
              <Button variant="outline">
                <FileText className="w-4 h-4 mr-2" />
                Generate PDF Report
              </Button>
              <Button variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;