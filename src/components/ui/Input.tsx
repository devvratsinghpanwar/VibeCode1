import type { InputHTMLAttributes, SelectHTMLAttributes } from 'react';
import { forwardRef } from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, className, ...props }, ref) => (
    <label className="block w-full">
      {label && <span className="block mb-1 text-sm font-medium">{label}</span>}
      <motion.input
        ref={ref}
        className={clsx(
          'w-full px-3 py-2 rounded border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary/60 transition-colors',
          className
        )}
        whileFocus={{ scale: 1.01 }}
        {...(props as HTMLMotionProps<'input'>)}
      />
    </label>
  )
);
TextInput.displayName = 'TextInput';

export interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ label, className, ...props }, ref) => (
    <label className="block w-full">
      {label && <span className="block mb-1 text-sm font-medium">{label}</span>}
      <motion.input
        ref={ref}
        type="search"
        className={clsx(
          'w-full px-3 py-2 rounded border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary/60 transition-colors',
          className
        )}
        whileFocus={{ scale: 1.01 }}
        {...(props as HTMLMotionProps<'input'>)}
      />
    </label>
  )
);
SearchInput.displayName = 'SearchInput';

export interface SelectInputProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { label: string; value: string }[];
}

export const SelectInput = forwardRef<HTMLSelectElement, SelectInputProps>(
  ({ label, options, className, ...props }, ref) => (
    <label className="block w-full">
      {label && <span className="block mb-1 text-sm font-medium">{label}</span>}
      <motion.select
        ref={ref}
        className={clsx(
          'w-full px-3 py-2 rounded border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary/60 transition-colors',
          className
        )}
        whileFocus={{ scale: 1.01 }}
        {...(props as HTMLMotionProps<'select'>)}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </motion.select>
    </label>
  )
);
SelectInput.displayName = 'SelectInput';

export interface DateInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const DateInput = forwardRef<HTMLInputElement, DateInputProps>(
  ({ label, className, ...props }, ref) => (
    <label className="block w-full">
      {label && <span className="block mb-1 text-sm font-medium">{label}</span>}
      <motion.input
        ref={ref}
        type="date"
        className={clsx(
          'w-full px-3 py-2 rounded border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary/60 transition-colors',
          className
        )}
        whileFocus={{ scale: 1.01 }}
        {...(props as HTMLMotionProps<'input'>)}
      />
    </label>
  )
);
DateInput.displayName = 'DateInput'; 