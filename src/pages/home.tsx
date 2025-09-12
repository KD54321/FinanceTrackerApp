import React, { useState } from "react";
import supabase from "../../supabaseClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, ChevronDown, Plus, Settings, User } from "lucide-react";
import ExpenseSummary from "./ExpenseSummary";
import TransactionsList from "./TransactionsList";
import AIInsightsPanel from "./AIInsightsPanel";
import AddExpenseForm from "./AddExpenseForm";

const Home = () => {
  
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
 

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold">Smart Finance Tracker</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=John"
                      alt="User avatar"
                    />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <span>John Doe</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <Button onClick={() => setIsAddExpenseOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Expense
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Content Area (2/3 width on desktop) */}
          <div className="md:col-span-2 space-y-6">
            <Tabs
              defaultValue="overview"
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="transactions">Transactions</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-6 mt-6">
                {/* Quick Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        Total Spent
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">$2,456.32</div>
                      <p className="text-xs text-muted-foreground mt-1">
                        +12.5% from last month
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        Budget Remaining
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">$1,543.68</div>
                      <p className="text-xs text-muted-foreground mt-1">
                        38.6% of budget left
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        Top Category
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">Food & Dining</div>
                      <p className="text-xs text-muted-foreground mt-1">
                        $685.24 (27.9%)
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Expense Summary Charts */}
                <Card>
                  <CardHeader>
                    <CardTitle>Expense Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ExpenseSummary />
                  </CardContent>
                </Card>

                {/* Recent Transactions Preview */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Recent Transactions</CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setActiveTab("transactions")}
                    >
                      View All
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <TransactionsList limit={5} />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="transactions" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>All Transactions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <TransactionsList />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar (1/3 width on desktop) */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <AIInsightsPanel />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Budget Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Food & Dining</span>
                    <span className="text-sm font-medium">$685/$700</span>
                  </div>
                  <div className="w-full bg-primary/20 rounded-full h-2.5">
                    <div
                      className="bg-primary h-2.5 rounded-full"
                      style={{ width: "98%" }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Entertainment</span>
                    <span className="text-sm font-medium">$320/$400</span>
                  </div>
                  <div className="w-full bg-primary/20 rounded-full h-2.5">
                    <div
                      className="bg-primary h-2.5 rounded-full"
                      style={{ width: "80%" }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Transportation</span>
                    <span className="text-sm font-medium">$210/$300</span>
                  </div>
                  <div className="w-full bg-primary/20 rounded-full h-2.5">
                    <div
                      className="bg-primary h-2.5 rounded-full"
                      style={{ width: "70%" }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Shopping</span>
                    <span className="text-sm font-medium">$450/$500</span>
                  </div>
                  <div className="w-full bg-primary/20 rounded-full h-2.5">
                    <div
                      className="bg-primary h-2.5 rounded-full"
                      style={{ width: "90%" }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Add Expense Modal */}
      {isAddExpenseOpen && (
        <AddExpenseForm
          open={isAddExpenseOpen}
          onClose={() => setIsAddExpenseOpen(false)}
        />
      )}
    </div>
  );
};

export default Home;
