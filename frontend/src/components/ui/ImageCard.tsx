import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ImageCardProps extends HTMLMotionProps<'div'> {
  imageUrl?: string;
  category?: string;
  title: string;
  subtitle?: string;
  badge?: React.ReactNode;
  children?: React.ReactNode;
  aspectRatio?: 'video' | 'square' | 'portrait';
  className?: string;
  onClick?: () => void;
}

export const ImageCard: React.FC<ImageCardProps> = ({
  imageUrl,
  category,
  title,
  subtitle,
  badge,
  children,
  aspectRatio = 'video',
  className = '',
  onClick,
  ...props
}) => {
  const aspectStyles = {
    video: 'h-52 sm:h-64',
    square: 'h-64 sm:h-72',
    portrait: 'h-80 sm:h-96'
  };

  const defaultImage = 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80';

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.25 }}
      onClick={onClick}
      className={`bg-white border border-[#E8E6E1] rounded-none sm:rounded-sm overflow-hidden flex flex-col justify-between group transition-shadow duration-300 hover:shadow-md ${onClick ? 'cursor-pointer' : ''} ${className}`}
      {...props}
    >
      {/* Visual Image Header with Scrim */}
      <div className={`relative w-full ${aspectStyles[aspectRatio]} overflow-hidden bg-[#1A1A1A]`}>
        <img
          src={imageUrl || defaultImage}
          alt={title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        {/* Subtle Dark Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/85 via-[#1A1A1A]/35 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
          {category && (
            <span className="bg-[#1A1A1A]/80 backdrop-blur-xs text-[#F9F8F6] text-[10px] font-sans font-semibold uppercase tracking-widest px-2.5 py-1 rounded-none sm:rounded-xs border border-white/10">
              {category}
            </span>
          )}
          {badge && <div>{badge}</div>}
        </div>

        {/* Bottom Title on Image */}
        <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
          <h3 className="font-serif text-xl sm:text-2xl font-normal tracking-normal text-white drop-shadow-xs">
            {title}
          </h3>
          {subtitle && (
            <p className="font-sans text-xs text-stone-200/90 tracking-wide line-clamp-1">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Card Body */}
      {children && (
        <div className="p-5 sm:p-6 space-y-4 bg-white flex-1 flex flex-col justify-between">
          {children}
        </div>
      )}
    </motion.div>
  );
};
