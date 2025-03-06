"use client";

import React, { useEffect } from "react";
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
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/store";
import {
  setProfileImage,
  setIsSaving,
  toggleShowPassword,
  updateProfile,
} from "../../../redux/setting/profile-slice";

/** Edit Profile Section */
const EditProfileSection: React.FC = () => {
  const dispatch = useDispatch();
  const { profileImage, isSaving, showPassword, ...formValues } = useSelector(
    (state: RootState) => state.profile
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    trigger,
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
    defaultValues: formValues,
  });

  // Load saved data from localStorage on mount and update Redux
  useEffect(() => {
    const savedData = localStorage.getItem("userProfile");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      dispatch(setProfileImage(parsedData.profileImage || Profile_Pic));
      dispatch(
        updateProfile({
          yourName: parsedData.yourName,
          username: parsedData.username,
          email: parsedData.email,
          password: parsedData.password,
          dateOfBirth: parsedData.dateOfBirth,
          presentAddress: parsedData.presentAddress,
          permanentAddress: parsedData.permanentAddress,
          city: parsedData.city,
          postalCode: parsedData.postalCode,
          country: parsedData.country,
        })
      );
      reset(parsedData); // Sync form with loaded data
    } else {
      dispatch(setProfileImage(Profile_Pic)); // Set default image if no saved data
    }
  }, [dispatch, reset]);

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
      backgroundColor: "#1a1a1a",
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    tap: {
      scale: 0.98,
      boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.2 },
    },
    loading: {
      scale: [1, 1.05, 1],
      transition: { repeat: Infinity, duration: 0.8 },
    },
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const maxSize = 2 * 1024 * 1024; // 2MB limit
      if (file.size > maxSize) {
        toast.error("File size exceeds 2MB limit", {
          duration: 3000,
          position: "top-right",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          const result = e.target.result as string;
          dispatch(setProfileImage(result));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    dispatch(setIsSaving(true));
    const isValid = await trigger();

    if (!isValid) {
      dispatch(setIsSaving(false));
      toast.error("Please fix the errors in the form", {
        duration: 3000,
        position: "top-right",
      });
      return;
    }

    try {
      const values = getValues();
      const dataToSave = { ...values, profileImage };
      localStorage.setItem("userProfile", JSON.stringify(dataToSave));
      dispatch(updateProfile(values));
      toast.success("Profile saved successfully!", {
        duration: 3000,
        position: "top-right",
      });
      window.location.reload();
    } catch {
      toast.error("Failed to save profile. Please try again.", {
        duration: 3000,
        position: "top-right",
      });
    } finally {
      dispatch(setIsSaving(false));
    }
  };

  const onSubmit = () => {
    console.log("Form submitted, but saving is handled by the Save button.");
  };

  return (
    <div>
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
              htmlFor="imageUpload"
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
                {...register("yourName")}
                type="text"
                className="w-full py-[13px] lg:py-[16px] px-[15px] lg:px-[20px] border-[1px] border-[#DFEAF2] font-[400] text-[#718EBF] text-[12px] lg:text-[15px] leading-[100%] rounded-[10px] lg:rounded-[15px] focus:outline-none focus:ring-2 focus:ring-[#718EBF]"
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
                {...register("username")}
                type="text"
                className="w-full py-[13px] lg:py-[16px] px-[15px] lg:px-[20px] border-[1px] border-[#DFEAF2] font-[400] text-[#718EBF] text-[12px] lg:text-[15px] leading-[100%] rounded-[10px] lg:rounded-[15px] focus:outline-none focus:ring-2 focus:ring-[#718EBF]"
              />
              {errors.username && (
                <div className="text-red-500 text-xs mt-1">
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
              {...register("email")}
              type="email"
              className="w-full py-[13px] lg:py-[16px] px-[15px] lg:px-[20px] border-[1px] border-[#DFEAF2] font-[400] text-[#718EBF] text-[12px] lg:text-[15px] leading-[100%] rounded-[10px] lg:rounded-[15px] focus:outline-none focus:ring-2 focus:ring-[#718EBF]"
            />
            {errors.email && (
              <div className="text-red-500 text-xs mt-1">
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
                {...register("password")}
                type={showPassword ? "text" : "password"}
                className="w-full py-[13px] lg:py-[16px] px-[15px] lg:px-[20px] border-[1px] border-[#DFEAF2] font-[400] text-[#718EBF] text-[12px] lg:text-[15px] leading-[100%] rounded-[10px] lg:rounded-[15px] focus:outline-none focus:ring-2 focus:ring-[#718EBF] pr-10"
              />
              <button
                type="button"
                onClick={() => dispatch(toggleShowPassword())}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {showPassword ? (
                  <AiFillEyeInvisible size={20} />
                ) : (
                  <AiFillEye size={20} />
                )}
              </button>
            </div>
            {errors.password && (
              <div className="text-red-500 text-xs mt-1">
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
              {...register("dateOfBirth")}
              type="date"
              className="w-full py-[13px] lg:py-[16px] px-[15px] lg:px-[20px] border-[1px] border-[#DFEAF2] font-[400] text-[#718EBF] text-[12px] lg:text-[15px] leading-[100%] rounded-[10px] lg:rounded-[15px] focus:outline-none focus:ring-2 focus:ring-[#718EBF]"
            />
            {errors.dateOfBirth && (
              <div className="text-red-500 text-xs mt-1">
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
              {...register("presentAddress")}
              type="text"
              className="w-full py-[13px] lg:py-[16px] px-[15px] lg:px-[20px] border-[1px] border-[#DFEAF2] font-[400] text-[#718EBF] text-[12px] lg:text-[15px] leading-[100%] rounded-[10px] lg:rounded-[15px] focus:outline-none focus:ring-2 focus:ring-[#718EBF]"
            />
            {errors.presentAddress && (
              <div className="text-red-500 text-xs mt-1">
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
              {...register("permanentAddress")}
              type="text"
              className="w-full py-[13px] lg:py-[16px] px-[15px] lg:px-[20px] border-[1px] border-[#DFEAF2] font-[400] text-[#718EBF] text-[12px] lg:text-[15px] leading-[100%] rounded-[10px] lg:rounded-[15px] focus:outline-none focus:ring-2 focus:ring-[#718EBF]"
            />
            {errors.permanentAddress && (
              <div className="text-red-500 text-xs mt-1">
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
              {...register("city")}
              type="text"
              className="w-full py-[13px] lg:py-[16px] px-[15px] lg:px-[20px] border-[1px] border-[#DFEAF2] font-[400] text-[#718EBF] text-[12px] lg:text-[15px] leading-[100%] rounded-[10px] lg:rounded-[15px] focus:outline-none focus:ring-2 focus:ring-[#718EBF]"
            />
            {errors.city && (
              <div className="text-red-500 text-xs mt-1">
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
              {...register("postalCode")}
              type="text"
              className="w-full py-[13px] lg:py-[16px] px-[15px] lg:px-[20px] border-[1px] border-[#DFEAF2] font-[400] text-[#718EBF] text-[12px] lg:text-[15px] leading-[100%] rounded-[10px] lg:rounded-[15px] focus:outline-none focus:ring-2 focus:ring-[#718EBF]"
            />
            {errors.postalCode && (
              <div className="text-red-500 text-xs mt-1">
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
              {...register("country")}
              type="text"
              className="w-full py-[13px] lg:py-[16px] px-[15px] lg:px-[20px] border-[1px] border-[#DFEAF2] font-[400] text-[#718EBF] text-[12px] lg:text-[15px] leading-[100%] rounded-[10px] lg:rounded-[15px] focus:outline-none focus:ring-2 focus:ring-[#718EBF]"
            />
            {errors.country && (
              <div className="text-red-500 text-xs mt-1">
                {errors.country.message}
              </div>
            )}
          </motion.div>
        </div>

        <motion.div className="flex justify-end" variants={itemVariants}>
          <motion.button
            type="button"
            className="w-full lg:w-[190px] px-[74px] py-[14px] bg-[#232323] font-[500] text-[15px] lg:text-[18px] text-white rounded-[9px] lg:rounded-[15px] leading-[100%] cursor-pointer flex items-center justify-center"
            onClick={handleSave}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            animate={isSaving ? "loading" : undefined}
            disabled={isSaving}
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
