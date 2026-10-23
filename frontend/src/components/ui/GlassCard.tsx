import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  accentColor?: string;
  className?: string;
  hoverGlow?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  accentColor,
  className = '',
  hoverGlow = true
}) => {
  return (
    <div
      className={`bg-[#0d101a]/90 backdrop-blur-md border-2 border-[#22283A] relative overflow-hidden transition-all duration-200 ${
        hoverGlow ? 'hover:border-[#00FF66] hover:shadow-brutal-green' : ''
      } ${className}`}
    >
      {accentColor && (
        <div
          className="h-1 w-full"
          style={{ backgroundColor: accentColor }}
        />
      )}
      <div className="p-4 sm:p-5">
        {children}
      </div>
    </div>
  );
};
