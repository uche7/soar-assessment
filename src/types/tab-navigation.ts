/** Tab Navigation Props */
export interface TabNavigationProps {
  initialTab?: string;
  sections: { name: string; component: React.ReactNode }[];
  onTabChange?: (tab: string) => void;
}
