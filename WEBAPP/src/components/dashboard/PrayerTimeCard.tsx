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
        px-4 py-3 rounded-[12px] w-[130px]
        transition-all duration-200
        ${
          prayer.isActive
            ? 'bg-[var(--brand)] text-white'
            : 'border border-[var(--border-01)] text-[var(--grey-800)] hover:border-[var(--brand)]'
        }
      `}
    >
      {/* Prayer Name */}
      <span
        className={`
        font-urbanist font-semibold text-[14px] uppercase tracking-wide
        ${prayer.isActive ? 'text-white' : 'text-[var(--brand)]'}
      `}
      >
        {prayer.name}
      </span>

      {/* Prayer Time */}
      <span
        className={`
        font-urbanist font-bold text-[20px] mt-1
        ${prayer.isActive ? 'text-white' : 'text-[var(--brand)]'}
      `}
      >
        {prayer.time}
      </span>

      {/* Athan Time */}
      <span
        className={`
        font-urbanist text-[11px] mt-1
        ${prayer.isActive ? 'text-white/80' : 'text-[var(--neutral-500)]'}
      `}
      >
        ATHAN {prayer.athanTime}
      </span>
    </div>
  );
}
