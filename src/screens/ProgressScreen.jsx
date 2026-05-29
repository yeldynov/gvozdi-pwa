import { useState } from 'react'
import Icons from '../icons'
import { WeeklyChart } from './WeeklyChart'
import { useAppStore } from '../store/useAppStore'
import { ACHIEVEMENTS, calcStreak } from '../store/achievements'

const MOOD_LEVEL = { tense: 0, neutral: 1, settled: 2, open: 3 }
const MOOD_COLOR = {
  tense: 'var(--p-warn)',
  neutral: 'var(--p-text-2)',
  settled: 'var(--p-success)',
  open: 'var(--p-streak)',
}
const MOOD_LABEL = {
  tense: 'Tense',
  neutral: 'Neutral',
  settled: 'Settled',
  open: 'Open',
}

const POST_LEVEL = {
  intense: 0,
  tense: 0,
  mixed: 1,
  mild: 2,
  settled: 2,
  easy: 3,
  open: 3,
}

const ICON_MAP = {
  flame: Icons.flame,
  shield: Icons.shield,
  star: Icons.star,
  spark: Icons.spark,
  check: Icons.check,
}

const W = 320,
  H = 80,
  PT = 8
const yAt = (mood) => PT + ((3 - (MOOD_LEVEL[mood] ?? 1)) / 3) * H

