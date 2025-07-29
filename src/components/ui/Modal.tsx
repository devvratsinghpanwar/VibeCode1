import * as Dialog from '@radix-ui/react-dialog';
import { motion, AnimatePresence } from 'framer-motion';
import type { ReactNode } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

export interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  children: ReactNode;
  description?: string;
}

export function Modal({ open, onOpenChange, title, children, description }: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            </Dialog.Overlay>
            <Dialog.Content asChild>
              <motion.div
                className="fixed z-50 left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-neutral-900 rounded-xl shadow-2xl p-6 focus:outline-none"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                role="dialog"
                aria-modal="true"
              >
                <div className="flex justify-between items-center mb-4">
                  {title && <Dialog.Title className="text-lg font-semibold">{title}</Dialog.Title>}
                  <Dialog.Close asChild>
                    <button className="p-1 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none" aria-label="Close">
                      <XMarkIcon className="w-5 h-5" />
                    </button>
                  </Dialog.Close>
                </div>
                {description && <Dialog.Description className="mb-2 text-sm text-neutral-500 dark:text-neutral-400">{description}</Dialog.Description>}
                {children}
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
} 