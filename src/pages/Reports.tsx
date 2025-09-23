import { useState } from 'react';
import { 
  FileText, 
  Download, 
  Calendar, 
  Clock, 
  Filter,
  Search,
  Settings,
  Eye,
  BarChart3,
  TrendingUp
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Reports = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('monthly');

  const mockReports = [
    {
      id: 1,
      title: 'Monthly Issue Summary',
      description: 'Comprehensive overview of all issues resolved in January 2024',
      type: 'Summary',
      status: 'Ready',
      generatedAt: '2024-01-31',
      size: '2.4 MB',
      format: 'PDF',
      category: 'Performance'
    },
    {
      id: 2,
      title: 'Department Performance Analysis',
      description: 'Detailed analysis of department-wise performance metrics',
      type: 'Analytics',
      status: 'Generating',
      generatedAt: '2024-01-30',
      size: '3.1 MB',
      format: 'Excel',
      category: 'Performance'
    },
    {
      id: 3,
      title: 'Geographic Hotspot Report',
      description: 'Analysis of high-complaint areas and recommended actions',
      type: 'Geographic',
      status: 'Ready',
      generatedAt: '2024-01-29',
      size: '1.8 MB',
      format: 'PDF',
      category: 'Geographic'
    },
    {
      id: 4,
      title: 'Citizen Satisfaction Survey',
      description: 'Quarterly survey results and satisfaction trends',
      type: 'Survey',
      status: 'Ready',
      generatedAt: '2024-01-28',
      size: '945 KB',
      format: 'PDF',
      category: 'Satisfaction'
    },
    {
      id: 5,
      title: 'Budget Impact Analysis',
      description: 'Cost analysis of issue resolution by department',
      type: 'Financial',
      status: 'Scheduled',
      generatedAt: '2024-02-01',
      size: 'Pending',
      format: 'Excel',
      category: 'Financial'
    }
  ];

  const reportTemplates = [
    { id: 1, name: 'Daily Summary', description: 'Daily issue resolution summary', icon: Calendar },
    { id: 2, name: 'Weekly Analytics', description: 'Weekly performance and trends', icon: BarChart3 },
    { id: 3, name: 'Monthly Performance', description: 'Monthly department performance', icon: TrendingUp },
    { id: 4, name: 'Custom Report', description: 'Build your own custom report', icon: Settings }
  ];

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Ready':
        return 'default' as const;
      case 'Generating':
        return 'secondary' as const;
      case 'Scheduled':
        return 'outline' as const;
      default:
        return 'secondary' as const;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Ready':
        return <FileText className="w-3 h-3" />;
      case 'Generating':
        return <Clock className="w-3 h-3 animate-spin" />;
      case 'Scheduled':
        return <Calendar className="w-3 h-3" />;
      default:
        return <FileText className="w-3 h-3" />;
    }
  };

  return (
    <div className="flex flex-col min-h-full">
      {/* Page Header */}
      <div className="px-6 py-4 border-b border-border bg-card">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Reports & Analytics</h1>
            <p className="text-muted-foreground">Generate and manage municipal reports</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Report
            </Button>
            <Button size="sm">
              <FileText className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 space-y-6">
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {reportTemplates.map((template) => (
            <Card key={template.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <template.icon className="w-6 h-6 text-primary" />
                  <h3 className="font-medium">{template.name}</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
                <Button size="sm" variant="outline" className="w-full">
                  Generate
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filter and Search */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search reports..."
                className="pl-10 w-64"
              />
            </div>
            <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        {/* Reports Table */}
        <Card>
          <CardHeader>
            <CardTitle>Generated Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockReports.map((report) => (
                <div key={report.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-medium">{report.title}</h3>
                      <Badge variant={getStatusVariant(report.status)} className="flex items-center space-x-1">
                        {getStatusIcon(report.status)}
                        <span>{report.status}</span>
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {report.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{report.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>Generated: {report.generatedAt}</span>
                      <span>Format: {report.format}</span>
                      <span>Size: {report.size}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                    {report.status === 'Ready' && (
                      <Button size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Report Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Report Generation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">This Month</span>
                  <span className="text-sm font-medium">24 reports</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Last Month</span>
                  <span className="text-sm font-medium">18 reports</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Average per Week</span>
                  <span className="text-sm font-medium">6 reports</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Popular Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Performance Reports</span>
                  <span className="text-sm font-medium">45%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Geographic Analysis</span>
                  <span className="text-sm font-medium">28%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Financial Reports</span>
                  <span className="text-sm font-medium">27%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Scheduled Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Daily Summary</span>
                  <Badge variant="outline" className="text-xs">Active</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Weekly Analytics</span>
                  <Badge variant="outline" className="text-xs">Active</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Monthly Report</span>
                  <Badge variant="secondary" className="text-xs">Paused</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Reports;