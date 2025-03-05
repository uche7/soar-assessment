import { useState, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Profile_pic_1 from "@/assets/images/profile_pic_1.svg";
import Profile_pic_2 from "@/assets/images/profile_pic_2.svg";
import Profile_pic_3 from "@/assets/images/profile_pic_3.svg";

export const QuickTransfer = () => {
  const [amount, setAmount] = useState("525.50");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const teamMembers = [
    { name: "Livia Bator", role: "CEO", avatar: Profile_pic_1 },
    { name: "Randy Press", role: "Director", avatar: Profile_pic_2 },
    { name: "Workman", role: "Designer", avatar: Profile_pic_3 },
    { name: "Livia Bator", role: "CEO", avatar: Profile_pic_1 },
    { name: "Randy Press", role: "Director", avatar: Profile_pic_2 },
    { name: "Workman", role: "Designer", avatar: Profile_pic_3 },
  ];

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 200; // Match card width + margin
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

  return (
    <motion.div
      className="lg:max-w-[445px] w-full mx-auto bg-white rounded-2xl py-[35px] px-[25px]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Scrollable Profiles with Arrows */}
      <div className="relative mb-8">
        <div
          ref={scrollRef}
          className="flex overflow-x-hidden gap-[29px] scroll-smooth"
          onScroll={(e) => {
            const { scrollLeft, scrollWidth, clientWidth } = e.currentTarget;
            setShowLeftArrow(scrollLeft > 0);
            setShowRightArrow(scrollLeft < scrollWidth - clientWidth);
          }}
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
                <div className="relative w-20 h-20 mx-auto mb-2">
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    className="w-[70px] h-[70px] rounded-full"
                    layout="fill"
                  />
                </div>
                <p
                  className={` ${
                    member.role === "CEO" ? "font-[800]" : "font-[400]"
                  } text-[16px] text-[#232323] leading-[19.36px]`}
                >
                  {member.name}
                </p>
                <p
                  className={`${
                    member.role === "CEO" ? "font-[800]" : "font-[400]"
                  } text-[15px] text-[#718EBF] leading-[18.15px]`}
                >
                  {member.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Scroll Arrows */}
        {showLeftArrow && (
          <motion.button
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md cursor-pointer"
            onClick={() => handleScroll("left")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <ArrowIcon direction="left" />
          </motion.button>
        )}
        {showRightArrow && (
          <motion.button
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md cursor-pointer"
            onClick={() => handleScroll("right")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <ArrowIcon direction="right" />
          </motion.button>
        )}
      </div>

      {/* Amount Input Section */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-800 mb-3">
          Write Amount
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 font-medium">
            $
          </span>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full pl-12 pr-6 py-4 border border-gray-300 rounded-lg focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none text-gray-900 font-medium placeholder:text-gray-400"
            placeholder="0.00"
          />
        </div>
      </div>

      {/* Send Button */}
      <motion.button
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-[14px] rounded-lg font-semibold flex items-center justify-center gap-3 transition-colors"
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.98 }}
      >
        <svg
          className="w-5 h-5 text-white -rotate-45"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
          />
        </svg>
        Send Transfer
      </motion.button>
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
