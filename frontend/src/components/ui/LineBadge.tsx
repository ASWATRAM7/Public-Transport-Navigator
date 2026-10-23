import React from 'react';

interface LineBadgeProps {
  code: string;
  name?: string;
  color?: string;
  type?: string;
  size?: 'sm' | 'md';
  className?: string;
}

export const LineBadge: React.FC<LineBadgeProps> = ({
  code,
  color,
  type = 'METRO',
  size = 'md',
  className = ''
}) => {
  const normalizedType = (type || '').toUpperCase();

  let badgeColor = color || '#2E4034';
  if (normalizedType === 'BUS') {
    badgeColor = '#C26A4A';
  } else if (normalizedType === 'SUBURBAN' || normalizedType === 'TRAIN') {
    badgeColor = '#A87C39';
  } else if (normalizedType === 'AUTO' || normalizedType === 'SHARE_AUTO') {
    badgeColor = '#8C6D3B';
  }

  const sizeClasses = size === 'sm' ? 'text-[10px] px-2 py-0.5 gap-1.5' : 'text-xs font-semibold px-2.5 py-1 gap-1.5';

  return (
    <span
      className={`inline-flex items-center font-sans tracking-wider uppercase border rounded-none sm:rounded-xs ${sizeClasses} ${className}`}
      style={{
        backgroundColor: `${badgeColor}12`,
        borderColor: `${badgeColor}35`,
        color: badgeColor
      }}
    >
      <span
        className="w-1.5 h-1.5 inline-block rounded-full"
        style={{ backgroundColor: badgeColor }}
      />
      <span className="font-mono font-medium">{code}</span>
      {type && (
        <span className="opacity-75 text-[9px] uppercase font-sans font-normal border-l border-current pl-1 ml-0.5">
          {type}
        </span>
      )}
    </span>
  );
};
