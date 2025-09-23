import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { UserCheck } from 'lucide-react';

interface AssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  issue: any;
  userRole: string;
  onAssign: (issueId: string, department: string, assignee: string, comment: string) => void;
}

export const AssignmentModal = ({ isOpen, onClose, issue, userRole, onAssign }: AssignmentModalProps) => {
  const [selectedDepartment, setSelectedDepartment] = useState(issue?.department || '');
  const [selectedAssignee, setSelectedAssignee] = useState(issue?.assignedTo || '');
  const [comment, setComment] = useState('');

  if (!issue) return null;

  const departments = [
    'Public Works',
    'Electrical',
    'Road Maintenance',
    'Parks & Recreation',
    'Traffic Management',
    'Water Department'
  ];

  const employeesByDepartment: Record<string, string[]> = {
    'Public Works': ['John Doe', 'Mike Wilson', 'Sarah Johnson'],
    'Electrical': ['Sarah Wilson', 'Tom Brown', 'Lisa Garcia'],
    'Road Maintenance': ['Mike Johnson', 'Carlos Rodriguez', 'Dave Smith'],
    'Parks & Recreation': ['Anna Rodriguez', 'Emma Davis', 'Kevin Lee'],
    'Traffic Management': ['Chris Taylor', 'Maria Lopez', 'James Wilson'],
    'Water Department': ['Robert Chen', 'Nina Patel', 'Mark Thompson']
  };

  const handleAssign = () => {
    if (selectedDepartment && selectedAssignee && comment) {
      onAssign(issue.id, selectedDepartment, selectedAssignee, comment);
      setComment('');
      onClose();
    }
  };

  const canEditAssignment = userRole === 'Admin' || userRole === 'Department Officer';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Assign Issue</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Department *</label>
            <Select 
              value={selectedDepartment} 
              onValueChange={setSelectedDepartment}
              disabled={!canEditAssignment}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map(dept => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Assign To *</label>
            <Select 
              value={selectedAssignee} 
              onValueChange={setSelectedAssignee}
              disabled={!selectedDepartment || !canEditAssignment}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select employee" />
              </SelectTrigger>
              <SelectContent>
                {selectedDepartment && employeesByDepartment[selectedDepartment]?.map(employee => (
                  <SelectItem key={employee} value={employee}>
                    {employee}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Assignment Notes *</label>
            <Textarea
              placeholder="Add notes about this assignment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
            />
          </div>

          {!canEditAssignment && (
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                Only Admins and Department Officers can modify assignments.
              </p>
            </div>
          )}

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleAssign}
              disabled={!selectedDepartment || !selectedAssignee || !comment || !canEditAssignment}
            >
              <UserCheck className="w-4 h-4 mr-2" />
              Assign
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};