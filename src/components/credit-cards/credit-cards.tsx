"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Cards from "../cards";
import CardSkeletonLoader from "@/library/card-skeleton-loader";

// Mock user card data
const mockCardData = [
  {
    theme: "dark" as const,
    balance: "$5,250.50",
    cardHolder: "John Doe",
    validThru: "12/25",
    cardNumer: "**** 1234",
  },
  {
    theme: "light" as const,
    balance: "$1,800.00",
    cardHolder: "Jane Smith",
    validThru: "06/26",
    cardNumer: "**** 5678",
  },
  {
    theme: "dark" as const,
    balance: "$3,400.75",
    cardHolder: "Alex Brown",
    validThru: "09/24",
    cardNumer: "**** 9012",
  },
  {
    theme: "light" as const,
    balance: "$4,800.00",
    cardHolder: "Rose Ada",
    validThru: "06/26",
    cardNumer: "**** 5678",
  },
  {
    theme: "dark" as const,
    balance: "$7,400.75",
    cardHolder: "Frank Jones",
    validThru: "09/24",
    cardNumer: "**** 9012",
  },
  {
    theme: "light" as const,
    balance: "$9,800.00",
    cardHolder: "Ruth Foster",
    validThru: "06/26",
    cardNumer: "**** 5678",
  },
];

const CreditCards = () => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate data fetching
  useEffect(() => {
    const fetchCards = async () => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setCards(mockCardData);
      setIsLoading(false);
    };
    fetchCards();
  }, []);

  // Animation variants for the container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  // Animation variants for each card
  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
    hover: {
      scale: 1.03,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="min-h-screen pt-[24px] px-[15px] md:px-[25px] pb-[39px]">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-[14px] lg:text-2xl font-semibold text-[#343C6A] mb-8">
          Hello!&#128075;{" "}
          <span className="text-[#718EBF] text-[18px] ml-2">
            Here Are Your Cards &#129297;
          </span>
        </h1>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence>
            {isLoading
              ? Array.from({ length: 6 }).map((_, index) => (
                  <motion.div
                    key={`skeleton-${index}`}
                    className="min-w-[265px] h-[170px] lg:w-[350px] lg:h-[235px]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CardSkeletonLoader />
                  </motion.div>
                ))
              : cards.map((card, index) => (
                  <motion.div
                    key={index}
                    className="w-full"
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
                  >
                    <Cards
                      theme={card.theme}
                      balance={card.balance}
                      cardHolder={card.cardHolder}
                      validThru={card.validThru}
                      cardNumer={card.cardNumer}
                    />
                  </motion.div>
                ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

// Define the CardData type based on CardsProps
interface CardData {
  theme: "dark" | "light";
  balance: string;
  cardHolder: string;
  validThru: string;
  cardNumer: string;
}

export default CreditCards;
