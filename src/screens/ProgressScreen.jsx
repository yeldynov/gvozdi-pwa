import { useState } from 'react'
import Icons from '../icons'
import { WeeklyChart } from './WeeklyChart'
import { useAppStore } from '../store/useAppStore'

const MOOD_LEVEL = { tense: 0, neutral: 1, settled: 2, open: 3 }
const MOOD_COLOR = {
  tense: 'var(--p-warn)',
  neutral: 'var(--p-text-2)',
  settled: 'var(--p-success)',
  open: 'var(--p-streak)',
}
const MOOD_LABEL = { tense: 'Tense', neutral: 'Neutral', settled: 'Settled', open: 'Open' }

const W = 320, H = 80, PT = 8
const xAt = (i) => (i / 6) * W
const yAt = (mood) => PT + ((3 - (MOOD_LEVEL[mood] ?? 1)) / 3) * H

export function ProgressScreen({ nav }) {
  const [period, setPeriod] = useState('week')
  const bars = [4, 6, 0, 5, 7, 8, 6]
  const max = 10

  const { moodLog } = useAppStore()

  const today = new Date()
  const todayStr = today.toISOString().slice(0, 10)

  const last7 = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today)
    d.setDate(d.getDate() - 6 + i)
    return d.toISOString().slice(0, 10)
  })

  const byDate = Object.fromEntries(moodLog.map(e => [e.date, e.mood]))

  const dayLabel = (iso) => {
    const d = new Date(iso + 'T12:00:00')
    return d.toLocaleDateString('en-US', { weekday: 'short' }).slice(0, 2)
  }

  const recordedPts = last7
    .map((d, i) => byDate[d] ? { x: xAt(i), y: yAt(byDate[d]), mood: byDate[d], date: d } : null)
    .filter(Boolean)

  const linePath = recordedPts.length > 1
    ? recordedPts.map((p, i) => `${i ? 'L' : 'M'}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ')
    : null

  const latestEntry = [...moodLog].sort((a, b) => b.date.localeCompare(a.date))[0] ?? null

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

        {/* mood chart */}
        <div className='card mb-[14px]' style={{ padding: 18 }}>
          <div className='flex justify-between items-baseline mb-[14px]'>
            <div>
              <div className='font-semibold text-[14px]'>How it lands</div>
              <div className='text-text-3 mt-[2px] text-[11px]'>
                Mood · last 7 days
              </div>
            </div>
            {latestEntry && (
              <span
                className='text-[12px] font-medium'
                style={{ color: MOOD_COLOR[latestEntry.mood] }}
              >
                {MOOD_LABEL[latestEntry.mood]}
              </span>
            )}
          </div>

          <svg
            viewBox={`0 0 ${W} ${H + PT + 24}`}
            width='100%'
            height='120'
            preserveAspectRatio='none'
            className='overflow-visible'
          >
            {/* guide lines */}
            {[0, 1, 2, 3].map((level) => {
              const y = PT + ((3 - level) / 3) * H
              return (
                <line
                  key={level}
                  x1={0} y1={y} x2={W} y2={y}
                  stroke='var(--p-divider)'
                  strokeWidth='1'
                  strokeDasharray='4 5'
                />
              )
            })}

            {/* connecting line */}
            {linePath && (
              <path
                d={linePath}
                fill='none'
                stroke='var(--p-text-3)'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            )}

            {/* dots */}
            {last7.map((d, i) => {
              const mood = byDate[d]
              const x = xAt(i)
              const isToday = d === todayStr

              if (!mood) {
                return (
                  <circle
                    key={d}
                    cx={x}
                    cy={PT + H / 2}
                    r={isToday ? 4 : 3}
                    fill='transparent'
                    stroke='var(--p-bg-3)'
                    strokeWidth='1.5'
                  />
                )
              }

              return (
                <circle
                  key={d}
                  cx={x}
                  cy={yAt(mood)}
                  r={isToday ? 5.5 : 4}
                  fill={MOOD_COLOR[mood]}
                  opacity={isToday ? 1 : 0.8}
                />
              )
            })}

            {/* day labels */}
            {last7.map((d, i) => (
              <text
                key={d}
                x={xAt(i)}
                y={H + PT + 20}
                textAnchor='middle'
                fontSize='10'
                fill='var(--p-text-3)'
                fontFamily='var(--f-text)'
              >
                {dayLabel(d)}
              </text>
            ))}
          </svg>

          {/* legend */}
          <div className='flex gap-4 mt-2 flex-wrap'>
            {Object.entries(MOOD_LABEL).map(([k, label]) => (
              <div key={k} className='flex items-center gap-[5px]'>
                <div
                  className='w-[7px] h-[7px] rounded-full'
                  style={{ background: MOOD_COLOR[k] }}
                />
                <span className='text-text-3 text-[10px]'>{label}</span>
              </div>
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
