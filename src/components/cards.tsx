import React from "react";
import Image from "next/image";
import { CardsProps } from "@/types/cards";
import Dark_Card_Chip from "@/assets/icons/dark_chip_card.svg";
import Dark_Card_Logo from "@/assets/icons/dark_card_logo.svg";
import White_Card_Chip from "@/assets/icons/white_chip_card.svg";
import White_Card_Logo from "@/assets/icons/white_card_logo.svg";

/** Cards Component */
const Cards = ({
  theme,
  balance,
  cardHolder,
  validThru,
  cardNumer,
}: CardsProps) => {
  return (
    <div
      className={`min-w-[265px] h-[170px] lg:w-[350px] lg:h-[235px] font-lato pt-[17px] lg:pt-[24px] rounded-[25px] ${
        theme === "dark"
          ? "bg-gradient-to-br from-[#5B5A6F] to-[#000000]"
          : "bg-[#FFFFFF] border-[1px] border-[#DFEAF2]"
      }`}
    >
      <div className="flex flex-row justify-between items-center mb-[11px] md:mb-[33px] pl-[20px] pr-[18px] md:pl-[26px] md:pr-[20px]">
        <div>
          <small
            className={` ${
              theme === "dark" ? "text-[#FFFFFF]" : "text-[#718EBF]"
            } text-[11px] md:text-[12px] leading-[13.2px] md:leading-[14.4px]`}
          >
            Balance
          </small>
          <figure
            className={` ${
              theme === "dark" ? "text-[#FFFFFF]" : "text-[#343C6A]"
            }  text-[16px] md:text-[20px] -mt-1 leading-[19.2px] md:leading-[24px]`}
          >
            {balance}
          </figure>
        </div>
        {theme === "dark" ? (
          <Image
            className="w-[29px] h-[29px] md:w-[34.8px] md:h-[34.8px]"
            src={Dark_Card_Chip}
            alt={"Dark Card Chip"}
          />
        ) : (
          <Image
            className="w-[29px] h-[29px] md:w-[34.8px] md:h-[34.8px]"
            src={White_Card_Chip}
            alt={"White Card Chip"}
          />
        )}
      </div>

      <div className="flex flex-row gap-[57px] md:gap-[67px] items-center mb-[16.11px] md:mb-[35.11px] pl-[20px] pr-[18px] md:pl-[26px] md:pr-[20px]">
        <div>
          <small
            className={` ${
              theme === "dark" ? "text-[#FFFFFFB2]" : "text-[#718EBF]"
            } font-[400] text-[10px] md:text-[12px] leading-[14.4px]`}
          >
            CARD HOLDER
          </small>
          <p
            className={` ${
              theme === "dark" ? "text-[#FFFFFF]" : "text-[#343C6A]"
            } font-[600] text-[13px] md:text-[15px] -mt-1 leading-[18px]`}
          >
            {cardHolder}
          </p>
        </div>
        <div>
          <small
            className={` ${
              theme === "dark" ? "text-[#FFFFFFB2]" : "text-[#718EBF]"
            } text-[10px] md:text-[12px] leading-[14.4px]`}
          >
            VALID THRU
          </small>
          <figure
            className={` ${
              theme === "dark" ? "text-[#FFFFFF]" : "text-[#343C6A]"
            } text-[13px] md:text-[15px] -mt-1 leading-[18px]`}
          >
            {validThru}
          </figure>
        </div>
      </div>

      <div
        className={` ${
          theme === "dark"
            ? "bg-gradient-to-br from-[rgba(255,255,255,0.15)] to-[rgba(255,255,255,0)]"
            : "border-t-[1px] border-t-[#DFEAF2]"
        }
             flex flex-row items-center justify-between w-full h-[70px] rounded-bl-[25px] 
             rounded-br-[25px] pl-[20px] pr-[18px] md:pl-[26px] md:pr-[20px] pt-[5px] md:pt-[16px] pb-[22px]`}
      >
        <figure
          className={` ${
            theme === "dark" ? "text-[#FFFFFF]" : "text-[#343C6A]"
          } text-[15px] md:text-[22px] leading-[26.4px]`}
        >
          {cardNumer}
        </figure>
        {theme === "dark" ? (
          <Image
            className="w-[27px] h-[18.4px] md:w-[44px] md:h-[30px]"
            src={Dark_Card_Logo}
            alt={"Dark Card Logo"}
          />
        ) : (
          <Image
            className="w-[27px] h-[18.4px] md:w-[44px] md:h-[30px]"
            src={White_Card_Logo}
            alt={"Dark Card Logo"}
          />
        )}
      </div>
    </div>
  );
};

export default Cards;
