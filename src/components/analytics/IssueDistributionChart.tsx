import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  { name: 'Water & Utilities', value: 35, color: 'hsl(var(--primary))' },
  { name: 'Roads', value: 28, color: 'hsl(var(--secondary))' },
  { name: 'Lighting', value: 18, color: 'hsl(var(--accent))' },
  { name: 'Parks', value: 12, color: 'hsl(var(--muted))' },
  { name: 'Traffic', value: 7, color: 'hsl(var(--warning))' },
];

export const IssueDistributionChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Issues by Category</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};