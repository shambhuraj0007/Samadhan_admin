import { useState } from "react";
import { 
  AlertTriangle, 
  Clock, 
  CheckCircle, 
  Search, 
  Filter,
  SortAsc,
  Eye,
  User,
  Plus,
  MapPin,
  Calendar
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IssueDetailModal } from "@/components/issues/IssueDetailModal";
import { DataTable } from "@/components/ui/data-table";

const Issues = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIssue, setSelectedIssue] = useState<any>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

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

  const handleViewDetails = (issue: any) => {
    setSelectedIssue(issue);
    setShowDetailModal(true);
  };

  const tableColumns = [
    {
      key: 'id' as const,
      header: 'Issue ID',
      sortable: true,
      render: (value: string) => (
        <span className="font-mono text-sm">{value}</span>
      )
    },
    {
      key: 'title' as const,
      header: 'Title',
      sortable: true,
      render: (value: string) => (
        <span className="font-medium">{value}</span>
      )
    },
    {
      key: 'category' as const,
      header: 'Category',
      sortable: true,
    },
    {
      key: 'status' as const,
      header: 'Status',
      sortable: true,
      render: (value: string) => (
        <Badge variant={getStatusVariant(value)} className="flex items-center space-x-1 w-fit">
          {getStatusIcon(value)}
          <span>{value}</span>
        </Badge>
      )
    },
    {
      key: 'priority' as const,
      header: 'Priority',
      sortable: true,
      render: (value: string) => (
        <Badge variant={getPriorityVariant(value)}>
          {value}
        </Badge>
      )
    },
    {
      key: 'assignedTo' as const,
      header: 'Assigned To',
      sortable: true,
      render: (value: string) => (
        <div className="flex items-center space-x-1">
          <User className="w-3 h-3" />
          <span className="text-sm">{value}</span>
        </div>
      )
    },
    {
      key: 'createdAt' as const,
      header: 'Created',
      sortable: true,
      render: (value: string) => (
        <div className="flex items-center space-x-1">
          <Calendar className="w-3 h-3 text-muted-foreground" />
          <span className="text-sm">{value}</span>
        </div>
      )
    },
    {
      key: 'actions' as const,
      header: 'Actions',
      render: (_: any, row: any) => (
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => handleViewDetails(row)}
        >
          <Eye className="w-4 h-4 mr-2" />
          View
        </Button>
      )
    },
  ];

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

      {/* Issues Content */}
      <div className="flex-1 p-6 space-y-6">
        {/* View Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button variant="default" size="sm">
              Table View
            </Button>
            <Button variant="outline" size="sm">
              Card View
            </Button>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>Showing {filteredIssues.length} of {mockIssues.length} issues</span>
          </div>
        </div>

        {/* Data Table */}
        <DataTable 
          data={filteredIssues.map(issue => ({ ...issue, actions: null }))}
          columns={tableColumns}
          pageSize={10}
        />
      </div>

      {/* Issue Detail Modal */}
      <IssueDetailModal
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        issue={selectedIssue}
      />
    </div>
  );
};

export default Issues;