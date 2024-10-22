import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

// Sample data for recent actions
const recentActions = [
  {
    type: "income",
    description: "Salary deposit",
    amount: 2500,
    date: "2023-04-01 13:00",
  },
  {
    type: "expense",
    description: "Grocery shopping",
    amount: 75.5,
    date: "2023-04-02",
  },
  {
    type: "expense",
    description: "Electric bill",
    amount: 120,
    date: "2023-04-03",
  },
  {
    type: "income",
    description: "Freelance payment",
    amount: 350,
    date: "2023-04-04",
  },
  {
    type: "expense",
    description: "Restaurant dinner",
    amount: 45.75,
    date: "2023-04-05",
  },
  {
    type: "expense",
    description: "Online purchase",
    amount: 89.99,
    date: "2023-04-06",
  },
  {
    type: "income",
    description: "Tax refund",
    amount: 750,
    date: "2023-04-07",
  },
];

export default function RecentFinancialActions() {
  return (
    <Card className="h-80">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex flex-col space-y-1">
          <CardTitle className="text-2xl font-bold">
            Recent transacties
          </CardTitle>
          <CardDescription>Wat heb je financieel gedaan?</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-52 pr-4">
          {recentActions.map((action, index) => (
            <div key={index} className="flex items-center mb-4 last:mb-0">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  action.type === "income" ? "bg-green-100" : "bg-red-100"
                } mr-4`}
              >
                {action.type === "income" ? (
                  <ArrowUpIcon className="h-6 w-6 text-green-600" />
                ) : (
                  <ArrowDownIcon className="h-6 w-6 text-red-600" />
                )}
              </div>
              <div className="flex-grow">
                <p className="text-sm font-medium">{action.description}</p>
                <p className="text-xs text-gray-500">{action.date}</p>
              </div>
              <div
                className={`text-sm font-semibold ${
                  action.type === "income" ? "text-green-600" : "text-red-600"
                }`}
              >
                {action.type === "income" ? "+" : "-"}€
                {action.amount.toFixed(2)}
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
