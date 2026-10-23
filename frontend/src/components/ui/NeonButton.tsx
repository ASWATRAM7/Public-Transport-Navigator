import React from 'react';
import { Loader2 } from 'lucide-react';

interface NeonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'green' | 'cyan' | 'magenta' | 'amber' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export const NeonButton: React.FC<NeonButtonProps> = ({
  children,
  variant = 'green',
  size = 'md',
  isLoading = false,
  icon,
  className = '',
  disabled,
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-2.5 py-1 text-xs',
    md: 'px-4 py-2 text-xs sm:text-sm',
    lg: 'px-6 py-3 text-sm sm:text-base font-black'
  };

  const variantClasses = {
    green: 'bg-[#00FF66] border-[#00FF66] text-black shadow-brutal-green hover:bg-white',
    cyan: 'bg-[#00F0FF] border-[#00F0FF] text-black shadow-brutal-cyan hover:bg-white',
    magenta: 'bg-[#FF007A] border-[#FF007A] text-white shadow-brutal-magenta hover:bg-[#ff3388]',
    amber: 'bg-[#FFB800] border-[#FFB800] text-black shadow-brutal-amber hover:bg-white',
    ghost: 'bg-transparent border-cyber-border text-gray-300 hover:border-[#00FF66] hover:text-[#00FF66]'
  };

  return (
    <button
      disabled={disabled || isLoading}
      className={`font-mono font-bold uppercase tracking-wider border-2 transition-all flex items-center justify-center space-x-2 select-none active:translate-x-[2px] active:translate-y-[2px] ${sizeClasses[size]} ${variantClasses[variant]} ${
        disabled ? 'opacity-40 cursor-not-allowed shadow-none' : 'cursor-pointer'
      } ${className}`}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : icon ? (
        <span className="flex-shrink-0">{icon}</span>
      ) : null}
      <span>{children}</span>
    </button>
  );
};
