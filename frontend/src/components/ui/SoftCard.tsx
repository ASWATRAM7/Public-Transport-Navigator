import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface SoftCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const SoftCard: React.FC<SoftCardProps> = ({
  children,
  className = '',
  hoverable = false,
  padding = 'md',
  ...props
}) => {
  const paddingStyles = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  const hoverStyles = hoverable
    ? 'transition-all duration-300 hover:shadow-[0_14px_45px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 cursor-pointer'
    : '';

  return (
    <motion.div
      className={`bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100/80 ${paddingStyles[padding]} ${hoverStyles} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};
