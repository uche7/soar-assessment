import { motion, Variants } from "framer-motion";
import React from "react";

const CardSkeletonLoader = () => {
  // Shimmer animation for the loader
  const shimmerVariants: Variants = {
    animate: {
      x: ["-100%", "200%"],
      transition: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 1.5,
        ease: "linear",
      },
    },
  };

  return (
    <div className="min-w-[265px] h-[170px] lg:w-[350px] lg:h-[235px] font-lato rounded-[25px] bg-gray-200 animate-pulse relative overflow-hidden">
      {/* Top Section (Balance and Chip) */}
      <div className="flex flex-row justify-between items-center mb-[11px] md:mb-[33px] pl-[20px] pr-[18px] md:pl-[26px] md:pr-[20px]">
        <div>
          <div className="w-16 h-4 bg-gray-300 rounded mb-1" />
          <div className="w-20 h-6 bg-gray-300 rounded" />
        </div>
        <div className="w-[29px] h-[29px] md:w-[34.8px] md:h-[34.8px] bg-gray-300 rounded-full" />
      </div>

      {/* Middle Section (Card Holder and Valid Thru) */}
      <div className="flex flex-row gap-[57px] md:gap-[67px] items-center mb-[16.11px] md:mb-[35.11px] pl-[20px] pr-[18px] md:pl-[26px] md:pr-[20px]">
        <div>
          <div className="w-20 h-3 bg-gray-300 rounded mb-1" />
          <div className="w-24 h-4 bg-gray-300 rounded" />
        </div>
        <div>
          <div className="w-16 h-3 bg-gray-300 rounded mb-1" />
          <div className="w-16 h-4 bg-gray-300 rounded" />
        </div>
      </div>

      {/* Bottom Section (Card Number and Logo) */}
      <div className="bg-gradient-to-br from-[rgba(255,255,255,0.15)] to-[rgba(255,255,255,0)] flex flex-row items-center justify-between w-full h-[70px] rounded-bl-[25px] rounded-br-[25px] pl-[20px] pr-[18px] md:pl-[26px] md:pr-[20px] pt-[5px] md:pt-[16px] pb-[22px]">
        <div className="w-32 h-6 bg-gray-300 rounded" />
        <div className="w-[27px] h-[18.4px] md:w-[44px] md:h-[30px] bg-gray-300 rounded" />
      </div>

      {/* Shimmer Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-400 to-transparent"
        variants={shimmerVariants}
        animate="animate"
      />
    </div>
  );
};

export default CardSkeletonLoader;
