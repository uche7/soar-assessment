import React from "react";
import Image from "next/image";
import { TransactionsProps } from "@/types/recent-transaction";

/** Recent Transactions Component */
export function RecentTransactions({ transactions }: TransactionsProps) {
  return (
    <div className="w-full lg:w-[300px] lg:h-[230px] lg:bg-white lg:rounded-[25px] lg:p-[15px] flex flex-col gap-[10px]">
      {transactions.map((transaction) => (
        <div key={transaction.id} className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Image
              className="w-[55px] h-[55px]"
              src={transaction.icon}
              alt={"Icons"}
            />
            <div>
              <p className="font-[500] text-[13.5px] text-[#232323]">
                {transaction.title}
              </p>
              <p className="font-[400] text-[12px] text-[#718EBF]">
                {transaction.date}
              </p>
            </div>
          </div>
          <p
            className={`font-[500] ${
              transaction.type === "deposit"
                ? "text-[#41D4A8]"
                : "text-[#FF4B4A]"
            }`}
          >
            {transaction.type === "deposit" ? "+" : "-"}${transaction.amount}
          </p>
        </div>
      ))}
    </div>
  );
}
