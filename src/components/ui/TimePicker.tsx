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
    const [inputValue, setInputValue] = useState(value || '');
    const [error, setError] = useState(false);

    // Sync input with value prop when not editing
    useEffect(() => {
        if (!isOpen) {
            setInputValue(formatDisplayValue(value));
        }
    }, [value, isOpen]);

    // Helpers
    const formatDisplayValue = (val?: string) => {
        if (!val) return '';
        const { h, m, p } = parseTime(val);
        return `${h}:${m} ${p}`;
    };

    // Parse internal 24h "HH:mm" to { h, m, p }
    const parseTime = (val?: string) => {
        if (!val) return { h: '12', m: '00', p: 'AM' };
        // handle incomplete inputs safely
        const parts = val.split(':');
        let hoursStr = parts[0] || '12';
        let minutesStr = parts[1] || '00';

        // simple normalization
        let hours = parseInt(hoursStr, 10);
        if (isNaN(hours)) hours = 12;

        const p = hours >= 12 ? 'PM' : 'AM';
        if (hours > 12) hours -= 12;
        if (hours === 0) hours = 12;

        return {
            h: hours.toString().padStart(2, '0'),
            m: minutesStr.slice(0, 2).padStart(2, '0'),
            p
        };
    };

    const { h, m, p } = parseTime(value);

    // Validate manual input on blur
    const handleBlur = () => {
        const trimmed = inputValue.trim();
        if (!trimmed) {
            onChange(''); // Clear value
            setError(false);
            return;
        }

        // Regex for HH:MM (12h or 24h) + optional AM/PM
        // Matches: "5:30", "05:30", "5:30 PM", "17:30"
        const timeRegex = /^(\d{1,2}):(\d{2})\s?(AM|PM|am|pm)?$/i;
        const match = trimmed.match(timeRegex);

        if (!match) {
            setError(true);
            return;
        }

        let [_, hourStr, minStr, period] = match;
        let hour = parseInt(hourStr, 10);
        const min = parseInt(minStr, 10);

        if (hour < 0 || hour > 23 || min < 0 || min > 59 || (period && hour === 0)) {
            setError(true);
            return;
        }

        let periodNorm = period ? period.toUpperCase() : null;

        if (periodNorm) {
            if (periodNorm === 'PM' && hour < 12) hour += 12;
            if (periodNorm === 'PM' && hour === 12) hour = 12;
            if (periodNorm === 'AM' && hour === 12) hour = 0;
        } else {
            // Treat as 24h if no period provided, but handle 12h-like inputs seamlessly
            // If they just typed "05:30" we assume they meant 24h format (so 5:30 AM). If "17:30", it's 5:30 PM.
        }

        const h24 = hour.toString().padStart(2, '0');
        const m24 = min.toString().padStart(2, '0');

        onChange(`${h24}:${m24}`);
        setInputValue(formatDisplayValue(`${h24}:${m24}`));
        setError(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value;
        const isDeleting = val.length < inputValue.length;

        // Auto-detect typed period character from the new input value
        let currentPeriod = p || 'AM';
        if (val.toLowerCase().includes('a')) currentPeriod = 'AM';
        else if (val.toLowerCase().includes('p')) currentPeriod = 'PM';

        let digits = val.replace(/[^\d]/g, '').slice(0, 4);

        if (isDeleting) {
            setInputValue(val);
            setError(false);
            return;
        }

        let formatted = '';

        if (digits.length > 0) {
            let hStr = digits.substring(0, 2);
            if (hStr.length === 2) {
                let hVal = parseInt(hStr, 10);
                if (hVal > 12) hStr = '12';
                if (hVal === 0) hStr = '01';
                formatted += hStr;
            } else {
                let hVal = parseInt(hStr, 10);
                if (hVal > 1) {
                    formatted += `0${hVal}`;
                } else {
                    formatted += hStr;
                }
            }
        }

        if (formatted.length === 2 && digits.length >= 2) {
            formatted += ':';
        }

        if (digits.length > 2) {
            let mStr = digits.substring(2, 4);
            if (mStr.length === 2) {
                let mVal = parseInt(mStr, 10);
                if (mVal > 59) mStr = '59';
            }
            formatted += mStr;
        }

        if (formatted.length === 5) {
            formatted += ` ${currentPeriod}`;
        }

        setInputValue(formatted);
        setError(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.currentTarget.blur();
            setIsOpen(false);
        }
    };

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
        // Use current parsed values
        let newH = h;
        let newM = m;
        let newP = p;

        if (type === 'h') newH = val;
        if (type === 'm') newM = val;
        if (type === 'p') newP = val;

        // Convert back to 24h for onChange
        let hours24 = parseInt(newH, 10);
        if (newP === 'PM' && hours24 < 12) hours24 += 12;
        if (newP === 'PM' && hours24 === 12) hours24 = 12;
        if (newP === 'AM' && hours24 === 12) hours24 = 0;

        const timeString = `${hours24.toString().padStart(2, '0')}:${newM}`;
        onChange(timeString);
        setInputValue(`${newH}:${newM} ${newP}`);
    };

    return (
        <div className={`relative w-full ${className}`} ref={containerRef}>
            <div className="relative">
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onFocus={() => setIsOpen(true)}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    disabled={disabled}
                    placeholder={placeholder}
                    className={`w-full px-3 py-2.5 border rounded-[10px] font-urbanist text-[14px] transition-colors outline-none
                        ${disabled
                            ? 'bg-[var(--neutral-100)] text-[var(--neutral-300)] cursor-not-allowed border-[var(--border-01)]'
                            : 'bg-white text-[var(--grey-800)] hover:border-[var(--brand)] focus:border-[var(--brand)] focus:ring-1 focus:ring-[var(--brand)]'
                        }
                        ${error ? 'border-[var(--error)] focus:border-[var(--error)] focus:ring-[var(--error)]' : 'border-[var(--border-01)]'}
                    `}
                />
                {/* Clock Icon / Dropdown Indicator */}
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--neutral-500)]">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <circle cx="12" cy="12" r="9" />
                        <path d="M12 7v5l3 3" />
                    </svg>
                </div>
            </div>

            {/* Dropdown */}
            {isOpen && !disabled && (
                <div
                    className="absolute top-full left-0 mt-2 bg-white border border-[var(--border-01)] rounded-[16px] shadow-xl z-50 flex overflow-hidden w-full min-w-[240px] h-[220px]"
                    onMouseDown={(e) => e.preventDefault()} // Prevent blur stealing
                >
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
