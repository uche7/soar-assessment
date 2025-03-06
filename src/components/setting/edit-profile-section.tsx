"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { FormValues } from "@/types/form-values";
import toast, { Toaster } from "react-hot-toast";
import EditIcon from "@/assets/icons/edit_icon.svg";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "./validation-schema";
import Profile_Pic from "@/assets/images/profile-pic.svg";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

/** Edit Profile Section */
const EditProfileSection: React.FC = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Default values
  const defaultValues: FormValues = {
    yourName: "Charlene Reed",
    username: "Charlene Reed",
    email: "charlenereed@gmail.com",
    password: "********",
    dateOfBirth: "1990-01-25",
    presentAddress: "San Jose, California, USA",
    permanentAddress: "San Jose, California, USA",
    city: "San Jose",
    postalCode: "45962",
    country: "USA",
  };

  // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    trigger,
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  // Load saved data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("userProfile");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setProfileImage(parsedData.profileImage || Profile_Pic);
      reset({
        yourName: parsedData.yourName || defaultValues.yourName,
        username: parsedData.username || defaultValues.username,
        email: parsedData.email || defaultValues.email,
        password: parsedData.password || defaultValues.password,
        dateOfBirth: parsedData.dateOfBirth || defaultValues.dateOfBirth,
        presentAddress:
          parsedData.presentAddress || defaultValues.presentAddress,
        permanentAddress:
          parsedData.permanentAddress || defaultValues.permanentAddress,
        city: parsedData.city || defaultValues.city,
        postalCode: parsedData.postalCode || defaultValues.postalCode,
        country: parsedData.country || defaultValues.country,
      });
    }
  }, [
    defaultValues.city,
    defaultValues.country,
    defaultValues.dateOfBirth,
    defaultValues.email,
    defaultValues.password,
    defaultValues.permanentAddress,
    defaultValues.postalCode,
    defaultValues.presentAddress,
    defaultValues.username,
    defaultValues.yourName,
    reset,
  ]);

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  // Enhanced button animations
  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
      backgroundColor: "#1a1a1a", // Slightly lighter on hover
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

  // Handle image upload with error handling and file size limit
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const maxSize = 2 * 1024 * 1024; // 2MB limit
      if (file.size > maxSize) {
        toast.error("File size exceeds 2MB limit", {
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
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          const result = e.target.result as string;
          setProfileImage(result);
          console.log("Loaded image data URL:", result);
        } else {
          console.error("Failed to load image data");
        }
      };
      reader.onerror = (e) => console.error("FileReader error:", e);
      reader.readAsDataURL(file);
    }
  };

  // Handle save action with validation and toast notifications
  const handleSave = async () => {
    setIsSaving(true); // Start loading animation
    const isValid = await trigger(); // Manually trigger validation

    if (!isValid) {
      setIsSaving(false); // Stop loading animation
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
      return;
    }

    try {
      const values = getValues();
      const dataToSave = {
        ...values,
        profileImage: profileImage || Profile_Pic,
      };
      localStorage.setItem("userProfile", JSON.stringify(dataToSave));
      console.log("Saved to localStorage:", dataToSave);

      // Show success toast
      toast.success("Profile saved successfully!", {
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
      window.location.reload();
    } catch (error) {
      // Show error toast if saving fails
      toast.error("Failed to save profile. Please try again.", {
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
      console.error("Error saving to localStorage:", error);
    } finally {
      setIsSaving(false); // Stop loading animation
    }
  };

  // Prevent form submission from triggering save unless explicitly handled
  const onSubmit = () => {
    console.log("Form submitted, but saving is handled by the Save button.");
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div>
      {/* Add Toaster component for toast notifications */}
      <Toaster />

      <form
        onSubmit={handleSubmit(onSubmit)}
        onKeyDown={(e) => {
          if (e.key === "Enter") e.preventDefault();
        }}
        className="space-y-6"
      >
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
          <motion.div className="relative" variants={itemVariants}>
            <Image
              src={profileImage || Profile_Pic}
              alt="Profile"
              width={98}
              height={91}
              className="w-[105px] h-[100px] md:w-[98px] md:h-[91px] rounded-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = Profile_Pic;
              }}
            />
            <label
              title="Upload"
              htmlFor="imageUpload"
              aria-label="Upload profile image"
              tabIndex={0}
              className="absolute bottom-0 right-0 bg-[#232323] rounded-full p-1 cursor-pointer"
            >
              <Image src={EditIcon} alt="Edit Icon" width={24} height={24} />
              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </motion.div>
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <motion.div variants={itemVariants}>
              <label
                htmlFor="yourName"
                className="block font-[400] text-[#232323] text-[13px] lg:text-[16px] mb-[11px] leading-[100%]"
              >
                Your Name
              </label>
              <input
                id="yourName"
                aria-label="Your Name"
                {...register("yourName")}
                type="text"
                className={`w-full py-[13px] lg:py-[16px] px-[15px] lg:px-[20px] border-[1px] border-[#DFEAF2] font-[400] text-[#718EBF]
                   text-[12px] lg:text-[15px] leading-[100%] rounded-[10px] lg:rounded-[15px] focus:outline-none focus:ring-2 focus:ring-[#718EBF]`}
              />
              {errors.yourName && (
                <div className="text-red-500 text-xs mt-1">
                  {errors.yourName.message}
                </div>
              )}
            </motion.div>
            <motion.div variants={itemVariants}>
              <label
                htmlFor="username"
                className="block font-[400] text-[#232323] text-[16px] mb-[11px] leading-[100%]"
              >
                User Name
              </label>
              <input
                id="username"
                aria-label="User Name"
                {...register("username")}
                type="text"
                className={`w-full py-[13px] lg:py-[16px] px-[15px] lg:px-[20px] border-[1px] border-[#DFEAF2] font-[400] text-[#718EBF]
                  text-[12px] lg:text-[15px] leading-[100%] rounded-[10px] lg:rounded-[15px] focus:outline-none focus:ring-2 focus:ring-[#718EBF]`}
              />
              {errors.username && (
                <div role="alert" className="text-red-500 text-xs mt-1">
                  {errors.username.message}
                </div>
              )}
            </motion.div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div variants={itemVariants}>
            <label
              htmlFor="email"
              className="block font-[400] text-[#232323] text-[16px] mb-[11px] leading-[100%]"
            >
              Email
            </label>
            <input
              id="email"
              aria-label="Email"
              {...register("email")}
              type="email"
              className={`w-full py-[13px] lg:py-[16px] px-[15px] lg:px-[20px] border-[1px] border-[#DFEAF2] font-[400] text-[#718EBF]
                  text-[12px] lg:text-[15px] leading-[100%] rounded-[10px] lg:rounded-[15px] focus:outline-none focus:ring-2 focus:ring-[#718EBF]`}
            />
            {errors.email && (
              <div role="alert" className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </div>
            )}
          </motion.div>
          <motion.div variants={itemVariants}>
            <label
              htmlFor="password"
              className="block font-[400] text-[#232323] text-[16px] mb-[11px] leading-[100%]"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                aria-label="Password"
                {...register("password")}
                type={showPassword ? "text" : "password"}
                className={`w-full py-[13px] lg:py-[16px] px-[15px] lg:px-[20px] border-[1px] border-[#DFEAF2] font-[400] text-[#718EBF]
                    text-[12px] lg:text-[15px] leading-[100%] rounded-[10px] lg:rounded-[15px] focus:outline-none focus:ring-2 focus:ring-[#718EBF] pr-10`}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <AiFillEyeInvisible cursor={"pointer"} size={20} />
                ) : (
                  <AiFillEye cursor={"pointer"} size={20} />
                )}
              </button>
            </div>
            {errors.password && (
              <div role="alert" className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </div>
            )}
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div variants={itemVariants}>
            <label
              htmlFor="dateOfBirth"
              className="block font-[400] text-[#232323] text-[16px] mb-[11px] leading-[100%]"
            >
              Date of Birth
            </label>
            <input
              id="dateOfBirth"
              aria-label=" Date of Birth"
              {...register("dateOfBirth")}
              type="date"
              className={`w-full py-[13px] lg:py-[16px] px-[15px] lg:px-[20px] border-[1px] border-[#DFEAF2] font-[400] text-[#718EBF]
                  text-[12px] lg:text-[15px] leading-[100%] rounded-[10px] lg:rounded-[15px] focus:outline-none focus:ring-2 focus:ring-[#718EBF]`}
            />
            {errors.dateOfBirth && (
              <div role="alert" className="text-red-500 text-xs mt-1">
                {errors.dateOfBirth.message}
              </div>
            )}
          </motion.div>
          <motion.div variants={itemVariants}>
            <label
              htmlFor="presentAddress"
              className="block font-[400] text-[#232323] text-[16px] mb-[11px] leading-[100%]"
            >
              Present Address
            </label>
            <input
              id="presentAddress"
              aria-label="Present Address"
              {...register("presentAddress")}
              type="text"
              className={`w-full py-[13px] lg:py-[16px] px-[15px] lg:px-[20px] border-[1px] border-[#DFEAF2] font-[400] text-[#718EBF]
                  text-[12px] lg:text-[15px] leading-[100%] rounded-[10px] lg:rounded-[15px] focus:outline-none focus:ring-2 focus:ring-[#718EBF]`}
            />
            {errors.presentAddress && (
              <div role="alert" className="text-red-500 text-xs mt-1">
                {errors.presentAddress.message}
              </div>
            )}
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div variants={itemVariants}>
            <label
              htmlFor="permanentAddress"
              className="block font-[400] text-[#232323] text-[16px] mb-[11px] leading-[100%]"
            >
              Permanent Address
            </label>
            <input
              id="permanentAddress"
              aria-label="Permanent Address"
              {...register("permanentAddress")}
              type="text"
              className={`w-full py-[13px] lg:py-[16px] px-[15px] lg:px-[20px] border-[1px] border-[#DFEAF2] font-[400] text-[#718EBF]
                  text-[12px] lg:text-[15px] leading-[100%] rounded-[10px] lg:rounded-[15px] focus:outline-none focus:ring-2 focus:ring-[#718EBF]`}
            />
            {errors.permanentAddress && (
              <div role="alert" className="text-red-500 text-xs mt-1">
                {errors.permanentAddress.message}
              </div>
            )}
          </motion.div>
          <motion.div variants={itemVariants}>
            <label
              htmlFor="city"
              className="block font-[400] text-[#232323] text-[16px] mb-[11px] leading-[100%]"
            >
              City
            </label>
            <input
              id="city"
              aria-label="City"
              {...register("city")}
              type="text"
              className={`w-full py-[13px] lg:py-[16px] px-[15px] lg:px-[20px] border-[1px] border-[#DFEAF2] font-[400] text-[#718EBF]
                  text-[12px] lg:text-[15px] leading-[100%] rounded-[10px] lg:rounded-[15px] focus:outline-none focus:ring-2 focus:ring-[#718EBF]`}
            />
            {errors.city && (
              <div role="alert" className="text-red-500 text-xs mt-1">
                {errors.city.message}
              </div>
            )}
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div variants={itemVariants}>
            <label
              htmlFor="postalCode"
              className="block font-[400] text-[#232323] text-[16px] mb-[11px] leading-[100%]"
            >
              Postal Code
            </label>
            <input
              id="postalCode"
              aria-label="Postal Code"
              {...register("postalCode")}
              type="text"
              className={`w-full py-[13px] lg:py-[16px] px-[15px] lg:px-[20px] border-[1px] border-[#DFEAF2] font-[400] text-[#718EBF]
                  text-[12px] lg:text-[15px] leading-[100%] rounded-[10px] lg:rounded-[15px] focus:outline-none focus:ring-2 focus:ring-[#718EBF]`}
            />
            {errors.postalCode && (
              <div role="alert" className="text-red-500 text-xs mt-1">
                {errors.postalCode.message}
              </div>
            )}
          </motion.div>
          <motion.div variants={itemVariants}>
            <label
              htmlFor="country"
              className="block font-[400] text-[#232323] text-[16px] mb-[11px] leading-[100%]"
            >
              Country
            </label>
            <input
              id="country"
              aria-label="Country"
              {...register("country")}
              type="text"
              className={`w-full py-[13px] lg:py-[16px] px-[15px] lg:px-[20px] border-[1px] border-[#DFEAF2] font-[400] text-[#718EBF]
                  text-[12px] lg:text-[15px] leading-[100%] rounded-[10px] lg:rounded-[15px] focus:outline-none focus:ring-2 focus:ring-[#718EBF]`}
            />
            {errors.country && (
              <div role="alert" className="text-red-500 text-xs mt-1">
                {errors.country.message}
              </div>
            )}
          </motion.div>
        </div>

        <motion.div className="flex justify-end" variants={itemVariants}>
          <motion.button
            title="Submit"
            type="button" // Prevents form submission
            className="px-[74px] py-[14px] bg-[#232323] font-[500] text-[18px] text-white rounded-[15px] leading-[100%] cursor-pointer flex items-center justify-center"
            onClick={handleSave}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            animate={isSaving ? "loading" : undefined} // Apply loading animation when saving
            disabled={isSaving} // Disable button while saving
          >
            {isSaving ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
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
                Saving...
              </span>
            ) : (
              "Save"
            )}
          </motion.button>
        </motion.div>
      </form>
    </div>
  );
};

export default EditProfileSection;