export function ProgressScreen({ nav }) {
  const [period, setPeriod] = useState('week')

  const { moodLog, practiceLog, earnedAchievementIds, setSelectedMilestone } = useAppStore()
  const streak = calcStreak(practiceLog)
  const hasAnyPractice = practiceLog.length > 0

  const today = new Date()
  const nDays = period === 'month' ? 30 : period === 'year' ? 365 : 7
  const lastNDates = Array.from({ length: nDays }, (_, i) => {
    const d = new Date(today)
    d.setDate(d.getDate() - (nDays - 1) + i)
    return d.toLocaleDateString('en-CA')
  })
  const todayStr = lastNDates[lastNDates.length - 1]
  const xAt = (i) =>
    lastNDates.length > 1 ? (i / (lastNDates.length - 1)) * W : W / 2

  const filteredMood = moodLog.filter((e) => lastNDates.includes(e.date))
  const filteredPractice = practiceLog.filter((e) =>
    lastNDates.includes(e.date),
  )

  const bars = lastNDates.map((date) => {
    const dayEntries = filteredPractice.filter((e) => e.date === date)
    return Math.round(
      dayEntries.reduce((sum, e) => sum + e.durationSec, 0) / 60,
    )
  })
  const max = Math.max(10, ...bars)
  const hasChartData = bars.some((v) => v > 0)

  const totalMinutes = bars.reduce((s, v) => s + v, 0)
  const totalSessions = filteredPractice.length

  const byDate = Object.fromEntries(filteredMood.map((e) => [e.date, e.mood]))
  const hasMoodData = filteredMood.length > 0

  const postAllByDate = {}
  for (const entry of filteredPractice) {
    const val = entry.tension ?? entry.postMood
    if (val != null) {
      if (!postAllByDate[entry.date]) postAllByDate[entry.date] = []
      postAllByDate[entry.date].push(POST_LEVEL[val] ?? 1)
    }
  }
  const hasPostData = Object.keys(postAllByDate).length > 0
  const hasCorrData = hasMoodData || hasPostData

  const dayLabel = (iso) => {
    const d = new Date(iso + 'T12:00:00')
    return d.toLocaleDateString('en-US', { weekday: 'short' }).slice(0, 2)
  }

  const recordedPts = lastNDates
    .map((d, i) =>
      byDate[d]
        ? { x: xAt(i), y: yAt(byDate[d]), mood: byDate[d], date: d }
        : null,
    )
    .filter(Boolean)

  const postAvgPts = lastNDates
    .map((d, i) => {
      const levels = postAllByDate[d]
      if (!levels?.length) return null
      const avg = levels.reduce((s, v) => s + v, 0) / levels.length
      return { x: xAt(i), y: PT + ((3 - avg) / 3) * H, date: d }
    })
    .filter(Boolean)

  const linePath =
    recordedPts.length > 1
      ? recordedPts
          .map((p, i) => `${i ? 'L' : 'M'}${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
          .join(' ')
      : null

  const postLinePath =
    postAvgPts.length > 1
      ? postAvgPts
          .map((p, i) => `${i ? 'L' : 'M'}${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
          .join(' ')
      : null

  const latestEntry =
    [...filteredMood].sort((a, b) => b.date.localeCompare(a.date))[0] ?? null

  const earnedMilestones = ACHIEVEMENTS.filter((a) =>
    earnedAchievementIds.includes(a.id),
  ).reverse()

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
        <div className='flex p-1 mb-5 rounded-md bg-bg-2'>
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
          <div
            className='card flat'
            style={{ padding: 16, opacity: hasChartData ? 1 : 0.5 }}
          >
            <div className='text-text-3 uppercase mb-2 text-[11px] tracking-[0.1em]'>
              Total minutes
            </div>
            <div
              className='num display text-[36px] leading-none font-light'
              style={{
                color: hasChartData ? 'var(--p-text)' : 'var(--p-text-3)',
              }}
            >
              {totalMinutes}
            </div>
            <div className='text-text-3 mt-[6px] text-[11px]'>
              {hasChartData ? 'this week' : 'Practice to see data'}
            </div>
          </div>
          <div
            className='card flat'
            style={{ padding: 16, opacity: streak > 0 ? 1 : 0.5 }}
          >
            <div className='text-text-3 uppercase mb-2 text-[11px] tracking-[0.1em]'>
              Current streak
            </div>
            <div
              className='num display text-[36px] leading-none font-light'
              style={{
                color: streak > 0 ? 'var(--p-streak)' : 'var(--p-text-3)',
              }}
            >
              {streak}
            </div>
            <div className='text-text-3 mt-[6px] text-[11px]'>
              {streak > 0 ? 'days in a row' : 'Start today'}
            </div>
          </div>
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
          <div className='relative'>
            <div style={{ opacity: hasChartData ? 1 : 0.3 }}>
              <WeeklyChart data={bars} max={max} height={80} />
            </div>
            {!hasChartData && (
              <div className='absolute inset-0 flex items-center justify-center'>
                <div className='text-text-3 text-[12px] text-center leading-[1.6]'>
                  Complete a session
                  <br />
                  to see your activity
                </div>
              </div>
            )}
          </div>
        </div>

        {/* mood + tension correlation chart */}
        <div className='card mb-[14px]' style={{ padding: 18 }}>
          <div className='flex justify-between items-baseline mb-[14px]'>
            <div>
              <div className='font-semibold text-[14px]'>Mood & tension</div>
              <div className='text-text-3 mt-[2px] text-[11px]'>
                Pre-session mood vs. post-session tension
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

          <div className='relative'>
            <svg
              viewBox={`0 0 ${W} ${H + PT + 24}`}
              width='100%'
              height='120'
              preserveAspectRatio='none'
              className='overflow-visible'
              style={{ opacity: hasCorrData ? 1 : 0.3 }}
            >
              {/* guide lines */}
              {[0, 1, 2, 3].map((level) => {
                const y = PT + ((3 - level) / 3) * H
                return (
                  <line
                    key={level}
                    x1={0}
                    y1={y}
                    x2={W}
                    y2={y}
                    stroke='var(--p-divider)'
                    strokeWidth='1'
                    strokeDasharray='4 5'
                  />
                )
              })}

              {/* pre-session mood connecting line */}
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

              {/* post-session tension connecting line */}
              {postLinePath && (
                <path
                  d={postLinePath}
                  fill='none'
                  stroke='var(--p-primary)'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeDasharray='3 3'
                />
              )}

              {/* pre-session mood dots */}
              {lastNDates.map((d, i) => {
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

              {/* post-session tension: single average dot per day */}
              {postAvgPts.map((pt) => (
                <rect
                  key={pt.date}
                  x={pt.x - 4}
                  y={pt.y - 4}
                  width='8'
                  height='8'
                  transform={`rotate(45, ${pt.x}, ${pt.y})`}
                  fill='var(--p-primary)'
                  opacity='0.85'
                />
              ))}

              {/* day labels */}
              {lastNDates.map((d, i) => (
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
            {!hasCorrData && (
              <div
                className='absolute flex items-center justify-center'
                style={{ inset: '0 0 24px 0' }}
              >
                <div className='text-text-3 text-[12px] text-center leading-[1.6]'>
                  Select your mood on the home screen
                  <br />
                  and complete a session to see trends
                </div>
              </div>
            )}
          </div>

          {/* legend */}
          <div
            className='flex gap-4 mt-3'
            style={{ opacity: hasCorrData ? 1 : 0.4 }}
          >
            <div className='flex items-center gap-[5px]'>
              <div className='w-[7px] h-[7px] rounded-full bg-text-3' />
              <span className='text-text-3 text-[10px]'>Pre-session mood</span>
            </div>
            <div className='flex items-center gap-[5px]'>
              <div
                className='w-[7px] h-[7px] rotate-45'
                style={{ background: 'var(--p-primary)' }}
              />
              <span className='text-text-3 text-[10px]'>
                Post-session tension
              </span>
            </div>
          </div>
        </div>

        {/* milestones */}
        <div className='text-text-2 uppercase text-[12px] tracking-[0.1em] mt-2 mx-1 mb-[10px]'>
          Milestones
        </div>

        {earnedMilestones.length === 0 ? (
          <div
            className='card flex items-center gap-[14px]'
            style={{ padding: 14, opacity: 0.5 }}
          >
            <div
              className='flex items-center justify-center w-10 h-10 rounded-pill shrink-0'
              style={{
                border: '1.5px solid var(--p-divider)',
                color: 'var(--p-text-3)',
              }}
            >
              <Icons.star size={18} />
            </div>
            <div className='flex-1'>
              <div className='font-medium text-[14px]'>No milestones yet</div>
              <div className='text-text-3 mt-[2px] text-[11px]'>
                Complete your first practice to begin
              </div>
            </div>
          </div>
        ) : (
          <div className='flex flex-col gap-2'>
            {earnedMilestones.map((a) => {
              const I = ICON_MAP[a.icon] || Icons.star
              return (
                <button
                  key={a.id}
                  className='card flex items-center gap-[14px] active:opacity-70 w-full text-left border-none bg-transparent p-0'
                  style={{ padding: 14 }}
                  aria-label={a.label}
                  onClick={() => { setSelectedMilestone(a.id); nav('milestone-detail') }}
                >
                  <div
                    className='flex items-center justify-center w-10 h-10 rounded-pill shrink-0'
                    style={{ border: '1.5px solid ' + a.ring, color: a.ring }}
                  >
                    <I size={18} />
                  </div>
                  <div className='flex-1'>
                    <div className='font-medium text-[14px]'>{a.label}</div>
                    <div className='text-text-3 mt-[2px] text-[11px]'>
                      {a.desc}
                    </div>
                  </div>
                  <Icons.chevron_right
                    size={16}
                    style={{ color: 'var(--p-text-3)' }}
                  />
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
