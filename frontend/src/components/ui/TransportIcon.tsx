import React from 'react';

export type TransportModeType = 'WALK' | 'METRO' | 'BUS' | 'TRAIN' | 'SUBURBAN' | 'AUTO' | 'TRANSFER';

interface TransportIconProps {
  mode: TransportModeType | string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  withBadge?: boolean;
}

export const TransportIcon: React.FC<TransportIconProps> = ({
  mode,
  size = 'md',
  className = '',
  withBadge = false
}) => {
  const normalized = (mode || '').toUpperCase();

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  const badgeSizes = {
    sm: 'w-7 h-7',
    md: 'w-8 h-8',
    lg: 'w-10 h-10'
  };

  let iconSvg: React.ReactNode = null;
  let badgeColor = 'bg-[#F0EDE6] text-[#1A1A1A] border-[#E8E6E1]';

  if (normalized === 'METRO' || normalized === 'SUBWAY') {
    badgeColor = 'bg-[#2E4034]/10 text-[#2E4034] border-[#2E4034]/20';
    iconSvg = (
      <svg className={iconSizes[size]} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect width="16" height="16" x="4" y="3" rx="1" />
        <path d="M4 11h16" />
        <path d="M12 3v8" />
        <path d="m8 19-2 3" />
        <path d="m18 22-2-3" />
        <circle cx="8" cy="15" r="1" />
        <circle cx="16" cy="15" r="1" />
      </svg>
    );
  } else if (normalized === 'BUS') {
    badgeColor = 'bg-[#C26A4A]/10 text-[#C26A4A] border-[#C26A4A]/20';
    iconSvg = (
      <svg className={iconSizes[size]} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 6v6" />
        <path d="M16 6v6" />
        <path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Z" />
        <path d="M4 14h16" />
        <path d="M6 19v2" />
        <path d="M18 19v2" />
      </svg>
    );
  } else if (normalized === 'TRAIN' || normalized === 'SUBURBAN') {
    badgeColor = 'bg-[#A87C39]/10 text-[#A87C39] border-[#A87C39]/20';
    iconSvg = (
      <svg className={iconSizes[size]} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect width="16" height="16" x="4" y="3" rx="1" />
        <path d="M4 11h16" />
        <path d="M9 15h6" />
        <path d="M8 19v2" />
        <path d="M16 19v2" />
        <circle cx="9" cy="7" r="1" />
        <circle cx="15" cy="7" r="1" />
      </svg>
    );
  } else if (normalized === 'AUTO' || normalized === 'SHARE_AUTO') {
    badgeColor = 'bg-[#8C6D3B]/10 text-[#8C6D3B] border-[#8C6D3B]/20';
    iconSvg = (
      <svg className={iconSizes[size]} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
        <circle cx="7" cy="17" r="2" />
        <path d="M9 17h6" />
        <circle cx="17" cy="17" r="2" />
      </svg>
    );
  } else if (normalized === 'TRANSFER') {
    badgeColor = 'bg-[#1A1A1A]/10 text-[#1A1A1A] border-[#1A1A1A]/20';
    iconSvg = (
      <svg className={iconSizes[size]} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
        <path d="M16 3h5v5" />
      </svg>
    );
  } else {
    // WALK
    badgeColor = 'bg-[#F0EDE6] text-[#5A5A5A] border-[#E8E6E1]';
    iconSvg = (
      <svg className={iconSizes[size]} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="m13 4 2 2" />
        <circle cx="13" cy="4" r="1" />
        <path d="m6 16 3-2 3 3 4-8" />
        <path d="M9 14v6" />
        <path d="m12 17 3 4" />
      </svg>
    );
  }

  if (withBadge) {
    return (
      <div className={`inline-flex items-center justify-center rounded-none sm:rounded-xs border ${badgeSizes[size]} ${badgeColor} ${className}`}>
        {iconSvg}
      </div>
    );
  }

  return <span className={`inline-flex items-center justify-center ${className}`}>{iconSvg}</span>;
};
