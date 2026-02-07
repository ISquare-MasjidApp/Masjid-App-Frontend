'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  DashboardIcon,
  PrayerIcon,
  MegaphoneIcon,
  CampaignIcon,
  SettingsIcon,
  BellIcon,
  ChevronDownIcon,
} from '@/components/ui/Icons';

interface NavItemProps {
  label: string;
  href: string;
  icon: React.ReactNode;
  isActive?: boolean;
}

const NavItem = ({ label, href, icon, isActive = false }: NavItemProps) => (
  <Link
    href={href}
    className={`
      flex items-center gap-2 px-4 py-3 rounded-[12px] transition-colors
      ${
        isActive
          ? 'bg-[var(--brand-10)] text-[var(--brand)]'
          : 'text-[var(--grey-800)] hover:bg-[var(--neutral-100)]'
      }
    `}
  >
    <span className={isActive ? 'text-[var(--brand)]' : 'text-[var(--grey-800)]'}>{icon}</span>
    <span className={`font-urbanist text-[14px] ${isActive ? 'font-semibold' : 'font-medium'}`}>
      {label}
    </span>
  </Link>
);

interface HeaderProps {
  activeNav?: string;
}

export default function Header({ activeNav = 'dashboard' }: HeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);

  const navItems: NavItemProps[] = [
    {
      label: 'Dashboard',
      href: '/dashboard',
      icon: <DashboardIcon size={20} />,
      isActive: activeNav === 'dashboard',
    },
    {
      label: 'Prayer Management',
      href: '/prayer-management',
      icon: <PrayerIcon size={20} />,
      isActive: activeNav === 'prayer',
    },
    {
      label: 'Event & Announcements',
      href: '/events',
      icon: <MegaphoneIcon size={20} />,
      isActive: activeNav === 'events',
    },
    {
      label: 'Campaign',
      href: '/campaigns',
      icon: <CampaignIcon size={20} />,
      isActive: activeNav === 'campaigns',
    },
    {
      label: 'App Settings',
      href: '/settings',
      icon: <SettingsIcon size={20} />,
      isActive: activeNav === 'settings',
    },
  ];

  return (
    <header className="w-full bg-white shadow-[0_4px_21px_rgba(0,0,0,0.1)]">
      <div className="max-w-[1440px] mx-auto px-[60px] py-4 flex items-center justify-between h-[100px]">
        {/* Logo */}
        <Link href="/dashboard" className="relative w-[68px] h-[68px]">
          <Image
            src="/images/nwk-logo.png"
            alt="NWK Muslim Association"
            fill
            className="object-contain"
          />
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-2">
          {navItems.map((item) => (
            <NavItem key={item.href} {...item} />
          ))}
        </nav>

        {/* Right Side - Notification & User */}
        <div className="flex items-center gap-6">
          {/* Notification Bell */}
          <button className="relative p-2 hover:bg-[var(--neutral-100)] rounded-full transition-colors">
            <BellIcon size={20} className="text-[var(--grey-800)]" />
            {/* Notification Badge */}
            <span className="absolute top-1 right-1 w-2 h-2 bg-[var(--auxiliary-700)] rounded-full" />
          </button>

          {/* User Avatar & Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <div className="relative w-[40px] h-[40px] rounded-full overflow-hidden">
                <Image
                  src="/images/user-avatar.png"
                  alt="User Avatar"
                  fill
                  className="object-cover"
                />
              </div>
              <ChevronDownIcon size={16} className="text-[var(--grey-800)]" />
            </button>

            {/* Dropdown Menu */}
            {showUserMenu && (
              <div className="absolute right-0 top-full mt-2 w-[200px] bg-white rounded-[12px] shadow-[0_4px_21px_rgba(0,0,0,0.1)] py-2 z-50">
                <Link
                  href="/profile"
                  className="block px-4 py-2 font-urbanist text-[14px] text-[var(--grey-800)] hover:bg-[var(--neutral-100)]"
                >
                  Profile
                </Link>
                <Link
                  href="/settings"
                  className="block px-4 py-2 font-urbanist text-[14px] text-[var(--grey-800)] hover:bg-[var(--neutral-100)]"
                >
                  Settings
                </Link>
                <hr className="my-2 border-[var(--border-01)]" />
                <button
                  className="w-full text-left px-4 py-2 font-urbanist text-[14px] text-[var(--auxiliary-700)] hover:bg-[var(--neutral-100)]"
                  onClick={() => {
                    // TODO: Implement logout
                    console.log('Logout clicked');
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
