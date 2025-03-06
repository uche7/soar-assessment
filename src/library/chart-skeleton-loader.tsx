import { motion, Variants } from "framer-motion";
import React from "react";

type ChartType = "bar" | "line" | "pie";

interface ChartSkeletonLoaderProps {
  chartType: ChartType;
  width?: string;
  height?: string;
}

const ChartSkeletonLoader = ({
  chartType,
  width = "100%",
  height = "100%",
}: ChartSkeletonLoaderProps) => {
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

  const barVariants: Variants = {
    initial: { height: "50%" },
    animate: {
      height: ["50%", "80%", "50%"],
      transition: {
        repeat: Infinity,
        repeatType: "reverse",
        duration: 1.2,
        ease: "easeInOut",
      },
    },
  };

  const lineVariants: Variants = {
    initial: { y: 0 },
    animate: {
      y: [-5, 5, -5],
      transition: {
        repeat: Infinity,
        repeatType: "reverse",
        duration: 1.5,
        ease: "easeInOut",
      },
    },
  };

  const pieVariants: Variants = {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        repeat: Infinity,
        repeatType: "reverse",
        duration: 1.2,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div
      className="w-full h-full mx-auto bg-white rounded-[20px] p-4 sm:p-6 shadow-lg overflow-hidden"
      style={{ maxWidth: width, height }}
    >
      {/* Chart Container */}
      <div className="relative w-full h-full flex flex-col">
        {/* Main Chart Area */}
        <div className="flex-grow relative">
          {(chartType === "bar" || chartType === "line") && (
            <>
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gray-200">
                <motion.div
                  className="absolute h-full w-1/2 bg-gradient-to-r from-transparent via-gray-300 to-transparent"
                  variants={shimmerVariants}
                  animate="animate"
                />
              </div>
              <div className="absolute top-0 left-0 h-full w-[2px] bg-gray-200">
                <motion.div
                  className="absolute w-full h-1/2 bg-gradient-to-b from-transparent via-gray-300 to-transparent"
                  variants={shimmerVariants}
                  animate="animate"
                />
              </div>
            </>
          )}

          {chartType === "bar" && (
            <div className="flex justify-between items-end h-[85%] absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
              {[1, 2, 3, 4, 5].map((_, index) => (
                <motion.div
                  key={index}
                  className="w-[10%] min-w-[20px] max-w-[40px] bg-gray-200 rounded-t-md relative overflow-hidden"
                  variants={barVariants}
                  initial="initial"
                  animate="animate"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent"
                    variants={shimmerVariants}
                    animate="animate"
                  />
                </motion.div>
              ))}
            </div>
          )}

          {chartType === "line" && (
            <svg
              className="absolute top-0 left-4 sm:left-6 right-4 sm:right-6 h-[85%]"
              fill="none"
              preserveAspectRatio="xMidYMid meet"
            >
              <motion.path
                d="M 0 80 Q 25 40, 50 60 T 100 40"
                stroke="gray"
                strokeWidth="2"
                variants={lineVariants}
                initial="initial"
                animate="animate"
                style={{ width: "100%" }}
              />
              <motion.path
                d="M 0 80 Q 25 40, 50 60 T 100 40"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="4"
                variants={lineVariants}
                initial="initial"
                animate="animate"
                style={{ width: "100%" }}
              />
            </svg>
          )}

          {chartType === "pie" && (
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.svg
                viewBox="0 0 200 200"
                className="w-[70%] h-[70%] max-w-[200px] max-h-[200px] relative overflow-hidden"
                variants={pieVariants}
                initial="initial"
                animate="animate"
                preserveAspectRatio="xMidYMid meet"
              >
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="gray"
                  strokeWidth="20"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="30"
                />
                <motion.rect
                  width="200"
                  height="200"
                  fill="url(#shimmerGradient)"
                  variants={shimmerVariants}
                  animate="animate"
                />
                <defs>
                  <linearGradient id="shimmerGradient">
                    <stop offset="0%" stopColor="transparent" />
                    <stop offset="50%" stopColor="rgba(209, 213, 219, 0.5)" />
                    <stop offset="100%" stopColor="transparent" />
                  </linearGradient>
                </defs>
              </motion.svg>
            </div>
          )}
        </div>

        {/* Title Skeleton */}
        <div className="w-1/3 min-w-[100px] max-w-[150px] h-4 sm:h-5 bg-gray-200 rounded-md mb-2 sm:mb-4">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent"
            variants={shimmerVariants}
            animate="animate"
          />
        </div>

        {/* Legend Skeleton */}
        <div className="flex gap-2 sm:gap-4 mt-2 sm:mt-4">
          {[1, 2].map((_, index) => (
            <div key={index} className="flex items-center gap-1 sm:gap-2">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gray-200 rounded-full relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent"
                  variants={shimmerVariants}
                  animate="animate"
                />
              </div>
              <div className="w-10 sm:w-12 h-2 sm:h-3 bg-gray-200 rounded-md relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent"
                  variants={shimmerVariants}
                  animate="animate"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChartSkeletonLoader;
