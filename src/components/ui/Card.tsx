import type { ReactNode, HTMLAttributes } from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';

export type CardElevation = 1 | 2 | 3 | 4;

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  elevation?: CardElevation;
  hoverable?: boolean;
  children: ReactNode;
}

const elevationClasses: Record<CardElevation, string> = {
  1: 'shadow-sm',
  2: 'shadow-md',
  3: 'shadow-lg',
  4: 'shadow-2xl',
};

export function Card({
  elevation = 1,
  hoverable = true,
  className,
  children,
  ...props
}: CardProps) {
  return (
    <motion.div
      className={clsx(
        'bg-white dark:bg-neutral-900 rounded-lg transition-shadow duration-200',
        elevationClasses[elevation],
        hoverable && 'hover:shadow-2xl',
        className
      )}
      whileHover={hoverable ? { scale: 1.02 } : undefined}
      {...(props as HTMLMotionProps<'div'>)}
    >
      {children}
    </motion.div>
  );
} 