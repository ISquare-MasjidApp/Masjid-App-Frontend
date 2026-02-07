'use client';

import { ArrowUpRightIcon } from '@/components/ui/Icons';
import type { Campaign } from '@/types';

interface CampaignCardProps {
  campaign: Campaign;
}

export default function CampaignCard({ campaign }: CampaignCardProps) {
  const progress = Math.min((campaign.raised / campaign.goal) * 100, 100);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-white border border-[var(--border-01)] rounded-[12px] p-5 hover:shadow-[0_4px_21px_rgba(0,0,0,0.1)] transition-shadow">
      {/* Header */}
      <div className="mb-4">
        <h3 className="font-urbanist font-semibold text-[16px] text-[var(--grey-800)] mb-1">
          {campaign.title}
        </h3>
        <span className="font-urbanist text-[14px] text-[var(--neutral-500)]">
          {campaign.category}
        </span>
      </div>

      {/* Progress Section */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="font-urbanist text-[14px] text-[var(--neutral-500)]">Progress</span>
          <span className="font-urbanist font-semibold text-[14px] text-[var(--grey-800)]">
            {Math.round(progress)}%
          </span>
        </div>
        {/* Progress Bar */}
        <div className="w-full h-[6px] bg-[var(--neutral-100)] rounded-full overflow-hidden">
          <div
            className="h-full bg-[var(--auxiliary-600)] rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <p className="font-urbanist text-[12px] text-[var(--neutral-500)] mb-1">Goal</p>
          <p className="font-urbanist font-semibold text-[14px] text-[var(--grey-800)]">
            {formatCurrency(campaign.goal)}
          </p>
        </div>
        <div>
          <p className="font-urbanist text-[12px] text-[var(--neutral-500)] mb-1">Raised</p>
          <p className="font-urbanist font-semibold text-[14px] text-[var(--grey-800)]">
            {formatCurrency(campaign.raised)}
          </p>
        </div>
        <div>
          <p className="font-urbanist text-[12px] text-[var(--neutral-500)] mb-1">End Date</p>
          <p className="font-urbanist font-semibold text-[14px] text-[var(--grey-800)]">
            {campaign.endDate}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center">
        <span
          className={`
          px-3 py-1 rounded-full font-urbanist text-[12px] font-medium
          ${
            campaign.status === 'active'
              ? 'bg-[var(--brand-10)] text-[var(--brand)] border border-[var(--brand)]'
              : campaign.status === 'completed'
                ? 'bg-[var(--success-500)] text-white'
                : 'bg-[var(--neutral-100)] text-[var(--neutral-600)]'
          }
        `}
        >
          {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
        </span>
        <button className="p-2 hover:bg-[var(--neutral-100)] rounded-full transition-colors">
          <ArrowUpRightIcon size={16} className="text-[var(--grey-800)]" />
        </button>
      </div>
    </div>
  );
}
