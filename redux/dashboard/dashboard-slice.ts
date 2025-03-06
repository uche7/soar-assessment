/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChartData } from "chart.js";

interface UserInfo {
  name: string;
  email: string;
}

interface CardDetails {
  cardNumber: string;
  expiry: string;
  balance: number;
}

interface Transaction {
  id: string;
  date: string;
  amount: number;
  type: "deposit" | "withdraw";
}

interface DashboardState {
  userInfo: UserInfo | null;
  cardDetails: CardDetails[] | null;
  transactions: Transaction[] | null;
  weeklyChartData: ChartData<"bar"> | null;
  polarChartData: ChartData<"polarArea"> | null; // Added for Polar Area chart
  loading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  userInfo: null,
  cardDetails: null,
  transactions: null,
  weeklyChartData: null,
  polarChartData: null,
  loading: false,
  error: null,
};

/** Mock API functions */
const mockFetch = async <T>(data: T, delay = 1000): Promise<T> => {
  return new Promise((resolve) => setTimeout(() => resolve(data), delay));
};

const fetchUserInfo = () =>
  mockFetch<UserInfo>({ name: "John Doe", email: "john.doe@example.com" });

const fetchCardDetails = () =>
  mockFetch<CardDetails[]>([
    { cardNumber: "**** **** **** 1234", expiry: "12/25", balance: 1500 },
  ]);

const fetchTransactions = () =>
  mockFetch<Transaction[]>([
    { id: "1", date: "2023-10-01", amount: 200, type: "deposit" },
    { id: "2", date: "2023-10-02", amount: 300, type: "withdraw" },
  ]);

const fetchWeeklyChartData = () =>
  mockFetch<ChartData<"bar">>({
    labels: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [
      {
        label: "Deposit",
        data: [200, 150, 250, 400, 300, 200, 350],
        backgroundColor: "rgb(59, 130, 246)",
        borderRadius: 20,
        borderSkipped: false as const,
        barThickness: 15,
      },
      {
        label: "",
        data: [0, 0, 0, 0, 0, 0, 0],
        backgroundColor: "rgba(0, 0, 0, 0)",
        barThickness: 5,
      },
      {
        label: "Withdraw",
        data: [500, 300, 400, 450, 200, 350, 400],
        backgroundColor: "rgb(17, 24, 39)",
        borderRadius: 20,
        borderSkipped: false as const,
        barThickness: 15,
      },
    ],
  });

const fetchPolarChartData = () =>
  mockFetch<ChartData<"polarArea">>({
    labels: ["Entertainment", "Investment", "Expense", "Others"],
    datasets: [
      {
        label: "Expenses",
        data: [30, 20, 15, 35],
        backgroundColor: ["#343C6A", "#396AFF", "#FC7900", "#232323"],
        borderColor: "#fff",
        borderWidth: 5,
      },
    ],
  });

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    fetchDataStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchUserInfoSuccess: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
      state.loading = false;
    },
    fetchCardDetailsSuccess: (state, action: PayloadAction<CardDetails[]>) => {
      state.cardDetails = action.payload;
      state.loading = false;
    },
    fetchTransactionsSuccess: (state, action: PayloadAction<Transaction[]>) => {
      state.transactions = action.payload;
      state.loading = false;
    },
    fetchWeeklyChartDataSuccess: (
      state,
      action: PayloadAction<ChartData<"bar">>
    ) => {
      state.weeklyChartData = action.payload as any; // Type assertion for Chart.js compatibility
      state.loading = false;
    },
    fetchPolarChartDataSuccess: (
      state,
      action: PayloadAction<ChartData<"polarArea">>
    ) => {
      state.polarChartData = action.payload as any; // Type assertion for Chart.js compatibility
      state.loading = false;
    },
    fetchDataFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchDataStart,
  fetchUserInfoSuccess,
  fetchCardDetailsSuccess,
  fetchTransactionsSuccess,
  fetchWeeklyChartDataSuccess,
  fetchPolarChartDataSuccess,
  fetchDataFailure,
} = dashboardSlice.actions;

import { AppDispatch } from "../store";

export const fetchDashboardData = () => async (dispatch: AppDispatch) => {
  dispatch(fetchDataStart());
  try {
    const [userInfo, cards, transactions, weeklyChartData, polarChartData] =
      await Promise.all([
        fetchUserInfo(),
        fetchCardDetails(),
        fetchTransactions(),
        fetchWeeklyChartData(),
        fetchPolarChartData(),
      ]);
    dispatch(fetchUserInfoSuccess(userInfo));
    dispatch(fetchCardDetailsSuccess(cards));
    dispatch(fetchTransactionsSuccess(transactions));
    dispatch(fetchWeeklyChartDataSuccess(weeklyChartData));
    dispatch(fetchPolarChartDataSuccess(polarChartData));
  } catch (error) {
    dispatch(
      fetchDataFailure((error as Error).message || "Failed to fetch data")
    );
  }
};

export default dashboardSlice.reducer;
