'use client';

import { useState, useEffect } from 'react';
import { createPrayerTime, updatePrayerTime, bulkCreatePrayerTimes } from '@/lib/api/prayer-times';
import DateRangePicker from './DateRangePicker';
import TimePicker from '@/components/ui/TimePicker';
import type { PrayerTimeResponse, PrayersData, JumuahTimeEntry } from '@/types/prayer-times';

/* ── Props ── */
interface UpdatePrayerTimeModalProps {
    prayerTime: PrayerTimeResponse | null; // null = creating new
    onClose: () => void;
    onSuccess: () => void;
}

/* ── Constants ── */
const EMPTY_PRAYERS: PrayersData = {
    fajr: { athan: '', jamah: '' },
    sunrise: { athan: '' },
    zuhr: { athan: '', jamah: '' },
    asr: { athan: '', jamah: '' },
    maghrib: { athan: '', jamah: '' },
    isha: { athan: '', jamah: '' },
};

const EMPTY_JUMUAH: JumuahTimeEntry = { begins: '', jamah: '' };

const PRAYER_COLS: { key: keyof PrayersData; label: string; hasJamah: boolean }[] = [
    { key: 'fajr', label: 'FAJR', hasJamah: true },
    { key: 'sunrise', label: 'SUNRISE', hasJamah: false },
    { key: 'zuhr', label: 'ZUHR', hasJamah: true },
    { key: 'asr', label: 'ASR', hasJamah: true },
    { key: 'maghrib', label: 'MAGHRIB', hasJamah: true },
    { key: 'isha', label: 'ISHA', hasJamah: true },
];

/* ── Helpers ── */
const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function formatDateDisplay(dateStr: string): string {
    if (!dateStr) return '';
    const [y, m, d] = dateStr.split('-').map(Number);
    return `${d} ${MONTHS_SHORT[m - 1]} ${y}`;
}

/** Generate all dates between from and to (inclusive) */
function getDateRange(from: string, to: string): string[] {
    const dates: string[] = [];
    const start = new Date(from + 'T00:00:00');
    const end = new Date(to + 'T00:00:00');
    const current = new Date(start);
    while (current <= end) {
        const y = current.getFullYear();
        const m = String(current.getMonth() + 1).padStart(2, '0');
        const d = String(current.getDate()).padStart(2, '0');
        dates.push(`${y}-${m}-${d}`);
        current.setDate(current.getDate() + 1);
    }
    return dates;
}

/* ═══════════════════════════════════════════════════
   Update Prayer Time Modal
   ═══════════════════════════════════════════════════ */
