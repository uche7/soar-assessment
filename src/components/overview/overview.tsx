import React from "react";
import Cards from "./cards";
import { CardsDTO } from "@/dto/cards.dto";
import { useRouter } from "next/navigation";
import { DashboardNonAuthRoutes } from "@/utils/urls";
import { RecentTransactions } from "./recent-transaction";
import { RecentTransactionsDTO } from "@/dto/recent-transaction";

/** Overview Section */
export function Overview() {
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 gap-[22px] lg:flex lg:flex-row lg:gap-4 pt-[24px] px-[15px] md:px-[40px] pb-[39px]">
      <div>
        <div className="flex flex-row justify-between mb-[22px] md:mb-[20px]">
          <h1 className="font-[600] text-[16px] md:text-[22px] text-[#343C6A] leading-[26.63px]">
            My Cards
          </h1>
          <button
            className="font-[600] text-[14px] md:text-[17px] text-[#343C6A] leading-[20.57px] hover:underline cursor-pointer"
            type="button"
            onClick={() => router.push(DashboardNonAuthRoutes.credit_cards)}
          >
            See All
          </button>
        </div>
        <div className="w-full flex flex-row gap-[10px] md:gap-[20px] overflow-x-auto overflow-y-hidden hide-scrollbar">
          {CardsDTO.map((card, index) => (
            <Cards
              key={index}
              theme={card.theme}
              balance={card.balance}
              cardHolder={card.cardHolder}
              validThru={card.validThru}
              cardNumer={card.cardNumer}
            />
          ))}
        </div>
      </div>
      <div>
        <h2 className="font-[600] text-[22px] text-[#343C6A] mb-[22px] md:mb-[16px]">
          Recent Transactions
        </h2>
        <RecentTransactions transactions={RecentTransactionsDTO} />
      </div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
