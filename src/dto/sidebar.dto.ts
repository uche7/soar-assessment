// Data Transter Object
import HomeIcon from "@/assets/icons/home-icon.svg";
import { DashboardNonAuthRoutes } from "@/utils/urls";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

/** Sidebar DTO */
export const Sidebar_DTO = (Router: AppRouterInstance) => [
  {
    Icon: HomeIcon,
    text: "Dashboard",
    route: () => Router.push(DashboardNonAuthRoutes.dashboard),
  },
  {
    Icon: HomeIcon,
    text: "Transactions",
    route: () => Router.push(DashboardNonAuthRoutes.transactions),
  },
  {
    Icon: HomeIcon,
    text: "Accounts",
    route: () => Router.push(DashboardNonAuthRoutes.accounts),
  },
  {
    Icon: HomeIcon,
    text: "Investments",
    route: () => Router.push(DashboardNonAuthRoutes.investments),
  },
  {
    Icon: HomeIcon,
    text: "Credit Cards",
    route: () => Router.push(DashboardNonAuthRoutes.credit_cards),
  },
  {
    Icon: HomeIcon,
    text: "Loans",
    route: () => Router.push(DashboardNonAuthRoutes.loans),
  },
  {
    Icon: HomeIcon,
    text: "Services",
    route: () => Router.push(DashboardNonAuthRoutes.services),
  },
  {
    Icon: HomeIcon,
    text: "My Privileges",
    route: () => Router.push(DashboardNonAuthRoutes.my_privileges),
  },
  {
    Icon: HomeIcon,
    text: "Setting",
    route: () => Router.push(DashboardNonAuthRoutes.setting),
  },
];
