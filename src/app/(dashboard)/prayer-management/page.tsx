'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { getPrayerTimes, deletePrayerTime } from '@/lib/api/prayer-times';
import UpdatePrayerTimeModal from '@/components/prayer-management/UpdatePrayerTimeModal';
import Skeleton from '@/components/ui/Skeleton';
import type { PrayerTimeResponse, PrayersData } from '@/types/prayer-times';

/* ── Constants ── */

const PRAYER_NAMES: (keyof PrayersData)[] = ['fajr', 'sunrise', 'zuhr', 'asr', 'maghrib', 'isha'];

const PRAYER_LABELS: Record<keyof PrayersData, string> = {
    fajr: 'Fajr',
    sunrise: 'Sunrise',
    zuhr: 'Zuhr',
    asr: 'Asr',
    maghrib: 'Maghrib',
    isha: 'Isha',
};

const MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
];

const MONTHS_SHORT = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

const DAYS_FULL = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/* ── Helpers ── */

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

/** Split time into { time, ampm } for rendering AM/PM separately */
function formatTimeParts(time24: string | undefined): { time: string; ampm: string } | null {
    if (!time24) return null;
    const [hoursStr, minutesStr] = time24.split(':');
    let hours = parseInt(hoursStr, 10);
    const minutes = minutesStr;
    const ampm = hours >= 12 ? 'PM' : 'AM';
    if (hours > 12) hours -= 12;
    if (hours === 0) hours = 12;
    return { time: `${hours}:${minutes}`, ampm };
}

function getDateParts(dateStr: string) {
    const d = new Date(dateStr + 'T00:00:00');
    return {
        dayFull: DAYS_FULL[d.getDay()],
        dayNum: d.getDate(),
        isFriday: d.getDay() === 5,
        monthShort: MONTHS_SHORT[d.getMonth()],
    };
}

/* ── Shared arrow SVG (Figma: "Component 1") ── */

