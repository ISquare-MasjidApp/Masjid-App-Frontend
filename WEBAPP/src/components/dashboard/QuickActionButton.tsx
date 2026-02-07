'use client';

import { ArrowUpRightIcon } from '@/components/ui/Icons';

interface QuickActionButtonProps {
  label: string;
  onClick?: () => void;
  href?: string;
}

export default function QuickActionButton({ label, onClick }: QuickActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className="
        flex items-center justify-center gap-2
        px-6 py-3 rounded-[12px]
        border border-[var(--border-01)]
        bg-white hover:bg-[var(--neutral-100)]
        transition-colors
        font-urbanist font-medium text-[14px] text-[var(--grey-800)]
      "
    >
      {label}
      <ArrowUpRightIcon size={16} className="text-[var(--grey-800)]" />
    </button>
  );
}
