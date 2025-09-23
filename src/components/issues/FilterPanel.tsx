import { useState } from 'react';
import { Filter, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  filters: {
    status: string;
    priority: string;
    category: string;
    department: string;
  };
  onFiltersChange: (filters: any) => void;
}

export const FilterPanel = ({ isOpen, onClose, filters, onFiltersChange }: FilterPanelProps) => {
  if (!isOpen) return null;

  const clearFilters = () => {
    onFiltersChange({
      status: '',
      priority: '',
      category: '',
      department: ''
    });
  };

  const activeFilters = Object.values(filters).filter(Boolean).length;

  return (
    <Card className="mb-4">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            Filters
            {activeFilters > 0 && (
              <Badge variant="secondary" className="ml-2">
                {activeFilters}
              </Badge>
            )}
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Status</label>
            <Select value={filters.status} onValueChange={(value) => 
              onFiltersChange({ ...filters, status: value })
            }>
              <SelectTrigger>
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Status</SelectItem>
                <SelectItem value="Open">Open</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Priority</label>
            <Select value={filters.priority} onValueChange={(value) => 
              onFiltersChange({ ...filters, priority: value })
            }>
              <SelectTrigger>
                <SelectValue placeholder="All Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Priority</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Category</label>
            <Select value={filters.category} onValueChange={(value) => 
              onFiltersChange({ ...filters, category: value })
            }>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Categories</SelectItem>
                <SelectItem value="Water & Utilities">Water & Utilities</SelectItem>
                <SelectItem value="Lighting">Lighting</SelectItem>
                <SelectItem value="Roads">Roads</SelectItem>
                <SelectItem value="Parks">Parks</SelectItem>
                <SelectItem value="Traffic">Traffic</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Department</label>
            <Select value={filters.department} onValueChange={(value) => 
              onFiltersChange({ ...filters, department: value })
            }>
              <SelectTrigger>
                <SelectValue placeholder="All Departments" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Departments</SelectItem>
                <SelectItem value="Public Works">Public Works</SelectItem>
                <SelectItem value="Electrical">Electrical</SelectItem>
                <SelectItem value="Road Maintenance">Road Maintenance</SelectItem>
                <SelectItem value="Parks & Recreation">Parks & Recreation</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <Button variant="outline" size="sm" onClick={clearFilters}>
            Clear All Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};