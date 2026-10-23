import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface EditorialButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'outline' | 'terracotta' | 'subtle';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
}

export const EditorialButton: React.FC<EditorialButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  iconPosition = 'left',
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-sans font-medium tracking-wide transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-[#1A1A1A] disabled:opacity-40 disabled:cursor-not-allowed select-none rounded-none sm:rounded-sm';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5',
    md: 'text-xs sm:text-sm px-5 py-2.5 gap-2 uppercase tracking-wider',
    lg: 'text-sm sm:text-base px-7 py-3.5 gap-2.5 uppercase tracking-widest font-semibold'
  };

  const variantStyles = {
    primary: 'bg-[#1A1A1A] text-[#F9F8F6] hover:bg-[#2E4034] active:bg-black',
    outline: 'bg-transparent border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#F9F8F6]',
    terracotta: 'bg-[#C26A4A] text-white hover:bg-[#A8583B]',
    subtle: 'bg-[#F0EDE6] text-[#1A1A1A] hover:bg-[#E8E6E1]'
  };

  return (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ y: 0 }}
      transition={{ duration: 0.15 }}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {icon && iconPosition === 'left' && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="flex-shrink-0">{icon}</span>}
    </motion.button>
  );
};
