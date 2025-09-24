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
  RefreshCw,
  Phone,
  DollarSign,
  Tag,
  AlertCircle
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

// Map Component (you'll need to install react-leaflet)
const IssueMap = ({ coordinates, location }: { coordinates: [number, number], location: string }) => {
  // For now, showing a placeholder. Install react-leaflet for actual implementation:
  // npm install react-leaflet leaflet
  // import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
  // import 'leaflet/dist/leaflet.css';
  
  return (
    <div className="h-64 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg flex items-center justify-center border-2 border-dashed border-blue-200">
      <div className="text-center">
        <MapPin className="w-8 h-8 text-blue-500 mx-auto mb-3" />
        <p className="font-medium text-gray-700">{location}</p>
        <p className="text-sm text-blue-600 mt-2">Lat: {coordinates[0]}, Lng: {coordinates[1]}</p>
        <p className="text-xs text-muted-foreground mt-2">Interactive map with react-leaflet</p>
      </div>
    </div>
  );
  
  // Actual implementation with react-leaflet:
  /*
  return (
    <MapContainer 
      center={coordinates} 
      zoom={15} 
      className="h-64 w-full rounded-lg"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={coordinates}>
        <Popup>{location}</Popup>
      </Marker>
    </MapContainer>
  );
  */
};

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
    updatedAt: string;
    location: string;
    coordinates: [number, number];
    reporterName: string;
    reporterPhone: string;
    estimatedCost: string;
    expectedCompletion: string;
    tags: string[];
    image: string;
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
      content: 'Initial assessment completed. Water main break confirmed. Estimated repair time: 4-6 hours. Road closure may be required.',
      type: 'assessment'
    },
    {
      id: 2,
      author: 'Sarah Wilson',
      role: 'Department Head',
      timestamp: '1 hour ago',
      content: 'Assigned repair crew. Traffic control setup in progress. Expected completion by tomorrow evening.',
      type: 'assignment'
    },
    {
      id: 3,
      author: 'Mike Johnson',
      role: 'Repair Crew Lead',
      timestamp: '30 minutes ago',
      content: 'On-site now. Issue is more complex than initially assessed. Will need additional equipment.',
      type: 'update'
    }
  ];

  const statusHistory = [
    { status: 'Reported', timestamp: '2025-09-22 08:30 AM', user: 'System', color: 'bg-gray-500' },
    { status: 'Assigned', timestamp: '2025-09-22 09:15 AM', user: 'Sarah Wilson', color: 'bg-blue-500' },
    { status: 'In Progress', timestamp: '2025-09-22 10:30 AM', user: 'John Doe', color: 'bg-orange-500' },
  ];

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Open":
        return <AlertCircle className="w-5 h-5 text-orange-500" />;
      case "In Progress":
        return <Clock className="w-5 h-5 text-blue-500" />;
      case "Resolved":
        return <UserCheck className="w-5 h-5 text-green-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800 border-red-200";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto">
        <DialogHeader className="border-b pb-4">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <DialogTitle className="text-2xl font-bold">{issue.title}</DialogTitle>
              <div className="flex items-center space-x-3">
                <Badge variant="outline" className="font-mono">#{issue.id}</Badge>
                <Badge className={getPriorityColor(issue.priority)}>{issue.priority} Priority</Badge>
                <Badge variant="outline">{issue.category}</Badge>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 py-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Issue Image */}
            <div className="space-y-3">
              <h3 className="font-semibold text-lg flex items-center">
                <ImageIcon className="w-5 h-5 mr-2" />
                Issue Photo
              </h3>
              <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                <img 
                  src={issue.image} 
                  alt={issue.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Enhanced Description */}
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Description</h3>
              <div className="bg-gray-50 p-4 rounded-lg border">
                <p className="text-gray-700 leading-relaxed">{issue.description}</p>
              </div>
            </div>

            {/* Reporter Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg border">
                <h4 className="font-medium text-blue-900 mb-2 flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  Reporter Details
                </h4>
                <p className="text-blue-800 font-medium">{issue.reporterName}</p>
                <p className="text-blue-600 flex items-center mt-1">
                  <Phone className="w-4 h-4 mr-2" />
                  {issue.reporterPhone}
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border">
                <h4 className="font-medium text-green-900 mb-2 flex items-center">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Cost & Timeline
                </h4>
                <p className="text-green-800 font-medium">Est. Cost: {issue.estimatedCost}</p>
                <p className="text-green-600 flex items-center mt-1">
                  <Calendar className="w-4 h-4 mr-2" />
                  Due: {issue.expectedCompletion}
                </p>
              </div>
            </div>

            {/* Tags */}
            {issue.tags && issue.tags.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-semibold text-lg flex items-center">
                  <Tag className="w-5 h-5 mr-2" />
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {issue.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-sm">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Enhanced Location Map */}
            <div className="space-y-3">
              <h3 className="font-semibold text-lg flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                Location
              </h3>
              <IssueMap coordinates={issue.coordinates} location={issue.location} />
            </div>

            {/* Enhanced Comments Section */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center">
                <MessageSquare className="w-5 h-5 mr-2" />
                Activity Log
              </h3>
              <div className="space-y-4">
                {mockComments.map((comment) => (
                  <div key={comment.id} className="flex space-x-4 p-4 bg-white border rounded-lg shadow-sm">
                    <Avatar className="h-10 w-10 border-2 border-white shadow-md">
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-sm font-medium">
                        {getInitials(comment.author)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center space-x-3">
                        <span className="font-semibold text-gray-900">{comment.author}</span>
                        <Badge variant="outline" className="text-xs">{comment.role}</Badge>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{comment.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Comment */}
              <div className="space-y-3 p-4 bg-gray-50 rounded-lg border">
                <label className="font-medium text-gray-900">Add Internal Comment</label>
                <Textarea
                  placeholder="Add detailed notes, updates, or observations..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  rows={4}
                  className="resize-none"
                />
                <Button size="sm" disabled={!newComment.trim()}>
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Add Comment
                </Button>
              </div>
            </div>
          </div>

          {/* Enhanced Sidebar */}
          <div className="space-y-6">
            {/* Status Card */}
            <div className="bg-white border rounded-lg p-4 shadow-sm">
              <h4 className="font-semibold mb-3 flex items-center">
                {getStatusIcon(issue.status)}
                <span className="ml-2">Current Status</span>
              </h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Status:</span>
                  <Badge variant="default" className="font-medium">{issue.status}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Priority:</span>
                  <Badge className={getPriorityColor(issue.priority)}>{issue.priority}</Badge>
                </div>
              </div>
            </div>

            {/* Assignment Details */}
            <div className="bg-white border rounded-lg p-4 shadow-sm space-y-4">
              <h4 className="font-semibold">Assignment Details</h4>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-start space-x-3">
                  <User className="w-4 h-4 text-blue-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Assigned To</p>
                    <p className="text-gray-600">{issue.assignedTo}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Building className="w-4 h-4 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Department</p>
                    <p className="text-gray-600">{issue.department}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Calendar className="w-4 h-4 text-purple-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Created</p>
                    <p className="text-gray-600">{issue.createdAt}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="w-4 h-4 text-orange-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Last Updated</p>
                    <p className="text-gray-600">{issue.updatedAt}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-red-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Location</p>
                    <p className="text-gray-600">{issue.location}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Status History */}
            <div className="bg-white border rounded-lg p-4 shadow-sm">
              <h4 className="font-semibold mb-4">Status History</h4>
              <div className="space-y-4">
                {statusHistory.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`w-3 h-3 rounded-full ${item.color} mt-1.5 flex-shrink-0`}></div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{item.status}</p>
                      <p className="text-xs text-gray-500">{item.timestamp}</p>
                      <p className="text-xs text-blue-600">by {item.user}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700" 
                size="sm"
                onClick={() => setShowStatusModal(true)}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Update Status
              </Button>
              <Button 
                variant="outline" 
                className="w-full border-green-300 text-green-700 hover:bg-green-50" 
                size="sm"
                onClick={() => setShowAssignmentModal(true)}
                disabled={userRole === 'Staff'}
              >
                <UserCheck className="w-4 h-4 mr-2" />
                Reassign Issue
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>

      {/* Modals */}
      <StatusUpdateModal
        isOpen={showStatusModal}
        onClose={() => setShowStatusModal(false)}
        issue={issue}
        userRole={userRole}
        onStatusUpdate={onStatusUpdate}
      />

      <AssignmentModal
        isOpen={showAssignmentModal}
        onClose={() => setShowAssignmentModal(false)}
        issue={issue}
        userRole={userRole}
        onAssign={onAssignment}
      />

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
