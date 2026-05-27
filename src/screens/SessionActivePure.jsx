import { useEffect } from 'react';
import Icons from '../icons';
import { useSessionTimer, fmt } from '../hooks/useSessionTimer';

export function SessionActivePure({ nav }) {
  const total = 360;
  const t = useSessionTimer(total);
  useEffect(() => { if (t.remaining === 0) nav('session-done'); }, [t.remaining]);

  return (
    <div
      onClick={t.toggle}
      className="h-full relative bg-bg flex flex-col cursor-pointer animate-fade-up-md"
    >
      {/* corner controls */}
      <div className="absolute flex justify-between items-center top-[52px] left-6 right-6">
        <button
          onClick={(e) => { e.stopPropagation(); nav('home'); }}
          className="border-none bg-transparent text-text-3 flex p-0"
        >
          <Icons.close size={22} />
        </button>
        <div className="text-text-3 uppercase text-[11px] tracking-[0.14em]">Quiet mode</div>
        <button
          onClick={(e) => { e.stopPropagation(); nav('session-done'); }}
          className="border-none bg-transparent text-text-3 p-0 text-[13px]"
        >
          End
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-8">
        {/* time — huge */}
        <div className="text-center">
          <div className="num display text-text text-[132px] leading-[0.95] font-extralight tracking-[-0.04em]">
            {fmt(t.remaining)}
          </div>
        </div>

        {/* thin progress line */}
        <div className="w-[240px] h-[1px] bg-divider relative">
          <div
            className="absolute top-[-1px] left-0 h-[3px] bg-text transition-[width] duration-1000 linear"
            style={{ width: `${t.progress * 100}%` }}
          />
        </div>

        <div className="text-text-3 text-center text-[13px] max-w-[220px] leading-[1.5]">
          {t.running ? 'Tap anywhere to pause.' : 'Paused. Tap to resume.'}
        </div>
      </div>

      <div className="px-6 pb-7 flex justify-center gap-2 text-text-3 uppercase text-[11px] tracking-[0.08em]">
        <span>Notifications muted</span><span>·</span><span>Screen will dim</span>
      </div>
    </div>
  );
}
