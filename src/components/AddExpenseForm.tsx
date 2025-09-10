import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, PlusIcon, SparklesIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

interface AddExpenseFormProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSubmit?: (data: ExpenseData) => void;
}

interface ExpenseData {
  amount: string;
  category: string;
  description: string;
  date: Date;
}

const AddExpenseForm = ({
  open = true,
  onOpenChange,
  onSubmit,
}: AddExpenseFormProps) => {
  const [amount, setAmount] = useState<string>("");
  const [category, setCategory] = useState<string>("food");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());
  const [isAutoCategorizing, setIsAutoCategorizing] = useState<boolean>(false);

  const categories = [
    { id: "food", name: "Food & Dining" },
    { id: "transport", name: "Transportation" },
    { id: "entertainment", name: "Entertainment" },
    { id: "utilities", name: "Utilities" },
    { id: "shopping", name: "Shopping" },
    { id: "health", name: "Healthcare" },
    { id: "education", name: "Education" },
    { id: "travel", name: "Travel" },
    { id: "other", name: "Other" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const expenseData: ExpenseData = {
      amount,
      category,
      description,
      date,
    };

    if (onSubmit) {
      onSubmit(expenseData);
    }

    // Reset form
    setAmount("");
    setCategory("food");
    setDescription("");
    setDate(new Date());

    if (onOpenChange) {
      onOpenChange(false);
    }
  };

  const handleAutoCategorize = () => {
    setIsAutoCategorizing(true);

    // Simulate AI categorization with a timeout
    setTimeout(() => {
      // This would be replaced with actual AI categorization logic
      if (
        description.toLowerCase().includes("coffee") ||
        description.toLowerCase().includes("restaurant")
      ) {
        setCategory("food");
      } else if (
        description.toLowerCase().includes("uber") ||
        description.toLowerCase().includes("taxi")
      ) {
        setCategory("transport");
      } else if (
        description.toLowerCase().includes("movie") ||
        description.toLowerCase().includes("concert")
      ) {
        setCategory("entertainment");
      } else {
        setCategory("other");
      }

      setIsAutoCategorizing(false);
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <PlusIcon className="h-4 w-4" />
          Add Expense
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-background">
        <DialogHeader>
          <DialogTitle>Add New Expense</DialogTitle>
          <DialogDescription>
            Enter the details of your expense. Use auto-categorization or select
            manually.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    $
                  </span>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    className="pl-7"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(date) => date && setDate(date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="category">Category</Label>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-8 text-xs gap-1"
                  onClick={handleAutoCategorize}
                  disabled={!description || isAutoCategorizing}
                >
                  <SparklesIcon className="h-3 w-3" />
                  {isAutoCategorizing ? "Categorizing..." : "Auto-categorize"}
                </Button>
              </div>

              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="What was this expense for?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange && onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Save Expense</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddExpenseForm;
