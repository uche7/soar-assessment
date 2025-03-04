import MoneyIcon from "@/assets/icons/money_icon.svg";
import DepositCard from "@/assets/icons/deposit_card.svg";
import DepositPaypal from "@/assets/icons/deposit_paypal.svg";
import { RecentTransactionProps } from "@/types/recent-transaction";

export const RecentTransactionsDTO: RecentTransactionProps[] = [
  {
    id: 1,
    title: "Deposit from my Card",
    date: "28 January 2021",
    amount: 850,
    type: "withdrawal",
    icon: DepositCard,
  },
  {
    id: 2,
    title: "Deposit Paypal",
    date: "25 January 2021",
    amount: 2500,
    type: "deposit",
    icon: DepositPaypal,
  },
  {
    id: 3,
    title: "Jemi Wilson",
    date: "21 January 2021",
    amount: 5400,
    type: "deposit",
    icon: MoneyIcon,
  },
];
