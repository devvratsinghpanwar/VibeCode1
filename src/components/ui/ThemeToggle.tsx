import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains('dark')
  );

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark((d) => !d)}
      className="p-2 rounded bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 transition-colors"
      aria-label="Toggle theme"
    >
      {isDark ? '🌙' : '☀️'}
    </button>
  );
} 