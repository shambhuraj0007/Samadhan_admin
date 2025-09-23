import { useState } from 'react';
import { 
  MapPin, 
  Calendar, 
  User, 
  Building, 
  Clock, 
  MessageSquare,
  Image as ImageIcon,
  X,
  Edit,
  UserCheck,
  RefreshCw
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { StatusUpdateModal } from "./StatusUpdateModal";
import { AssignmentModal } from "./AssignmentModal";
import { EditDetailsModal } from "./EditDetailsModal";

interface IssueDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  userRole: string;
  onStatusUpdate: (issueId: string, newStatus: string, comment: string) => void;
  onAssignment: (issueId: string, department: string, assignee: string, comment: string) => void;
  onEditDetails: (issueId: string, updatedIssue: any) => void;
  issue: {
    id: string;
    title: string;
    description: string;
    category: string;
    status: string;
    priority: string;
    assignedTo: string;
    department: string;
    createdAt: string;
    location: string;
  } | null;
}

export const IssueDetailModal = ({ 
  isOpen, 
  onClose, 
  issue, 
  userRole,
  onStatusUpdate,
  onAssignment,
  onEditDetails 
}: IssueDetailModalProps) => {
  const [newComment, setNewComment] = useState('');
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  if (!issue) return null;

  const mockComments = [
    {
      id: 1,
      author: 'John Doe',
      role: 'Field Inspector',
      timestamp: '2 hours ago',
      content: 'Initial assessment completed. Water main break confirmed. Estimated repair time: 4-6 hours.'
    },
    {
      id: 2,
      author: 'Sarah Wilson',
      role: 'Department Head',
      timestamp: '1 hour ago',
      content: 'Assigned repair crew. Traffic control setup in progress.'
    }
  ];

  const statusHistory = [
    { status: 'Reported', timestamp: '2024-01-15 08:30 AM', user: 'System' },
    { status: 'Assigned', timestamp: '2024-01-15 09:15 AM', user: 'Sarah Wilson' },
    { status: 'In Progress', timestamp: '2024-01-15 10:30 AM', user: 'John Doe' },
  ];

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-xl">{issue.title}</DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">{issue.id}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Issue Image Placeholder */}
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center">
                <ImageIcon className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">Issue Photo</p>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground">{issue.description}</p>
            </div>

            {/* Location Map Placeholder */}
            <div>
              <h3 className="font-semibold mb-2">Location</h3>
              <div className="h-48 bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">{issue.location}</p>
                  <p className="text-sm text-muted-foreground">Interactive map coming soon</p>
                </div>
              </div>
            </div>

            {/* Comments Section */}
            <div>
              <h3 className="font-semibold mb-4">Internal Comments</h3>
              <div className="space-y-4 mb-4">
                {mockComments.map((comment) => (
                  <div key={comment.id} className="flex space-x-3 p-3 bg-muted/50 rounded-lg">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                        {getInitials(comment.author)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-sm">{comment.author}</span>
                        <span className="text-xs text-muted-foreground">{comment.role}</span>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{comment.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Comment */}
              <div className="space-y-2">
                <Textarea
                  placeholder="Add internal comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  rows={3}
                />
                <Button size="sm">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Add Comment
                </Button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status & Priority */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Badge variant="secondary">{issue.status}</Badge>
                <Badge variant="destructive">{issue.priority} Priority</Badge>
              </div>
            </div>

            {/* Issue Details */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <User className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Assigned To</p>
                  <p className="text-sm text-muted-foreground">{issue.assignedTo}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Building className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Department</p>
                  <p className="text-sm text-muted-foreground">{issue.department}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Created</p>
                  <p className="text-sm text-muted-foreground">{issue.createdAt}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Location</p>
                  <p className="text-sm text-muted-foreground">{issue.location}</p>
                </div>
              </div>
            </div>

            {/* Status History */}
            <div>
              <h4 className="font-semibold mb-3">Status History</h4>
              <div className="space-y-3">
                {statusHistory.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium">{item.status}</p>
                      <p className="text-xs text-muted-foreground">{item.timestamp}</p>
                      <p className="text-xs text-muted-foreground">by {item.user}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <Button 
                className="w-full" 
                size="sm"
                onClick={() => setShowStatusModal(true)}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Update Status
              </Button>
              <Button 
                variant="outline" 
                className="w-full bg-green-600" 
                size="sm"
                onClick={() => setShowAssignmentModal(true)}
                disabled={userRole === 'Staff'}
              >
                <UserCheck className="w-4 h-4 mr-2" />
                Reassign
              </Button>
              {/* <Button 
                variant="outline" 
                className="w-full" 
                size="sm"
                onClick={() => setShowEditModal(true)}
                disabled={userRole === 'Staff'}
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Details
              </Button> */}
            </div>
          </div>
        </div>
      </DialogContent>

      {/* Status Update Modal */}
      <StatusUpdateModal
        isOpen={showStatusModal}
        onClose={() => setShowStatusModal(false)}
        issue={issue}
        userRole={userRole}
        onStatusUpdate={onStatusUpdate}
      />

      {/* Assignment Modal */}
      <AssignmentModal
        isOpen={showAssignmentModal}
        onClose={() => setShowAssignmentModal(false)}
        issue={issue}
        userRole={userRole}
        onAssign={onAssignment}
      />

      {/* Edit Details Modal */}
      <EditDetailsModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        issue={issue}
        userRole={userRole}
        onSave={onEditDetails}
      />
    </Dialog>
  );
};