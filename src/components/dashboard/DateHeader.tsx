'use client';

import { ChevronLeftIcon, ChevronRightIcon } from '@/components/ui/Icons';

interface DateHeaderProps {
  gregorianDate: string;
  islamicDate: string;
  isToday: boolean;
  onPrevDay?: () => void;
  onNextDay?: () => void;
  onJumpToToday?: () => void;
}

export default function DateHeader({
  gregorianDate,
  islamicDate,
  isToday,
  onPrevDay,
  onNextDay,
  onJumpToToday,
}: DateHeaderProps) {
  return (
    <div className="flex items-center justify-between bg-[var(--brand-05)] px-4 py-2 rounded-[12px] w-full">
      {/* Previous Day Button */}
      <button
        onClick={onPrevDay}
        className="p-[6px] border border-[rgba(7,119,52,0.5)] rounded-[8px] hover:bg-[var(--brand-10)] transition-colors flex items-center justify-center bg-white"
        aria-label="Previous Day"
      >
        <ChevronLeftIcon size={24} className="text-[var(--grey-800)] stroke-[1.5]" />
      </button>

      {/* Date Display */}
      <div className="flex flex-col items-center justify-center gap-[2px]">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center gap-[4px] text-center sm:text-left">
          <h2 className="font-urbanist font-semibold text-[16px] sm:text-[20px] text-[var(--grey-800)] leading-tight sm:leading-none">
            {gregorianDate}
          </h2>
          <button
            onClick={() => !isToday && onJumpToToday?.()}
            className={`
              font-urbanist text-[12px] font-bold text-[var(--brand)] uppercase tracking-wide mt-[2px]
              ${!isToday ? 'cursor-pointer hover:underline' : 'cursor-default'}
            `}
          >
            {isToday ? 'TODAY' : 'GO TO TODAY'}
          </button>
        </div>
        <p className="font-urbanist font-semibold text-[16px] text-[var(--brand)] leading-none">
          {islamicDate}
        </p>
      </div>

      {/* Next Day Button */}
      <button
        onClick={onNextDay}
        className="p-[6px] border border-[rgba(7,119,52,0.5)] rounded-[8px] hover:bg-[var(--brand-10)] transition-colors flex items-center justify-center bg-white"
        aria-label="Next Day"
      >
        <ChevronRightIcon size={24} className="text-[var(--grey-800)] stroke-[1.5]" />
      </button>
    </div>
  );
}
