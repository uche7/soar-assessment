// Data Transter Object
import SettingIcon from "@/assets/icons/settings-icon.svg";
import BellIcon from "@/assets/icons/bell-icon.svg";
import Profile_Pic from "@/assets/images/profile-pic.svg";
import { DashboardNonAuthRoutes } from "@/utils/urls";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

/** Navigation DTO */
export const Navigation_DTO = (Router: AppRouterInstance) => [
  {
    Icon: SettingIcon,
    alt: "Setting Icon",
    route: () => Router.push(DashboardNonAuthRoutes.setting),
  },
  {
    Icon: BellIcon,
    alt: "Notification Icon",
    route: () => Router.push(DashboardNonAuthRoutes.notifications),
  },
  {
    Icon: Profile_Pic,
    alt: "Profile_Pic Icon",
    route: () => Router.push(DashboardNonAuthRoutes.setting),
  },
];
