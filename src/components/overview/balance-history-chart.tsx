"use client";

import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import ChartSkeletonLoader from "@/library/chart-skeleton-loader";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Filler,
  ChartOptions,
  ChartData,
} from "chart.js";

// Register the necessary chart components
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Filler
);

const BalanceHistoryChart: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData<"line"> | null>(null);

  useEffect(() => {
    // Mock data fetch (replace with your API call)
    const fetchLineChartData = async () => {
      try {
        // Simulate API response
        const data = {
          labels: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan"],
          datasets: [
            {
              label: "Balance",
              data: [200, 400, 600, 800, 600, 400, 200],
              borderColor: "#1814F3", // Line color
              backgroundColor: "rgba(45, 96, 255, 0.2)", // 50% opacity at top // Fill color
              borderWidth: 3,
              pointRadius: 0,
              tension: 0.4, // Smooth curve
              fill: true, // Enable area fill
            },
          ],
        };
        setChartData(data);
      } catch (error) {
        console.error("Error fetching line chart data:", error);
      }
    };

    fetchLineChartData();
  }, []);

  // Chart options
  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Hide legend
      },
      tooltip: {
        enabled: true,
        backgroundColor: "#1814F3",
        titleColor: "#fff",
        bodyColor: "#fff",
        padding: 10,
        cornerRadius: 6,
      },
    },
    scales: {
      x: {
        border: { dash: [4, 4] },
        grid: {
          color: "#DFE5EE", // Grid line color
        },
        ticks: {
          color: "#718EBF", // Month label color
          font: {
            size: 12,
          },
        },
      },
      y: {
        border: { dash: [4, 4] },
        grid: {
          color: "#DFE5EE", // Grid line color
        },
        ticks: {
          color: "#718EBF", // Y-axis label color
          font: {
            size: 12,
          },
          stepSize: 200, // Increment by 200
          callback: (value: string | number) => {
            if (typeof value === "string") {
              return parseFloat(value).toString();
            }
            return value.toString();
          },
        },
        beginAtZero: true, // Start y-axis from 0
      },
    },
  };

  return (
    <div className="lg:bg-white lg:rounded-[25px] py-5 px-4">
      <div className="w-full lg:w-[500px] h-[250px]">
        {chartData ? (
          <Line data={chartData} options={options} />
        ) : (
          <ChartSkeletonLoader chartType={"line"} />
        )}
      </div>
    </div>
  );
};

export default BalanceHistoryChart;
