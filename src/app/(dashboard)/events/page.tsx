'use client';

import { useState } from 'react';
import {
    CalendarIcon,
    PlusIcon,
    GridViewIcon,
    CalendarViewIcon,
    FilterIcon,
    EditIcon,
    EyeIcon,
    ChevronDownIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
} from '@/components/ui/Icons';
import type { Event as EventType, Announcement } from '@/types';
import AnnouncementItem from '@/components/dashboard/AnnouncementItem';
import CalendarView from '@/components/dashboard/CalendarView';
import AddEventModal from '@/components/dashboard/AddEventModal';
import AddAnnouncementModal from '@/components/dashboard/AddAnnouncementModal';
import EventDetailsModal from '@/components/dashboard/EventDetailsModal';

// Mock Data — October 2025 calendar events matching Figma design
const mockEvents: EventType[] = [
    // Sep 30 (prev month, Mon)
    { id: '1', title: 'Sisters Halaqah', category: 'Religious', description: 'Weekly sisters study circle.', date: '30 Sep 2025', startTime: '10:30 AM', endTime: '12:00 PM', status: 'past', speaker: 'Ustadha Fatima', location: 'Sisters Hall' },
    // Oct 3 (Thu)
    { id: '2', title: 'Sisters Halaqah', category: 'Religious', description: 'Weekly sisters study circle.', date: '3 Oct 2025', startTime: '10:30 AM', endTime: '12:00 PM', status: 'sent', speaker: 'Ustadha Fatima', location: 'Sisters Hall' },
    // Oct 5 (Sat)
    { id: '3', title: 'Quran Study Circle', category: 'Religious', description: 'Weekend Quran study session.', date: '5 Oct 2025', startTime: '10:30 AM', endTime: '12:00 PM', status: 'sent', speaker: 'Sheikh Omar', location: 'Main Hall' },
    // Oct 7 (Mon)
    { id: '4', title: 'Sisters Halaqah', category: 'Religious', description: 'Weekly sisters study circle.', date: '7 Oct 2025', startTime: '10:30 AM', endTime: '12:00 PM', status: 'sent', speaker: 'Ustadha Fatima', location: 'Sisters Hall' },
    // Oct 8 (Tue) — 2 events
    { id: '5', title: 'Youth Mentoring', category: 'Community', description: 'Weekly youth mentoring session.', date: '8 Oct 2025', startTime: '10:30 AM', endTime: '12:00 PM', status: 'sent', speaker: 'Brother Yusuf', location: 'Youth Center' },
    { id: '6', title: 'Community Gathering', category: 'Community', description: 'Evening community gathering.', date: '8 Oct 2025', startTime: '10:30 AM', endTime: '09:00 PM', status: 'sent', location: 'Main Hall' },
    // Oct 12 (Sat)
    { id: '7', title: 'Quran Study Circle', category: 'Religious', description: 'Weekend Quran study session.', date: '12 Oct 2025', startTime: '10:30 AM', endTime: '12:00 PM', status: 'sent', speaker: 'Sheikh Omar', location: 'Main Hall' },
    // Oct 13 (Sun) — 3 events
    { id: '8', title: 'Sisters Halaqah', category: 'Religious', description: 'Weekly sisters study circle.', date: '13 Oct 2025', startTime: '10:30 AM', endTime: '12:00 PM', status: 'sent', speaker: 'Ustadha Fatima', location: 'Sisters Hall' },
    { id: '9', title: 'Community Potluck', category: 'Community', description: 'Community potluck event.', date: '13 Oct 2025', startTime: '10:30 AM', endTime: '03:00 PM', status: 'sent', location: 'Community Center' },
    { id: '10', title: 'Tafsir Session', category: 'Religious', description: 'Evening tafsir session.', date: '13 Oct 2025', startTime: '10:30 AM', endTime: '09:30 PM', status: 'sent', speaker: 'Sheikh Ahmed', location: 'Main Hall' },
    // Oct 14 (Mon)
    { id: '11', title: 'Sisters Halaqah', category: 'Religious', description: 'Weekly sisters study circle.', date: '14 Oct 2025', startTime: '10:30 AM', endTime: '12:00 PM', status: 'sent', speaker: 'Ustadha Fatima', location: 'Sisters Hall' },
    // Oct 15 (Tue — "today" in Figma) — 2 events
    { id: '12', title: 'Friday Prayer Khutbah', category: 'Religious', description: 'Midweek special lecture.', date: '15 Oct 2025', startTime: '10:30 AM', endTime: '12:00 PM', status: 'sent', speaker: 'Sheikh Ahmed', location: 'Main Hall' },
    { id: '13', title: 'Youth Mentoring', category: 'Community', description: 'Youth mentoring session.', date: '15 Oct 2025', startTime: '10:30 AM', endTime: '06:00 PM', status: 'sent', location: 'Youth Center' },
    // Oct 17 (Thu) — 2 events
    { id: '14', title: 'Friday Community Gathering', category: 'Community', description: 'Please note that the masjid will undergo light maintenance during this time.', date: '17 Oct 2025', startTime: '10:30 AM', endTime: '', status: 'sent', speaker: 'Ustadh Sultan Ahmed', location: 'Masjid Abu Bakar' },
    { id: '15', title: 'Evening Prayer Gathering', category: 'Religious', description: 'Evening prayer gathering.', date: '17 Oct 2025', startTime: '10:30 AM', endTime: '09:00 PM', status: 'sent', location: 'Main Hall' },
    // Oct 18 (Fri)
    { id: '16', title: 'Friday Prayer Khutbah', category: 'Religious', description: 'Special Friday lecture.', date: '18 Oct 2025', startTime: '10:30 AM', endTime: '02:30 PM', status: 'sent', speaker: 'Sheikh Ahmed', location: 'Main Hall' },
    // Oct 20 (Sun)
    { id: '17', title: 'Ramadan Prep Talk', category: 'Religious', description: 'Preparing for the blessed month.', date: '20 Oct 2025', startTime: '10:30 AM', endTime: '', status: 'sent', speaker: 'Sheikh Ahmed', location: 'Main Hall' },
    // Oct 22 (Tue) — 2 events
    { id: '18', title: 'Sisters Halaqah', category: 'Religious', description: 'Weekly halaqah session.', date: '22 Oct 2025', startTime: '10:30 AM', endTime: '12:00 PM', status: 'sent', speaker: 'Ustadha Fatima', location: 'Sisters Hall' },
    { id: '19', title: 'Community Meeting', category: 'Community', description: 'Community meeting.', date: '22 Oct 2025', startTime: '10:30 AM', endTime: '09:00 PM', status: 'sent', location: 'Main Hall' },
    // Oct 25 (Fri)
    { id: '20', title: 'Friday Prayer Khutbah', category: 'Religious', description: 'Friday prayer and lecture.', date: '25 Oct 2025', startTime: '10:30 AM', endTime: '02:30 PM', status: 'sent', speaker: 'Sheikh Ahmed', location: 'Main Hall' },
    // Oct 26 (Sat) — 4 events (view more)
    { id: '21', title: 'Sisters Halaqah', category: 'Religious', description: 'Weekend study circle.', date: '26 Oct 2025', startTime: '10:30 AM', endTime: '12:00 PM', status: 'sent', speaker: 'Ustadha Fatima', location: 'Sisters Hall' },
    { id: '22', title: 'Youth Sports Day', category: 'Community', description: 'Community sports event.', date: '26 Oct 2025', startTime: '10:30 AM', endTime: '05:00 PM', status: 'sent', location: 'Sports Complex' },
    { id: '23', title: 'Tafsir Session', category: 'Religious', description: 'Evening tafsir.', date: '26 Oct 2025', startTime: '10:30 AM', endTime: '09:00 PM', status: 'sent', speaker: 'Sheikh Ahmed', location: 'Main Hall' },
    { id: '24', title: 'Community Dinner', category: 'Community', description: 'Evening dinner event.', date: '26 Oct 2025', startTime: '10:30 AM', endTime: '11:00 PM', status: 'sent', location: 'Main Hall' },
    // Oct 28 (Mon)
    { id: '25', title: 'Sisters Halaqah', category: 'Religious', description: 'Weekly sisters study circle.', date: '28 Oct 2025', startTime: '10:30 AM', endTime: '12:00 PM', status: 'sent', speaker: 'Ustadha Fatima', location: 'Sisters Hall' },
    // Oct 29 (Tue) — 2 events
    { id: '26', title: 'Quran Study Circle', category: 'Religious', description: 'Weekly Quran study.', date: '29 Oct 2025', startTime: '10:30 AM', endTime: '12:00 PM', status: 'sent', speaker: 'Sheikh Omar', location: 'Main Hall' },
    { id: '27', title: 'Community Cleanup', category: 'Community', description: 'Community cleanup drive.', date: '29 Oct 2025', startTime: '10:30 AM', endTime: '05:00 PM', status: 'sent', location: 'Masjid Grounds' },
    // Oct 31 (Thu)
    { id: '28', title: 'Monthly Review', category: 'Religious', description: 'Month-end review session.', date: '31 Oct 2025', startTime: '10:30 AM', endTime: '12:00 PM', status: 'sent', speaker: 'Ustadha Fatima', location: 'Sisters Hall' },
    // ——— March 2026 (current month) ———
    // Mar 1 (Sun)
    { id: '29', title: 'Sisters Halaqah', category: 'Religious', description: 'Weekly sisters study circle.', date: '1 Mar 2026', startTime: '10:30 AM', endTime: '12:00 PM', status: 'sent', speaker: 'Ustadha Fatima', location: 'Sisters Hall' },
    // Mar 3 (Tue)
    { id: '30', title: 'Quran Study Circle', category: 'Religious', description: 'Weekly Quran study session.', date: '3 Mar 2026', startTime: '10:30 AM', endTime: '12:00 PM', status: 'sent', speaker: 'Sheikh Omar', location: 'Main Hall' },
    // Mar 5 (Thu)
    { id: '31', title: 'Youth Mentoring', category: 'Community', description: 'Weekly youth mentoring session.', date: '5 Mar 2026', startTime: '10:30 AM', endTime: '12:00 PM', status: 'sent', speaker: 'Brother Yusuf', location: 'Youth Center' },
    { id: '32', title: 'Community Gathering', category: 'Community', description: 'Evening community gathering.', date: '5 Mar 2026', startTime: '07:00 PM', endTime: '09:00 PM', status: 'sent', location: 'Main Hall' },
    // Mar 6 (Fri)
    { id: '33', title: 'Friday Prayer Khutbah', category: 'Religious', description: 'Weekly Friday sermon.', date: '6 Mar 2026', startTime: '01:00 PM', endTime: '02:00 PM', status: 'sent', speaker: 'Sheikh Ahmed', location: 'Main Hall' },
    // Mar 8 (Sun)
    { id: '34', title: 'Sisters Halaqah', category: 'Religious', description: 'Weekly sisters study circle.', date: '8 Mar 2026', startTime: '10:30 AM', endTime: '12:00 PM', status: 'sent', speaker: 'Ustadha Fatima', location: 'Sisters Hall' },
    // Mar 10 (Tue)
    { id: '35', title: 'Quran Study Circle', category: 'Religious', description: 'Weekly Quran study session.', date: '10 Mar 2026', startTime: '10:30 AM', endTime: '12:00 PM', status: 'sent', speaker: 'Sheikh Omar', location: 'Main Hall' },
    // Mar 12 (Thu — today)
    { id: '36', title: 'Sisters Halaqah', category: 'Religious', description: 'Weekly sisters study circle.', date: '12 Mar 2026', startTime: '10:30 AM', endTime: '12:00 PM', status: 'sent', speaker: 'Ustadha Fatima', location: 'Sisters Hall' },
    { id: '37', title: 'Tafsir Session', category: 'Religious', description: 'Evening tafsir class.', date: '12 Mar 2026', startTime: '07:30 PM', endTime: '09:00 PM', status: 'sent', speaker: 'Sheikh Ahmed', location: 'Main Hall' },
    // Mar 13 (Fri)
    { id: '38', title: 'Friday Prayer Khutbah', category: 'Religious', description: 'Weekly Friday sermon.', date: '13 Mar 2026', startTime: '01:00 PM', endTime: '02:00 PM', status: 'sent', speaker: 'Sheikh Ahmed', location: 'Main Hall' },
    // Mar 15 (Sun)
    { id: '39', title: 'Sisters Halaqah', category: 'Religious', description: 'Weekly sisters study circle.', date: '15 Mar 2026', startTime: '10:30 AM', endTime: '12:00 PM', status: 'sent', speaker: 'Ustadha Fatima', location: 'Sisters Hall' },
    { id: '40', title: 'Community Potluck', category: 'Community', description: 'Monthly community potluck.', date: '15 Mar 2026', startTime: '12:30 PM', endTime: '03:00 PM', status: 'sent', location: 'Community Center' },
    // Mar 17 (Tue)
    { id: '41', title: 'Quran Study Circle', category: 'Religious', description: 'Weekly Quran study session.', date: '17 Mar 2026', startTime: '10:30 AM', endTime: '12:00 PM', status: 'sent', speaker: 'Sheikh Omar', location: 'Main Hall' },
    // Mar 19 (Thu)
    { id: '42', title: 'Youth Sports Day', category: 'Community', description: 'Sports tournament for youth.', date: '19 Mar 2026', startTime: '10:00 AM', endTime: '04:00 PM', status: 'sent', location: 'Sports Complex' },
    // Mar 20 (Fri)
    { id: '43', title: 'Friday Prayer Khutbah', category: 'Religious', description: 'Weekly Friday sermon.', date: '20 Mar 2026', startTime: '01:00 PM', endTime: '02:00 PM', status: 'sent', speaker: 'Sheikh Ahmed', location: 'Main Hall' },
    // Mar 22 (Sun)
    { id: '44', title: 'Sisters Halaqah', category: 'Religious', description: 'Weekly sisters study circle.', date: '22 Mar 2026', startTime: '10:30 AM', endTime: '12:00 PM', status: 'sent', speaker: 'Ustadha Fatima', location: 'Sisters Hall' },
    // Mar 25 (Wed)
    { id: '45', title: 'Ramadan Prep Talk', category: 'Religious', description: 'Getting ready for the blessed month.', date: '25 Mar 2026', startTime: '07:00 PM', endTime: '08:30 PM', status: 'sent', speaker: 'Sheikh Ahmed', location: 'Main Hall' },
    // Mar 27 (Fri)
    { id: '46', title: 'Friday Prayer Khutbah', category: 'Religious', description: 'Weekly Friday sermon.', date: '27 Mar 2026', startTime: '01:00 PM', endTime: '02:00 PM', status: 'sent', speaker: 'Sheikh Ahmed', location: 'Main Hall' },
    { id: '47', title: 'Community Dinner', category: 'Community', description: 'End of month community dinner.', date: '27 Mar 2026', startTime: '06:30 PM', endTime: '09:00 PM', status: 'sent', location: 'Main Hall' },
    // Mar 29 (Sun)
    { id: '48', title: 'Sisters Halaqah', category: 'Religious', description: 'Weekly sisters study circle.', date: '29 Mar 2026', startTime: '10:30 AM', endTime: '12:00 PM', status: 'sent', speaker: 'Ustadha Fatima', location: 'Sisters Hall' },
];

