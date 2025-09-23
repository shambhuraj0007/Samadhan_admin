import { useAuth } from '@/hooks/useAuth';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const RoleSwitch = () => {
  const { user, switchUser } = useAuth();

  const mockUsers = [
    { id: '1', name: 'Admin User', role: 'Admin' },
    { id: '2', name: 'John Doe', role: 'Department Officer' },
    { id: '3', name: 'Sarah Wilson', role: 'Staff' }
  ];

  return (
    <Card className="mb-4">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm">Demo Role Switch</CardTitle>
      </CardHeader>
      <CardContent>
        <Select value={user?.id} onValueChange={switchUser}>
          <SelectTrigger>
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            {mockUsers.map(mockUser => (
              <SelectItem key={mockUser.id} value={mockUser.id}>
                {mockUser.name} ({mockUser.role})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
};