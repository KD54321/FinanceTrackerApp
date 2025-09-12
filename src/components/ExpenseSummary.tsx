import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";

interface ExpenseSummaryProps {
  data?: {
    categoryData: Array<{ category: string; amount: number; color: string }>;
    monthlyData: Array<{ month: string; amount: number }>;
  };
}

const ExpenseSummary = ({
  data = {
    categoryData: [
      { category: "Food", amount: 450, color: "#FF6384" },
      { category: "Transport", amount: 200, color: "#36A2EB" },
      { category: "Entertainment", amount: 150, color: "#FFCE56" },
      { category: "Utilities", amount: 300, color: "#4BC0C0" },
      { category: "Shopping", amount: 250, color: "#9966FF" },
    ],
    monthlyData: [
      { month: "Jan", amount: 1200 },
      { month: "Feb", amount: 1350 },
      { month: "Mar", amount: 1100 },
      { month: "Apr", amount: 1450 },
      { month: "May", amount: 1300 },
      { month: "Jun", amount: 1200 },
    ],
  },
}: ExpenseSummaryProps) => {
  const [dateRange, setDateRange] = useState<{
    from: Date;
    to?: Date;
  }>({ from: new Date(new Date().setDate(1)), to: new Date() });

  const [view, setView] = useState("category");
  const [period, setPeriod] = useState("month");

  // Calculate total expenses
  const totalExpenses = data.categoryData.reduce(
    (sum, item) => sum + item.amount,
    0,
  );

  return (
    <Card className="w-full bg-white shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold">Expense Summary</CardTitle>
        <div className="flex items-center space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button className="h-8 border-dashed">
                <Calendar className="mr-2 h-4 w-4" />
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "LLL dd, y")} -{" "}
                      {format(dateRange.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(dateRange.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <CalendarComponent
                initialFocus
                mode="range"
                defaultMonth={dateRange?.from}
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>

          <Select defaultValue={period} onValueChange={setPeriod}>
            <SelectTrigger className="h-8 w-[110px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="month">Month</SelectItem>
              <SelectItem value="quarter">Quarter</SelectItem>
              <SelectItem value="year">Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue={view} onValueChange={setView} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="category">By Category</TabsTrigger>
            <TabsTrigger value="trend">Spending Trend</TabsTrigger>
          </TabsList>

          <TabsContent value="category" className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 min-h-[300px] flex items-center justify-center">
                {/* Placeholder for pie chart - in a real app, use a chart library like recharts */}
                <div className="relative w-64 h-64 rounded-full overflow-hidden">
                  {data.categoryData.map((item, index, arr) => {
                    // Calculate the segment angles for the pie chart
                    const total = arr.reduce((sum, i) => sum + i.amount, 0);
                    const startAngle = arr
                      .slice(0, index)
                      .reduce((sum, i) => sum + (i.amount / total) * 360, 0);
                    const angle = (item.amount / total) * 360;

                    return (
                      <div
                        key={item.category}
                        className="absolute top-0 left-0 w-full h-full"
                        style={{
                          background: item.color,
                          clipPath: `conic-gradient(from ${startAngle}deg, ${item.color} ${angle}deg, transparent ${angle}deg)`,
                        }}
                      />
                    );
                  })}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full w-32 h-32 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-sm text-gray-500">Total</p>
                      <p className="text-2xl font-bold">${totalExpenses}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1">
                <h3 className="text-lg font-medium mb-2">
                  Spending by Category
                </h3>
                <div className="space-y-2">
                  {data.categoryData.map((item) => (
                    <div
                      key={item.category}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <div
                          className="w-3 h-3 rounded-full mr-2"
                          style={{ backgroundColor: item.color }}
                        />
                        <span>{item.category}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium">${item.amount}</span>
                        <span className="text-xs text-gray-500 ml-2">
                          {Math.round((item.amount / totalExpenses) * 100)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="trend" className="min-h-[300px]">
            {/* Placeholder for bar chart - in a real app, use a chart library like recharts */}
            <div className="h-[300px] flex items-end justify-between gap-2 pt-10 relative">
              <div className="absolute left-0 top-0 bottom-0 w-12 flex flex-col justify-between text-xs text-gray-500">
                <span>$1500</span>
                <span>$1000</span>
                <span>$500</span>
                <span>$0</span>
              </div>
              <div className="flex-1 h-full ml-12 flex items-end justify-between">
                {data.monthlyData.map((item) => {
                  const height = (item.amount / 1500) * 100;
                  return (
                    <div
                      key={item.month}
                      className="flex flex-col items-center"
                    >
                      <div
                        className="w-12 bg-blue-500 rounded-t-md transition-all duration-500 ease-in-out"
                        style={{ height: `${height}%` }}
                      />
                      <span className="text-xs mt-1">{item.month}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-medium">Monthly Spending Trend</h3>
              <p className="text-sm text-gray-500">
                Your spending has{" "}
                {data.monthlyData[data.monthlyData.length - 1].amount >
                data.monthlyData[data.monthlyData.length - 2].amount
                  ? "increased"
                  : "decreased"}{" "}
                compared to last month.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ExpenseSummary;
