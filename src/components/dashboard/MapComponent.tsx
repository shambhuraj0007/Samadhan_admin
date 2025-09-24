import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat';
import { MapPin, Layers, ZoomIn, ZoomOut, Eye, EyeOff } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";


// Fix for default markers in React Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

const mockIssues = [
  { id: 1, lat: 18.5204, lng: 73.8567, priority: 'High', category: 'Water', intensity: 8 },   // Pune City Center
  { id: 2, lat: 18.5315, lng: 73.8440, priority: 'Medium', category: 'Roads', intensity: 5 }, // Shivajinagar
  { id: 3, lat: 18.5167, lng: 73.8563, priority: 'Low', category: 'Lighting', intensity: 3 }, // Swargate
  { id: 4, lat: 18.5300, lng: 73.8790, priority: 'High', category: 'Traffic', intensity: 7 }, // Koregaon Park
  { id: 5, lat: 18.5201, lng: 73.9496, priority: 'High', category: 'Water', intensity: 9 },   // Hadapsar
  { id: 6, lat: 18.5640, lng: 73.7769, priority: 'Medium', category: 'Roads', intensity: 4 }, // Hinjewadi
];


// Custom marker icons for different priorities
const createCustomIcon = (priority: string) => {
  const color = priority === 'High' ? '#ef4444' : 
               priority === 'Medium' ? '#eab308' : '#22c55e';
  
  return new L.DivIcon({
    html: `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
    className: 'custom-marker',
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
};

// Heatmap layer component
const HeatmapLayer = ({ data, visible }: { data: any[], visible: boolean }) => {
  const map = useMap();

  useEffect(() => {
    if (!visible) return;

    // Prepare heatmap data
    const heatmapData = data.map(issue => [
      issue.lat,
      issue.lng,
      issue.intensity / 10 // Normalize intensity
    ]);

    // Create heatmap layer
    const heatmapLayer = (L as any).heatLayer(heatmapData, {
      radius: 25,
      blur: 15,
      maxZoom: 17,
      gradient: {
        0.0: 'blue',
        0.2: 'cyan',
        0.4: 'lime',
        0.6: 'yellow',
        0.8: 'orange',
        1.0: 'red'
      }
    }).addTo(map);

    return () => {
      map.removeLayer(heatmapLayer);
    };
  }, [map, data, visible]);

  return null;
};

// Map controls component
const MapControls = ({ 
  showHeatmap, 
  setShowHeatmap, 
  showMarkers, 
  setShowMarkers 
}: {
  showHeatmap: boolean;
  setShowHeatmap: (show: boolean) => void;
  showMarkers: boolean;
  setShowMarkers: (show: boolean) => void;
}) => {
  const map = useMap();

  const zoomIn = () => map.zoomIn();
  const zoomOut = () => map.zoomOut();

  return (
    <div className="absolute top-4 right-4 flex flex-col space-y-2 z-[1000]">
      <Button 
        size="sm" 
        variant="outline" 
        className="w-8 h-8 p-0 bg-white shadow-md"
        onClick={zoomIn}
      >
        <ZoomIn className="w-4 h-4" />
      </Button>
      <Button 
        size="sm" 
        variant="outline" 
        className="w-8 h-8 p-0 bg-white shadow-md"
        onClick={zoomOut}
      >
        <ZoomOut className="w-4 h-4" />
      </Button>
      <Button 
        size="sm" 
        variant={showHeatmap ? "default" : "outline"}
        className="h-8 px-2 bg-white shadow-md text-xs"
        onClick={() => setShowHeatmap(!showHeatmap)}
      >
        {showHeatmap ? <EyeOff className="w-3 h-3 mr-1" /> : <Eye className="w-3 h-3 mr-1" />}
        Heat
      </Button>
      <Button 
        size="sm" 
        variant={showMarkers ? "default" : "outline"}
        className="h-8 px-2 bg-white shadow-md text-xs"
        onClick={() => setShowMarkers(!showMarkers)}
      >
        {showMarkers ? <EyeOff className="w-3 h-3 mr-1" /> : <Eye className="w-3 h-3 mr-1" />}
        Pins
      </Button>
    </div>
  );
};

export const MapComponent = () => {
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [showMarkers, setShowMarkers] = useState(true);

  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-primary" />
            <div className='text-purple-900'>Issue Map</div>
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
        <div className="relative h-96 rounded-lg overflow-hidden">
          <MapContainer
            center={[40.7128, -74.0060]}
            zoom={12}
            style={{ height: '100%', width: '100%' }}
            className="z-0"
          >
            {/* Base map tiles */}
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            
            {/* Heatmap layer */}
            <HeatmapLayer data={mockIssues} visible={showHeatmap} />
            
            {/* Issue markers */}
            {showMarkers && mockIssues.map((issue) => (
              <Marker
                key={issue.id}
                position={[issue.lat, issue.lng]}
                icon={createCustomIcon(issue.priority)}
              >
                <Popup>
                  <div className="p-2">
                    <h3 className="font-semibold text-sm mb-1">
                      Issue #{issue.id}
                    </h3>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-600">Priority:</span>
                        <Badge 
                          variant={
                            issue.priority === 'High' ? 'destructive' :
                            issue.priority === 'Medium' ? 'default' : 'secondary'
                          }
                          className="text-xs"
                        >
                          {issue.priority}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-600">Category:</span>
                        <span className="text-xs font-medium">{issue.category}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-600">Intensity:</span>
                        <span className="text-xs font-medium">{issue.intensity}/10</span>
                      </div>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
            
            {/* Map controls */}
            <MapControls 
              showHeatmap={showHeatmap}
              setShowHeatmap={setShowHeatmap}
              showMarkers={showMarkers}
              setShowMarkers={setShowMarkers}
            />
          </MapContainer>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-white dark:bg-card p-3 rounded-lg shadow-lg z-[1000]">
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
            <div className="mt-2 pt-2 border-t">
              <div className="flex items-center justify-center space-x-2">
                <Badge variant="outline" className="text-xs">
                  {mockIssues.length} Active Issues
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
