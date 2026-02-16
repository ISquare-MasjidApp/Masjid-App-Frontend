'use client';

import { useState, useEffect, useRef } from 'react';

// Helpers
const HOURS = Array.from({ length: 12 }, (_, i) => (i === 0 ? 12 : i).toString().padStart(2, '0')).sort((a, b) => parseInt(a) - parseInt(b));
// Fix sort order: 01, 02 .. 11, 12
const SORTED_HOURS = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

const MINUTES = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));
const AMPM = ['AM', 'PM'];

interface TimePickerProps {
    value?: string; // "HH:mm" (24h)
    onChange: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    className?: string; // Allow external width control
}

export default function TimePicker({ value, onChange, placeholder = "--:--", disabled, className = '' }: TimePickerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Parse value to internal state
    const parseTime = (val?: string) => {
        if (!val) return { h: '12', m: '00', p: 'AM' };
        let [hoursStr, minutesStr] = val.split(':');
        let hours = parseInt(hoursStr, 10);

        const p = hours >= 12 ? 'PM' : 'AM';
        if (hours > 12) hours -= 12;
        if (hours === 0) hours = 12;

        return {
            h: hours.toString().padStart(2, '0'),
            m: minutesStr,
            p
        };
    };

    const { h, m, p } = parseTime(value);

    // Display string
    const displayValue = value ? `${h}:${m} ${p}` : '';

    // Click outside to close
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (type: 'h' | 'm' | 'p', val: string) => {
        let newH = h;
        let newM = m;
        let newP = p;

        if (type === 'h') newH = val;
        if (type === 'm') newM = val;
        if (type === 'p') newP = val;

        // Convert back to 24h for onChange
        let hours24 = parseInt(newH, 10);
        if (newP === 'PM' && hours24 < 12) hours24 += 12;
        if (newP === 'PM' && hours24 === 12) hours24 = 12; // 12 PM is 12:00
        if (newP === 'AM' && hours24 === 12) hours24 = 0;  // 12 AM is 00:00

        const timeString = `${hours24.toString().padStart(2, '0')}:${newM}`;
        onChange(timeString);
    };

    // Scroll selected items into view when opened? (Advanced, skipping for MVP)

    return (
        <div className={`relative w-full ${className}`} ref={containerRef}>
            {/* Trigger Button */}
            <button
                type="button"
                onClick={() => !disabled && setIsOpen(!isOpen)}
                disabled={disabled}
                className={`w-full flex items-center justify-between px-3 py-2.5 border rounded-[10px] font-urbanist text-[14px] transition-colors bg-white
                    ${disabled ? 'bg-[var(--neutral-100)] text-[var(--neutral-300)] cursor-not-allowed border-[var(--border-01)]' : 'text-[var(--grey-800)] hover:border-[var(--brand)] cursor-pointer'}
                    ${isOpen ? 'border-[var(--brand)] ring-1 ring-[var(--brand)]' : 'border-[var(--border-01)]'}
                `}
            >
                <span>{displayValue || placeholder}</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[var(--neutral-500)]">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 3" />
                </svg>
            </button>

            {/* Dropdown */}
            {isOpen && (
                <div className="absolute top-full left-0 mt-2 bg-white border border-[var(--border-01)] rounded-[16px] shadow-xl z-50 flex overflow-hidden w-full min-w-[240px] h-[220px]">

                    {/* Columns */}
                    <div className="flex w-full h-full">
                        {/* Hours */}
                        <div className="flex-1 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden border-r border-[var(--border-01)]">
                            <div className="sticky top-0 bg-[var(--brand-05)] text-[var(--brand)] text-[11px] font-bold text-center py-1 uppercase tracking-wider z-10">
                                Hour
                            </div>
                            {SORTED_HOURS.map(hour => (
                                <button
                                    key={hour}
                                    type="button"
                                    onClick={() => handleSelect('h', hour)}
                                    // Use onMouseDown to prevent focus loss if that's an issue, but onClick is usually fine
                                    className={`w-full py-2.5 text-center font-urbanist font-medium text-[14px] hover:bg-[var(--brand-05)] transition-colors cursor-pointer block
                                        ${h === hour ? 'bg-[var(--brand)] text-white hover:bg-[var(--brand)]' : 'text-[var(--grey-800)]'}
                                    `}
                                >
                                    {hour}
                                </button>
                            ))}
                        </div>

                        {/* Minutes */}
                        <div className="flex-1 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden border-r border-[var(--border-01)]">
                            <div className="sticky top-0 bg-[var(--brand-05)] text-[var(--brand)] text-[11px] font-bold text-center py-1 uppercase tracking-wider z-10">
                                Min
                            </div>
                            {MINUTES.map(minute => (
                                <button
                                    key={minute}
                                    type="button"
                                    onClick={() => handleSelect('m', minute)}
                                    className={`w-full py-2.5 text-center font-urbanist font-medium text-[14px] hover:bg-[var(--brand-05)] transition-colors cursor-pointer block
                                        ${m === minute ? 'bg-[var(--brand)] text-white hover:bg-[var(--brand)]' : 'text-[var(--grey-800)]'}
                                    `}
                                >
                                    {minute}
                                </button>
                            ))}
                        </div>

                        {/* AM/PM */}
                        <div className="flex-1 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                            <div className="sticky top-0 bg-[var(--brand-05)] text-[var(--brand)] text-[11px] font-bold text-center py-1 uppercase tracking-wider z-10">
                                Period
                            </div>
                            {AMPM.map(period => (
                                <button
                                    key={period}
                                    type="button"
                                    onClick={() => handleSelect('p', period)}
                                    className={`w-full py-2.5 text-center font-urbanist font-medium text-[14px] hover:bg-[var(--brand-05)] transition-colors cursor-pointer block
                                        ${p === period ? 'bg-[var(--brand)] text-white hover:bg-[var(--brand)]' : 'text-[var(--grey-800)]'}
                                    `}
                                >
                                    {period}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
