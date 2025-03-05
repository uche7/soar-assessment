import React from "react";
import { PolarArea } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

// Register Chart.js components
ChartJS.register(
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
  ChartDataLabels
);

const PolarAreaChart: React.FC = () => {
  // Data for the chart
  const data = {
    labels: ["Entertainment", "Investment", "Expense", "Others"],
    datasets: [
      {
        label: "Expenses",
        data: [30, 20, 15, 35], // Values for each segment
        backgroundColor: ["#343C6A", "#396AFF", "#FC7900", "#232323"], // Segment colors
        borderColor: "#fff", // White border for segments
        borderWidth: 5, // Border width
      },
    ],
  };

  // Chart options
  const options = {
    scales: {
      r: {
        grid: {
          display: false, // Hide radial grid lines
        },
        ticks: {
          display: false, // Hide radial ticks
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
      tooltip: {
        enabled: true, // Enable tooltips
      },
      datalabels: {
        color: "#fff",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        font: (context: any) => {
          const value = context.dataset.data[context.dataIndex] as number;
          const maxValue = Math.max(...(context.dataset.data as number[]));
          const fontSize = 5 + (value / maxValue) * 8; // Adjust scaling factor as needed
          return {
            size: Math.max(fontSize, 7), // Minimum font size of 10
            weight: 'bold' as const,
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
        align: "center" as const, // Center the text horizontally
        anchor: "center" as const, // Center the text vertically
      },
    },
    responsive: true, // Make the chart responsive
    maintainAspectRatio: false, // Allow custom height and width
  };

  return (
    <div style={{ width: "100%", height: "300px" }}>
      <PolarArea data={data} options={options} />
    </div>
  );
};

export default PolarAreaChart;
