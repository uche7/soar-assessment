/** Recent Transaction Props */
export interface RecentTransactionProps {
  id: number;
  title: string;
  date: string;
  amount: number;
  type: "deposit" | "withdrawal";
  icon: string;
}

export interface TransactionsProps {
  transactions: RecentTransactionProps[];
}
