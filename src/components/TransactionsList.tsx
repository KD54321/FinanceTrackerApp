import React, { useState } from "react";
import { Search, Filter, ChevronDown, Edit, Trash2 } from "lucide-react";
import { format } from "date-fns";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Transaction {
  id: string;
  amount: number;
  description: string;
  category: string;
  date: Date;
}

interface TransactionsListProps {
  transactions?: Transaction[];
  onEdit?: (transaction: Transaction) => void;
  onDelete?: (transactionId: string) => void;
}

const categoryColors: Record<string, string> = {
  Food: "bg-orange-100 text-orange-800",
  Transport: "bg-blue-100 text-blue-800",
  Entertainment: "bg-purple-100 text-purple-800",
  Shopping: "bg-pink-100 text-pink-800",
  Bills: "bg-red-100 text-red-800",
  Health: "bg-green-100 text-green-800",
  Other: "bg-gray-100 text-gray-800",
};

const mockTransactions: Transaction[] = [
  {
    id: "1",
    amount: 45.99,
    description: "Grocery shopping",
    category: "Food",
    date: new Date(2023, 5, 15),
  },
  {
    id: "2",
    amount: 12.5,
    description: "Uber ride",
    category: "Transport",
    date: new Date(2023, 5, 14),
  },
  {
    id: "3",
    amount: 29.99,
    description: "Movie tickets",
    category: "Entertainment",
    date: new Date(2023, 5, 12),
  },
  {
    id: "4",
    amount: 89.99,
    description: "New shoes",
    category: "Shopping",
    date: new Date(2023, 5, 10),
  },
  {
    id: "5",
    amount: 120.0,
    description: "Electricity bill",
    category: "Bills",
    date: new Date(2023, 5, 8),
  },
  {
    id: "6",
    amount: 35.0,
    description: "Pharmacy",
    category: "Health",
    date: new Date(2023, 5, 7),
  },
];

const TransactionsList: React.FC<TransactionsListProps> = ({
  transactions = mockTransactions,
  onEdit = () => {},
  onDelete = () => {},
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch = transaction.description
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter
      ? transaction.category === categoryFilter
      : true;
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(transactions.map((t) => t.category)));

  return (
    <Card className="w-full bg-white">
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <CardTitle>Recent Transactions</CardTitle>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1">
                  <Filter className="h-4 w-4" />
                  Filter
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setCategoryFilter(null)}>
                  All Categories
                </DropdownMenuItem>
                {categories.map((category) => (
                  <DropdownMenuItem
                    key={category}
                    onClick={() => setCategoryFilter(category)}
                  >
                    {category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="w-[80px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      {format(transaction.date, "MMM dd, yyyy")}
                    </TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          categoryColors[transaction.category] ||
                          "bg-gray-100 text-gray-800"
                        }
                      >
                        {transaction.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      ${transaction.amount.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onEdit(transaction)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onDelete(transaction.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-6 text-muted-foreground"
                  >
                    {searchTerm || categoryFilter
                      ? "No matching transactions found"
                      : "No transactions yet"}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionsList;