export default function UpdatePrayerTimeModal({ prayerTime, onClose, onSuccess }: UpdatePrayerTimeModalProps) {
    /* ── State ── */
    // "isEditing" prop is for single-day edit from the table. 
    // We also need an internal mode when a range is selected and data exists.
    const [activeTab, setActiveTab] = useState<'daily' | 'jumuah'>('daily');
    const [fromDate, setFromDate] = useState(prayerTime?.date || '');
    const [toDate, setToDate] = useState(prayerTime?.date || '');

    // Form State
    const [prayers, setPrayers] = useState<PrayersData>(prayerTime?.prayers || { ...EMPTY_PRAYERS });
    const [jumuahTimes, setJumuahTimes] = useState<JumuahTimeEntry[]>(
        prayerTime?.jumuahTimes || [{ ...EMPTY_JUMUAH }]
    );

    // UI State
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [loadingData, setLoadingData] = useState(false);

    // Derived state: are we in "update" mode? 
    // Either passed `prayerTime` is not null (edit single), OR we found existing data for the selected range.
    const isEditing = prayerTime !== null;
    const [hasExistingData, setHasExistingData] = useState(false);
    const isUpdateMode = isEditing || hasExistingData;

    /* Escape key to close */
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    /* ── Handlers ── */
    const handlePrayerChange = (prayer: keyof PrayersData, field: 'athan' | 'jamah', value: string) => {
        setPrayers(prev => ({ ...prev, [prayer]: { ...prev[prayer], [field]: value } }));
    };

    const handleJumuahChange = (index: number, field: keyof JumuahTimeEntry, value: string) => {
        setJumuahTimes(prev => {
            const updated = [...prev];
            updated[index] = { ...updated[index], [field]: value };
            return updated;
        });
    };

    const addSecondJumuah = () => {
        if (jumuahTimes.length < 2) setJumuahTimes(prev => [...prev, { ...EMPTY_JUMUAH }]);
    };

    const removeSecondJumuah = () => {
        if (jumuahTimes.length > 1) setJumuahTimes(prev => [prev[0]]);
    };

    const handleDateRangeApply = async (from: string, to: string) => {
        setFromDate(from);
        setToDate(to);
        setShowDatePicker(false);
        setLoadingData(true);
        setError(null);

        try {
            // Check if data exists for this range
            // We fetch the range. If we get ANY data, we can consider it an "Update" scenario 
            // and populate with the *first* found entry as a template.
            // Using a small page size just to check existence/get first entry
            const { getPrayerTimes } = await import('@/lib/api/prayer-times');
            const data = await getPrayerTimes({ startDate: from, endDate: to, size: 1, page: 0 });

            if (data.content && data.content.length > 0) {
                const template = data.content[0];
                setPrayers(template.prayers);
                setJumuahTimes(template.jumuahTimes || [{ ...EMPTY_JUMUAH }]);
                setHasExistingData(true);
            } else {
                // Reset to empty if no data found for this range
                setPrayers({ ...EMPTY_PRAYERS });
                setJumuahTimes([{ ...EMPTY_JUMUAH }]);
                setHasExistingData(false);
            }
        } catch (err) {
            console.error("Failed to check existing data", err);
            // Don't block the user, just default to "Add" mode
            setHasExistingData(false);
        } finally {
            setLoadingData(false);
        }
    };

    /* ── Hijri Date Helper ── */
    const getHijriDate = (dateStr: string): string => {
        try {
            const date = new Date(dateStr);
            const f = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', { day: 'numeric', month: 'long', year: 'numeric' });
            const parts = f.formatToParts(date);
            const d = parts.find(p => p.type === 'day')?.value;
            const m = parts.find(p => p.type === 'month')?.value;
            const y = parts.find(p => p.type === 'year')?.value;
            return `${d} ${m} ${y}`;
        } catch (e) {
            return '';
        }
    };

    const handleSave = async () => {
        if (!fromDate) { setError('Please select a date range'); return; }
        setSaving(true);
        setError(null);

        try {
            const filteredJumuah = jumuahTimes.filter(j => j.jamah || j.begins);
            const dates = getDateRange(fromDate, toDate);

            // Always use bulkCreate which supports upsert (create or update)
            await bulkCreatePrayerTimes({
                prayerTimes: dates.map(d => ({
                    date: d,
                    hijriDate: getHijriDate(d),
                    prayers,
                    jumuahTimes: filteredJumuah.length > 0 ? filteredJumuah : undefined,
                })),
            });

            onSuccess();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to save prayer time');
        } finally {
            setSaving(false);
        }
    };

    /* ── Date display string ── */
    const dateDisplayStr = fromDate
        ? fromDate === toDate
            ? formatDateDisplay(fromDate)
            : `${formatDateDisplay(fromDate)} - ${formatDateDisplay(toDate)}`
        : 'Select date range';

    /* ═══════════════════════════════════════════
       RENDER
       ═══════════════════════════════════════════ */
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/40" onClick={onClose} />

            {/* Modal Panel */}
            <div className="relative bg-white rounded-[24px] w-full max-w-[1020px] max-h-[90vh] overflow-y-auto shadow-2xl border border-[var(--border-01)]">

                {/* ── Header ── */}
                <div className="flex items-center justify-between px-8 pt-7 pb-4">
                    <h2 className="font-urbanist font-bold text-[22px] text-[var(--grey-800)]">
                        {isUpdateMode ? 'Update Prayer Time' : 'Add Prayer Time'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="w-[36px] h-[36px] flex items-center justify-center border border-[var(--border-01)] rounded-[8px] hover:bg-[var(--neutral-100)] transition-colors cursor-pointer"
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M12 4L4 12M4 4l8 8" stroke="var(--grey-800)" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                    </button>
                </div>

                {/* ── Content ── */}
                <div className="px-8 pb-2">

                    {/* ── Date Range Field ── */}
                    <div className="mb-6">
                        <label className="block font-urbanist font-medium text-[14px] text-[var(--grey-800)] mb-2">
                            Date Range
                        </label>
                        <button
                            onClick={() => !isEditing && setShowDatePicker(true)}
                            className={`flex items-center justify-between w-full max-w-[580px] px-5 py-3 border border-[var(--border-01)] rounded-full
                                font-urbanist text-[15px] text-[var(--grey-800)] transition-colors
                                ${isEditing ? 'bg-[var(--neutral-100)] cursor-default' : 'bg-white hover:border-[var(--brand)] cursor-pointer'}`}
                        >
                            <span>{dateDisplayStr}</span>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0 ml-2">
                                <rect x="2" y="3" width="16" height="14" rx="2" stroke="var(--neutral-500)" strokeWidth="1.3" />
                                <path d="M2 7.5h16" stroke="var(--neutral-500)" strokeWidth="1.3" />
                                <path d="M6 1.5v3M14 1.5v3" stroke="var(--neutral-500)" strokeWidth="1.3" strokeLinecap="round" />
                            </svg>
                        </button>
                    </div>

                    {/* ── Tab Switcher — green tinted bg ── */}
                    <div className="bg-[var(--brand-05)] rounded-t-[8px] flex mb-0">
                        <button
                            onClick={() => setActiveTab('daily')}
                            className={`flex-1 py-3.5 font-urbanist font-semibold text-[15px] text-center transition-colors relative cursor-pointer
                                ${activeTab === 'daily'
                                    ? 'text-[var(--brand)]'
                                    : 'text-[var(--neutral-500)] hover:text-[var(--grey-800)]'
                                }`}
                        >
                            Daily Prayer
                            {activeTab === 'daily' && (
                                <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-[var(--brand)]" />
                            )}
                        </button>
                        <button
                            onClick={() => setActiveTab('jumuah')}
                            className={`flex-1 py-3.5 font-urbanist font-semibold text-[15px] text-center transition-colors relative cursor-pointer
                                ${activeTab === 'jumuah'
                                    ? 'text-[var(--brand)]'
                                    : 'text-[var(--neutral-500)] hover:text-[var(--grey-800)]'
                                }`}
                        >
                            Jumuah
                            {activeTab === 'jumuah' && (
                                <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-[var(--brand)]" />
                            )}
                        </button>
                    </div>

                    {/* Green bottom border under tabs */}
                    <div className="h-[1px] bg-[var(--brand)] mb-6" />

                    {/* ═══════════════════════════════════════
                       Daily Prayer Tab — 6 Columns Layout
                       ═══════════════════════════════════════ */}
                    {activeTab === 'daily' && (
                        <div className="grid grid-cols-6 gap-5 mb-4">
                            {PRAYER_COLS.map(({ key, label, hasJamah }) => (
                                <div key={key} className="flex flex-col">
                                    {/* Prayer Name */}
                                    <p className="font-urbanist font-bold text-[15px] text-[var(--grey-800)] uppercase mb-3">
                                        {label}
                                    </p>

                                    {/* Begins */}
                                    <label className="font-urbanist font-medium text-[13px] text-[var(--brand)] mb-1.5">
                                        Begins
                                    </label>
                                    <TimePicker
                                        value={prayers[key]?.athan || ''}
                                        onChange={(val) => handlePrayerChange(key, 'athan', val)}
                                        placeholder="00:00"
                                    />

                                    {/* Jama'h */}
                                    <label className="font-urbanist font-medium text-[13px] text-[var(--brand)] mt-4 mb-1.5">
                                        Jama&apos;h
                                    </label>
                                    {hasJamah ? (
                                        <TimePicker
                                            value={prayers[key]?.jamah || ''}
                                            onChange={(val) => handlePrayerChange(key, 'jamah', val)}
                                            placeholder="00:00"
                                        />
                                    ) : (
                                        <TimePicker
                                            disabled
                                            onChange={() => { }}
                                            placeholder="—"
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* ═══════════════════════════════════════
                       Jumuah Tab
                       ═══════════════════════════════════════ */}
                    {activeTab === 'jumuah' && (
                        <div className="mb-4">
                            <div className="flex items-start gap-8">
                                {/* JUMU'AH 1 (or JUMUAH if only one) */}
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-2 mb-3">
                                        <p className="font-urbanist font-bold text-[15px] text-[var(--grey-800)] uppercase">
                                            {jumuahTimes.length > 1 ? "JUMU'AH 1" : 'JUMUAH'}
                                        </p>
                                    </div>

                                    <label className="font-urbanist font-medium text-[13px] text-[var(--brand)] mb-1.5">
                                        Begins
                                    </label>
                                    <div className="w-[150px]">
                                        <TimePicker
                                            value={jumuahTimes[0]?.begins || ''}
                                            onChange={(val) => handleJumuahChange(0, 'begins', val)}
                                            placeholder="00:00"
                                        />
                                    </div>

                                    <label className="font-urbanist font-medium text-[13px] text-[var(--brand)] mt-4 mb-1.5">
                                        Jama&apos;h
                                    </label>
                                    <div className="w-[150px]">
                                        <TimePicker
                                            value={jumuahTimes[0]?.jamah || ''}
                                            onChange={(val) => handleJumuahChange(0, 'jamah', val)}
                                            placeholder="00:00"
                                        />
                                    </div>
                                </div>

                                {/* JUMU'AH 2 — or Add Button */}
                                {jumuahTimes.length < 2 ? (
                                    /* Dashed "Add 2nd Jumuah" box */
                                    <button
                                        onClick={addSecondJumuah}
                                        className="flex flex-col items-center justify-center gap-2
                                            w-[160px] h-[160px] mt-5
                                            border-2 border-dashed border-[var(--brand)] rounded-[12px]
                                            text-[var(--brand)] hover:bg-[var(--brand-05)] transition-colors cursor-pointer"
                                    >
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M12 5v14M5 12h14" stroke="var(--brand)" strokeWidth="2" strokeLinecap="round" />
                                        </svg>
                                        <span className="font-urbanist font-medium text-[14px]">
                                            2<sup>nd</sup> Jumuah
                                        </span>
                                    </button>
                                ) : (
                                    /* Second Jumuah inputs */
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-2 mb-3">
                                            <p className="font-urbanist font-bold text-[15px] text-[var(--grey-800)] uppercase">
                                                JUMU&apos;AH 2
                                            </p>
                                            {/* Delete icon */}
                                            <button
                                                onClick={removeSecondJumuah}
                                                className="p-1 hover:bg-red-50 rounded-[6px] transition-colors cursor-pointer"
                                                title="Remove 2nd Jumuah"
                                            >
                                                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                                                    <path d="M3 5h14M6 5V3.5A1.5 1.5 0 0 1 7.5 2h5A1.5 1.5 0 0 1 14 3.5V5m2 0v11.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 4 16.5V5h12Z"
                                                        stroke="#EF4444" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </button>
                                        </div>

                                        <label className="font-urbanist font-medium text-[13px] text-[var(--brand)] mb-1.5">
                                            Begins
                                        </label>
                                        <div className="w-[150px]">
                                            <TimePicker
                                                value={jumuahTimes[1]?.begins || ''}
                                                onChange={(val) => handleJumuahChange(1, 'begins', val)}
                                                placeholder="00:00"
                                            />
                                        </div>

                                        <label className="font-urbanist font-medium text-[13px] text-[var(--brand)] mt-4 mb-1.5">
                                            Jama&apos;h
                                        </label>
                                        <div className="w-[150px]">
                                            <TimePicker
                                                value={jumuahTimes[1]?.jamah || ''}
                                                onChange={(val) => handleJumuahChange(1, 'jamah', val)}
                                                placeholder="00:00"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Error */}
                    {error && (
                        <p className="mt-2 font-urbanist text-[13px] text-[var(--error)]">{error}</p>
                    )}

                    {/* Note */}
                    <p className="mt-4 mb-2 font-urbanist text-[12px] italic text-[var(--neutral-500)]">
                        *Whatever the changes saved, it&apos;ll automatically reflect in the Mobile App.*
                    </p>
                </div>

                {/* ── Footer ── */}
                <div className="flex items-center justify-end gap-3 px-8 py-5">
                    <button
                        onClick={onClose}
                        disabled={saving}
                        className="px-8 py-2.5 border border-[var(--border-01)] text-[var(--grey-800)] rounded-[8px]
                            font-urbanist font-semibold text-[14px] hover:bg-[var(--neutral-100)] transition-colors disabled:opacity-50 cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="px-8 py-2.5 bg-[var(--brand)] text-white rounded-[8px]
                            font-urbanist font-semibold text-[14px] hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer"
                    >
                        {saving ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </div>

            {/* ── Date Range Picker Overlay ── */}
            {showDatePicker && (
                <DateRangePicker
                    fromDate={fromDate}
                    toDate={toDate}
                    onApply={handleDateRangeApply}
                    onCancel={() => setShowDatePicker(false)}
                />
            )}
        </div>
    );
}
