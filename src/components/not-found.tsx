import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

/** Not Found Page */
export function NotFoundPage() {
  const router = useRouter();

  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
  };

  const arrowVariants = {
    initial: { x: 0 }, // Initial position of the arrow
    animate: {
      x: 5,
      transition: {
        duration: 0.5,
        repeat: Infinity,
        repeatType: "mirror" as const,
      }, // Use "mirror" explicitly
    }, // Move arrow back and forth
    hover: { x: 10, transition: { duration: 0.2 } }, // Move arrow further on hover
  };

  return (
    <div className="flex flex-col justify-center items-center text-center font-sans py-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h1 className="text-[100px] font-bold text-gray-800">404</h1>
        <p className="font-[600] text-2xl text-gray-600 mt-4">
          Oops! Page not found
        </p>
        <p className="text-md text-wrap text-gray-500 mt-2">
          The page you are looking for might have been removed, had <br /> its
          name changed, or is temporarily unavailable.
        </p>
      </motion.div>

      <motion.button
        className={`mt-8 px-6 py-2 bg-[#232323] text-white rounded-lg text-lg hover:bg-gray-800
           focus:outline-none flex items-center gap-2 cursor-pointer`}
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        onClick={() => router.push("/")}
      >
        Go to Home
        <motion.span
          variants={arrowVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
        >
          →
        </motion.span>
      </motion.button>
    </div>
  );
}
