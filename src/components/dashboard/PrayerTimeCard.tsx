'use client';

import type { PrayerTime } from '@/types';

interface PrayerTimeCardProps {
  prayer: PrayerTime;
}

export default function PrayerTimeCard({ prayer }: PrayerTimeCardProps) {
  // Helper to split time and AM/PM
  const formatTimeParts = (timeStr: string) => {
    const match = timeStr.match(/(\d+:\d+)\s*(AM|PM)?/i);
    if (match) {
      return { time: match[1], ampm: match[2]?.toUpperCase() || '' };
    }
    return { time: timeStr, ampm: '' };
  };

  const mainParts = formatTimeParts(prayer.time);

  // Athan formatting is a bit trickier if it's just a string "5:50 AM".
  // Figma shows "Athan 5:50" in one style and "Am" in another.
  // I'll try to parse it similarly.
  const athanParts = formatTimeParts(prayer.athanTime || '');

  return (
    <div
      className={`
        flex flex-1 flex-col items-center justify-center gap-[8px]
        p-[24px] rounded-[12px] min-w-[160px]
        transition-all duration-200 border
        ${prayer.isActive
          ? 'bg-[var(--brand)] border-[var(--brand)] text-white shadow-lg'
          : 'bg-[var(--brand-05)] border-transparent hover:shadow-md'
        }
      `}
    >
      {/* Prayer Name */}
      <p
        className={`
          font-urbanist font-medium text-[22px] uppercase tracking-[-0.14px] leading-normal
          ${prayer.isActive ? 'text-white' : 'text-[var(--brand)]'}
        `}
      >
        {prayer.name}
      </p>

      {/* Main Time */}
      <div className="flex items-baseline gap-[6px] justify-center">
        <p
          className={`
            font-inter font-bold text-[26px] leading-normal
            ${prayer.isActive ? 'text-white' : 'text-[var(--grey-800)]'}
          `}
        >
          {mainParts.time}
        </p>
        {mainParts.ampm && (
          <p
            className={`
              font-inter font-bold text-[18px] uppercase leading-normal
              ${prayer.isActive ? 'text-white' : 'text-[#666d80]'}
            `}
          >
            {mainParts.ampm}
          </p>
        )}
      </div>

      {/* Athan Time */}
      {prayer.athanTime && (
        <div className="flex items-baseline gap-[4px] justify-center text-center">
          <span
            className={`
              font-urbanist font-medium text-[20px] uppercase leading-normal
              ${prayer.isActive ? 'text-white/80' : 'text-[var(--grey-100)]'}
            `}
          >
            Athan {athanParts?.time || prayer.athanTime}
          </span>
          {athanParts?.ampm && (
            <span
              className={`
                font-urbanist font-medium text-[13px] uppercase leading-normal
                ${prayer.isActive ? 'text-white' : 'text-[var(--grey-100)]'}
              `}
            >
              {athanParts.ampm}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
