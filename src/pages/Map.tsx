import { useState } from 'react';
import { 
  MapPin, 
  Layers, 
  ZoomIn, 
  ZoomOut, 
  Filter,
  Search,
  Settings,
  Eye,
  Navigation
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

const Map = () => {
  const [selectedLayers, setSelectedLayers] = useState({
    issues: true,
    heatmap: true,
    wards: false,
    streets: true
  });

  const mockIssues = [
    { id: 'ISS-2024-1245', title: 'Water main break', priority: 'High', category: 'Water', lat: 40.7128, lng: -74.0060 },
    { id: 'ISS-2024-1244', title: 'Streetlight outage', priority: 'Medium', category: 'Lighting', lat: 40.7589, lng: -73.9851 },
    { id: 'ISS-2024-1243', title: 'Pothole repair', priority: 'Low', category: 'Roads', lat: 40.7614, lng: -73.9776 },
    { id: 'ISS-2024-1242', title: 'Traffic light malfunction', priority: 'High', category: 'Traffic', lat: 40.7505, lng: -73.9934 },
    { id: 'ISS-2024-1241', title: 'Park maintenance', priority: 'Medium', category: 'Parks', lat: 40.7480, lng: -73.9857 },
  ];

  const wards = [
    { id: 1, name: 'Downtown', issues: 45, color: 'bg-red-500' },
    { id: 2, name: 'North District', issues: 32, color: 'bg-yellow-500' },
    { id: 3, name: 'East Side', issues: 28, color: 'bg-green-500' },
    { id: 4, name: 'West End', issues: 38, color: 'bg-blue-500' },
  ];

  return (
    <div className="flex flex-col min-h-full">
      {/* Page Header */}
      <div className="px-6 py-4 border-b border-border bg-card">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Interactive Map</h1>
            <p className="text-muted-foreground">Geographic view of civic issues and municipal data</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Navigation className="w-4 h-4 mr-2" />
              My Location
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Map Settings
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-80 border-r border-border bg-card p-4 space-y-6">
          {/* Search */}
          <div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search locations..."
                className="pl-10"
              />
            </div>
          </div>

          {/* Map Layers */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center">
                <Layers className="w-4 h-4 mr-2" />
                Map Layers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="issues" 
                  checked={selectedLayers.issues}
                  onCheckedChange={(checked) => 
                    setSelectedLayers(prev => ({ ...prev, issues: !!checked }))
                  }
                />
                <label htmlFor="issues" className="text-sm">Issue Markers</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="heatmap" 
                  checked={selectedLayers.heatmap}
                  onCheckedChange={(checked) => 
                    setSelectedLayers(prev => ({ ...prev, heatmap: !!checked }))
                  }
                />
                <label htmlFor="heatmap" className="text-sm">Heatmap Overlay</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="wards" 
                  checked={selectedLayers.wards}
                  onCheckedChange={(checked) => 
                    setSelectedLayers(prev => ({ ...prev, wards: !!checked }))
                  }
                />
                <label htmlFor="wards" className="text-sm">Ward Boundaries</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="streets" 
                  checked={selectedLayers.streets}
                  onCheckedChange={(checked) => 
                    setSelectedLayers(prev => ({ ...prev, streets: !!checked }))
                  }
                />
                <label htmlFor="streets" className="text-sm">Street Names</label>
              </div>
            </CardContent>
          </Card>

          {/* Ward Statistics */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Ward Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {wards.map((ward) => (
                <div key={ward.id} className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${ward.color}`}></div>
                    <span className="text-sm font-medium">{ward.name}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {ward.issues}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Issue Density Heatmap Data */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Issue Density</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">High Density Areas</span>
                <Badge variant="destructive" className="text-xs">5 zones</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Medium Density Areas</span>
                <Badge variant="secondary" className="text-xs">8 zones</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Low Density Areas</span>
                <Badge variant="outline" className="text-xs">12 zones</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Recent Issues */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Recent Issues</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockIssues.slice(0, 3).map((issue) => (
                <div key={issue.id} className="p-2 rounded border border-border hover:bg-muted/50">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-mono text-muted-foreground">{issue.id}</span>
                    <Badge 
                      variant={issue.priority === 'High' ? 'destructive' : 
                               issue.priority === 'Medium' ? 'secondary' : 'outline'}
                      className="text-xs"
                    >
                      {issue.priority}
                    </Badge>
                  </div>
                  <p className="text-sm font-medium">{issue.title}</p>
                  <p className="text-xs text-muted-foreground">{issue.category}</p>
                  <Button variant="outline" size="sm" className="w-full mt-2 h-7">
                    <Eye className="w-3 h-3 mr-1" />
                    View
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Main Map Area */}
        <div className="flex-1 relative">
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
            {selectedLayers.issues && mockIssues.map((issue, index) => (
              <div
                key={issue.id}
                className="absolute w-8 h-8 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform"
                style={{
                  left: `${15 + index * 15}%`,
                  top: `${20 + index * 12}%`
                }}
                title={issue.title}
              >
                <div className={`w-full h-full rounded-full border-2 border-white shadow-lg flex items-center justify-center ${
                  issue.priority === 'High' ? 'bg-red-500' :
                  issue.priority === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'
                }`}>
                  <MapPin className="w-4 h-4 text-white" />
                </div>
              </div>
            ))}

            {/* Enhanced Heatmap Overlay */}
            {selectedLayers.heatmap && (
              <>
                {/* High density zones */}
                <div className="absolute top-1/4 left-1/3 w-32 h-32 bg-red-500/30 rounded-full blur-xl"></div>
                <div className="absolute top-1/5 left-1/4 w-20 h-20 bg-red-400/25 rounded-full blur-lg"></div>
                
                {/* Medium density zones */}
                <div className="absolute top-1/2 right-1/4 w-28 h-28 bg-yellow-500/25 rounded-full blur-xl"></div>
                <div className="absolute top-3/5 right-1/3 w-24 h-24 bg-orange-400/20 rounded-full blur-lg"></div>
                <div className="absolute bottom-1/3 left-1/5 w-26 h-26 bg-orange-500/25 rounded-full blur-xl"></div>
                
                {/* Low density zones */}
                <div className="absolute bottom-1/4 right-1/5 w-16 h-16 bg-green-400/15 rounded-full blur-lg"></div>
                <div className="absolute top-3/4 left-2/3 w-18 h-18 bg-green-500/20 rounded-full blur-lg"></div>
                
                {/* Additional scattered heat points */}
                <div className="absolute top-1/6 right-1/2 w-12 h-12 bg-yellow-400/20 rounded-full blur-md"></div>
                <div className="absolute bottom-1/6 left-1/2 w-14 h-14 bg-orange-400/25 rounded-full blur-md"></div>
              </>
            )}

            {/* Ward Boundaries */}
            {selectedLayers.wards && (
              <div className="absolute inset-4 border-2 border-dashed border-gray-400/50 rounded-lg">
                <div className="absolute top-2 left-2 text-xs text-gray-600 bg-white/80 px-2 py-1 rounded">
                  Ward Boundaries
                </div>
              </div>
            )}

            {/* Map Controls */}
            <div className="absolute top-4 right-4 flex flex-col space-y-2">
              <Button size="sm" variant="outline" className="w-10 h-10 p-0 bg-white">
                <ZoomIn className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline" className="w-10 h-10 p-0 bg-white">
                <ZoomOut className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline" className="w-10 h-10 p-0 bg-white">
                <Layers className="w-4 h-4" />
              </Button>
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-white dark:bg-card p-4 rounded-lg shadow-lg max-w-xs">
              <p className="text-sm font-medium mb-3">Map Legend</p>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  <span className="text-xs">High Priority Issues</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                  <span className="text-xs">Medium Priority Issues</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <span className="text-xs">Low Priority Issues</span>
                </div>
                {selectedLayers.heatmap && (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-gradient-to-r from-red-200 to-red-500 rounded"></div>
                    <span className="text-xs">Issue Density</span>
                  </div>
                )}
              </div>
            </div>

            {/* Center Information */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center p-6 bg-white/90 dark:bg-card/90 rounded-lg shadow-lg pointer-events-auto">
                <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-lg font-medium text-muted-foreground mb-2">Interactive Heat Map</p>
                <p className="text-sm text-muted-foreground mb-3">
                  {selectedLayers.heatmap ? 'Heat map visualization active' : 'Enable heat map to see issue density'}
                </p>
                <div className="flex items-center justify-center space-x-3">
                  <Badge variant="outline">
                    {mockIssues.length} Issues
                  </Badge>
                  <Badge variant="outline">
                    {wards.length} Wards
                  </Badge>
                  {selectedLayers.heatmap && (
                    <Badge variant="destructive">
                      25 Hot Spots
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;