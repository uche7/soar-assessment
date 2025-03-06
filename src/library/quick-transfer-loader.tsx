import { motion, Variants } from "framer-motion";
import React from "react";

interface QuickTransferLoaderProps {
  width?: string;
  height?: string;
}

const QuickTransferLoader = ({ width = "100%", height = "100%" }: QuickTransferLoaderProps) => {
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

  // Bar animation for pulsing width
  const barVariants: Variants = {
    animate: {
      width: ["60%", "80%", "60%"],
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
      className="w-full h-full mx-auto bg-white lg:rounded-[25px] p-4 sm:p-6 flex flex-col items-center justify-center"
      style={{ maxWidth: width, height }}
    >
      {/* Loading Bar */}
      <motion.div
        className="w-[80%] max-w-[300px] h-8 rounded-full bg-[#EDF1F7] relative overflow-hidden"
        variants={barVariants}
        animate="animate"
      >
        <motion.div
          className="absolute inset-0 bg-[#232323] rounded-full"
          variants={barVariants}
          animate="animate"
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent"
          variants={shimmerVariants}
          animate="animate"
        />
      </motion.div>

      {/* Placeholder Text */}
      <motion.div
        className="mt-4 w-32 h-4 bg-gray-200 rounded-md relative overflow-hidden"
        initial={{ opacity: 0.8 }}
        animate={{ opacity: [0.8, 1, 0.8] }}
        transition={{
          repeat: Infinity,
          repeatType: "reverse",
          duration: 1.2,
        }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent"
          variants={shimmerVariants}
          animate="animate"
        />
      </motion.div>
    </div>
  );
};

export default QuickTransferLoader;