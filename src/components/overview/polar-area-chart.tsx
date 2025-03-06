"use client";

import React, { useEffect } from "react";
import { PolarArea } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import ChartSkeletonLoader from "@/library/chart-skeleton-loader";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../redux/store";
import { fetchDashboardData } from "../../../redux/dashboard/dashboard-slice";

ChartJS.register(
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
  ChartDataLabels
);

const PolarAreaChart: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { polarChartData, loading } = useSelector(
    (state: RootState) => state.dashboard
  );

  useEffect(() => {
    dispatch(fetchDashboardData()); // Fetch all dashboard data on mount
  }, [dispatch]);

  const options: ChartOptions<"polarArea"> = {
    scales: {
      r: {
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
      datalabels: {
        color: "#fff",
        font: (context) => {
          const value = context.dataset.data[context.dataIndex] as number; // Cast to number since data is number[]
          const maxValue = Math.max(...(context.dataset.data as number[]));
          const fontSize = 5 + (value / maxValue) * 8;
          return {
            size: Math.max(fontSize, 7),
            weight: "bold" as const,
          };
        },
        formatter: (
          value: number,
          context: {
            chart: { data: { labels?: unknown[] } };
            dataIndex: number;
          }
        ) => {
          const label = context.chart.data.labels?.[
            context.dataIndex
          ] as string;
          return `${value}%\n${label}`;
        },
        align: "center" as const,
        anchor: "center" as const,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div style={{ width: "100%", height: "300px", position: "relative" }}>
      {loading || !polarChartData ? (
        <ChartSkeletonLoader chartType="pie" width="100%" height="100%" />
      ) : (
        <PolarArea
          data={polarChartData}
          options={options}
          aria-label="Expense distribution over time."
        />
      )}
    </div>
  );
};

export default PolarAreaChart;