const mockAnnouncements: Announcement[] = [
    {
        id: '1',
        title: 'Masjid Maintanence Work Tomorrow',
        description: 'Please note that the masjid will undego light maintanence.....',
        message: 'Please note that the masjid will undego light maintanence.....',
        date: '17 Oct 2025',
        time: '09:00 AM',
        status: 'scheduled',
    },
    {
        id: '2',
        title: 'Masjid Maintanence Work Tomorrow',
        description: 'Please note that the masjid will undego light maintanence.....',
        message: 'Please note that the masjid will undego light maintanence.....',
        date: '17 Oct 2025',
        time: '09:00 AM',
        status: 'sent',
    },
    {
        id: '3',
        title: 'Friday Prayer Update',
        description: 'Jumuah prayer time has been updated for the summer schedule.',
        message: 'Jumuah prayer time has been updated for the summer schedule.',
        date: '15 Oct 2025',
        time: '01:30 PM',
        status: 'sent',
    },
];

export default function EventsPage() {
    const [activeTab, setActiveTab] = useState<'events' | 'announcements'>('events');
    const [activeFilter, setActiveFilter] = useState<'All' | 'Upcoming' | 'Past' | 'Drafts'>('All');
    const [announcementFilter, setAnnouncementFilter] = useState<'All' | 'Scheduled'>('All');
    const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
    const [searchQuery, setSearchQuery] = useState('');
    const [announcementSearchQuery, setAnnouncementSearchQuery] = useState('');
    const [eventsPage, setEventsPage] = useState(1);
    const [announcementsPage, setAnnouncementsPage] = useState(1);
    const ITEMS_PER_PAGE = 10;

    // Modal State
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isAddAnnouncementOpen, setIsAddAnnouncementOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState<EventType | null>(null);
    const [viewEvent, setViewEvent] = useState<EventType | null>(null);

    const handleAddEvent = () => {
        if (activeTab === 'announcements') {
            setIsAddAnnouncementOpen(true);
        } else {
            setEditingEvent(null);
            setIsAddModalOpen(true);
        }
    };

    const handleEditEvent = (event: EventType) => {
        if (viewEvent) setViewEvent(null); // Close view modal if open
        setEditingEvent(event);
        setIsAddModalOpen(true);
    };

    const handleViewEvent = (event: EventType) => {
        setViewEvent(event);
    };

    const handleCloseAddModal = () => {
        setIsAddModalOpen(false);
        setEditingEvent(null);
    };

    const handleCloseViewModal = () => {
        setViewEvent(null);
    };


    const filteredEvents = mockEvents.filter((event) => {
        const matchesFilter = (() => {
            if (activeFilter === 'All') return true;
            if (activeFilter === 'Upcoming') return event.status === 'sent';
            if (activeFilter === 'Past') return event.status === 'past';
            if (activeFilter === 'Drafts') return event.status === 'draft';
            return true;
        })();
        const matchesSearch = searchQuery.trim() === '' || event.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const eventsTotalPages = Math.max(1, Math.ceil(filteredEvents.length / ITEMS_PER_PAGE));
    const paginatedEvents = filteredEvents.slice((eventsPage - 1) * ITEMS_PER_PAGE, eventsPage * ITEMS_PER_PAGE);
    const eventsRangeStart = filteredEvents.length === 0 ? 0 : (eventsPage - 1) * ITEMS_PER_PAGE + 1;
    const eventsRangeEnd = Math.min(eventsPage * ITEMS_PER_PAGE, filteredEvents.length);

    const filteredAnnouncements = mockAnnouncements.filter(a => {
        const matchesFilter = announcementFilter === 'All' ? true : a.status === 'scheduled';
        const matchesSearch = announcementSearchQuery.trim() === '' || a.title.toLowerCase().includes(announcementSearchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });
    const announcementsTotalPages = Math.max(1, Math.ceil(filteredAnnouncements.length / ITEMS_PER_PAGE));
    const paginatedAnnouncements = filteredAnnouncements.slice((announcementsPage - 1) * ITEMS_PER_PAGE, announcementsPage * ITEMS_PER_PAGE);
    const announcementsRangeStart = filteredAnnouncements.length === 0 ? 0 : (announcementsPage - 1) * ITEMS_PER_PAGE + 1;
    const announcementsRangeEnd = Math.min(announcementsPage * ITEMS_PER_PAGE, filteredAnnouncements.length);

    return (
        <div className="space-y-[24px]">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-[24px] font-urbanist font-semibold text-[var(--grey-800)] leading-normal">
                        Event & Announcements
                    </h1>
                </div>
                <button
                    onClick={handleAddEvent}
                    className="flex items-center gap-[10px] bg-[var(--brand)] text-white px-[24px] py-[16px] rounded-[12px] hover:bg-[#065d29] transition-all duration-200 h-[44px] shadow-sm hover:shadow-md active:scale-95"
                >
                    <PlusIcon size={20} className="stroke-[2]" />
                    <span className="font-inter font-medium text-[16px] leading-normal">
                        {activeTab === 'announcements' ? 'New Announcements' : 'New Event'}
                    </span>
                </button>
            </div>

            {/* Tabs */}
            <div className="flex items-center bg-[rgba(7,119,52,0.05)] w-full">
                <button
                    onClick={() => setActiveTab('events')}
                    className={`
                        w-[250px] h-full flex items-center justify-center p-[16px]
                        font-urbanist text-[18px] transition-all duration-300 relative
                        ${activeTab === 'events'
                            ? 'text-[var(--brand)] font-semibold border-b-2 border-[var(--brand)]'
                            : 'text-[var(--grey-800)] font-normal'
                        }
                    `}
                >
                    Events
                </button>
                <button
                    onClick={() => setActiveTab('announcements')}
                    className={`
                        w-[250px] h-full flex items-center justify-center p-[16px]
                        font-urbanist text-[18px] transition-all duration-300 relative
                        ${activeTab === 'announcements'
                            ? 'text-[var(--brand)] font-semibold border-b-2 border-[var(--brand)]'
                            : 'text-[var(--grey-800)] font-normal'
                        }
                    `}
                >
                    Announcements
                </button>
            </div>

            {/* Content Area */}
            {activeTab === 'events' ? (
                <>
                    {viewMode === 'list' ? (
                        <div className="border border-[var(--border-01)] rounded-[24px] p-[24px] bg-white">
                            {/* Controls */}
                            <div className="flex justify-between items-center mb-[24px] h-[40px]">
                                <div className="flex items-center">
                                    {['All', 'Upcoming', 'Past', 'Drafts'].map((filter, index, arr) => (
                                        <button
                                            key={filter}
                                            onClick={() => { setActiveFilter(filter as any); setEventsPage(1); }}
                                            className={`
                                        h-[40px] px-[16px] py-[10px] font-urbanist text-[14px] 
                                        border border-[var(--border-01)]
                                        transition-all duration-200 flex items-center justify-center gap-[8px]
                                        ${activeFilter === filter ? 'font-bold text-white bg-[var(--brand)] z-10 hover:bg-[#065d29]' : 'font-normal text-[var(--grey-800)] bg-white hover:bg-[rgba(7,119,52,0.05)] hover:text-[var(--brand)]'}
                                        ${index === 0 ? 'rounded-l-[8px]' : ''}
                                        ${index === arr.length - 1 ? 'rounded-r-[8px]' : ''}
                                        ${index !== 0 ? '-ml-[1px]' : ''}
                                    `}
                                        >
                                            {filter === 'All' && activeFilter === 'All' && (
                                                <div className="w-[10px] h-[10px] rounded-full"><svg width="10" height="10" viewBox="0 0 10 10" fill="none"><circle cx="5" cy="5" r="4" fill="white" stroke="white" strokeWidth="1" /></svg></div>
                                            )}
                                            {filter}
                                        </button>
                                    ))}
                                </div>

                                <div className="flex items-center gap-[7px]">
                                    <div className="relative w-[342px] h-[40px]">
                                        <input
                                            type="text"
                                            placeholder="Search Events"
                                            value={searchQuery}
                                            onChange={(e) => { setSearchQuery(e.target.value); setEventsPage(1); }}
                                            className="w-full h-full pl-[38px] pr-[14px] border border-[var(--border-01)] rounded-[11px] font-urbanist text-[12px] text-[#666d80] placeholder-[#666d80] focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/20 focus:border-[var(--brand)] transition-all"
                                        />
                                        <div className="absolute left-[14px] top-1/2 -translate-y-1/2 text-[var(--grey-100)]">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                                        </div>
                                    </div>
                                    <div className="border border-[var(--border-01)] rounded-[12px] flex items-center gap-[8px] px-[8px] py-[6px] bg-white">
                                        <button
                                            onClick={() => setViewMode('list')}
                                            className={`flex items-center justify-center px-[12px] py-[8px] rounded-[8px] transition-colors ${viewMode === 'list' ? 'bg-[rgba(7,119,52,0.1)] text-[var(--brand)]' : 'text-[var(--grey-100)] hover:bg-gray-50'}`}
                                        >
                                            <GridViewIcon size={18} />
                                        </button>
                                        <button
                                            onClick={() => setViewMode('calendar')}
                                            className={`flex items-center justify-center px-[12px] py-[8px] rounded-[8px] transition-colors ${(viewMode as string) === 'calendar' ? 'bg-[rgba(7,119,52,0.1)] text-[var(--brand)]' : 'text-[var(--grey-100)] hover:bg-gray-50'}`}
                                        >
                                            <CalendarViewIcon size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Separator */}
                            <div className="h-[2px] bg-[#f6f6f6] rounded-[2px] w-full mb-[24px]" />

                            {/* Table */}
                            <div className="w-full overflow-hidden">
                                <table className="w-full text-left border-collapse">
                                    <thead className="bg-[#fafbfb] border-b border-t border-[var(--border-01)] h-[48px]">
                                        <tr>
                                            <th className="w-[52px] px-[16px] py-[14px]">
                                                <input type="checkbox" className="w-[20px] h-[20px] rounded-[4px] border-[#e2e8f0] text-[var(--brand)] focus:ring-0 checked:bg-[var(--brand)] cursor-pointer transition-colors" />
                                            </th>
                                            <th className="px-[16px] py-[14px] font-urbanist font-medium text-[12px] text-[#666d80] uppercase">Title</th>
                                            <th className="px-[16px] py-[14px] font-urbanist font-medium text-[12px] text-[#666d80] uppercase">Date & Time</th>
                                            <th className="px-[16px] py-[14px] font-urbanist font-medium text-[12px] text-[#666d80] uppercase">Message</th>
                                            <th className="px-[16px] py-[14px] font-urbanist font-medium text-[12px] text-[#666d80] uppercase">Type</th>
                                            <th className="px-[16px] py-[14px] font-urbanist font-medium text-[12px] text-[#666d80] uppercase">Status</th>
                                            <th className="px-[16px] py-[14px] font-urbanist font-medium text-[12px] text-[#666d80] uppercase">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-none bg-white">
                                        {paginatedEvents.map((event) => (
                                            <tr key={event.id} className="group hover:bg-[#fafbfb] transition-colors duration-150">
                                                <td className="w-[52px] h-[70px] px-[16px] py-[22px]">
                                                    <input type="checkbox" className="w-[20px] h-[20px] rounded-[4px] border-[#e2e8f0] text-[var(--brand)] focus:ring-0 checked:bg-[var(--brand)] cursor-pointer transition-colors" />
                                                </td>
                                                <td className="h-[70px] px-[16px] py-[22px] font-urbanist font-medium text-[14px] text-[#666d80]">
                                                    {event.title}
                                                </td>
                                                <td className="h-[70px] px-[16px] py-[22px] font-urbanist font-medium text-[14px] text-[#666d80]">
                                                    {event.date}  {event.startTime}
                                                </td>
                                                <td className="h-[70px] px-[16px] py-[22px] font-urbanist font-medium text-[14px] text-[#666d80] truncate max-w-[200px]" title={event.description}>
                                                    {event.description}
                                                </td>
                                                <td className="h-[70px] px-[16px] py-[22px] font-urbanist font-medium text-[14px] text-[#666d80]">
                                                    {event.category}
                                                </td>
                                                <td className="h-[70px] px-[16px] py-[22px]">
                                                    <span className={`
                                                inline-flex items-center px-[8px] py-[4px] rounded-[8px] text-[12px] font-normal capitalize border
                                                ${event.status === 'sent' ? 'text-[#47b881] border-[#6bc497]' : ''}
                                                ${event.status === 'draft' ? 'text-[#344054] border-[#D0D5DD]' : ''}
                                                ${event.status === 'past' ? 'text-[#B42318] border-[#FECDCA]' : ''}
                                            `}
                                                        style={{ fontFamily: "'Inter Tight', sans-serif" }}
                                                    >
                                                        {event.status}
                                                    </span>
                                                </td>
                                                <td className="h-[70px] px-[16px] py-[22px]">
                                                    <div className="flex items-center gap-[12px]">
                                                        <button
                                                            onClick={() => handleViewEvent(event)}
                                                            className="text-[var(--grey-100)] hover:text-[var(--brand)] transition-colors p-1 hover:bg-[var(--brand-05)] rounded"
                                                        >
                                                            <EyeIcon size={20} className="stroke-[1.5]" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleEditEvent(event)}
                                                            className="text-[var(--grey-100)] hover:text-[var(--brand)] transition-colors p-1 hover:bg-[var(--brand-05)] rounded"
                                                        >
                                                            <EditIcon size={20} className="stroke-[1.5]" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                {/* Pagination Footer */}
                                <div className="flex items-center justify-between h-[40px] px-0 mt-0 border-t border-[var(--border-01)] bg-white relative w-full">
                                    <p className="absolute left-0 top-[10px] font-dm-sans text-[14px] text-[#666d80]">
                                        {eventsRangeStart}-{eventsRangeEnd} of {filteredEvents.length} items
                                    </p>
                                    <div className="absolute right-[64px] top-[8px] flex items-center gap-[8px]">
                                        <div className="bg-white h-[23px] px-[11px] rounded-[8px] flex items-center justify-center gap-[8px] cursor-pointer">
                                            <span className="font-dm-sans text-[14px] text-[#666d80]">{eventsPage}</span>
                                            <ChevronDownIcon size={16} className="text-[#666d80]" />
                                        </div>
                                        <span className="font-dm-sans text-[14px] text-[#666d80]">of {eventsTotalPages} pages</span>
                                    </div>
                                    <div className="absolute right-0 top-1/2 -translate-y-[calc(50%-0.5px)] flex items-center gap-[8px]">
                                        <button
                                            onClick={() => setEventsPage(p => Math.max(1, p - 1))}
                                            disabled={eventsPage <= 1}
                                            className="flex items-center justify-center p-1 hover:bg-gray-100 rounded transition-colors disabled:opacity-30"
                                        >
                                            <ChevronLeftIcon size={16} className="text-[#666d80] stroke-[1.5]" />
                                        </button>
                                        <button
                                            onClick={() => setEventsPage(p => Math.min(eventsTotalPages, p + 1))}
                                            disabled={eventsPage >= eventsTotalPages}
                                            className="flex items-center justify-center p-1 hover:bg-gray-100 rounded transition-colors disabled:opacity-30"
                                        >
                                            <ChevronRightIcon size={16} className="text-[#666d80] stroke-[1.5]" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <CalendarView
                            events={filteredEvents}
                            currentDate={new Date()}
                            onDateChange={() => { }}
                            viewMode={viewMode}
                            onViewModeChange={setViewMode}
                            onEventClick={handleViewEvent}
                            searchQuery={searchQuery}
                            onSearchChange={setSearchQuery}
                        />
                    )}
                </>
            ) : (
                <div className="border border-[var(--border-01)] rounded-[24px] p-[24px] bg-white">
                    {/* Controls */}
                    <div className="flex justify-between items-center mb-[16px] h-[40px]">
                        <div className="flex items-center">
                            {(['All', 'Scheduled'] as const).map((filter, index, arr) => (
                                <button
                                    key={filter}
                                    onClick={() => { setAnnouncementFilter(filter); setAnnouncementsPage(1); }}
                                    className={`
                                        h-[40px] px-[16px] py-[10px] font-urbanist text-[14px] 
                                        border border-[var(--border-01)]
                                        transition-all duration-200 flex items-center justify-center gap-[8px]
                                        ${announcementFilter === filter ? 'font-bold text-white bg-[var(--brand)] z-10 hover:bg-[#065d29]' : 'font-normal text-[var(--grey-800)] bg-white hover:bg-[rgba(7,119,52,0.05)] hover:text-[var(--brand)]'}
                                        ${index === 0 ? 'rounded-l-[8px]' : ''}
                                        ${index === arr.length - 1 ? 'rounded-r-[8px]' : ''}
                                        ${index !== 0 ? '-ml-[1px]' : ''}
                                    `}
                                >
                                    {filter === 'All' && announcementFilter === 'All' && (
                                        <div className="w-[10px] h-[10px] rounded-full"><svg width="10" height="10" viewBox="0 0 10 10" fill="none"><circle cx="5" cy="5" r="4" fill="white" stroke="white" strokeWidth="1" /></svg></div>
                                    )}
                                    {filter}
                                </button>
                            ))}
                        </div>

                        <div className="relative w-[342px] h-[40px]">
                            <input
                                type="text"
                                placeholder="Search announcements"
                                value={announcementSearchQuery}
                                onChange={(e) => { setAnnouncementSearchQuery(e.target.value); setAnnouncementsPage(1); }}
                                className="w-full h-full pl-[38px] pr-[14px] border border-[var(--border-01)] rounded-[11px] font-urbanist text-[12px] text-[#666d80] placeholder-[#666d80] focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/20 focus:border-[var(--brand)] transition-all"
                            />
                            <div className="absolute left-[14px] top-1/2 -translate-y-1/2 text-[var(--grey-100)]">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                            </div>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="w-full overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-[#fafbfb] border-b border-t border-[var(--border-01)] h-[48px]">
                                <tr>
                                    <th className="w-[52px] px-[16px] py-[14px]">
                                        <input type="checkbox" className="w-[20px] h-[20px] rounded-[4px] border-[#e2e8f0] text-[var(--brand)] focus:ring-0 checked:bg-[var(--brand)] cursor-pointer transition-colors" />
                                    </th>
                                    <th className="px-[16px] py-[14px] font-urbanist font-medium text-[12px] text-[#666d80] uppercase">Title</th>
                                    <th className="px-[16px] py-[14px] font-urbanist font-medium text-[12px] text-[#666d80] uppercase">Message</th>
                                    <th className="px-[16px] py-[14px] font-urbanist font-medium text-[12px] text-[#666d80] uppercase">Date Sent</th>
                                    <th className="px-[16px] py-[14px] font-urbanist font-medium text-[12px] text-[#666d80] uppercase">Status</th>
                                    <th className="px-[16px] py-[14px] font-urbanist font-medium text-[12px] text-[#666d80] uppercase">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-none bg-white">
                                {paginatedAnnouncements.map((announcement) => (
                                        <tr key={announcement.id} className="group hover:bg-[#fafbfb] transition-colors duration-150">
                                            <td className="w-[52px] h-[70px] px-[16px] py-[22px]">
                                                <input type="checkbox" className="w-[20px] h-[20px] rounded-[4px] border-[#e2e8f0] text-[var(--brand)] focus:ring-0 checked:bg-[var(--brand)] cursor-pointer transition-colors" />
                                            </td>
                                            <td className="h-[70px] px-[16px] py-[22px] font-urbanist font-medium text-[14px] text-[#666d80]">
                                                {announcement.title}
                                            </td>
                                            <td className="h-[70px] px-[16px] py-[22px] font-urbanist font-medium text-[14px] text-[#666d80] truncate max-w-[200px]" title={announcement.message || announcement.description}>
                                                {announcement.message || announcement.description}
                                            </td>
                                            <td className="h-[70px] px-[16px] py-[22px] font-urbanist font-medium text-[14px] text-[#666d80] whitespace-nowrap">
                                                {announcement.date}  {announcement.time}
                                            </td>
                                            <td className="h-[70px] px-[16px] py-[22px]">
                                                <span
                                                    className={`inline-flex items-center px-[8px] py-[4px] rounded-[8px] text-[12px] capitalize border
                                                    ${announcement.status === 'scheduled'
                                                            ? 'text-[#ff8156] border-[#ffa487]'
                                                            : 'text-[#47b881] border-[#6bc497]'
                                                        }`}
                                                    style={{ fontFamily: '"Inter Tight", sans-serif' }}
                                                >
                                                    {announcement.status === 'scheduled' ? 'Scheduled' : 'Sent'}
                                                </span>
                                            </td>
                                            <td className="h-[70px] px-[16px] py-[22px]">
                                                <div className="flex items-center gap-[12px]">
                                                    <button className="text-[#666d80] hover:text-[var(--grey-800)] transition-colors">
                                                        <EyeIcon size={20} />
                                                    </button>
                                                    <button className="text-[#666d80] hover:text-[var(--grey-800)] transition-colors">
                                                        <EditIcon size={20} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Footer */}
                    <div className="flex justify-between items-center mt-[8px] h-[40px] border-t border-[var(--border-01)] pt-[8px]">
                        <span className="font-['DM_Sans'] font-normal text-[14px] text-[#666d80]">
                            {announcementsRangeStart}-{announcementsRangeEnd} of {filteredAnnouncements.length} items
                        </span>
                        <div className="flex items-center gap-[8px]">
                            <div className="flex items-center gap-[8px]">
                                <div className="flex items-center gap-[8px] bg-white rounded-[8px] px-[11px] h-[23px]">
                                    <span className="font-['DM_Sans'] font-normal text-[14px] text-[#666d80]">{announcementsPage}</span>
                                    <ChevronDownIcon size={16} className="text-[#666d80]" />
                                </div>
                                <span className="font-['DM_Sans'] font-normal text-[14px] text-[#666d80]">of {announcementsTotalPages} pages</span>
                            </div>
                            <div className="flex items-center gap-[8px]">
                                <button
                                    onClick={() => setAnnouncementsPage(p => Math.max(1, p - 1))}
                                    disabled={announcementsPage <= 1}
                                    className="flex items-center justify-center p-1 hover:bg-gray-100 rounded transition-colors disabled:opacity-30"
                                >
                                    <ChevronLeftIcon size={16} className="text-[#666d80] stroke-[1.5]" />
                                </button>
                                <button
                                    onClick={() => setAnnouncementsPage(p => Math.min(announcementsTotalPages, p + 1))}
                                    disabled={announcementsPage >= announcementsTotalPages}
                                    className="flex items-center justify-center p-1 hover:bg-gray-100 rounded transition-colors disabled:opacity-30"
                                >
                                    <ChevronRightIcon size={16} className="text-[#666d80] stroke-[1.5]" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modals */}
            <AddEventModal
                isOpen={isAddModalOpen}
                onClose={handleCloseAddModal}
                event={editingEvent}
            />
            <EventDetailsModal
                isOpen={!!viewEvent}
                onClose={handleCloseViewModal}
                event={viewEvent}
                onEdit={handleEditEvent}
            />
            <AddAnnouncementModal
                isOpen={isAddAnnouncementOpen}
                onClose={() => setIsAddAnnouncementOpen(false)}
            />
        </div>
    );
}
