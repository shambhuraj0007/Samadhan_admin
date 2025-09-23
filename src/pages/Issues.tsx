import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
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
import { FilterPanel } from "@/components/issues/FilterPanel";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Issues = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIssue, setSelectedIssue] = useState<any>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    category: '',
    department: ''
  });
  const [issues, setIssues] = useState([
    // Mock data that will be updated
    {
      id: "1234",
      title: "Water main break on Main Street",
      category: "Water & Utilities",
      status: "In Progress",
      priority: "High",
      assignedTo: "Shambhuraj Gadhave",
      department: "Public Works",
      createdAt: "2025-09-022",
      location: "Near Dyp Akurdi",
      description: "Large water main break causing street flooding and disrupting traffic flow."
    },
    {
      id: "123456",
      title: "Streetlight outage on Oak Avenue",
      category: "Lighting",
      status: "Open",
      priority: "Medium",
      assignedTo: "Darshan Bhamare",
      department: "Electrical",
      createdAt: "2025-09-021",
      location: "Akurdi Railwatqion Station",
      description: "Multiple streetlights are not functioning, creating safety concerns."
    },
    {
      id: "000000",
      title: "Pothole repair needed",
      category: "Roads",
      status: "Resolved",
      priority: "Low",
      assignedTo: "Pratik Malwade",
      department: "Road Maintenance",
      createdAt: "2025-08-08",
      location: "Pimpri ,Pune",
      description: "Large pothole causing vehicle damage reports."
    },
    {
      id: "741852",
      title: "Playground equipment damaged",
      category: "Parks",
      status: "Open",
      priority: "Medium",
      assignedTo: "Anjali Munde",
      department: "Parks & Recreation",
      createdAt: "2025-09-12",
      location: "Near dyp college road akurdi station",
      description: "Swing set chains are broken, creating safety hazard for children."
    },
    {
      id: "7852",
      title: "StreetLight",
      category: "Light",
      status: "Open",
      priority: "Medium",
      assignedTo: "Pradeep Mate",
      department: "electrical",
      createdAt: "2025-09-22",
      location: " akurdi station",
      description: "Swing set chains are broken, creating safety hazard for children."
    },
  ]);

  // Functions to handle issue updates
  const handleStatusUpdate = (issueId: string, newStatus: string, comment: string) => {
    setIssues(prev => prev.map(issue => 
      issue.id === issueId ? { ...issue, status: newStatus } : issue
    ));
  };

  const handleAssignment = (issueId: string, department: string, assignee: string, comment: string) => {
    setIssues(prev => prev.map(issue => 
      issue.id === issueId ? { ...issue, department, assignedTo: assignee } : issue
    ));
  };

  const handleEditDetails = (issueId: string, updatedIssue: any) => {
    setIssues(prev => prev.map(issue => 
      issue.id === issueId ? { ...issue, ...updatedIssue } : issue
    ));
  };

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

  const filteredIssues = issues.filter(issue => {
    const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = !filters.status || issue.status === filters.status;
    const matchesPriority = !filters.priority || issue.priority === filters.priority;
    const matchesCategory = !filters.category || issue.category === filters.category;
    const matchesDepartment = !filters.department || issue.department === filters.department;
    
    return matchesSearch && matchesStatus && matchesPriority && matchesCategory && matchesDepartment;
  });

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
          <Button 
            variant={showFilters ? "default" : "outline"} 
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
          >
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
        {/* Filter Panel */}
        <FilterPanel
          isOpen={showFilters}
          onClose={() => setShowFilters(false)}
          filters={filters}
          onFiltersChange={setFilters}
        />
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
            <span>Showing {filteredIssues.length} of {issues.length} issues</span>
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
        userRole={user?.role || 'Staff'}
        onStatusUpdate={handleStatusUpdate}
        onAssignment={handleAssignment}
        onEditDetails={handleEditDetails}
      />
    </div>
  );
};

export default Issues;