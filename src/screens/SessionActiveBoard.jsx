import { useEffect } from 'react'
import Icons from '../icons'
import { useSessionTimer, fmt } from '../hooks/useSessionTimer'
import { useAppStore } from '../store/useAppStore'

export function SessionActiveBoard({ nav }) {
  const total = 360
  const t = useSessionTimer(total)
  const setCurrentSessionType = useAppStore((s) => s.setCurrentSessionType)

  useEffect(() => {
    setCurrentSessionType('board')
  }, [])

  useEffect(() => {
    if (t.remaining === 0) nav('session-done')
  }, [t.remaining])

  const cols = 11,
    rows = 17
  const cellSize = 16
  const boardW = cols * cellSize,
    boardH = rows * cellSize

  return (
    <div className='h-full flex flex-col bg-bg pt-[52px] px-5 pb-7 animate-fade-up-md'>
      {/* top */}
      <div className='flex justify-between items-center mb-[14px]'>
        <button
          onClick={() => nav('home')}
          className='border-none bg-transparent text-text-2 flex p-0'
        >
          <Icons.close size={22} />
        </button>
        <div className='chip bg-bg-2 text-text-2'>
          <span className='inline-block w-[6px] h-[6px] rounded-pill bg-error animate-pulse-gv' />
          LIVE · session 14
        </div>
        <button className='border-none bg-transparent text-text-2 flex p-0'>
          <Icons.more size={22} />
        </button>
      </div>

      {/* time strip */}
      <div className='flex items-baseline justify-between mb-4'>
        <div>
          <div className='num display text-[48px] leading-none font-extralight'>
            {fmt(t.remaining)}
          </div>
          <div className='text-text-3 mt-[2px] uppercase text-[11px] tracking-[0.1em]'>
            remaining · {Math.round(t.progress * 100)}% done
          </div>
        </div>
        <div className='text-right'>
          <div className='num text-error font-medium text-[22px]'>
            68 <span className='text-text-3 text-[11px] font-normal'>bpm</span>
          </div>
          <div className='text-text-3 mt-[2px] text-[11px] tracking-[0.08em]'>
            ↘ -4 vs start
          </div>
        </div>
      </div>

      {/* board */}
      <div
        className='flex-1 relative flex items-center justify-center bg-bg-2 rounded-lg mb-[14px]'
        style={{ padding: 18 }}
      >
        <svg
          width={boardW + 24}
          height={boardH + 24}
          viewBox={`-12 -12 ${boardW + 24} ${boardH + 24}`}
        >
          <rect
            x='-8'
            y='-8'
            width={boardW + 16}
            height={boardH + 16}
            rx='6'
            fill='var(--p-illus)'
            stroke='var(--p-illus-2)'
            strokeWidth='1'
          />
          {Array.from({ length: rows }).map((_, r) =>
            Array.from({ length: cols }).map((_, c) => {
              const cx = c * cellSize + cellSize / 2
              const cy = r * cellSize + cellSize / 2
              return (
                <g key={`${r}-${c}`}>
                  <circle
                    cx={cx}
                    cy={cy}
                    r='2.4'
                    fill='var(--p-illus-2)'
                    opacity='0.5'
                  />
                  <circle cx={cx} cy={cy} r='1.2' fill='var(--p-text)' />
                </g>
              )
            }),
          )}
          <g opacity='0.35'>
            <ellipse
              cx={boardW * 0.5}
              cy={boardH * 0.32}
              rx='32'
              ry='44'
              fill='url(#heat)'
            />
            <ellipse
              cx={boardW * 0.5}
              cy={boardH * 0.72}
              rx='36'
              ry='50'
              fill='url(#heat)'
            />
          </g>
          <defs>
            <radialGradient id='heat'>
              <stop offset='0%' stopColor='var(--p-error)' stopOpacity='0.8' />
              <stop offset='60%' stopColor='var(--p-warn)' stopOpacity='0.5' />
              <stop offset='100%' stopColor='var(--p-warn)' stopOpacity='0' />
            </radialGradient>
          </defs>
        </svg>
        <div className='absolute text-text-3 uppercase top-[14px] left-[14px] text-[10px] tracking-[0.1em]'>
          Pressure map · est.
        </div>
      </div>

      {/* metric row */}
      <div className='grid grid-cols-3 gap-[6px] mb-4'>
        {[
          { l: 'HRV', v: '48', u: 'ms', tr: '+3' },
          { l: 'Calm', v: '7.2', u: '/10', tr: '+0.4' },
          { l: 'Breath', v: '6.4', u: 'rpm', tr: '-1.2' },
        ].map((s) => (
          <div key={s.l} className='card' style={{ padding: 12 }}>
            <div className='text-text-3 uppercase text-[10px] tracking-[0.08em]'>
              {s.l}
            </div>
            <div className='flex items-baseline gap-1 mt-1'>
              <div className='num font-medium text-[18px]'>{s.v}</div>
              <div className='text-text-3 text-[10px]'>{s.u}</div>
            </div>
            <div className='text-success mt-[2px] text-[10px]'>{s.tr}</div>
          </div>
        ))}
      </div>

      {/* controls */}
      <div className='flex gap-[10px]'>
        <button
          onClick={t.toggle}
          className='flex-1 border-none rounded-md bg-primary text-on-primary flex items-center justify-center gap-2 font-medium p-4 text-[15px]'
        >
          {t.running ? (
            <>
              <Icons.pause size={18} /> Pause
            </>
          ) : (
            <>
              <Icons.play size={18} /> Resume
            </>
          )}
        </button>
        <button
          onClick={() => nav('session-done')}
          className='border-none rounded-md bg-bg-2 text-text flex items-center justify-center gap-[6px] font-medium py-0 px-[22px] text-[15px]'
        >
          End
        </button>
      </div>
    </div>
  )
}
