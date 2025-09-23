import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  { department: 'Public Works', resolved: 128, avgTime: 3.2, satisfaction: 4.2 },
  { department: 'Parks & Rec', resolved: 95, avgTime: 2.8, satisfaction: 4.5 },
  { department: 'Traffic', resolved: 87, avgTime: 4.1, satisfaction: 3.9 },
  { department: 'Electrical', resolved: 76, avgTime: 3.7, satisfaction: 4.1 },
  { department: 'Water Utilities', resolved: 112, avgTime: 5.2, satisfaction: 3.8 },
];

export const DepartmentPerformanceChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Department Performance Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="department" 
              stroke="hsl(var(--muted-foreground))"
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px'
              }}
            />
            <Bar 
              dataKey="resolved" 
              fill="hsl(var(--primary))"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};