function ChevronRight({ className = '' }: { className?: string }) {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={className}>
            <path d="M9 6L15 12L9 18" stroke="var(--brand)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

/* ═══════════════════════════════════════════════════
   Main Page
   ═══════════════════════════════════════════════════ */

export default function PrayerManagementPage() {
    const [prayerTimes, setPrayerTimes] = useState<PrayerTimeResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [editingPrayerTime, setEditingPrayerTime] = useState<PrayerTimeResponse | null>(null);

    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    const [selectedDate, setSelectedDate] = useState(new Date());

    /* ── Date Helpers ── */
    const formatDateKey = (date: Date) => {
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    };

    const selectedDateKey = formatDateKey(selectedDate);
    const selectedPrayerTime = prayerTimes.find(pt => pt.date === selectedDateKey);

    /* ── navigation handlers ── */
    const handlePrevDay = () => {
        const newDate = new Date(selectedDate);
        newDate.setDate(selectedDate.getDate() - 1);
        setSelectedDate(newDate);

        // Sync month if needed
        if (newDate.getMonth() !== currentMonth || newDate.getFullYear() !== currentYear) {
            setCurrentMonth(newDate.getMonth());
            setCurrentYear(newDate.getFullYear());
        }
    };

    const handleNextDay = () => {
        const newDate = new Date(selectedDate);
        newDate.setDate(selectedDate.getDate() + 1);
        setSelectedDate(newDate);

        // Sync month if needed
        if (newDate.getMonth() !== currentMonth || newDate.getFullYear() !== currentYear) {
            setCurrentMonth(newDate.getMonth());
            setCurrentYear(newDate.getFullYear());
        }
    };

    /* ── data fetching ── */
    const fetchPrayerTimes = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const startDate = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-01`;
            const lastDay = new Date(currentYear, currentMonth + 1, 0).getDate();
            const endDate = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`;
            const result = await getPrayerTimes({ startDate, endDate, size: 31 });
            setPrayerTimes(result.content);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load prayer times');
        } finally {
            setLoading(false);
        }
    }, [currentMonth, currentYear]);

    useEffect(() => { fetchPrayerTimes(); }, [fetchPrayerTimes]);

    /* ── navigation ── */
    const handlePrevMonth = () => {
        if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1); }
        else { setCurrentMonth(m => m - 1); }
    };
    const handleNextMonth = () => {
        if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1); }
        else { setCurrentMonth(m => m + 1); }
    };

    /* ── actions ── */
    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this prayer time entry?')) return;
        try { await deletePrayerTime(id); fetchPrayerTimes(); }
        catch { alert('Failed to delete prayer time'); }
    };
    const handleEdit = (pt: PrayerTimeResponse) => { setEditingPrayerTime(pt); setShowModal(true); };
    const handleAddNew = () => { setEditingPrayerTime(null); setShowModal(true); };
    const handleModalClose = () => { setShowModal(false); setEditingPrayerTime(null); };
    const handleModalSuccess = () => { handleModalClose(); fetchPrayerTimes(); };

    /* ── determine active prayer ── */
    /* ── determine active prayer ── */
    const getActivePrayer = (): keyof PrayersData | null => {
        if (!selectedPrayerTime) return null;
        const now = new Date();
        // Only highlight if selected date is today
        const isToday = selectedDate.toDateString() === now.toDateString();
        if (!isToday) return null;

        const currentMin = now.getHours() * 60 + now.getMinutes();
        const order: (keyof PrayersData)[] = ['fajr', 'sunrise', 'zuhr', 'asr', 'maghrib', 'isha'];
        let active: keyof PrayersData | null = null;
        for (const p of order) {
            const t = selectedPrayerTime.prayers[p]?.jamah || selectedPrayerTime.prayers[p]?.athan;
            if (t) {
                const [h, m] = t.split(':').map(Number);
                if (currentMin >= h * 60 + m) active = p;
            }
        }
        return active;
    };
    const activePrayer = getActivePrayer();

    /* ── hijri range for month header ── */
    const firstHijri = prayerTimes.length > 0 ? prayerTimes[0]?.hijriDate : null;
    const lastHijri = prayerTimes.length > 1 ? prayerTimes[prayerTimes.length - 1]?.hijriDate : null;
    const hijriRange = firstHijri && lastHijri && firstHijri !== lastHijri
        ? `${firstHijri} - ${lastHijri}`
        : firstHijri || '';

    /* Prayers that have BEGINS / JAMA'AH sub-columns */
    const prayersWithSubCols: (keyof PrayersData)[] = ['fajr', 'zuhr', 'asr', 'maghrib', 'isha'];

    /* ═══════════════════════════════════════════════════
       RENDER
       ═══════════════════════════════════════════════════ */
    return (
        <div className="flex flex-col gap-6">

            {/* ─────────────── Page Header ─────────────── */}
            <div className="flex items-center justify-between">
                <h1 className="font-urbanist font-bold text-[28px] text-[#1f1f1f] leading-normal">
                    Prayer Management
                </h1>
                <button
                    onClick={handleAddNew}
                    className="flex items-center gap-2.5 h-[44px] px-6 bg-[var(--brand)] text-white rounded-[12px]
                               font-inter font-medium text-[16px] hover:opacity-90 transition-opacity cursor-pointer"
                >
                    {/* Calendar-Add icon */}
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <rect x="2" y="3" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M2 7.5h16" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M6 1.5v3M14 1.5v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M10 10.5v4M8 12.5h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    Add/Update Prayer Time
                </button>
            </div>

            {/* ─────────────── Date Section ─────────────── */}
            <div className="flex flex-col gap-6 items-center w-full">

                {/* Date Banner */}
                <div className="flex items-center justify-between w-full bg-[var(--brand-05)] px-4 py-1.5">
                    {/* Previous allow */}
                    <button
                        onClick={handlePrevDay}
                        className="border border-[var(--brand-50)] rounded-[8px] p-1.5 flex items-center justify-center hover:bg-white/50 transition-colors cursor-pointer"
                    >
                        <ChevronRight className="rotate-180" />
                    </button>

                    {/* Center date text */}
                    <div className="flex flex-col items-center gap-0.5">
                        <p className="font-urbanist font-semibold text-[24px] text-[var(--grey-800)] leading-normal">
                            {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                        </p>
                        {selectedPrayerTime?.hijriDate && (
                            <p className="font-urbanist font-semibold text-[20px] text-[var(--brand)] leading-normal">
                                {selectedPrayerTime.hijriDate}
                            </p>
                        )}
                        {!selectedPrayerTime && !loading && (
                            <p className="font-urbanist font-semibold text-[16px] text-[var(--neutral-500)] leading-normal">
                                No data for this date
                            </p>
                        )}
                    </div>

                    {/* Next arrow */}
                    <button
                        onClick={handleNextDay}
                        className="border border-[var(--brand-50)] rounded-[8px] p-1.5 flex items-center justify-center hover:bg-white/50 transition-colors cursor-pointer"
                    >
                        <ChevronRight />
                    </button>
                </div>

                {/* ─── Prayer Time Cards ─── */}
                <div className="flex gap-[30px] items-stretch w-full">
                    {loading ? (
                        /* SKELETON LOADING STATE for Cards */
                        Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="flex flex-1 flex-col items-center justify-center gap-4 p-6 rounded-[12px] bg-white border border-[var(--border-01)] h-[180px]">
                                <Skeleton className="h-6 w-24" /> {/* Title */}
                                <div className="flex items-baseline gap-2">
                                    <Skeleton className="h-8 w-20" /> {/* Time */}
                                    <Skeleton className="h-5 w-8" />  {/* AM/PM */}
                                </div>
                                <Skeleton className="h-4 w-32 mt-2" /> {/* Subtitle */}
                            </div>
                        ))
                    ) : (
                        PRAYER_NAMES.map((prayer) => {
                            const isActive = activePrayer === prayer;
                            const data = selectedPrayerTime?.prayers?.[prayer];
                            const isSunrise = prayer === 'sunrise';

                            /* Time parts for the main jamah/athan time */
                            const mainTime = data?.jamah || data?.athan;
                            const mainParts = formatTimeParts(mainTime);

                            /* Athan parts */
                            const athanParts = formatTimeParts(data?.athan);

                            return (
                                <div
                                    key={prayer}
                                    className={`
                                        flex flex-1 flex-col items-center justify-center gap-2
                                        p-6 rounded-[12px] transition-all duration-200
                                        ${isActive
                                            ? 'bg-[var(--brand)] text-white'
                                            : 'bg-[var(--brand-05)]'
                                        }
                                    `}
                                >
                                    {/* Prayer name */}
                                    <p className={`font-urbanist font-medium text-[22px] uppercase tracking-[-0.14px] leading-normal ${isActive ? 'text-white' : 'text-[var(--brand)]'}`}>
                                        {PRAYER_LABELS[prayer]}
                                    </p>

                                    {/* Main time: e.g. 6:30 PM */}
                                    <div className="flex items-baseline gap-1.5 justify-center">
                                        <p className={`font-inter font-bold text-[26px] leading-normal ${isActive ? 'text-white' : 'text-[var(--grey-800)]'}`}>
                                            {mainParts ? mainParts.time : '—'}
                                        </p>
                                        {mainParts && (
                                            <p className={`font-inter font-bold text-[18px] uppercase leading-normal ${isActive ? 'text-white' : 'text-[#666d80]'}`}>
                                                {mainParts.ampm}
                                            </p>
                                        )}
                                    </div>

                                    {/* Athan time with superscript AM/PM */}
                                    {!isSunrise && (
                                        <p className={`font-urbanist font-medium uppercase text-center leading-none ${isActive ? 'text-white' : 'text-[#666d80]'}`}>
                                            {athanParts ? (
                                                <>
                                                    <span className="text-[20px]">Athan {athanParts.time}</span>
                                                    <span className="text-[12.9px] align-super">{athanParts.ampm}</span>
                                                </>
                                            ) : (
                                                <span className="text-[20px]">—</span>
                                            )}
                                        </p>
                                    )}
                                </div>
                            );
                        })
                    )}
                </div>
            </div>

            {/* ─────────────── Timetable Section ─────────────── */}
            <div className="border border-[var(--border-01)] rounded-[16px] overflow-hidden">

                {/* ── Month Header ── */}
                <div className="flex items-center justify-between p-4">
                    <div className="flex flex-col gap-0.5">
                        <p className="font-urbanist font-semibold text-[20px] text-[var(--grey-800)] leading-normal">
                            {MONTHS[currentMonth]} {currentYear}
                        </p>
                        {hijriRange && (
                            <p className="font-urbanist font-semibold text-[14px] text-[var(--brand)] leading-normal">
                                {hijriRange}
                            </p>
                        )}
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handlePrevMonth}
                            className="border border-[var(--brand-50)] rounded-[8px] p-1.5 flex items-center justify-center hover:bg-[var(--brand-05)] transition-colors cursor-pointer"
                        >
                            <ChevronRight className="rotate-180" />
                        </button>
                        <button
                            onClick={handleNextMonth}
                            className="border border-[var(--brand-50)] rounded-[8px] p-1.5 flex items-center justify-center hover:bg-[var(--brand-05)] transition-colors cursor-pointer"
                        >
                            <ChevronRight />
                        </button>
                    </div>
                </div>

                {/* ── Table Content ── */}
                {loading ? (
                    <div className="w-full overflow-x-auto">
                        <table className="w-full border-collapse min-w-[1000px]">
                            <thead>
                                <tr className="border-t border-[var(--border-01)]">
                                    <th className="px-4 py-3 w-[210px] border-r border-[var(--border-01)] bg-[var(--table-white)]">
                                        <Skeleton className="h-5 w-32" />
                                    </th>
                                    {PRAYER_NAMES.map((prayer) => (
                                        <th key={prayer} colSpan={prayer === 'sunrise' ? 1 : 2} className="px-4 py-3 border-r border-[var(--border-01)] bg-[var(--table-white)]">
                                            <Skeleton className="h-5 w-16 mx-auto" />
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <tr key={i} className="border-t border-[var(--border-01)] bg-white">
                                        <td className="px-4 py-3 border-r border-[var(--border-01)]">
                                            <Skeleton className="h-5 w-3/4 mb-1" />
                                            <Skeleton className="h-3 w-1/2" />
                                        </td>
                                        {PRAYER_NAMES.map((prayer) => (
                                            <React.Fragment key={prayer}>
                                                {prayer === 'sunrise' ? (
                                                    <td className="p-4 border-r border-[var(--border-01)]">
                                                        <Skeleton className="h-5 w-12 mx-auto" />
                                                    </td>
                                                ) : (
                                                    <>
                                                        <td className="p-4 border-r border-[var(--border-01)]">
                                                            <Skeleton className="h-5 w-12 mx-auto" />
                                                        </td>
                                                        <td className="p-4 border-r border-[var(--border-01)]">
                                                            <Skeleton className="h-5 w-12 mx-auto" />
                                                        </td>
                                                    </>
                                                )}
                                            </React.Fragment>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : error ? (
                    <div className="text-center py-20">
                        <p className="font-urbanist text-[var(--error)] text-[16px]">{error}</p>
                        <button onClick={fetchPrayerTimes} className="mt-4 px-6 py-2.5 bg-[var(--brand)] text-white rounded-[12px] font-inter font-medium text-[16px] cursor-pointer">Retry</button>
                    </div>
                ) : prayerTimes.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="font-urbanist text-[var(--neutral-500)] text-[16px]">
                            No prayer times found for {MONTHS[currentMonth]} {currentYear}
                        </p>
                        <button onClick={handleAddNew} className="mt-4 px-6 py-2.5 bg-[var(--brand)] text-white rounded-[12px] font-inter font-medium text-[16px] cursor-pointer">Add Prayer Times</button>
                    </div>
                ) : (
                    <div className="w-full overflow-x-auto">
                        <table className="w-full border-collapse min-w-[1000px]">
                            {/* ── Table Header ── */}
                            <thead>
                                {/* Top row: prayer names */}
                                <tr className="border-t border-[var(--border-01)]">
                                    <th
                                        rowSpan={2}
                                        className="bg-[var(--table-white)] text-left px-4 py-3 font-urbanist font-medium text-[14px] text-[#667085] uppercase w-[210px] border-r border-[var(--border-01)] align-middle"
                                    >
                                        Day (Date &amp; Hijiri)
                                    </th>
                                    {PRAYER_NAMES.map((prayer) => {
                                        const isSunrise = prayer === 'sunrise';
                                        return (
                                            <th
                                                key={prayer}
                                                colSpan={isSunrise ? 1 : 2}
                                                className={`bg-[var(--table-white)] text-center px-4 py-3 font-urbanist font-semibold text-[14px] text-[var(--grey-800)] uppercase border-r border-[var(--border-01)] last:border-r-0 ${isSunrise ? 'w-[105px]' : ''}`}
                                            >
                                                {PRAYER_LABELS[prayer]}
                                            </th>
                                        );
                                    })}
                                </tr>
                                {/* Bottom row: BEGINS / JAMA'AH sub-headers */}
                                <tr className="border-t border-[var(--border-01)]">
                                    {PRAYER_NAMES.map((prayer) => {
                                        const isSunrise = prayer === 'sunrise';
                                        if (isSunrise) {
                                            return (
                                                <th
                                                    key={prayer}
                                                    className="bg-[var(--table-white)] border-r border-[var(--border-01)]"
                                                />
                                            );
                                        }
                                        return (
                                            <React.Fragment key={prayer}>
                                                <th className="bg-[var(--table-white)] text-center px-4 py-2 font-urbanist font-medium text-[12px] text-[#667085] uppercase border-r border-[var(--border-01)]">
                                                    Begins
                                                </th>
                                                <th className="bg-[var(--table-white)] text-center px-4 py-2 font-urbanist font-medium text-[12px] text-[var(--brand)] uppercase border-r border-[var(--border-01)] last:border-r-0">
                                                    Jama&apos;ah
                                                </th>
                                            </React.Fragment>
                                        );
                                    })}
                                </tr>
                            </thead>

                            {/* ── Table Body ── */}
                            <tbody>
                                {prayerTimes.map((pt) => {
                                    const { dayFull, dayNum, isFriday, monthShort } = getDateParts(pt.date);
                                    const isSelected = pt.date === selectedDateKey;
                                    const now = new Date();
                                    const todayKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
                                    const isToday = pt.date === todayKey;

                                    return (
                                        <tr
                                            key={pt.id}
                                            className={`border-t border-[var(--border-01)] transition-colors duration-200
                                                ${isSelected ? 'bg-[var(--brand-05)]' : isToday ? 'bg-[var(--neutral-50)]' : 'bg-white hover:bg-[var(--neutral-50)]'}
                                            `}
                                            onClick={() => {
                                                const d = new Date(pt.date + 'T00:00:00');
                                                setSelectedDate(d);
                                            }}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            {/* Day + Hijri column */}
                                            <td className="px-4 py-3 border-r border-[var(--border-01)] w-[210px]">
                                                <p className="font-urbanist font-medium text-[14px] text-[var(--grey-800)] leading-normal">
                                                    {monthShort} {dayNum}, {dayFull}
                                                </p>
                                                <p className="font-urbanist font-medium text-[12px] text-[#666d80] uppercase leading-normal">
                                                    {pt.hijriDate || '—'}
                                                </p>
                                            </td>

                                            {/* Prayer time cells */}
                                            {PRAYER_NAMES.map((prayer) => {
                                                const pData = pt.prayers[prayer];
                                                const isSunrise = prayer === 'sunrise';

                                                /* ── Sunrise: single column ── */
                                                if (isSunrise) {
                                                    return (
                                                        <td
                                                            key={prayer}
                                                            className="text-center px-4 py-3 font-urbanist font-medium text-[14px] text-[#666d80] border-r border-[var(--border-01)]"
                                                        >
                                                            {formatTime12h(pData?.athan)}
                                                        </td>
                                                    );
                                                }

                                                /* ── Friday Zuhr: Jummah handling ── */
                                                if (isFriday && prayer === 'zuhr' && pt.jumuahTimes && pt.jumuahTimes.length > 0) {
                                                    return (
                                                        <React.Fragment key={prayer}>
                                                            {/* Begins column: shows athan */}
                                                            <td className="text-center px-4 py-3 font-urbanist font-medium text-[14px] text-[#666d80] border-r border-[var(--border-01)]">
                                                                {formatTime12h(pData?.athan)}
                                                            </td>
                                                            {/* Jama'ah column: Jummah times stacked */}
                                                            <td className="px-4 py-1 border-r border-[var(--border-01)]">
                                                                {pt.jumuahTimes.map((jt, idx) => (
                                                                    <div key={idx} className={`flex items-center justify-between ${idx > 0 ? 'border-t border-[var(--border-01)] pt-1 mt-1' : ''}`}>
                                                                        <span className="font-urbanist font-medium text-[10px] text-[#666d80] uppercase">
                                                                            Jummah {idx + 1}
                                                                        </span>
                                                                        <span className="font-urbanist font-medium text-[12px] text-[var(--brand)]">
                                                                            {formatTime12h(jt.jamah)}
                                                                        </span>
                                                                    </div>
                                                                ))}
                                                            </td>
                                                        </React.Fragment>
                                                    );
                                                }

                                                /* ── Normal prayer: BEGINS + JAMA'AH ── */
                                                return (
                                                    <React.Fragment key={prayer}>
                                                        <td className="text-center px-4 py-3 font-urbanist font-medium text-[14px] text-[#666d80] border-r border-[var(--border-01)]">
                                                            {formatTime12h(pData?.athan)}
                                                        </td>
                                                        <td className="text-center px-4 py-3 font-urbanist font-medium text-[14px] text-[var(--brand)] border-r border-[var(--border-01)] last:border-r-0">
                                                            {formatTime12h(pData?.jamah)}
                                                        </td>
                                                    </React.Fragment>
                                                );
                                            })}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* ─────────────── Modal ─────────────── */}
            {showModal && (
                <UpdatePrayerTimeModal
                    prayerTime={editingPrayerTime}
                    onClose={handleModalClose}
                    onSuccess={handleModalSuccess}
                />
            )}
        </div>
    );
}
