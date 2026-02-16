'use client';

import { useState, useEffect, useCallback } from 'react';
import DateHeader from '@/components/dashboard/DateHeader';
import PrayerTimeCard from '@/components/dashboard/PrayerTimeCard';
import QuickActionButton from '@/components/dashboard/QuickActionButton';
import EventCard from '@/components/dashboard/EventCard';
import CampaignCard from '@/components/dashboard/CampaignCard';
import type { PrayerTime, Event, Campaign } from '@/types';
import { getPrayerTimes } from '@/lib/api/prayer-times';
import type { PrayerTimeResponse, PrayersData } from '@/types/prayer-times';

// Helper to format date key YYYY-MM-DD
const formatDateKey = (date: Date) => {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

// Helper to format time for display (12h)
function formatTime12h(time24: string | undefined): string {
  if (!time24) return '—';
  const [hoursStr, minutesStr] = time24.split(':');
  let hours = parseInt(hoursStr, 10);
  const minutes = minutesStr;
  const ampm = hours >= 12 ? 'PM' : 'AM';
  if (hours > 12) hours -= 12;
  if (hours === 0) hours = 12;
  return `${hours}:${minutes} ${ampm}`;
}

const upcomingEvents: Event[] = [
  {
    id: '1',
    title: 'Friday Community Gathering',
    category: 'Community Event',
    description:
      'A casual community meet-up after Isha Prayer to discuss upcoming activities and strength our bonds as a community...',
    speaker: 'Ustadh Sultan Ahmed',
    date: '17 Oct 2025',
    startTime: '07:00 PM',
    endTime: '08:30 PM',
  },
  {
    id: '2',
    title: 'Friday Community Gathering',
    category: 'Community Event',
    description:
      'A casual community meet-up after Isha Prayer to discuss upcoming activities and strength our bonds as a community...',
    speaker: 'Ustadh Sultan Ahmed',
    date: '17 Oct 2025',
    startTime: '07:00 PM',
    endTime: '08:30 PM',
  },
];

const activeCampaigns: Campaign[] = [
  {
    id: '1',
    title: 'Help Build New Wudu Area',
    category: 'Masjid Development',
    goal: 15000,
    raised: 10500,
    endDate: '05 Dec 2025',
    status: 'active',
  },
  {
    id: '2',
    title: 'Sponsor a student for Education',
    category: "Education & dawa'h",
    goal: 15000,
    raised: 10500,
    endDate: '05 Dec 2025',
    status: 'active',
  },
  {
    id: '3',
    title: 'Emergency Support for brother Yusuf',
    category: 'Help a Brother or Sister',
    goal: 15000,
    raised: 10500,
    endDate: '05 Dec 2025',
    status: 'active',
  },
];

const PRAYER_NAMES: (keyof PrayersData)[] = ['fajr', 'sunrise', 'zuhr', 'asr', 'maghrib', 'isha'];
const PRAYER_LABELS: Record<string, string> = {
  fajr: 'Fajr',
  sunrise: 'Sunrise',
  zuhr: 'Zuhr',
  asr: 'Asr',
  maghrib: 'Maghrib',
  isha: 'Isha',
};

export default function DashboardPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [prayerData, setPrayerData] = useState<PrayerTimeResponse[]>([]);
  const [loading, setLoading] = useState(true);

  // Track month/year for fetching
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  // Fetch prayer times when month/year changes
  const fetchPrayerTimes = useCallback(async () => {
    setLoading(true);
    try {
      const startDate = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-01`;
      const lastDay = new Date(currentYear, currentMonth + 1, 0).getDate();
      const endDate = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`;

      const result = await getPrayerTimes({ startDate, endDate, size: 31 });
      setPrayerData(result.content);
    } catch (error) {
      console.error('Failed to fetch prayer times', error);
    } finally {
      setLoading(false);
    }
  }, [currentMonth, currentYear]);

  useEffect(() => {
    fetchPrayerTimes();
  }, [fetchPrayerTimes]);

  // Handle Date Navigation
  const handlePrevDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() - 1);
    setSelectedDate(newDate);

    // Sync fetch if month changes
    if (newDate.getMonth() !== currentMonth || newDate.getFullYear() !== currentYear) {
      setCurrentMonth(newDate.getMonth());
      setCurrentYear(newDate.getFullYear());
    }
  };

  const handleNextDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + 1);
    setSelectedDate(newDate);

    // Sync fetch if month changes
    if (newDate.getMonth() !== currentMonth || newDate.getFullYear() !== currentYear) {
      setCurrentMonth(newDate.getMonth());
      setCurrentYear(newDate.getFullYear());
    }
  };

  // Get data for selected date
  const selectedDateKey = formatDateKey(selectedDate);
  const daysPrayerData = prayerData.find(p => p.date === selectedDateKey);

  // Format data for PrayerTimeCard
  const displayPrayerTimes: PrayerTime[] = PRAYER_NAMES.map(name => {
    const p = daysPrayerData?.prayers[name];
    const time = p?.jamah || p?.athan || '—';
    const athanTime = p?.athan ? formatTime12h(p.athan) : '—';

    // Determine active status (simplified logic for now)
    // Real active logic requires checking current time vs prayer time intervals
    const isActive = false;

    return {
      name: PRAYER_LABELS[name],
      time: formatTime12h(time),
      athanTime: name === 'sunrise' ? '' : athanTime, // Sunrise doesn't have athan label usually in UI
      isActive: isActive
    };
  });

  return (
    <div className="flex flex-col gap-8">
      {/* Date Header */}
      <DateHeader
        gregorianDate={selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
        islamicDate={daysPrayerData?.hijriDate || '—'}
        onPrevDay={handlePrevDay}
        onNextDay={handleNextDay}
      />

      {/* Prayer Times */}
      <div className="flex justify-center flex-wrap gap-3">
        {loading ? (
          // Simple Loading Skeleton matching card size
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="w-[180px] h-[140px] bg-white rounded-xl border border-gray-100 animate-pulse" />
          ))
        ) : daysPrayerData ? (
          displayPrayerTimes.map((prayer) => (
            <PrayerTimeCard key={prayer.name} prayer={prayer} />
          ))
        ) : (
          <p className="text-gray-500 py-10">No prayer times found for this date.</p>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-4 gap-4">
        <QuickActionButton label="Add Event" onClick={() => console.log('Add Event')} />
        <QuickActionButton
          label="Add Announcement"
          onClick={() => console.log('Add Announcement')}
        />
        <QuickActionButton label="Create Campaign" onClick={() => console.log('Create Campaign')} />
        <QuickActionButton
          label="Update Prayer Timings"
          onClick={() => console.log('Update Prayer Timings')}
        />
      </div>

      {/* Upcoming Events Section */}
      <section>
        <h2 className="font-urbanist font-semibold text-[20px] text-[var(--grey-800)] mb-4">
          Upcoming Events
        </h2>
        <div className="grid grid-cols-2 gap-6">
          {upcomingEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      {/* Active Campaigns Section */}
      <section>
        <h2 className="font-urbanist font-semibold text-[20px] text-[var(--grey-800)] mb-4">
          Active Campaigns
        </h2>
        <div className="grid grid-cols-3 gap-6">
          {activeCampaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
      </section>
    </div>
  );
}
