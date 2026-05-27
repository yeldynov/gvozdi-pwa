import { useState } from 'react'
import Icons from '../icons'
import { WeeklyChart } from './WeeklyChart'

export function ProgressScreen({ nav }) {
  const [period, setPeriod] = useState('week')
  const bars = [4, 6, 0, 5, 7, 8, 6]
  const max = 10
  const mood = [62, 68, 65, 75, 78, 86, 84]
  const moodMin = 50,
    moodMax = 95
  const W = 320,
    H = 80
  const pts = mood.map((v, i) => {
    const x = (i / (mood.length - 1)) * W
    const y = H - ((v - moodMin) / (moodMax - moodMin)) * H
    return [x, y]
  })
  const path = pts
    .map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1))
    .join(' ')
  const area = path + ` L ${W} ${H} L 0 ${H} Z`

  return (
    <div className='h-full overflow-auto bg-bg'>
      <div className='px-6 pt-[52px] pb-[100px]'>
        {/* header */}
        <div className='flex justify-between items-center mb-[18px]'>
          <div className='display text-[28px] leading-[1.1]'>Progress</div>
          <div className='flex gap-3 text-text-2'>
            <Icons.settings />
          </div>
        </div>

        {/* period toggle */}
        <div className='flex bg-bg-2 rounded-md p-1 mb-5'>
          {['week', 'month', 'year'].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`flex-1 border-none rounded-sm capitalize font-medium transition-all duration-150 p-2.5 text-[13px] ${period === p ? 'bg-surface text-text shadow-sm' : 'bg-transparent text-text-2'}`}
            >
              {p}
            </button>
          ))}
        </div>

        {/* summary tiles */}
        <div className='grid grid-cols-2 gap-2 mb-5'>
          {[
            {
              l: 'Total minutes',
              v: '36',
              sub: '↑ 12% vs last week',
              col: 'var(--p-text)',
            },
            {
              l: 'Current streak',
              v: '12',
              sub: 'days · top 5% this month',
              col: 'var(--p-streak)',
            },
          ].map((s) => (
            <div key={s.l} className='card flat' style={{ padding: 16 }}>
              <div className='text-text-3 uppercase mb-2 text-[11px] tracking-[0.1em]'>
                {s.l}
              </div>
              <div
                className='num display text-[36px] leading-none font-light'
                style={{ color: s.col }}
              >
                {s.v}
              </div>
              <div className='text-text-3 mt-[6px] text-[11px]'>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* minutes chart */}
        <div className='card mb-[14px]' style={{ padding: 18 }}>
          <div className='flex justify-between items-baseline mb-[14px]'>
            <div>
              <div className='font-semibold text-[14px]'>
                Minutes on the board
              </div>
              <div className='text-text-3 mt-[2px] text-[11px]'>
                Daily practice this week
              </div>
            </div>
            <div className='text-text-3'>
              <Icons.more size={16} />
            </div>
          </div>
          <WeeklyChart data={bars} max={max} height={80} />
        </div>

        {/* mood stability */}
        <div className='card mb-[14px]' style={{ padding: 18 }}>
          <div className='flex justify-between items-baseline mb-[14px]'>
            <div>
              <div className='font-semibold text-[14px]'>How it lands</div>
              <div className='text-text-3 mt-[2px] text-[11px]'>
                Settled-rate · 7 days
              </div>
            </div>
            <span
              className='chip bg-success text-bg'
              style={{ padding: '4px 8px', fontSize: 11 }}
            >
              +18%
            </span>
          </div>
          <svg
            viewBox={`0 0 ${W} ${H + 24}`}
            width='100%'
            height='120'
            preserveAspectRatio='none'
            className='overflow-visible'
          >
            <defs>
              <linearGradient id='gv-mood-fill' x1='0' y1='0' x2='0' y2='1'>
                <stop
                  offset='0%'
                  stopColor='var(--p-success)'
                  stopOpacity='0.32'
                />
                <stop
                  offset='100%'
                  stopColor='var(--p-success)'
                  stopOpacity='0'
                />
              </linearGradient>
            </defs>
            <path d={area} fill='url(#gv-mood-fill)' />
            <path
              d={path}
              fill='none'
              stroke='var(--p-success)'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            {pts.map((p, i) => (
              <circle
                key={i}
                cx={p[0]}
                cy={p[1]}
                r={i === pts.length - 1 ? 4 : 2.5}
                fill={
                  i === pts.length - 1 ? 'var(--p-success)' : 'var(--p-surface)'
                }
                stroke='var(--p-success)'
                strokeWidth='1.5'
              />
            ))}
          </svg>
          <div className='flex justify-between mt-[6px] text-text-3 text-[10px]'>
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>
        </div>

        {/* milestones */}
        <div className='text-text-2 uppercase text-[12px] tracking-[0.1em] mt-2 mx-1 mb-[10px]'>
          Recent milestones
        </div>
        <div className='flex flex-col gap-2'>
          {[
            {
              I: Icons.flame,
              t: 'Twelve days in a row',
              s: 'Yesterday',
              ring: 'var(--p-streak)',
            },
            {
              I: Icons.spark,
              t: '10 hours total practice',
              s: 'Mon · Oct 16',
              ring: 'var(--p-accent)',
            },
            {
              I: Icons.shield,
              t: 'First 12-minute session',
              s: 'Sun · Oct 15',
              ring: 'var(--p-success)',
            },
          ].map((m, i) => {
            const I = m.I
            return (
              <div
                key={i}
                className='card flex items-center gap-[14px]'
                style={{ padding: 14 }}
              >
                <div
                  className='w-10 h-10 rounded-pill flex items-center justify-center shrink-0'
                  style={{ border: '1.5px solid ' + m.ring, color: m.ring }}
                >
                  <I size={18} />
                </div>
                <div className='flex-1'>
                  <div className='font-medium text-[14px]'>{m.t}</div>
                  <div className='text-text-3 mt-[2px] text-[11px]'>{m.s}</div>
                </div>
                <Icons.chevron_right
                  size={16}
                  style={{ color: 'var(--p-text-3)' }}
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
