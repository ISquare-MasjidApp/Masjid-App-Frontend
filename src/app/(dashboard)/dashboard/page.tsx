'use client';

import { useState } from 'react';
import DateHeader from '@/components/dashboard/DateHeader';
import PrayerTimeCard from '@/components/dashboard/PrayerTimeCard';
import QuickActionButton from '@/components/dashboard/QuickActionButton';
import EventCard from '@/components/dashboard/EventCard';
import CampaignCard from '@/components/dashboard/CampaignCard';
import type { PrayerTime, Event, Campaign } from '@/types';

// Sample data - in real app, this would come from API
const prayerTimes: PrayerTime[] = [
  { name: 'Fajr', time: '6:30 AM', athanTime: '5:50AM', isActive: false },
  { name: 'Sunrise', time: '6:30 AM', athanTime: '5:50AM', isActive: false },
  { name: 'Zuhr', time: '6:30 AM', athanTime: '5:50AM', isActive: true },
  { name: 'Asr', time: '6:30 AM', athanTime: '5:50AM', isActive: false },
  { name: 'Maghrib', time: '6:30 AM', athanTime: '5:50AM', isActive: false },
  { name: 'Isha', time: '6:30 AM', athanTime: '5:50AM', isActive: false },
];

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
    status: 'sent',
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
    status: 'sent',
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

export default function DashboardPage() {
  const [currentDate] = useState({
    gregorian: 'Thursday, October 7, 2025',
    islamic: '15 Rabi-Al-Thani 1447',
  });

  const handlePrevDay = () => {
    console.log('Previous day');
  };

  const handleNextDay = () => {
    console.log('Next day');
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Date Header */}
      <DateHeader
        gregorianDate={currentDate.gregorian}
        islamicDate={currentDate.islamic}
        onPrevDay={handlePrevDay}
        onNextDay={handleNextDay}
      />

      {/* Prayer Times */}
      <div className="flex justify-center flex-wrap gap-3">
        {prayerTimes.map((prayer) => (
          <PrayerTimeCard key={prayer.name} prayer={prayer} />
        ))}
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
