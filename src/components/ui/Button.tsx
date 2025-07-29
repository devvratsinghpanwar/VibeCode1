import type { ButtonHTMLAttributes } from 'react';
import { forwardRef } from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  loading?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-to-r from-indigo-500 to-fuchsia-600 text-white shadow-md hover:from-indigo-600 hover:to-fuchsia-700',
  secondary:
    'bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-300 dark:hover:bg-neutral-600',
  ghost:
    'bg-transparent text-primary hover:bg-neutral-100 dark:hover:bg-neutral-800',
  destructive:
    'bg-red-500 text-white hover:bg-red-600',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', loading, className, children, ...props }, ref) => (
    <motion.button
      ref={ref}
      className={clsx(
        'px-4 py-2 rounded font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/70 flex items-center justify-center gap-2',
        variantClasses[variant],
        className
      )}
      whileTap={{ scale: 0.97 }}
      disabled={loading || props.disabled}
      aria-busy={loading}
      {...(props as HTMLMotionProps<'button'>)}
    >
      {loading && (
        <span className="w-4 h-4 border-2 border-t-2 border-t-transparent border-white rounded-full animate-spin mr-2" />
      )}
      {children}
    </motion.button>
  )
);
Button.displayName = 'Button'; 