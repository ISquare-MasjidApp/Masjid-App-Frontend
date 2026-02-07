'use client';

import { CalendarIcon, ClockIcon, ArrowUpRightIcon } from '@/components/ui/Icons';
import type { Event } from '@/types';

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <div className="bg-white border border-[var(--border-01)] rounded-[12px] p-5 hover:shadow-[0_4px_21px_rgba(0,0,0,0.1)] transition-shadow">
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-urbanist font-semibold text-[16px] text-[var(--grey-800)]">
            {event.title}
          </h3>
          <span className="font-urbanist text-[14px] text-[var(--brand)]">{event.category}</span>
        </div>
        <button className="p-2 hover:bg-[var(--neutral-100)] rounded-full transition-colors">
          <ArrowUpRightIcon size={16} className="text-[var(--grey-800)]" />
        </button>
      </div>

      {/* Description */}
      <p className="font-urbanist text-[14px] text-[var(--grey-100)] mb-4 line-clamp-2">
        {event.description}
      </p>

      {/* Speaker */}
      {event.speaker && (
        <p className="font-urbanist text-[14px] text-[var(--grey-800)] mb-4">
          <span className="text-[var(--neutral-500)]">Speaker</span> {event.speaker}
        </p>
      )}

      {/* Footer - Date & Time */}
      <div className="flex items-center gap-4 text-[var(--brand)]">
        <div className="flex items-center gap-1">
          <CalendarIcon size={16} />
          <span className="font-urbanist text-[14px]">{event.date}</span>
        </div>
        <div className="flex items-center gap-1">
          <ClockIcon size={16} />
          <span className="font-urbanist text-[14px]">
            {event.startTime} - {event.endTime}
          </span>
        </div>
      </div>
    </div>
  );
}
