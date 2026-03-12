'use client';

import { useState, useEffect } from 'react';
import Modal from '@/components/ui/Modal';
import { CloseIcon } from '@/components/ui/Icons';
import TimePicker from '@/components/ui/TimePicker';

interface AddAnnouncementModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AddAnnouncementModal({ isOpen, onClose }: AddAnnouncementModalProps) {
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [scheduleMode, setScheduleMode] = useState(false);
    const [scheduleDate, setScheduleDate] = useState('');
    const [scheduleTime, setScheduleTime] = useState('');

    // Reset form when modal opens
    useEffect(() => {
        if (isOpen) {
            setTitle('');
            setMessage('');
            setScheduleMode(false);
            setScheduleDate('');
            setScheduleTime('');
        }
    }, [isOpen]);

    const handleSend = () => {
        console.log('Sending announcement:', { title, message });
        onClose();
    };

    const handleScheduleClick = () => {
        setScheduleMode(true);
    };

    const handleSave = () => {
        console.log('Scheduling announcement:', { title, message, scheduleDate, scheduleTime });
        onClose();
    };

    const handleCancel = () => {
        if (scheduleMode) {
            setScheduleMode(false);
        } else {
            onClose();
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="max-w-[680px] p-0">
            <div className="bg-white rounded-[24px] p-[24px] flex flex-col gap-[24px]">
                {/* Header */}
                <div className="flex justify-between items-start">
                    <h2 className="font-urbanist font-bold text-[24px] text-[var(--grey-800)] leading-normal">
                        {scheduleMode ? 'Schedule for later' : 'Add New Announcements'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="w-[36px] h-[36px] flex items-center justify-center bg-[rgba(7,119,52,0.1)] rounded-[8px] hover:bg-[rgba(7,119,52,0.2)] transition-colors shrink-0"
                    >
                        <CloseIcon size={24} className="text-[var(--grey-800)]" />
                    </button>
                </div>

                {/* Title Field */}
                <div className="flex flex-col gap-[8px]">
                    <label className="font-urbanist font-semibold text-[16px] text-[var(--grey-800)] tracking-[0.16px] leading-none">
                        Title
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Masjid Maintanence Work Tomorrow"
                        className="w-full h-[48px] px-[21px] border border-[var(--border-01)] rounded-[12px] font-urbanist font-normal text-[16px] text-[var(--grey-800)] placeholder:text-[#666d80] focus:outline-none focus:ring-1 focus:ring-[var(--brand)]"
                    />
                </div>

                {/* Message Field */}
                <div className="flex flex-col gap-[8px]">
                    <label className="font-urbanist font-semibold text-[16px] text-[var(--grey-800)] tracking-[0.16px] leading-none">
                        Message
                    </label>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Please note that the masjid will undego light maintanence tomorrow from 10 AM to 1 PM. Prayer halls will remain accessiblw"
                        className="w-full h-[168px] px-[21px] py-[16px] border border-[var(--border-01)] rounded-[12px] font-urbanist font-normal text-[16px] text-[var(--grey-800)] placeholder:text-[#666d80] focus:outline-none focus:ring-1 focus:ring-[var(--brand)] resize-none"
                    />
                </div>

                {/* Date & Time — only visible in schedule mode */}
                {scheduleMode && (
                    <div className="flex gap-[24px]">
                        {/* Date */}
                        <div className="flex-1 flex flex-col gap-[8px]">
                            <label className="font-urbanist font-semibold text-[16px] text-[var(--grey-800)] tracking-[0.16px] leading-none">
                                Date
                            </label>
                            <input
                                type="date"
                                value={scheduleDate}
                                onChange={(e) => setScheduleDate(e.target.value)}
                                className="w-full h-[48px] px-[21px] border border-[var(--border-01)] rounded-[12px] font-urbanist font-normal text-[16px] text-[var(--grey-800)] placeholder:text-[#666d80] focus:outline-none focus:ring-1 focus:ring-[var(--brand)] appearance-none"
                                style={{ colorScheme: 'light' }}
                            />
                        </div>
                        {/* Time */}
                        <div className="flex-1 flex flex-col gap-[8px]">
                            <label className="font-urbanist font-semibold text-[16px] text-[var(--grey-800)] tracking-[0.16px] leading-none">
                                Time
                            </label>
                            <TimePicker
                                value={scheduleTime}
                                onChange={setScheduleTime}
                                placeholder="00:00"
                            />
                        </div>
                    </div>
                )}

                {/* Note */}
                <p className="font-urbanist font-normal text-[12px] text-[#666d80] leading-normal">
                    {scheduleMode
                        ? "*When you Save the date & Time it'll Automatically send the mesage on the schedule time**"
                        : '*When you publish the event in goes live in the Mobile App**'}
                </p>

                {/* Footer Buttons */}
                <div className="flex items-center justify-end gap-[24px]">
                    <button
                        onClick={handleCancel}
                        className="h-[44px] px-[24px] flex items-center justify-center border border-[var(--border-01)] rounded-[12px] font-urbanist font-medium text-[16px] text-[var(--grey-800)] text-center hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    {scheduleMode ? (
                        /* Schedule mode: just Save */
                        <button
                            onClick={handleSave}
                            className="h-[44px] px-[24px] flex items-center justify-center bg-[var(--brand)] rounded-[12px] font-urbanist font-medium text-[16px] text-white text-center hover:bg-[#065d29] transition-colors"
                        >
                            Save
                        </button>
                    ) : (
                        /* Default mode: Schedule + Send Now */
                        <div className="flex items-center gap-[24px]">
                            <button
                                onClick={handleScheduleClick}
                                className="h-[44px] px-[24px] flex items-center justify-center border border-[var(--border-01)] rounded-[12px] font-urbanist font-medium text-[16px] text-[var(--grey-800)] text-center hover:bg-gray-50 transition-colors"
                            >
                                Schedule
                            </button>
                            <button
                                onClick={handleSend}
                                className="h-[44px] px-[24px] flex items-center justify-center bg-[var(--brand)] rounded-[12px] font-urbanist font-medium text-[16px] text-white text-center hover:bg-[#065d29] transition-colors"
                            >
                                Send Now
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </Modal>
    );
}
