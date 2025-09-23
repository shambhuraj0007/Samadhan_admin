import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  { month: 'Jan', avgDays: 4.2, resolved: 45 },
  { month: 'Feb', avgDays: 3.8, resolved: 52 },
  { month: 'Mar', avgDays: 4.5, resolved: 38 },
  { month: 'Apr', avgDays: 3.2, resolved: 61 },
  { month: 'May', avgDays: 2.9, resolved: 68 },
  { month: 'Jun', avgDays: 3.1, resolved: 59 },
];

export const ResolutionTimeChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Resolution Time Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="month" 
              stroke="hsl(var(--muted-foreground))"
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              label={{ value: 'Days', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="avgDays" 
              stroke="hsl(var(--primary))" 
              strokeWidth={2}
              dot={{ fill: 'hsl(var(--primary))' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};