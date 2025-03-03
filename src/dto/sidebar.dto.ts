// Data Transter Object
import HomeIcon from "@/assets/icons/home-icon.svg";
import TransferIcon from "@/assets/icons/transfer-icon.svg";
import UserIcon from "@/assets/icons/user-icon.svg";
import EconomicIcon from "@/assets/icons/economic-icon.svg";
import CreditCardIcon from "@/assets/icons/credit-card-icon.svg";
import LoanIcon from "@/assets/icons/loan-icon.svg";
import Services from "@/assets/icons/service-icon.svg";
import EconometricsIcon from "@/assets/icons/econometrics-icon.svg";
import SettingIcon from "@/assets/icons/settingsIcon.svg";
import { DashboardNonAuthRoutes } from "@/utils/urls";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

/** Sidebar DTO */
export const Sidebar_DTO = (Router: AppRouterInstance) => [
  {
    Icon: HomeIcon,
    text: "Dashboard",
    routePath: DashboardNonAuthRoutes.dashboard,
    route: () => Router.push(DashboardNonAuthRoutes.dashboard),
  },
  {
    Icon: TransferIcon,
    text: "Transactions",
    routePath: DashboardNonAuthRoutes.transactions,
    route: () => Router.push(DashboardNonAuthRoutes.transactions),
  },
  {
    Icon: UserIcon,
    text: "Accounts",
    routePath: DashboardNonAuthRoutes.accounts,
    route: () => Router.push(DashboardNonAuthRoutes.accounts),
  },
  {
    Icon: EconomicIcon,
    text: "Investments",
    routePath: DashboardNonAuthRoutes.investments,
    route: () => Router.push(DashboardNonAuthRoutes.investments),
  },
  {
    Icon: CreditCardIcon,
    text: "Credit Cards",
    routePath: DashboardNonAuthRoutes.credit_cards,
    route: () => Router.push(DashboardNonAuthRoutes.credit_cards),
  },
  {
    Icon: LoanIcon,
    text: "Loans",
    routePath: DashboardNonAuthRoutes.loans,
    route: () => Router.push(DashboardNonAuthRoutes.loans),
  },
  {
    Icon: Services,
    text: "Services",
    routePath: DashboardNonAuthRoutes.services,
    route: () => Router.push(DashboardNonAuthRoutes.services),
  },
  {
    Icon: EconometricsIcon,
    text: "My Privileges",
    routePath: DashboardNonAuthRoutes.my_privileges,
    route: () => Router.push(DashboardNonAuthRoutes.my_privileges),
  },
  {
    Icon: SettingIcon,
    text: "Setting",
    routePath: DashboardNonAuthRoutes.setting,
    route: () => Router.push(DashboardNonAuthRoutes.setting),
  },
];
