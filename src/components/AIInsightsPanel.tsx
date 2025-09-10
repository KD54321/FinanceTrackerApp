import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, TrendingDown, TrendingUp, AlertTriangle, LineChart, PieChart } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface InsightItem {
  id: string;
  type: 'anomaly' | 'trend' | 'warning';
  title: string;
  description: string;
  impact: 'positive' | 'negative' | 'neutral';
  category?: string;
  percentage?: number;
}

interface AIInsightsPanelProps {
  insights?: InsightItem[];
  loading?: boolean;
}

const AIInsightsPanel = ({ insights = defaultInsights, loading = false }: AIInsightsPanelProps) => {
  return (
    <Card className="w-full h-full bg-white shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">AI Insights</CardTitle>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Powered by AI
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {loading ? (
          <div className="flex flex-col space-y-4 animate-pulse">
            <div className="h-16 bg-gray-200 rounded-md"></div>
            <div className="h-16 bg-gray-200 rounded-md"></div>
            <div className="h-16 bg-gray-200 rounded-md"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {insights.map((insight) => (
              <InsightCard key={insight.id} insight={insight} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const InsightCard = ({ insight }: { insight: InsightItem }) => {
  const { type, title, description, impact, percentage } = insight;
  
  const getIcon = () => {
    if (type === 'anomaly') return <AlertCircle className="h-5 w-5" />;
    if (type === 'warning') return <AlertTriangle className="h-5 w-5" />;
    if (type === 'trend') {
      return impact === 'positive' ? 
        <TrendingDown className="h-5 w-5" /> : 
        <TrendingUp className="h-5 w-5" />;
    }
    return <LineChart className="h-5 w-5" />;
  };
  
  const getIconColor = () => {
    if (impact === 'positive') return 'text-green-500';
    if (impact === 'negative') return 'text-red-500';
    return 'text-amber-500';
  };
  
  const getCardColor = () => {
    if (impact === 'positive') return 'bg-green-50 border-green-100';
    if (impact === 'negative') return 'bg-red-50 border-red-100';
    return 'bg-amber-50 border-amber-100';
  };

  return (
    <div className={`p-3 rounded-lg border ${getCardColor()}`}>
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-full ${impact === 'positive' ? 'bg-green-100' : impact === 'negative' ? 'bg-red-100' : 'bg-amber-100'}`}>
          <span className={getIconColor()}>{getIcon()}</span>
        </div>
        <div className="flex-1">
          <h4 className="font-medium text-sm">{title}</h4>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
          {percentage && (
            <div className="mt-2 flex items-center">
              <span className={`text-sm font-medium ${getIconColor()}`}>
                {percentage > 0 ? '+' : ''}{percentage}%
              </span>
              <span className="text-xs text-gray-500 ml-1">
                {impact === 'positive' ? 'decrease' : 'increase'}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const defaultInsights: InsightItem[] = [
  {
    id: '1',
    type: 'anomaly',
    title: 'Unusual spending in Dining',
    description: 'Your dining expenses are 35% higher than your monthly average.',
    impact: 'negative',
    category: 'Dining',
    percentage: 35
  },
  {
    id: '2',
    type: 'trend',
    title: 'Reduced transportation costs',
    description: 'You have spent less on transportation this month compared to last month.',
    impact: 'positive',
    category: 'Transportation',
    percentage: 18
  },
  {
    id: '3',
    type: 'warning',
    title: 'Entertainment budget alert',
    description: 'You have used 85% of your entertainment budget with 10 days remaining.',
    impact: 'neutral',
    category: 'Entertainment'
  },
  {
    id: '4',
    type: 'trend',
    title: 'Grocery spending pattern',
    description: 'Your grocery spending has been consistent for the past 3 months.',
    impact: 'neutral',
    category: 'Groceries'
  }
];

export default AIInsightsPanel;