"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { DashboardNonAuthRoutes } from "@/utils/urls";
import { yupResolver } from "@hookform/resolvers/yup";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { validationSchemaSecurity } from "./validation-schema";
import { PasswordFormValues } from "@/types/password-form-values";

/** Security Section */
const SecuritySection: React.FC = () => {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm<PasswordFormValues>({
    resolver: yupResolver(validationSchemaSecurity),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  // Enhanced button animations
  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
      backgroundColor: "#e0e0e0", // Lighter gray on hover
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    tap: {
      scale: 0.98,
      boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.2 },
    },
    loading: {
      scale: [1, 1.05, 1], // Pulse effect
      transition: { repeat: Infinity, duration: 0.8 },
    },
  };

  // Load existing profile data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("userProfile");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      console.log("Loaded profile data:", parsedData);
    }
  }, []);

  // Handle password update
  const handleUpdatePassword = async (data: PasswordFormValues) => {
    setIsUpdating(true); // Start loading animation

    // Validate the form
    const isValid = await trigger();
    if (!isValid) {
      toast.error("Please fix the errors in the form", {
        duration: 3000,
        position: "top-right",
        style: {
          background: "#fff",
          color: "#ff4d4f",
          border: "1px solid #ff4d4f",
          borderRadius: "10px",
          padding: "10px 20px",
        },
      });
      setIsUpdating(false);
      return;
    }

    // Retrieve existing profile data
    const savedData = localStorage.getItem("userProfile");
    const parsedData = savedData ? JSON.parse(savedData) : {};

    // Update password in profile data
    const updatedData = {
      ...parsedData,
      password: data.newPassword, // Save the new password
    };

    // Save updated data to localStorage
    try {
      localStorage.setItem("userProfile", JSON.stringify(updatedData));
      toast.success("Password updated successfully!", {
        duration: 3000,
        position: "top-right",
        style: {
          background: "#fff",
          color: "#4caf50",
          border: "1px solid #4caf50",
          borderRadius: "10px",
          padding: "10px 20px",
        },
      });
      reset(); // To Clear the form
      router.push(DashboardNonAuthRoutes.dashboard);
    } catch (error) {
      toast.error("Failed to update password.", {
        duration: 3000,
        position: "top-right",
        style: {
          background: "#fff",
          color: "#ff4d4f",
          border: "1px solid #ff4d4f",
          borderRadius: "10px",
          padding: "10px 20px",
        },
      });
      console.error("Error updating password:", error);
    } finally {
      setIsUpdating(false); // Stop loading animation
    }
  };

  // Toggle password visibility
  const toggleNewPasswordVisibility = () =>
    setShowNewPassword(!showNewPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  return (
    <motion.div
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
    >
      {/* Add Toaster for toast notifications */}
      <Toaster />

      <motion.div variants={itemVariants}>
        <label className="block font-[400] text-[#232323] text-[16px] mb-[11px] leading-[100%]">
          Two-Factor Authentication
        </label>
        <input
          type="checkbox"
          className="w-5 h-5 border-gray-300 rounded focus:outline-none cursor-pointer"
        />
        <span className="ml-2 text-gray-600">Enable 2FA</span>
      </motion.div>

      <motion.div variants={itemVariants}>
        <label className="block font-[400] text-[#232323] text-[16px] mb-[11px] leading-[100%]">
          Change Password
        </label>
        <form
          onSubmit={handleSubmit(handleUpdatePassword)}
          className="space-y-4"
        >
          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              {...register("newPassword")}
              placeholder="New Password"
              className="w-full py-[13px] lg:py-[16px] px-[15px] lg:px-[20px] border-[1px] border-[#DFEAF2] font-[400] text-[#718EBF] text-[12px] lg:text-[15px] leading-[100%] rounded-[10px] lg:rounded-[15px] focus:outline-none focus:ring-2 focus:ring-[#718EBF] pr-10"
              aria-label="New Password"
            />
            <button
              type="button"
              onClick={toggleNewPasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label={showNewPassword ? "Hide password" : "Show password"}
            >
              {showNewPassword ? (
                <AiFillEyeInvisible cursor={"pointer"} size={20} />
              ) : (
                <AiFillEye cursor={"pointer"} size={20} />
              )}
            </button>
            {errors.newPassword && (
              <div className="text-red-500 text-xs mt-1">
                {errors.newPassword.message}
              </div>
            )}
          </div>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              {...register("confirmPassword")}
              placeholder="Confirm Password"
              className="w-full py-[13px] lg:py-[16px] px-[15px] lg:px-[20px] border-[1px] border-[#DFEAF2] font-[400] text-[#718EBF] text-[12px] lg:text-[15px] leading-[100%] rounded-[10px] lg:rounded-[15px] focus:outline-none focus:ring-2 focus:ring-[#718EBF] pr-10"
              aria-label="Confirm Password"
            />
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label={
                showConfirmPassword ? "Hide password" : "Show password"
              }
            >
              {showConfirmPassword ? (
                <AiFillEyeInvisible cursor={"pointer"} size={20} />
              ) : (
                <AiFillEye cursor={"pointer"} size={20} />
              )}
            </button>
            {errors.confirmPassword && (
              <div className="text-red-500 text-xs mt-1">
                {errors.confirmPassword.message}
              </div>
            )}
          </div>
          <motion.button
            type="submit"
            className="px-4 py-2 bg-gray-200 rounded-[10px] text-sm flex items-center justify-center cursor-pointer"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            animate={isUpdating ? "loading" : undefined}
            disabled={isUpdating}
          >
            {isUpdating ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-gray-700"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
                Updating...
              </span>
            ) : (
              "Update Password"
            )}
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default SecuritySection;
