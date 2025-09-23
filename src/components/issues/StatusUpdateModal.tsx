import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from 'lucide-react';

interface StatusUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  issue: any;
  userRole: string;
  onStatusUpdate: (issueId: string, newStatus: string, comment: string) => void;
}

export const StatusUpdateModal = ({ isOpen, onClose, issue, userRole, onStatusUpdate }: StatusUpdateModalProps) => {
  const [newStatus, setNewStatus] = useState(issue?.status || '');
  const [comment, setComment] = useState('');

  if (!issue) return null;

  const handleUpdate = () => {
    if (newStatus && comment) {
      onStatusUpdate(issue.id, newStatus, comment);
      setComment('');
      onClose();
    }
  };

  const availableStatuses = () => {
    const current = issue.status;
    if (current === 'Open') return ['In Progress'];
    if (current === 'In Progress') return ['Resolved', 'Open'];
    if (current === 'Resolved') return ['Open', 'In Progress'];
    return [];
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Update Issue Status</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Current Status</label>
            <Badge variant="secondary">{issue.status}</Badge>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">New Status</label>
            <Select value={newStatus} onValueChange={setNewStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Select new status" />
              </SelectTrigger>
              <SelectContent>
                {availableStatuses().map(status => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Update Comment *</label>
            <Textarea
              placeholder="Describe the status change and any actions taken..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleUpdate}
              disabled={!newStatus || !comment || newStatus === issue.status}
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Update Status
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};