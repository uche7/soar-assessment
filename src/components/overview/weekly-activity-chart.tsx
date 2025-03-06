"use client";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { ChartOptions } from "chart.js";
import { useEffect, useState } from "react";
import ChartSkeletonLoader from "@/library/chart-skeleton-loader";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

/** Weekly Activity Chart */
const WeeklyActivityChart = () => {
  const [chartData, setChartData] = useState<ChartData<"bar"> | null>(null);

  // Function to get bar thickness based on screen width
  const getBarThickness = () => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 480 ? 10 : 15; // 10 for mobile, 15 for larger screens
    }
    return 15; // Default value
  };

  useEffect(() => {
    // Dummy data based on the image description
    const dummyData = {
      labels: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
      datasets: [
        {
          label: "Deposit",
          data: [200, 150, 250, 400, 300, 200, 350],
          backgroundColor: "rgb(59, 130, 246)", // Tailwind blue-500
          borderRadius: 20,
          borderSkipped: false,
          barThickness: getBarThickness(), // Dynamic bar thickness
          offset: 10,
        },
        {
          label: "",
          data: [0, 0, 0, 0, 0, 0, 0],
          backgroundColor: "rgba(0, 0, 0, 0)", // Transparent bar
          barThickness: 5,
        },
        {
          label: "Withdraw",
          data: [500, 300, 400, 450, 200, 350, 400],
          backgroundColor: "rgb(17, 24, 39)", // Tailwind gray-900
          borderRadius: 20,
          borderSkipped: false,
          barThickness: getBarThickness(), // Dynamic bar thickness
          offset: 5,
        },
      ],
    };

    // Simulate a delay to mimic an async operation
    setTimeout(() => {
      setChartData(dummyData);
    }, 1000);
  }, []);

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        align: "end",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          padding: 10,
          color: "#718EBF", // Legend text color
        },
      },
      datalabels: {
        display: false, // Explicitly disable datalabels
      },
    },
    layout: {
      padding: {
        top: 0,
      },
    },
    scales: {
      x: {
        stacked: false,
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          color: "#718EBF", // X-axis text color
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 100,
          color: "#718EBF", // Y-axis text color
        },
        grid: {
          color: "#E2E8F0", // Light gray grid lines
        },
      },
    },
  };

  return (
    <div
      className="lg:bg-[#FFFFFF] w-full lg:w-[720px] lg:rounded-[25px] lg:p-4"
      role="img"
      aria-label="Weekly Activity Chart showing trends in spending."
      style={{ height: "300px" }}
    >
      {chartData ? (
        <Bar data={chartData} options={options} />
      ) : (
        <ChartSkeletonLoader chartType="bar" width="100%" height="100%" />
      )}
    </div>
  );
};

export default WeeklyActivityChart;
