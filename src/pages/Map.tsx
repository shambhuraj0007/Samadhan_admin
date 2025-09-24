import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Polygon } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat';
import { 
  MapPin, 
  Layers, 
  ZoomIn, 
  ZoomOut, 
  Search,
  Settings,
  Eye,
  Navigation,
  EyeOff
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

// Fix for default markers in React Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom marker icons for different priorities
const createCustomIcon = (priority: string) => {
  const color = priority === 'High' ? '#ef4444' : 
               priority === 'Medium' ? '#eab308' : '#22c55e';
  
  return new L.DivIcon({
    html: `<div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center;">
             <svg width="12" height="12" fill="white" viewBox="0 0 24 24">
               <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
             </svg>
           </div>`,
    className: 'custom-marker',
    iconSize: [24, 24],
    iconAnchor: [12, 24],
  });
};

// Pune city issues with accurate coordinates and intensity for heatmap [web:180]
const puneIssues = [
  { 
    id: 'PMC-2025-1245', 
    title: 'Water pipeline burst near FC Road', 
    priority: 'High', 
    category: 'Water', 
    lat: 18.5204, 
    lng: 73.8567,
    area: 'Deccan Gymkhana',
    reportedTime: '2 hours ago',
    intensity: 0.9
  },
  { 
    id: 'PMC-2025-1244', 
    title: 'Street light outage on JM Road', 
    priority: 'Medium', 
    category: 'Lighting', 
    lat: 18.5314, 
    lng: 73.8446,
    area: 'Shivaji Nagar',
    reportedTime: '5 hours ago',
    intensity: 1.0
  },
  { 
    id: 'PMC-2025-1243', 
    title: 'Pothole repair needed on Karve Road', 
    priority: 'Low', 
    category: 'Roads', 
    lat: 18.5074, 
    lng: 73.8077,
    area: 'Kothrud',
    reportedTime: '1 day ago',
    intensity: 0.3
  },
  { 
    id: 'PMC-2025-1242', 
    title: 'Traffic signal malfunction at Swargate', 
    priority: 'High', 
    category: 'Traffic', 
    lat: 18.5018, 
    lng: 73.8636,
    area: 'Swargate',
    reportedTime: '30 minutes ago',
    intensity: 0.8
  },
  { 
    id: 'PMC-2025-1241', 
    title: 'Garbage collection delay in Koregaon Park', 
    priority: 'Medium', 
    category: 'Sanitation', 
    lat: 18.5362, 
    lng: 73.8977,
    area: 'Koregaon Park',
    reportedTime: '3 hours ago',
    intensity: 1.0
  },
  { 
    id: 'PMC-2025-1240', 
    title: 'Drainage blockage in Hadapsar', 
    priority: 'High', 
    category: 'Drainage', 
    lat: 18.5089, 
    lng: 73.9260,
    area: 'Hadapsar',
    reportedTime: '45 minutes ago',
    intensity: 0.7
  },
  { 
    id: 'PMC-2025-1239', 
    title: 'Park maintenance required in Baner', 
    priority: 'Low', 
    category: 'Parks', 
    lat: 18.5679, 
    lng: 73.7749,
    area: 'Baner',
    reportedTime: '6 hours ago',
    intensity: 0.4
  },
  { 
    id: 'PMC-2025-1238', 
    title: 'Water shortage in Kharadi', 
    priority: 'High', 
    category: 'Water', 
    lat: 18.5515, 
    lng: 73.9475,
    area: 'Kharadi',
    reportedTime: '1 hour ago',
    intensity: 0.8
  },
  { 
    id: 'PMC-2025-1237', 
    title: 'Multiple complaints in Shivaji Nagar', 
    priority: 'High', 
    category: 'Multiple', 
    lat: 18.5300, 
    lng: 73.8450,
    area: 'Shivaji Nagar',
    reportedTime: '2 hours ago',
    intensity: 0.9
  },
  { 
    id: 'PMC-2025-1236', 
    title: 'Road work complaints in Kothrud', 
    priority: 'Medium', 
    category: 'Roads', 
    lat: 18.5080, 
    lng: 73.8100,
    area: 'Kothrud',
    reportedTime: '4 hours ago',
    intensity: 0.6
  },

  // NEW AKURDI-CHINCHWAD AREA ISSUES [web:210][web:212][web:213]
  { 
    id: 'PCMC-2025-1235', 
    title: 'Railway station overcrowding at Akurdi', 
    priority: 'High', 
    category: 'Transport', 
    lat: 18.649027, 
    lng: 73.765337,
    area: 'Akurdi Railway Station',
    reportedTime: '1 hour ago',
    intensity: 0.8
  },
  { 
    id: 'PCMC-2025-1234', 
    title: 'Water supply disruption in Sector 26', 
    priority: 'High', 
    category: 'Water', 
    lat: 18.6480, 
    lng: 73.7670,
    area: 'Nigdi Pradhikaran',
    reportedTime: '3 hours ago',
    intensity: 1.0
  },
  { 
    id: 'PCMC-2025-1233', 
    title: 'Street lighting issues in Chinchwad', 
    priority: 'Medium', 
    category: 'Lighting', 
    lat: 18.6403548, 
    lng: 73.7917128,
    area: 'Chinchwad',
    reportedTime: '4 hours ago',
    intensity: 1.0
  },
  { 
    id: 'PCMC-2025-1232', 
    title: 'Traffic congestion near PCMC building', 
    priority: 'Medium', 
    category: 'Traffic', 
    lat: 18.6279288, 
    lng: 73.8009829,
    area: 'Pimpri',
    reportedTime: '2 hours ago',
    intensity: 0.6
  },
  { 
    id: 'PCMC-2025-1231', 
    title: 'Industrial waste disposal concern in Bhosari', 
    priority: 'High', 
    category: 'Environment', 
    lat: 18.6200, 
    lng: 73.8450,
    area: 'Bhosari',
    reportedTime: '5 hours ago',
    intensity: 1.0
  },
  { 
    id: 'PCMC-2025-1230', 
    title: 'Road repair needed near Akurdi station', 
    priority: 'Very High', 
    category: 'Roads', 
    lat: 18.6470, 
    lng: 73.7640,
    area: 'Akurdi',
    reportedTime: '1 day ago',
    intensity: 1.0
  },
  { 
    id: 'PCMC-2025-1229', 
    title: 'Garbage collection delay in Pimpri', 
    priority: 'Medium', 
    category: 'Sanitation', 
    lat: 18.6260, 
    lng: 73.8120,
    area: 'Pimpri',
    reportedTime: '6 hours ago',
    intensity: 0.4
  },
  { 
    id: 'PCMC-2025-1228', 
    title: 'Drainage overflow in Chinchwad industrial area', 
    priority: 'High', 
    category: 'Drainage', 
    lat: 18.6380, 
    lng: 73.7900,
    area: 'Chinchwad',
    reportedTime: '2 hours ago',
    intensity: 1.0
  }
];

// Enhanced Pune Ward Boundaries including PCMC areas [web:213][web:216][web:222]
const puneWardBoundaries = [
  // Existing PMC Wards
  {
    id: 1,
    name: 'Shivaji Nagar',
    coordinates: [
      [18.5350, 73.8400],
      [18.5380, 73.8500],
      [18.5250, 73.8520],
      [18.5220, 73.8420],
      [18.5350, 73.8400]
    ],
    color: '#ef4444',
    issues: 45
  },
  {
    id: 2,
    name: 'Kothrud',
    coordinates: [
      [18.5100, 73.8000],
      [18.5150, 73.8150],
      [18.5000, 73.8200],
      [18.4950, 73.8050],
      [18.5100, 73.8000]
    ],
    color: '#eab308',
    issues: 32
  },
  {
    id: 3,
    name: 'Hadapsar',
    coordinates: [
      [18.5150, 73.9200],
      [18.5200, 73.9350],
      [18.5000, 73.9400],
      [18.4950, 73.9250],
      [18.5150, 73.9200]
    ],
    color: '#f97316',
    issues: 38
  },
  {
    id: 4,
    name: 'Koregaon Park',
    coordinates: [
      [18.5400, 73.8900],
      [18.5450, 73.9050],
      [18.5300, 73.9100],
      [18.5250, 73.8950],
      [18.5400, 73.8900]
    ],
    color: '#22c55e',
    issues: 28
  },
  {
    id: 5,
    name: 'Baner-Balewadi',
    coordinates: [
      [18.5650, 73.7700],
      [18.5750, 73.7850],
      [18.5600, 73.7900],
      [18.5550, 73.7750],
      [18.5650, 73.7700]
    ],
    color: '#3b82f6',
    issues: 42
  },
  {
    id: 6,
    name: 'Kharadi',
    coordinates: [
      [18.5500, 73.9400],
      [18.5580, 73.9550],
      [18.5450, 73.9600],
      [18.5400, 73.9450],
      [18.5500, 73.9400]
    ],
    color: '#a855f7',
    issues: 35
  },

  // NEW PCMC WARDS - Akurdi-Chinchwad area [web:213][web:216]
  {
    id: 7,
    name: 'Akurdi-Nigdi (PCMC Ward 13)',
    coordinates: [
      [18.6550, 73.7600],
      [18.6600, 73.7750],
      [18.6400, 73.7800],
      [18.6350, 73.7650],
      [18.6550, 73.7600]
    ],
    color: '#06b6d4', // Cyan
    issues: 28
  },
  {
    id: 8,
    name: 'Chinchwad (PCMC Ward 4)',
    coordinates: [
      [18.6450, 73.7850],
      [18.6500, 73.8000],
      [18.6300, 73.8050],
      [18.6250, 73.7900],
      [18.6450, 73.7850]
    ],
    color: '#84cc16', // Lime
    issues: 32
  },
  {
    id: 9,
    name: 'Pimpri (PCMC Ward 16)',
    coordinates: [
      [18.6320, 73.8050],
      [18.6370, 73.8200],
      [18.6170, 73.8250],
      [18.6120, 73.8100],
      [18.6320, 73.8050]
    ],
    color: '#f59e0b', // Amber
    issues: 36
  },
  {
    id: 10,
    name: 'Bhosari (PCMC Industrial)',
    coordinates: [
      [18.6250, 73.8400],
      [18.6300, 73.8550],
      [18.6100, 73.8600],
      [18.6050, 73.8450],
      [18.6250, 73.8400]
    ],
    color: '#8b5cf6', // Violet
    issues: 41
  }
];

// Enhanced Municipal Corporation Ward areas including PCMC [web:213]
const puneWards = [
  // PMC Wards
  { id: 1, name: 'Shivaji Nagar', issues: 45, color: 'bg-red-500', areas: ['JM Road', 'FC Road', 'Deccan'] },
  { id: 2, name: 'Kothrud', issues: 32, color: 'bg-yellow-500', areas: ['Karve Road', 'Paud Road'] },
  { id: 3, name: 'Hadapsar', issues: 38, color: 'bg-orange-500', areas: ['Magarpatta', 'Amanora'] },
  { id: 4, name: 'Koregaon Park', issues: 28, color: 'bg-green-500', areas: ['North Main Road', 'Lane 7'] },
  { id: 5, name: 'Baner-Balewadi', issues: 42, color: 'bg-blue-500', areas: ['IT Park', 'Sus Road'] },
  { id: 6, name: 'Kharadi', issues: 35, color: 'bg-purple-500', areas: ['EON IT Park', 'Viman Nagar'] },
  
  // PCMC Wards [web:213][web:216]
  { id: 7, name: 'Akurdi-Nigdi', issues: 28, color: 'bg-cyan-500', areas: ['Railway Station', 'Pradhikaran', 'Sector 26'] },
  { id: 8, name: 'Chinchwad', issues: 32, color: 'bg-lime-500', areas: ['Industrial Estate', 'Grade Separator'] },
  { id: 9, name: 'Pimpri', issues: 36, color: 'bg-amber-500', areas: ['PCMC Building', 'Old Mumbai Highway'] },
  { id: 10, name: 'Bhosari', issues: 41, color: 'bg-violet-500', areas: ['Industrial Area', 'IT Parks'] }
];


// Heatmap Layer Component using leaflet.heat [web:179][web:180]
// Enhanced Heatmap Layer Component with increased visibility
const HeatmapLayer = ({ data, visible }: { data: any[], visible: boolean }) => {
  const map = useMap();

  useEffect(() => {
    if (!visible || !data.length) return;

    // Prepare heatmap data [lat, lng, intensity]
    const heatmapData = data.map(issue => [
      issue.lat,
      issue.lng,
      issue.intensity || 1.0 // Default intensity to 1.0 if not provided
    ]);

    // Enhanced heatmap configuration for better visibility [web:180]
    const heatmapLayer = (L as any).heatLayer(heatmapData, {
      radius: 40,           // Increased from 30 to 40
      blur: 25,            // Increased from 20 to 25
      maxZoom: 18,         // Increased maximum zoom
      max: 1.0,            // Keep max intensity at 1.0
      minOpacity: 0.1,     // Set minimum opacity for better visibility [web:227]
      gradient: {          // Enhanced gradient with more vibrant colors [web:180]
        0.0: '#000080',    // Dark blue
        0.2: '#0000ff',    // Blue
        0.3: '#00ffff',    // Cyan
        0.4: '#00ff00',    // Lime
        0.6: '#ffff00',    // Yellow
        0.8: '#ff8000',    // Orange
        1.0: '#ff0000'     // Red
      }
    }).addTo(map);

    return () => {
      map.removeLayer(heatmapLayer);
    };
  }, [map, data, visible]);

  return null;
};


// Map Controls Component
const MapControls = ({ 
  showHeatmap, 
  setShowHeatmap, 
  showMarkers, 
  setShowMarkers,
  showWards,
  setShowWards
}: {
  showHeatmap: boolean;
  setShowHeatmap: (show: boolean) => void;
  showMarkers: boolean;
  setShowMarkers: (show: boolean) => void;
  showWards: boolean;
  setShowWards: (show: boolean) => void;
}) => {
  const map = useMap();

  const zoomIn = () => map.zoomIn();
  const zoomOut = () => map.zoomOut();

  return (
    <div className="absolute top-4 right-4 flex flex-col space-y-2 z-[1000]">
      <Button 
        size="sm" 
        variant="outline" 
        className="w-10 h-10 p-0 bg-white shadow-md hover:bg-gray-50"
        onClick={zoomIn}
      >
        <ZoomIn className="w-4 h-4" />
      </Button>
      <Button 
        size="sm" 
        variant="outline" 
        className="w-10 h-10 p-0 bg-white shadow-md hover:bg-gray-50"
        onClick={zoomOut}
      >
        <ZoomOut className="w-4 h-4" />
      </Button>
      <Button 
        size="sm" 
        variant={showHeatmap ? "default" : "outline"}
        className="h-8 px-2 bg-white shadow-md text-xs hover:bg-gray-50"
        onClick={() => setShowHeatmap(!showHeatmap)}
      >
        {showHeatmap ? <Eye className="w-3 h-3 mr-1" /> : <EyeOff className="w-3 h-3 mr-1" />}
        Heat
      </Button>
      <Button 
        size="sm" 
        variant={showMarkers ? "default" : "outline"}
        className="h-8 px-2 bg-white shadow-md text-xs hover:bg-gray-50"
        onClick={() => setShowMarkers(!showMarkers)}
      >
        {showMarkers ? <Eye className="w-3 h-3 mr-1" /> : <EyeOff className="w-3 h-3 mr-1" />}
        Pins
      </Button>
      <Button 
        size="sm" 
        variant={showWards ? "default" : "outline"}
        className="h-8 px-2 bg-white shadow-md text-xs hover:bg-gray-50"
        onClick={() => setShowWards(!showWards)}
      >
        {showWards ? <Eye className="w-3 h-3 mr-1" /> : <EyeOff className="w-3 h-3 mr-1" />}
        Wards
      </Button>
    </div>
  );
};

const Map = () => {
  const [selectedLayers, setSelectedLayers] = useState({
    issues: true,
    heatmap: true,
    wards: true,
    streets: true
  });

  const [showMarkers, setShowMarkers] = useState(true);
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [showWards, setShowWards] = useState(true);

  // Pune city center coordinates
  const puneCenter: [number, number] = [18.5196, 73.8553];

  return (
    <div className="flex flex-col min-h-full">
      {/* Page Header */}
      <div className="px-6 py-4 border-b border-border bg-card">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Pune City Interactive Map</h1>
            <p className="text-muted-foreground">Real-time civic issue tracking with heatmap visualization across PMC areas</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Navigation className="w-4 h-4 mr-2" />
              Locate Me
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
                placeholder="Search Pune areas..."
                className="pl-10"
              />
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              Try: FC Road, Koregaon Park, Hadapsar...
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
                  onCheckedChange={(checked) => {
                    setSelectedLayers(prev => ({ ...prev, issues: !!checked }));
                    setShowMarkers(!!checked);
                  }}
                />
                <label htmlFor="issues" className="text-sm">Issue Markers</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="heatmap" 
                  checked={selectedLayers.heatmap}
                  onCheckedChange={(checked) => {
                    setSelectedLayers(prev => ({ ...prev, heatmap: !!checked }));
                    setShowHeatmap(!!checked);
                  }}
                />
                <label htmlFor="heatmap" className="text-sm">Density Heatmap</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="wards" 
                  checked={selectedLayers.wards}
                  onCheckedChange={(checked) => {
                    setSelectedLayers(prev => ({ ...prev, wards: !!checked }));
                    setShowWards(!!checked);
                  }}
                />
                <label htmlFor="wards" className="text-sm">PMC Ward Boundaries</label>
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

          {/* Heatmap Intensity Legend */}
          {showHeatmap && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Heatmap Intensity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Very High</span>
                  <div className="w-4 h-4 bg-red-500 rounded"></div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">High</span>
                  <div className="w-4 h-4 bg-orange-500 rounded"></div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Medium</span>
                  <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Low</span>
                  <div className="w-4 h-4 bg-blue-500 rounded"></div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Ward Statistics */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">PMC Ward Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 max-h-64 overflow-y-auto">
              {puneWards.map((ward) => (
                <div key={ward.id} className="flex items-center justify-between p-2 rounded hover:bg-muted/50 cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${ward.color}`}></div>
                    <div>
                      <span className="text-sm font-medium">{ward.name}</span>
                      <div className="text-xs text-muted-foreground">
                        {ward.areas.join(', ')}
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {ward.issues}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Issues */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Recent Issues</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 max-h-80 overflow-y-auto">
              {puneIssues.slice(0, 6).map((issue) => (
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
                  <p className="text-sm font-medium mb-1">{issue.title}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                    <span>{issue.area}</span>
                    <span>{issue.reportedTime}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {issue.category}
                    </Badge>
                    <Button variant="outline" size="sm" className="h-6 text-xs">
                      <Eye className="w-3 h-3 mr-1" />
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Main Map Area with Real Leaflet Map */}
        <div className="flex-1 relative">
          <MapContainer
            center={puneCenter}
            zoom={12}
            style={{ height: '100%', width: '100%' }}
            className="z-0"
          >
            {/* OpenStreetMap Base Layer */}
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            
            {/* Heatmap Layer - VERY IMPORTANT as requested [web:180] */}
            <HeatmapLayer data={puneIssues} visible={showHeatmap} />
            
            {/* Ward Boundaries as Polygons [web:199][web:202] */}
            {showWards && puneWardBoundaries.map((ward) => (
              <Polygon
                key={ward.id}
                positions={ward.coordinates as any}
                pathOptions={{
                  fillColor: ward.color,
                  fillOpacity: 0.2,
                  color: ward.color,
                  weight: 2,
                  opacity: 0.8
                }}
              >
                <Popup>
                  <div className="p-2">
                    <h3 className="font-semibold text-sm mb-2">{ward.name} Ward</h3>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-600">Ward ID:</span>
                        <span className="text-xs font-medium">{ward.id}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-600">Active Issues:</span>
                        <Badge variant="outline" className="text-xs">
                          {ward.issues}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </Popup>
              </Polygon>
            ))}
            
            {/* Issue Markers */}
            {showMarkers && puneIssues.map((issue) => (
              <Marker
                key={issue.id}
                position={[issue.lat, issue.lng]}
                icon={createCustomIcon(issue.priority)}
              >
                <Popup>
                  <div className="p-3 min-w-[200px]">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-sm">{issue.title}</h3>
                      <Badge 
                        variant={
                          issue.priority === 'High' ? 'destructive' :
                          issue.priority === 'Medium' ? 'default' : 'secondary'
                        }
                        className="text-xs ml-2"
                      >
                        {issue.priority}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-600">ID:</span>
                        <span className="text-xs font-mono">{issue.id}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-600">Area:</span>
                        <span className="text-xs font-medium">{issue.area}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-600">Category:</span>
                        <span className="text-xs font-medium">{issue.category}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-600">Intensity:</span>
                        <span className="text-xs font-medium">{(issue.intensity * 100).toFixed(0)}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-600">Reported:</span>
                        <span className="text-xs">{issue.reportedTime}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-3">
                      View Details
                    </Button>
                  </div>
                </Popup>
              </Marker>
            ))}
            
            {/* Map Controls */}
            <MapControls 
              showHeatmap={showHeatmap}
              setShowHeatmap={setShowHeatmap}
              showMarkers={showMarkers}
              setShowMarkers={setShowMarkers}
              showWards={showWards}
              setShowWards={setShowWards}
            />
          </MapContainer>

          {/* Enhanced Map Legend */}
          <div className="absolute bottom-4 left-4 bg-white dark:bg-card p-4 rounded-lg shadow-lg border z-[1000] max-w-xs">
            <p className="text-sm font-medium mb-3">Pune City Map Legend</p>
            <div className="space-y-2">
              {showMarkers && (
                <>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
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
                </>
              )}
              {showHeatmap && (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-gradient-to-r from-blue-400 via-yellow-400 to-red-500 rounded"></div>
                  <span className="text-xs">Issue Density Heatmap</span>
                </div>
              )}
              {showWards && (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-blue-500 bg-blue-500/20 rounded"></div>
                  <span className="text-xs">PMC Ward Boundaries</span>
                </div>
              )}
            </div>
            <div className="mt-3 pt-3 border-t border-gray-200">
              <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
                <Badge variant="destructive" className="text-xs">
                  {puneIssues.filter(i => i.priority === 'High').length} Urgent
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {puneIssues.length} Total
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  {puneWardBoundaries.length} Wards
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;
