import { 
  Users as UsersIcon, 
  UserPlus, 
  Search, 
  Filter,
  Shield,
  Mail,
  Phone
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Users = () => {
  const mockUsers = [
    {
      id: 1,
      name: "John Officer",
      email: "john.officer@city.gov",
      phone: "(555) 123-4567",
      role: "Department Head",
      department: "Public Works",
      status: "Active",
      performance: 92,
      resolvedIssues: 45
    },
    {
      id: 2,
      name: "Sarah Wilson",
      email: "sarah.wilson@city.gov",
      phone: "(555) 234-5678",
      role: "Senior Officer",
      department: "Electrical",
      status: "Active",
      performance: 88,
      resolvedIssues: 38
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike.johnson@city.gov",
      phone: "(555) 345-6789",
      role: "Field Staff",
      department: "Road Maintenance",
      status: "Active",
      performance: 85,
      resolvedIssues: 32
    },
    {
      id: 4,
      name: "Anna Rodriguez",
      email: "anna.rodriguez@city.gov",
      phone: "(555) 456-7890",
      role: "Officer",
      department: "Parks & Recreation",
      status: "On Leave",
      performance: 90,
      resolvedIssues: 41
    }
  ];

  const getRoleIcon = (role: string) => {
    if (role.includes("Head")) return <Shield className="w-4 h-4 text-primary" />;
    return <UsersIcon className="w-4 h-4 text-muted-foreground" />;
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Active":
        return "default" as const;
      case "On Leave":
        return "secondary" as const;
      case "Inactive":
        return "outline" as const;
      default:
        return "secondary" as const;
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="flex flex-col min-h-full">
      {/* Page Header */}
      <div className="px-6 py-4 border-b border-border bg-card">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">User Management</h1>
            <p className="text-muted-foreground">Manage municipal staff and permissions</p>
          </div>
          <Button>
            <UserPlus className="w-4 h-4 mr-2" />
            Add New User
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="px-6 py-4 bg-muted/30 border-b border-border">
        <div className="flex items-center space-x-4">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                className="pl-10"
              />
            </div>
          </div>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter by Department
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter by Role
          </Button>
        </div>
      </div>

      {/* Users Grid */}
      <div className="flex-1 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {mockUsers.map((user) => (
            <Card key={user.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{user.name}</CardTitle>
                    <div className="flex items-center space-x-2 mt-1">
                      {getRoleIcon(user.role)}
                      <span className="text-sm text-muted-foreground">{user.role}</span>
                    </div>
                  </div>
                  <Badge variant={getStatusVariant(user.status)}>
                    {user.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Department</p>
                  <p className="text-foreground">{user.department}</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{user.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{user.phone}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-foreground">{user.performance}%</p>
                    <p className="text-xs text-muted-foreground">Performance</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-foreground">{user.resolvedIssues}</p>
                    <p className="text-xs text-muted-foreground">Resolved</p>
                  </div>
                </div>

                <div className="flex space-x-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Users;