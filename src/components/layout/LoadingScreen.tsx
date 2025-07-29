export function LoadingScreen() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 animate-pulse">
      <div className="w-24 h-24 rounded-full bg-gradient-to-r from-indigo-400 to-fuchsia-500 mb-6 animate-spin" />
      <div className="w-48 h-6 bg-neutral-200 dark:bg-neutral-800 rounded mb-4" />
      <div className="w-64 h-4 bg-neutral-100 dark:bg-neutral-700 rounded mb-2" />
      <div className="w-64 h-4 bg-neutral-100 dark:bg-neutral-700 rounded mb-2" />
      <div className="w-40 h-4 bg-neutral-100 dark:bg-neutral-700 rounded" />
    </div>
  );
} 