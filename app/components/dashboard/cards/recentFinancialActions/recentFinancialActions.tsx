import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import useTransactions from "@/lib/hooks/useTransactions";
import Transaction from "@/lib/types/transaction";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { useState } from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

export default function RecentFinancialActions() {
  const [page] = useState(1);
  const transactions = useTransactions(page);
  const authUser = useAuthUser() as { id: string };

  const extendedTransactions: ExtendedTransaction[] | undefined =
    transactions.data?.map((transaction) => {
      console.log(`sender: ${transaction.sender}, authUser: ${authUser.id}`);
      const type = transaction.sender === authUser.id ? "expense" : "income";
      return { ...transaction, type };
    });

  console.log(extendedTransactions);

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
          {extendedTransactions?.map((transaction, index) => (
            <div key={index} className="flex items-center mb-4 last:mb-0">
              <div
                className={`flex items-center justify-center min-w-10 h-10 rounded-full ${
                  transaction.type === "expense" ? "bg-red-100" : "bg-green-100"
                } mr-4`}
              >
                {transaction.type === "income" ? (
                  <ArrowUpIcon className="h-6 w-6 text-green-600" />
                ) : (
                  <ArrowDownIcon className="h-6 w-6 text-red-600" />
                )}
              </div>
              <div className="flex-grow">
                <p className="text-sm font-medium">{transaction.message}</p>
                <p className="text-xs text-gray-500">{transaction.datetime}</p>
              </div>
              <div
                className={`text-sm text-nowrap font-semibold ${
                  transaction.type === "income"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {transaction.type === "income" ? "+" : "-"}€{transaction.amount}
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

type ExtendedTransaction = Transaction & {
  type: "income" | "expense";
};
