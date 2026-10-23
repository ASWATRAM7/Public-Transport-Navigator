import React from 'react';

interface DataLabelProps {
  children: React.ReactNode;
  className?: string;
}

export const DataLabel: React.FC<DataLabelProps> = ({ children, className = '' }) => {
  return (
    <span className={`text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-[#555555] font-bold select-none ${className}`}>
      {children}
    </span>
  );
};
