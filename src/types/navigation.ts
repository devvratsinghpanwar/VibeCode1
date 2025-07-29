export interface NavItem {
  label: string;
  path: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface BreadcrumbItem {
  label: string;
  path: string;
} 