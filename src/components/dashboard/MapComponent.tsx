import { MapPin, Layers, ZoomIn, ZoomOut } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const mockIssues = [
  { id: 1, lat: 40.7128, lng: -74.0060, priority: 'High', category: 'Water' },
  { id: 2, lat: 40.7589, lng: -73.9851, priority: 'Medium', category: 'Roads' },
  { id: 3, lat: 40.7614, lng: -73.9776, priority: 'Low', category: 'Lighting' },
  { id: 4, lat: 40.7505, lng: -73.9934, priority: 'High', category: 'Traffic' },
];

export const MapComponent = () => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-primary" />
            Issue Map
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Layers className="w-4 h-4 mr-2" />
              Layers
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative h-96 bg-muted rounded-lg overflow-hidden">
          {/* Map Placeholder with Grid Pattern */}
          <div 
            className="w-full h-full bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950"
            style={{
              backgroundImage: `
                linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px),
                linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px'
            }}
          >
            {/* Mock Issue Pins */}
            {mockIssues.map((issue, index) => (
              <div
                key={issue.id}
                className="absolute w-6 h-6 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform"
                style={{
                  left: `${20 + index * 20}%`,
                  top: `${30 + index * 15}%`
                }}
              >
                <div className={`w-full h-full rounded-full border-2 border-white shadow-lg flex items-center justify-center ${
                  issue.priority === 'High' ? 'bg-red-500' :
                  issue.priority === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'
                }`}>
                  <MapPin className="w-3 h-3 text-white" />
                </div>
              </div>
            ))}

            {/* Heatmap Overlay Areas */}
            <div className="absolute top-1/4 left-1/3 w-20 h-20 bg-red-500/20 rounded-full blur-sm"></div>
            <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-yellow-500/20 rounded-full blur-sm"></div>
            <div className="absolute bottom-1/3 left-1/4 w-12 h-12 bg-orange-500/20 rounded-full blur-sm"></div>

            {/* Map Controls */}
            <div className="absolute top-4 right-4 flex flex-col space-y-2">
              <Button size="sm" variant="outline" className="w-8 h-8 p-0 bg-white">
                <ZoomIn className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline" className="w-8 h-8 p-0 bg-white">
                <ZoomOut className="w-4 h-4" />
              </Button>
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-white dark:bg-card p-3 rounded-lg shadow-lg">
              <p className="text-sm font-medium mb-2">Priority Levels</p>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-xs">High Priority</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-xs">Medium Priority</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-xs">Low Priority</span>
                </div>
              </div>
            </div>

            {/* Center text overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center p-4 bg-white/90 dark:bg-card/90 rounded-lg shadow-lg">
                <MapPin className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm font-medium text-muted-foreground">Interactive Map</p>
                <p className="text-xs text-muted-foreground">Integration coming soon</p>
                <div className="flex items-center justify-center space-x-2 mt-2">
                  <Badge variant="outline" className="text-xs">
                    {mockIssues.length} Active Issues
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};