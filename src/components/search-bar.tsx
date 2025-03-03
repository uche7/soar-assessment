import { motion } from "framer-motion";
import Image from "next/image";
import Inputs from "@/library/inputs"; 
import SearchIcon from "@/assets/icons/search-icon.svg";
import { SearchBarProps } from "@/types/search-bar";

/** Search Bar Component */
const SearchBar: React.FC<SearchBarProps> = ({ isSearchActive, setIsSearchActive }) => {
  return (
    <motion.div
      className="w-full h-[44px] bg-[#F5F7FA] flex flex-row rounded-[100px] cursor-pointer"
      onClick={() => setIsSearchActive(!isSearchActive)}
      whileHover={{ scale: 1.02 }} // Slight scale-up on hover
      whileTap={{ scale: 0.98 }} // Slight scale-down on click
      transition={{ duration: 0.2, ease: "easeInOut" }} // Smooth transition
    >
      <Image
        className="w-[19.14px] my-[13px] mx-[24px] cursor-pointer"
        src={SearchIcon}
        alt={"Search Icon"}
      />
      <Inputs
        className="w-full h-[50px] font-[400] text-[#8BA3CB] text-[15px] leading-[18.15px] p-2 border-none rounded-[100px] outline-none focus:ring-0"
        Name={"search"}
        inputType={"text"}
        placeholder="Search for something"
      />
    </motion.div>
  );
};

export default SearchBar;
