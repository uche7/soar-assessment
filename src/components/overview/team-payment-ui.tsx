import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { teamMembers } from "@/dto/team-members";
import { motion, Variants } from "framer-motion";
import Send_Icon from "@/assets/icons/send_icon.svg";
import QuickTransferLoader from "@/library/quick-transfer-loader";

export const QuickTransfer = () => {
  const [amount, setAmount] = useState("525.50");
  const [isSent, setIsSent] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showArrows, setShowArrows] = useState({
    left: false,
    right: true,
    hasOverflow: true,
  });

  // Check if content overflows
  const checkOverflow = () => {
    if (scrollRef.current) {
      const hasOverflow =
        scrollRef.current.scrollWidth > scrollRef.current.clientWidth;
      setShowArrows((prev) => ({
        ...prev,
        hasOverflow,
        left: hasOverflow && scrollRef.current!.scrollLeft > 0,
        right:
          hasOverflow &&
          scrollRef.current!.scrollLeft <
            scrollRef.current!.scrollWidth - scrollRef.current!.clientWidth,
      }));
    }
  };

  // Handle scroll events
  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      const currentScroll = scrollRef.current.scrollLeft;

      if (direction === "left") {
        scrollRef.current.scrollTo({
          left: currentScroll - scrollAmount,
          behavior: "smooth",
        });
      } else {
        scrollRef.current.scrollTo({
          left: currentScroll + scrollAmount,
          behavior: "smooth",
        });
      }
    }
  };

  // Update arrow visibility on scroll
  const updateArrowVisibility = () => {
    if (scrollRef.current && showArrows.hasOverflow) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowArrows({
        hasOverflow: true,
        left: scrollLeft > 0,
        right: scrollLeft < scrollWidth - clientWidth,
      });
    }
  };

  // Check overflow and handle initial loading on mount
  useEffect(() => {
    // Check overflow on mount and resize
    checkOverflow();
    window.addEventListener("resize", checkOverflow);

    // Simulate initial loading on refresh
    const timer = setTimeout(() => {
      setIsLoading(false); // Hide loader after 1.5s
      checkOverflow(); // Recheck overflow after loader hides
    }, 1500);

    return () => {
      window.removeEventListener("resize", checkOverflow);
      clearTimeout(timer);
    };
  }, []);

  // Handle send button click
  const handleSendClick = () => {
    setIsLoading(true); // Show loader
    setTimeout(() => {
      setIsLoading(false); // Hide loader
      setIsSent(true); // Show "Sent" feedback
      setTimeout(() => setIsSent(false), 2000); // Reset "Sent" after 2s
    }, 1500); // Loader duration (1.5s)
  };

  // Button animation variants
  const buttonVariants: Variants = {
    idle: {
      scale: 1,
      backgroundColor: "#232323",
    },
    hover: { scale: 0.92 },
    tap: { scale: 0.99 },
    sent: {
      scale: [0.99, 1.05, 1],
      backgroundColor: "#28a745",
      transition: {
        duration: 0.5,
      },
    },
  };

  // Content animation variants
  const contentVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  // Checkmark animation variants
  const checkmarkVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0,
      rotate: -90,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className="lg:max-w-[445px] w-full mx-auto bg-white lg:rounded-[25px] lg:py-[35px] px-[14px] lg:px-[25px]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {isLoading ? (
        <QuickTransferLoader width="100%" height="100%" />
      ) : (
        <>
          {/* Scrollable Profiles with Arrows */}
          <div className="relative mb-8">
            <div
              ref={scrollRef}
              className="flex overflow-x-hidden gap-[12px] lg:gap-[29px] scroll-smooth"
              onScroll={updateArrowVisibility}
            >
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  className="flex-shrink-0 text-center"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="p-2 transition-colors">
                    <div className="relative w-[50px] lg:w-[70px] h-[50px] lg:h-[70px] mx-auto mb-2">
                      <Image
                        src={member.avatar}
                        alt={member.name}
                        className="rounded-full"
                        layout="fill"
                      />
                    </div>
                    <p
                      className={`${
                        member.role === "CEO" ? "lg:font-[800]" : "font-[400]"
                      } text-[12px] lg:text-[16px] text-[#232323] leading-[19.36px]`}
                    >
                      {member.name}
                    </p>
                    <p
                      className={`${
                        member.role === "CEO" ? "lg:font-[800]" : "font-[400]"
                      } text-[12px] lg:text-[15px] text-[#718EBF] leading-[18.15px]`}
                    >
                      {member.role}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {showArrows.hasOverflow && (
              <>
                {showArrows.left && (
                  <motion.button
                    className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md cursor-pointer"
                    onClick={() => handleScroll("left")}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <ArrowIcon direction="left" />
                  </motion.button>
                )}
                {showArrows.right && (
                  <motion.button
                    className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md cursor-pointer"
                    onClick={() => handleScroll("right")}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <ArrowIcon direction="right" />
                  </motion.button>
                )}
              </>
            )}
          </div>

          {/* Amount Input Section */}
          <div className="flex items-center justify-between lg:gap-[27px]">
            <label className="text-[12px] lg:text-[16px] font-[400] text-[#718EBF] leading-[19.36px]">
              Write Amount
            </label>
            <div className="bg-[#EDF1F7] w-[200px] lg:w-[265px] flex justify-between items-center rounded-[50px] relative">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-[100px] lg:w-[140px] font-[400] text-[#718EBF] text-[12px] lg:text-[16px] leading-[19.36px] py-[15px] pl-[20px] lg:pl-[30px] border-none outline-none"
                placeholder="0.00"
              />
              <motion.button
                className="bg-[#232323] w-full flex gap-[14px] lg:gap-[11px] items-center py-[14px] lg:py-[16px] px-[22px] lg:px-[24px] font-[500] text-[#FFFFFF] text-[12px] lg:text-[16px] rounded-[50px] shadow transition-colors leading-[19.36px] cursor-pointer relative overflow-hidden"
                variants={buttonVariants}
                initial="idle"
                animate={isSent ? "sent" : "idle"}
                whileHover="hover"
                whileTap="tap"
                onClick={handleSendClick}
                disabled={isSent || isLoading}
                aria-label="Send amount"
              >
                {/* Send State */}
                <motion.div
                  className="flex items-center gap-[14px] lg:gap-[11px]"
                  variants={contentVariants}
                  initial="visible"
                  animate={isSent ? "hidden" : "visible"}
                >
                  <span>Send</span>
                  <Image
                    className="w-[16.15px] lg:w-[26px]"
                    src={Send_Icon}
                    alt="Send Icon"
                  />
                </motion.div>

                {/* Sent State */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center gap-[14px] lg:gap-[11px]"
                  variants={contentVariants}
                  initial="hidden"
                  animate={isSent ? "visible" : "hidden"}
                >
                  <span>Sent</span>
                  <svg
                    className="w-[16.15px] lg:w-[26px] h-[16.15px] lg:h-[26px] text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <motion.path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                      variants={checkmarkVariants}
                      initial="hidden"
                      animate={isSent ? "visible" : "hidden"}
                    />
                  </svg>
                </motion.div>
              </motion.button>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
};

// Arrow Icon Component
const ArrowIcon = ({ direction }: { direction: "left" | "right" }) => (
  <svg
    className={`w-6 h-6 text-[#718EBF] transform ${
      direction === "left" ? "rotate-180" : ""
    }`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5l7 7-7 7"
    />
  </svg>
);
