// Prayer Types
export interface PrayerTime {
  name: string;
  time: string;
  athanTime: string;
  isActive?: boolean;
}

// Event Types
export interface Event {
  id: string;
  title: string;
  category: string;
  description: string;
  speaker?: string;
  date: string;
  startTime: string;
  endTime: string;
}

// Campaign Types
export interface Campaign {
  id: string;
  title: string;
  category: string;
  goal: number;
  raised: number;
  endDate: string;
  status: 'active' | 'completed' | 'cancelled';
}

// Navigation Types
export interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  isActive?: boolean;
}

// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'super_admin';
}

// Login Form Types
export interface LoginFormData {
  email: string;
  password: string;
}

export interface LoginFormErrors {
  email?: string;
  password?: string;
  general?: string;
}
