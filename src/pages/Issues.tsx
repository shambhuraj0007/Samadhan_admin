import { useState, useMemo } from "react";
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
  Calendar,
  UserPlus,
  Grid,
  List,
  X,
  ChevronDown,
  Star,
  Building2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IssueDetailModal } from "@/components/issues/IssueDetailModal";
import { AssignmentModal } from "@/components/issues/AssignmentModal";
import { DataTable } from "@/components/ui/data-table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Issues = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIssue, setSelectedIssue] = useState<any>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState("card"); // "table" or "card"
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  
  // Fixed: Use "all" instead of empty string for filters
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    category: 'all',
    department: 'all'
  });

  // Enhanced mock data with additional fields
  const getIssueImage = (category: string) => {
    const imageMap = {
      "Water & Utilities": "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=250&fit=crop",
      "Lighting": "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=250&fit=crop", 
      "Roads": "https://images.unsplash.com/photo-1486754735734-325b5831c3ad?w=400&h=250&fit=crop",
      "Parks": "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=250&fit=crop",
      "Light": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop"
    };
    return imageMap[category] || "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&h=250&fit=crop";
  };

  const [issues, setIssues] = useState([
    {
      id: "1234",
      title: "Water main break on Main Street",
      category: "Water & Utilities",
      status: "In Progress",
      priority: "High",
      assignedTo: "Shambhuraj Gadhave",
      department: "Public Works",
      createdAt: "2025-09-22",
      updatedAt: "2025-09-24",
      location: "Near DYP Akurdi",
      coordinates: [18.6298, 73.7997], // Akurdi coordinates
      description: "Large water main break causing street flooding and disrupting traffic flow. Water is flowing onto the main road creating hazardous driving conditions. Multiple residents have reported loss of water supply in the area.",
      reporterName: "Citizen Reporter",
      reporterPhone: "+91 9876543210",
      expectedCompletion: "2025-09-25",
      tags: ["urgent", "traffic-impact", "water-supply"],
      image: getIssueImage("Water & Utilities")
    },
    {
      id: "123456", 
      title: "Streetlight outage on Oak Avenue",
      category: "Lighting",
      status: "Open",
      priority: "Medium",
      assignedTo: "Darshan Bhamare",
      department: "Electrical",
      createdAt: "2025-09-21",
      updatedAt: "2025-09-23",
      location: "Akurdi Railway Station",
      coordinates: [18.6485, 73.7866],
      description: "Multiple streetlights are not functioning, creating safety concerns for pedestrians and vehicles during night hours. Three consecutive poles are affected.",
      reporterName: "Station Master",
      reporterPhone: "+91 9876543211",
      expectedCompletion: "2025-09-26",
      tags: ["safety", "night-visibility"],
      image: getIssueImage("Lighting")
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
      updatedAt: "2025-09-15",
      location: "Pimpri, Pune",
      coordinates: [18.6297, 73.8072],
      description: "Large pothole causing vehicle damage reports. The hole is approximately 2 feet wide and 6 inches deep, located in the main traffic lane.",
      reporterName: "Local Resident",
      reporterPhone: "+91 9876543212",
      expectedCompletion: "2025-09-10",
      tags: ["vehicle-damage", "main-road"],
      image: getIssueImage("Roads")
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
      updatedAt: "2025-09-20",
      location: "Near DYP College Road Akurdi Station",
      coordinates: [18.6289, 73.7995],
      description: "Swing set chains are broken, creating safety hazard for children. Two swings are completely unusable and pose risk of injury. Parents have raised safety concerns.",
      reporterName: "Parent Committee",
      reporterPhone: "+91 9876543213",
      expectedCompletion: "2025-09-28",
      tags: ["child-safety", "playground"],
      image: getIssueImage("Parks")
    },
    {
      id: "7852",
      title: "Street Light Malfunction",
      category: "Light",
      status: "Open",
      priority: "Medium",
      assignedTo: "Pradeep Mate",
      department: "Electrical",
      createdAt: "2025-09-22",
      updatedAt: "2025-09-24",
      location: "Akurdi Station", 
      coordinates: [18.6485, 73.7866],
      description: "Street light fixture is damaged and poses electrical hazard. Sparking noticed during evening hours. Immediate attention required for public safety.",
      reporterName: "Security Guard",
      reporterPhone: "+91 9876543214",
      estimatedCost: "₹5,000",
      expectedCompletion: "2025-09-25",
      tags: ["electrical-hazard", "sparking"],
      image: getIssueImage("Light")
    },
  ]);

  // Enhanced filtering and sorting with fixed filter logic
  const filteredAndSortedIssues = useMemo(() => {
    let filtered = issues.filter(issue => {
      const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Fixed: Check for 'all' instead of empty string
      const matchesStatus = filters.status === 'all' || issue.status === filters.status;
      const matchesPriority = filters.priority === 'all' || issue.priority === filters.priority;
      const matchesCategory = filters.category === 'all' || issue.category === filters.category;
      const matchesDepartment = filters.department === 'all' || issue.department === filters.department;
      
      return matchesSearch && matchesStatus && matchesPriority && matchesCategory && matchesDepartment;
    });

    // Sorting
    filtered.sort((a, b) => {
      let valueA = a[sortBy];
      let valueB = b[sortBy];
      
      if (sortBy === 'createdAt' || sortBy === 'updatedAt') {
        valueA = new Date(valueA).getTime();
        valueB = new Date(valueB).getTime();
      }
      
      if (sortOrder === 'asc') {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    });

    return filtered;
  }, [issues, searchTerm, filters, sortBy, sortOrder]);

  // Functions to handle issue updates
  const handleStatusUpdate = (issueId: string, newStatus: string, comment: string) => {
    setIssues(prev => prev.map(issue => 
      issue.id === issueId ? { ...issue, status: newStatus, updatedAt: new Date().toISOString().split('T')[0] } : issue
    ));
  };

  const handleAssignment = (issueId: string, department: string, assignee: string, comment: string) => {
    setIssues(prev => prev.map(issue => 
      issue.id === issueId ? { ...issue, department, assignedTo: assignee, updatedAt: new Date().toISOString().split('T')[0] } : issue
    ));
    setShowAssignmentModal(false);
  };

  const handleEditDetails = (issueId: string, updatedIssue: any) => {
    setIssues(prev => prev.map(issue => 
      issue.id === issueId ? { ...issue, ...updatedIssue, updatedAt: new Date().toISOString().split('T')[0] } : issue
    ));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Open":
        return <AlertTriangle className="w-4 h-4 text-orange-500" />;
      case "In Progress":
        return <Clock className="w-4 h-4 text-blue-500" />;
      case "Resolved":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-gray-400" />;
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

  const handleViewDetails = (issue: any) => {
    setSelectedIssue(issue);
    setShowDetailModal(true);
  };

  const handleAssignClick = (issue: any) => {
    setSelectedIssue(issue);
    setShowAssignmentModal(true);
  };

  // Fixed: Reset to 'all' instead of empty string
  const clearFilters = () => {
    setFilters({
      status: 'all',
      priority: 'all',
      category: 'all',
      department: 'all'
    });
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
      key: 'updatedAt' as const,
      header: 'Last Updated',
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
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleViewDetails(row)}
          >
            <Eye className="w-4 h-4 mr-1" />
            View
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleAssignClick(row)}
          >
            <UserPlus className="w-4 h-4 mr-1" />
            Assign
          </Button>
        </div>
      )
    },
  ];

  // Enhanced Card View Component
  const IssueCard = ({ issue }: { issue: any }) => (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-md bg-gradient-to-br from-white to-gray-50/50 overflow-hidden">
      <div className="relative">
        <div className="aspect-video relative overflow-hidden">
          <img 
            src={issue.image} 
            alt={issue.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute top-3 right-3 flex gap-2">
            <Badge variant={getPriorityVariant(issue.priority)} className="text-xs shadow-sm">
              {issue.priority}
            </Badge>
          </div>
          <div className="absolute bottom-3 left-3 right-3">
            <Badge variant={getStatusVariant(issue.status)} className="flex items-center space-x-1 w-fit bg-white/90 text-gray-800 shadow-sm">
              {getStatusIcon(issue.status)}
              <span className="text-xs font-medium">{issue.status}</span>
            </Badge>
          </div>
        </div>
      </div>
      
      <CardHeader className="pb-3 space-y-3">
        <div className="space-y-2">
          <CardTitle className="text-lg line-clamp-2 group-hover:text-blue-600 transition-colors">
            {issue.title}
          </CardTitle>
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground font-mono bg-gray-100 px-2 py-1 rounded">
              #{issue.id}
            </p>
            <Badge variant="outline" className="text-xs">
              {issue.category}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0 space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {issue.description}
        </p>
        
        <div className="space-y-2.5 text-sm">
          <div className="flex items-center text-muted-foreground">
            <MapPin className="w-4 h-4 mr-2 shrink-0 text-red-500" />
            <span className="truncate">{issue.location}</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <User className="w-4 h-4 mr-2 shrink-0 text-blue-500" />
            <span className="truncate">{issue.assignedTo}</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <Building2 className="w-4 h-4 mr-2 shrink-0 text-green-500" />
            <span className="truncate">{issue.department}</span>
          </div>
          <div className="flex items-center justify-between text-muted-foreground">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2 shrink-0 text-gray-500" />
              <span className="text-xs">Updated: {issue.updatedAt}</span>
            </div>
            {issue.estimatedCost && (
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                {issue.estimatedCost}
              </span>
            )}
          </div>
        </div>

        {issue.tags && (
          <div className="flex flex-wrap gap-1">
            {issue.tags.slice(0, 2).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs py-0 px-2">
                {tag}
              </Badge>
            ))}
            {issue.tags.length > 2 && (
              <Badge variant="outline" className="text-xs py-0 px-2">
                +{issue.tags.length - 2} more
              </Badge>
            )}
          </div>
        )}

        <div className="flex space-x-2 pt-2 border-t border-gray-100">
          <Button 
            size="sm" 
            variant="outline" 
            className="flex-1 hover:bg-blue-50 hover:border-blue-300 transition-colors"
            onClick={() => handleViewDetails(issue)}
          >
            <Eye className="w-4 h-4 mr-1" />
            View
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            className="flex-1 hover:bg-green-50 hover:border-green-300 transition-colors"
            onClick={() => handleAssignClick(issue)}
          >
            <UserPlus className="w-4 h-4 mr-1" />
            Assign
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="flex flex-col min-h-full bg-gray-50/50">
      {/* Page Header */}
      <div className="px-6 py-6 border-b border-border bg-white shadow-sm">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-foreground">Issue Management</h1>
            <p className="text-muted-foreground">Track, assign, and resolve civic issues efficiently</p>
          </div>
         
        </div>
      </div>

      {/* Enhanced Filters and Search */}
      <div className="px-6 py-4 bg-white border-b border-border">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[300px] max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by title, ID, category, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Fixed Filter Dropdowns - Use non-empty values */}
            <Select value={filters.status} onValueChange={(value) => setFilters(prev => ({ ...prev, status: value }))}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Open">Open</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.priority} onValueChange={(value) => setFilters(prev => ({ ...prev, priority: value }))}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.category} onValueChange={(value) => setFilters(prev => ({ ...prev, category: value }))}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Water & Utilities">Water & Utilities</SelectItem>
                <SelectItem value="Lighting">Lighting</SelectItem>
                <SelectItem value="Roads">Roads</SelectItem>
                <SelectItem value="Parks">Parks</SelectItem>
                <SelectItem value="Light">Light</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <SortAsc className="w-4 h-4 mr-2" />
                  Sort
                  <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => {setSortBy('createdAt'); setSortOrder('desc');}}>
                  Newest First
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => {setSortBy('createdAt'); setSortOrder('asc');}}>
                  Oldest First
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => {setSortBy('priority'); setSortOrder('desc');}}>
                  Priority: High to Low
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => {setSortBy('status'); setSortOrder('asc');}}>
                  Status: A to Z
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Fixed: Check if any filter is not 'all' */}
            {(filters.status !== 'all' || filters.priority !== 'all' || filters.category !== 'all' || filters.department !== 'all') && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                <X className="w-4 h-4 mr-1" />
                Clear
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Issues Content */}
      <div className="flex-1 p-6 space-y-6">
        {/* View Toggle with Stats */}
        <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Button 
                variant={viewMode === "table" ? "default" : "outline"} 
                size="sm"
                onClick={() => setViewMode("table")}
                className="transition-all"
              >
                <List className="w-4 h-4 mr-2" />
                Table
              </Button>
              <Button 
                variant={viewMode === "card" ? "default" : "outline"} 
                size="sm"
                onClick={() => setViewMode("card")}
                className="transition-all"
              >
                <Grid className="w-4 h-4 mr-2" />
                Cards
              </Button>
            </div>
          </div>
          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
            <span>Showing <span className="font-medium text-foreground">{filteredAndSortedIssues.length}</span> of <span className="font-medium text-foreground">{issues.length}</span> issues</span>
            <div className="flex space-x-4">
              <span className="flex items-center">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-1"></div>
                High: {filteredAndSortedIssues.filter(i => i.priority === 'High').length}
              </span>
              <span className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-1"></div>
                In Progress: {filteredAndSortedIssues.filter(i => i.status === 'In Progress').length}
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        {viewMode === "table" ? (
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <DataTable 
              data={filteredAndSortedIssues.map(issue => ({ ...issue, actions: null }))}
              columns={tableColumns}
              pageSize={10}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedIssues.map((issue) => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
          </div>
        )}

        {filteredAndSortedIssues.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm border">
            <div className="text-gray-400 mb-4">
              <Search className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No issues found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Modals */}
      <IssueDetailModal
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        issue={selectedIssue}
        userRole={user?.role || 'Staff'}
        onStatusUpdate={handleStatusUpdate}
        onAssignment={handleAssignment}
        onEditDetails={handleEditDetails}
      />

      <AssignmentModal
        isOpen={showAssignmentModal}
        onClose={() => setShowAssignmentModal(false)}
        issue={selectedIssue}
        userRole={user?.role || 'Staff'}
        onAssign={handleAssignment}
      />
    </div>
  );
};

export default Issues;
