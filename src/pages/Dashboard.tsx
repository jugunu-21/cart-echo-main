
import React from 'react';
import StatsCard from '@/components/StatsCard';
import ChartCard from '@/components/ChartCard';
import ResponseTable, { Response } from '@/components/ResponseTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart3, Users, ClipboardCheck, TrendingUp } from 'lucide-react';

// Sample data for demonstration
const mockBarData = [
  { name: 'Social Media', value: 45 },
  { name: 'Friend/Family', value: 28 },
  { name: 'Search Engine', value: 18 },
  { name: 'Advertisement', value: 12 },
  { name: 'Other', value: 7 },
];

const mockPieData = [
  { name: 'Very Satisfied', value: 65 },
  { name: 'Satisfied', value: 25 },
  { name: 'Neutral', value: 7 },
  { name: 'Unsatisfied', value: 3 },
];

const mockQuestions = [
  { id: 'q1', label: 'What brought you to our store?' },
  { id: 'q2', label: 'How did you hear about us?' },
  { id: 'q3', label: 'Would you recommend us?' },
];

const mockResponses: Response[] = Array.from({ length: 50 }, (_, i) => ({
  id: `r${i + 1}`,
  date: new Date(Date.now() - Math.floor(Math.random() * 30) * 86400000),
  customer: `Customer ${i + 1}`,
  answers: {
    q1: ['Product search', 'Browsing', 'Specific item', 'Sale'][Math.floor(Math.random() * 4)],
    q2: ['Social Media', 'Friend/Family', 'Search Engine', 'Advertisement', 'Other'][Math.floor(Math.random() * 5)],
    q3: ['Yes, definitely', 'Probably', 'Maybe', 'No'][Math.floor(Math.random() * 4)],
  },
}));

const Dashboard = () => {
  return (
    <div className="animate-fade-in">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight mb-6">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatsCard
          title="Total Responses"
          value="438"
          description="in the last 30 days"
          icon={<ClipboardCheck className="h-4 w-4 text-muted-foreground" />}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Response Rate"
          value="24%"
          description="from cart visitors"
          icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
          trend={{ value: 5, isPositive: true }}
        />
        <StatsCard
          title="Unique Respondents"
          value="356"
          description="in the last 30 days"
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="Avg. Sentiment Score"
          value="4.2/5"
          description="based on ratings"
          icon={<BarChart3 className="h-4 w-4 text-muted-foreground" />}
          trend={{ value: 2, isPositive: false }}
        />
      </div>

      <Tabs defaultValue="overview" className="mb-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="responses">Responses</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-4 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard
              title="How customers heard about us"
              description="Distribution of marketing channels"
              type="bar"
              data={mockBarData}
            />
            <ChartCard
              title="Customer Satisfaction"
              description="Overall satisfaction ratings"
              type="pie"
              data={mockPieData}
            />
          </div>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Recent Responses</h3>
              <ResponseTable
                responses={mockResponses.slice(0, 5)}
                questions={mockQuestions}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="responses" className="mt-4">
          <ResponseTable
            responses={mockResponses}
            questions={mockQuestions}
          />
        </TabsContent>
        
        <TabsContent value="trends" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ChartCard
              title="Weekly Response Trend"
              description="Number of responses per week"
              type="bar"
              data={[
                { name: 'Week 1', value: 65 },
                { name: 'Week 2', value: 85 },
                { name: 'Week 3', value: 92 },
                { name: 'Week 4', value: 78 },
              ]}
            />
            <ChartCard
              title="Survey Completion Rate"
              description="Percentage of started surveys that were completed"
              type="pie"
              data={[
                { name: 'Completed', value: 78 },
                { name: 'Abandoned', value: 22 },
              ]}
              colors={['#10b981', '#f43f5e']}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
