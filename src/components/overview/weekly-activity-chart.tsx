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
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../redux/store";
import { fetchDashboardData } from "../../../redux/dashboard/dashboard-slice";
import ChartSkeletonLoader from "@/library/chart-skeleton-loader";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const WeeklyActivityChart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { weeklyChartData, loading } = useSelector(
    (state: RootState) => state.dashboard
  );

  const getBarThickness = () => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 480 ? 10 : 15;
    }
    return 15;
  };

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  const chartDataWithDynamicThickness: ChartData<"bar"> | null = weeklyChartData
    ? {
        ...weeklyChartData,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        datasets: weeklyChartData.datasets.map((dataset: any) => ({
          ...dataset,
          barThickness: dataset.label === "" ? 5 : getBarThickness(),
        })),
      }
    : null;

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
          color: "#718EBF",
        },
      },
      datalabels: {
        display: false,
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
          color: "#718EBF",
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 100,
          color: "#718EBF",
        },
        grid: {
          color: "#E2E8F0",
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
      {loading || !chartDataWithDynamicThickness ? (
        <ChartSkeletonLoader chartType="bar" width="100%" height="100%" />
      ) : (
        <Bar data={chartDataWithDynamicThickness} options={options} />
      )}
    </div>
  );
};

export default WeeklyActivityChart;
