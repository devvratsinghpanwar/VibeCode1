import { useEffect, useRef, useState } from 'react';

export function PerformanceMonitor() {
  const [fps, setFps] = useState(0);
  const [memory, setMemory] = useState<number | null>(null);
  const [renders, setRenders] = useState(0);
  const frame = useRef(0);
  const last = useRef(performance.now());
  const count = useRef(0);

  useEffect(() => {
    let running = true;
    function loop(now: number) {
      count.current++;
      if (now - last.current > 1000) {
        setFps(count.current);
        count.current = 0;
        last.current = now;
        setRenders((r) => r + 1);
        if ((window as any).performance && (performance as any).memory) {
          setMemory((performance as any).memory.usedJSHeapSize / 1048576);
        }
      }
      if (running) frame.current = requestAnimationFrame(loop);
    }
    frame.current = requestAnimationFrame(loop);
    return () => { running = false; cancelAnimationFrame(frame.current); };
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white dark:bg-neutral-900 rounded-xl shadow-lg p-4 flex flex-col gap-2 text-xs border border-neutral-200 dark:border-neutral-800 opacity-90">
      <div><span className="font-semibold">FPS:</span> {fps}</div>
      <div><span className="font-semibold">Memory:</span> {memory ? memory.toFixed(1) + ' MB' : 'N/A'}</div>
      <div><span className="font-semibold">Renders:</span> {renders}</div>
    </div>
  );
} 