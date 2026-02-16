'use client';

import { ChevronLeftIcon, ChevronRightIcon } from '@/components/ui/Icons';

interface DateHeaderProps {
  gregorianDate: string;
  islamicDate: string;
  onPrevDay?: () => void;
  onNextDay?: () => void;
}

export default function DateHeader({
  gregorianDate,
  islamicDate,
  onPrevDay,
  onNextDay,
}: DateHeaderProps) {
  return (
    <div className="flex items-center justify-between bg-white border border-[var(--border-01)] rounded-[12px] px-6 py-4">
      {/* Previous Day Button */}
      <button
        onClick={onPrevDay}
        className="p-2 hover:bg-[var(--neutral-100)] rounded-full transition-colors border border-[var(--border-01)]"
      >
        <ChevronLeftIcon size={20} className="text-[var(--grey-800)]" />
      </button>

      {/* Date Display */}
      <div className="text-center">
        <h2 className="font-urbanist font-semibold text-[20px] text-[var(--grey-800)]">
          {gregorianDate}
        </h2>
        <p className="font-urbanist text-[14px] text-[var(--brand)] mt-1">{islamicDate}</p>
      </div>

      {/* Next Day Button */}
      <button
        onClick={onNextDay}
        className="p-2 hover:bg-[var(--neutral-100)] rounded-full transition-colors border border-[var(--border-01)]"
      >
        <ChevronRightIcon size={20} className="text-[var(--grey-800)]" />
      </button>
    </div>
  );
}
