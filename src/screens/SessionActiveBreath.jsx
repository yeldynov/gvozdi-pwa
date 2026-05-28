import { useEffect } from 'react'
import Icons from '../icons'
import { useSessionTimer, fmt } from '../hooks/useSessionTimer'
import { useAppStore } from '../store/useAppStore'

export function SessionActiveBreath({ nav }) {
  const setCurrentSessionType = useAppStore((s) => s.setCurrentSessionType)
  const sessionDuration = useAppStore((s) => s.sessionDuration)
  const total = sessionDuration * 60
  const t = useSessionTimer(total)
  const R = 124,
    C = 2 * Math.PI * R
  const offset = C * (1 - t.progress)

  useEffect(() => {
    setCurrentSessionType('breath')
  }, [])

  useEffect(() => {
    if (t.remaining === 0) nav('session-done')
  }, [t.remaining])

  return (
    <div
      className='h-full flex flex-col pt-[52px] px-6 pb-7 animate-fade-up-md'
      style={{
        background:
          'radial-gradient(ellipse at 50% 30%, var(--p-bg-2) 0%, var(--p-bg) 60%)',
      }}
    >
      <div className='flex items-center justify-between'>
        <button
          onClick={() => nav('home')}
          className='flex items-center p-0 bg-transparent border-none text-text-2'
        >
          <Icons.close size={22} />
        </button>
        <div className='text-text-3 uppercase text-[11px] tracking-[0.14em]'>
          Breath ring
        </div>
        <button className='flex items-center p-0 bg-transparent border-none text-text-2'>
          <Icons.more size={22} />
        </button>
      </div>

      <div className='flex flex-col items-center justify-center flex-1 gap-6'>
        <div className='text-text-2 text-[13px] tracking-[0.06em]'>
          {t.running ? 'Breathe in · 4' : 'Paused'}
        </div>
        {/* ring */}
        <div className='relative' style={{ width: 280, height: 280 }}>
          <svg width='280' height='280' viewBox='0 0 280 280'>
            <circle
              cx='140'
              cy='140'
              r={R}
              fill='none'
              stroke='var(--p-bg-3)'
              strokeWidth='2'
              style={{
                transformOrigin: '140px 140px',
                animation: t.running
                  ? 'gv-breathe-ring 8s ease-in-out infinite'
                  : 'none',
              }}
            />
            <circle
              cx='140'
              cy='140'
              r={R}
              fill='none'
              stroke='var(--p-primary)'
              strokeWidth='2'
              strokeDasharray={C}
              strokeDashoffset={offset}
              strokeLinecap='round'
              transform='rotate(-90 140 140)'
              style={{ transition: 'stroke-dashoffset 1s linear' }}
            />
            {Array.from({ length: 60 }).map((_, i) => {
              const a = (i / 60) * 2 * Math.PI - Math.PI / 2
              const r1 = R - 8,
                r2 = R - 4
              return (
                <line
                  key={i}
                  x1={140 + Math.cos(a) * r1}
                  y1={140 + Math.sin(a) * r1}
                  x2={140 + Math.cos(a) * r2}
                  y2={140 + Math.sin(a) * r2}
                  stroke='var(--p-text-3)'
                  strokeWidth='1'
                  opacity={i % 5 === 0 ? 0.6 : 0.25}
                />
              )
            })}
          </svg>
          {/* breath dot */}
          <div
            className={`absolute rounded-pill bg-primary top-1/2 left-1/2 w-[110px] h-[110px] -ml-[55px] -mt-[55px] opacity-40 ${t.running ? 'animate-breathe' : ''}`}
          />
          {/* time */}
          <div className='absolute text-center -translate-x-1/2 -translate-y-1/2 text-text top-1/2 left-1/2'>
            <div className='num display text-[56px] leading-none font-extralight'>
              {fmt(t.remaining)}
            </div>
            <div className='text-text-3 uppercase mt-[6px] text-[11px] tracking-[0.12em]'>
              of {fmt(total)}
            </div>
          </div>
        </div>
      </div>

      {/* controls */}
      <div className='flex items-center justify-center gap-5'>
        <button
          onClick={t.reset}
          className='border-none bg-bg-2 text-text-2 w-[52px] h-[52px] rounded-pill flex items-center justify-center'
        >
          <Icons.drop size={20} />
        </button>
        <button
          onClick={t.toggle}
          className='border-none bg-primary text-on-primary w-[72px] h-[72px] rounded-pill flex items-center justify-center'
        >
          {t.running ? <Icons.pause size={26} /> : <Icons.play size={26} />}
        </button>
        <button
          onClick={() => nav('session-done')}
          className='border-none bg-bg-2 text-text-2 w-[52px] h-[52px] rounded-pill flex items-center justify-center'
        >
          <Icons.check size={20} />
        </button>
      </div>
    </div>
  )
}
