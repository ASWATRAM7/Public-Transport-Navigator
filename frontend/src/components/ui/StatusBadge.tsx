import React from 'react';

interface StatusBadgeProps {
  status: 'ON_TIME' | 'DELAYED' | 'MAINTENANCE' | 'TRANSFER' | string;
  label?: string;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  label,
  className = ''
}) => {
  const normalized = status.toUpperCase();

  const configs: Record<string, { bg: string; text: string; border: string; dot: string; defaultLabel: string }> = {
    ON_TIME: {
      bg: 'bg-[#00FF66]/10',
      text: 'text-[#00FF66]',
      border: 'border-[#00FF66]/40',
      dot: 'bg-[#00FF66]',
      defaultLabel: 'ON TIME'
    },
    DELAYED: {
      bg: 'bg-[#FFB800]/10',
      text: 'text-[#FFB800]',
      border: 'border-[#FFB800]/40',
      dot: 'bg-[#FFB800]',
      defaultLabel: 'DELAYED'
    },
    MAINTENANCE: {
      bg: 'bg-[#FF007A]/10',
      text: 'text-[#FF007A]',
      border: 'border-[#FF007A]/40',
      dot: 'bg-[#FF007A]',
      defaultLabel: 'MAINTENANCE'
    },
    TRANSFER: {
      bg: 'bg-[#00F0FF]/10',
      text: 'text-[#00F0FF]',
      border: 'border-[#00F0FF]/40',
      dot: 'bg-[#00F0FF]',
      defaultLabel: 'TRANSFER HUB'
    }
  };

  const config = configs[normalized] || {
    bg: 'bg-gray-800/20',
    text: 'text-gray-300',
    border: 'border-gray-700',
    dot: 'bg-gray-400',
    defaultLabel: status
  };

  return (
    <span
      className={`inline-flex items-center space-x-1.5 px-2 py-0.5 border font-mono text-[10px] font-bold tracking-wider uppercase select-none ${config.bg} ${config.text} ${config.border} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot} animate-pulse`} />
      <span>{label || config.defaultLabel}</span>
    </span>
  );
};
