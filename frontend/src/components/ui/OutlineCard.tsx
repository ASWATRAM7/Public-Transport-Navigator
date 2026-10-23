import React from 'react';

interface OutlineCardProps {
  children: React.ReactNode;
  className?: string;
  bg?: 'white' | 'gray';
}

export const OutlineCard: React.FC<OutlineCardProps> = ({
  children,
  className = '',
  bg = 'white'
}) => {
  const bgClass = bg === 'gray' ? 'bg-[#F5F5F5]' : 'bg-white';
  return (
    <div className={`border border-black p-6 sm:p-8 rounded-none ${bgClass} ${className}`}>
      {children}
    </div>
  );
};
