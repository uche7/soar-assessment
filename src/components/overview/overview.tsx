import React from "react";
import Cards from "../cards";
import { CardsDTO } from "@/dto/cards.dto";
import { useRouter } from "next/navigation";
import PolarAreaChart from "./polar-area-chart";
import { QuickTransfer } from "./team-payment-ui";
import { DashboardNonAuthRoutes } from "@/utils/urls";
import { RecentTransactions } from "./recent-transaction";
import WeeklyActivityChart from "./weekly-activity-chart";
import BalanceHistoryChart from "./balance-history-chart";
import { RecentTransactionsDTO } from "@/dto/recent-transaction";

/** Overview Section */
export function Overview() {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-[24px] pt-[24px] px-[15px] md:px-[40px] pb-[39px]">
      <div className="grid grid-cols-1 gap-[22px] lg:flex lg:flex-row lg:gap-[20px]">
        <div>
          <div className="flex flex-row justify-between mb-[22px] md:mb-[20px]">
            <h2 className="font-[600] text-[16px] md:text-[22px] text-[#343C6A] leading-[26.63px]">
              My Cards
            </h2>
            <button
              className="font-[600] text-[14px] md:text-[17px] text-[#343C6A] leading-[20.57px] hover:underline cursor-pointer"
              type="button"
              onClick={() => router.push(DashboardNonAuthRoutes.credit_cards)}
              aria-label="View all credit cards"
            >
              See All
            </button>
          </div>
          <div
            className="w-full flex flex-row gap-[10px] md:gap-[20px] overflow-x-auto overflow-y-hidden hide-scrollbar"
            tabIndex={0}
            role="list"
            aria-label="Credit cards list"
          >
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
          <h2 className="font-[600] text-[18px] lg:text-[22px] text-[#343C6A] mb-[22px] md:mb-[18px] -mt-1">
            Recent Transactions
          </h2>
          <RecentTransactions transactions={RecentTransactionsDTO} />
        </div>
      </div>

      <div className="flex flex-col gap-4 lg:gap-0 lg:flex-row justify-between lg:items-center">
        <div>
          <h2 className="font-[600] text-[18px] lg:text-[22px] text-[#343C6A] mb-[22px] md:mb-[18px] leading-[26.63px]">
            Weekly Activity
          </h2>
          <WeeklyActivityChart />
        </div>
        <div className="lg:ml-5">
          <h2 className="font-[600] text-[18px] lg:text-[22px] text-[#343C6A] mb-[22px] md:mb-[18px] leading-[26.63px]">
            Expense Statistics
          </h2>
          <PolarAreaChart />
        </div>
      </div>
      <div className="flex flex-col gap-4 lg:gap-0 lg:flex-row justify-between lg:items-center">
        <div>
          <h2 className="font-[600] text-[18px] lg:text-[22px] text-[#343C6A] mb-[22px] md:mb-[18px] leading-[26.63px]">
            Quick Transfer
          </h2>
          <QuickTransfer />
        </div>
        <div>
          <h2 className="font-[600] text-[18px] lg:text-[22px] text-[#343C6A] mb-[22px] md:mb-[18px] leading-[26.63px]">
            Balance History
          </h2>
          <BalanceHistoryChart />
        </div>
      </div>
    </div>
  );
}
