'use client';

import type { PrayerTime } from '@/types';

interface PrayerTimeCardProps {
  prayer: PrayerTime;
}

export default function PrayerTimeCard({ prayer }: PrayerTimeCardProps) {
  return (
    <div
      className={`
        flex flex-col items-center justify-center
        px-6 py-4 rounded-[12px] min-w-[170px]
        transition-all duration-200 border
        ${prayer.isActive
          ? 'bg-[var(--brand)] border-[var(--brand)] text-white shadow-lg'
          : 'bg-[var(--brand-05)] border-[var(--brand)] hover:shadow-md'
        }
      `}
    >
      {/* Prayer Name */}
      <span
        className={`
          font-urbanist font-normal text-[26px] uppercase tracking-[-0.14px] leading-[1.2]
          ${prayer.isActive ? 'text-white' : 'text-[var(--brand)]'}
        `}
      >
        {prayer.name}
      </span>

      {/* Prayer Time */}
      <span
        className={`
          font-volkhov font-bold text-[26px] leading-[1.3] mt-1
          ${prayer.isActive ? 'text-white' : 'text-[var(--brand)]'}
        `}
      >
        {prayer.time}
      </span>

      {/* Athan Time */}
      {prayer.athanTime && (
        <span
          className={`
            font-urbanist text-[20px] mt-0.5
            ${prayer.isActive ? 'text-white/60' : 'text-[#579E6D]'}
            `}
        >
          Athan {prayer.athanTime}
        </span>
      )}
    </div>
  );
}
