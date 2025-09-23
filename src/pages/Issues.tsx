import { useState } from "react";
import { 
  AlertTriangle, 
  Clock, 
  CheckCircle, 
  Search, 
  Filter,
  SortAsc,
  Eye,
  User
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Issues = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const mockIssues = [
    {
      id: "ISS-2024-1245",
      title: "Water main break on Main Street",
      category: "Water & Utilities",
      status: "In Progress",
      priority: "High",
      assignedTo: "John Doe",
      department: "Public Works",
      createdAt: "2024-01-15",
      location: "123 Main St, Downtown",
      description: "Large water main break causing street flooding and disrupting traffic flow."
    },
    {
      id: "ISS-2024-1244",
      title: "Streetlight outage on Oak Avenue",
      category: "Lighting",
      status: "Open",
      priority: "Medium",
      assignedTo: "Sarah Wilson",
      department: "Electrical",
      createdAt: "2024-01-14",
      location: "Oak Ave & 5th St",
      description: "Multiple streetlights are not functioning, creating safety concerns."
    },
    {
      id: "ISS-2024-1243",
      title: "Pothole repair needed",
      category: "Roads",
      status: "Resolved",
      priority: "Low",
      assignedTo: "Mike Johnson",
      department: "Road Maintenance",
      createdAt: "2024-01-13",
      location: "Highway 12, North District",
      description: "Large pothole causing vehicle damage reports."
    },
    {
      id: "ISS-2024-1242",
      title: "Playground equipment damaged",
      category: "Parks",
      status: "Open",
      priority: "Medium",
      assignedTo: "Anna Rodriguez",
      department: "Parks & Recreation",
      createdAt: "2024-01-12",
      location: "Central Park",
      description: "Swing set chains are broken, creating safety hazard for children."
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Open":
        return <AlertTriangle className="w-4 h-4 text-warning" />;
      case "In Progress":
        return <Clock className="w-4 h-4 text-primary" />;
      case "Resolved":
        return <CheckCircle className="w-4 h-4 text-success" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Open":
        return "secondary" as const;
      case "In Progress":
        return "default" as const;
      case "Resolved":
        return "outline" as const;
      default:
        return "secondary" as const;
    }
  };

  const getPriorityVariant = (priority: string) => {
    switch (priority) {
      case "High":
        return "destructive" as const;
      case "Medium":
        return "secondary" as const;
      case "Low":
        return "outline" as const;
      default:
        return "secondary" as const;
    }
  };

  const filteredIssues = mockIssues.filter(issue =>
    issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    issue.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    issue.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-full">
      {/* Page Header */}
      <div className="px-6 py-4 border-b border-border bg-card">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Issue Management</h1>
            <p className="text-muted-foreground">Track, assign, and resolve civic issues</p>
          </div>
          <Button>
            Add New Issue
          </Button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="px-6 py-4 bg-muted/30 border-b border-border">
        <div className="flex items-center space-x-4">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search issues..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <SortAsc className="w-4 h-4 mr-2" />
            Sort
          </Button>
        </div>
      </div>

      {/* Issues List */}
      <div className="flex-1 p-6">
        <div className="space-y-4">
          {filteredIssues.map((issue) => (
            <Card key={issue.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-sm font-mono text-muted-foreground">{issue.id}</span>
                      <Badge variant={getStatusVariant(issue.status)} className="flex items-center space-x-1">
                        {getStatusIcon(issue.status)}
                        <span>{issue.status}</span>
                      </Badge>
                      <Badge variant={getPriorityVariant(issue.priority)}>
                        {issue.priority} Priority
                      </Badge>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-foreground mb-2">{issue.title}</h3>
                    <p className="text-muted-foreground mb-3">{issue.description}</p>
                    
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Category:</span>
                        <p className="font-medium">{issue.category}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Location:</span>
                        <p className="font-medium">{issue.location}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Assigned To:</span>
                        <p className="font-medium flex items-center">
                          <User className="w-3 h-3 mr-1" />
                          {issue.assignedTo}
                        </p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Department:</span>
                        <p className="font-medium">{issue.department}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Issues;