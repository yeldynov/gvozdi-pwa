import { useUser } from '@clerk/react'
import Icons from '../icons'
import { useAppStore } from '../store/useAppStore'
import { calcStreak } from '../store/achievements'

const MOOD_OPTS = [
  { k: 'tense', label: 'Tense', I: Icons.spark },
  { k: 'neutral', label: 'Neutral', I: Icons.moon },
  { k: 'settled', label: 'Settled', I: Icons.leaf },
  { k: 'open', label: 'Open', I: Icons.heart },
]

const MOOD_QUOTES = {
  tense: "Tension means you care. Now let's work with it.",
  neutral: 'Balanced and present — a solid place to begin.',
  settled: "That calm you carry? It's your superpower today.",
  open: 'Open means ready. Today could surprise you.',
}

function getGreeting() {
  const h = new Date().getHours()
  if (h >= 5 && h < 12) return 'Good morning'
  if (h >= 12 && h < 17) return 'Good afternoon'
  if (h >= 17 && h < 21) return 'Good evening'
  return 'Good night'
}

function getFormattedDate() {
  const now = new Date()
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  return `${days[now.getDay()]} · ${months[now.getMonth()]} ${now.getDate()}`
}

function fmtDuration(sec) {
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

function fmtRelDate(id) {
  const d = new Date(parseInt(id))
  const today = new Date()
  const yest = new Date(today)
  yest.setDate(today.getDate() - 1)
  if (d.toDateString() === today.toDateString()) return 'Today'
  if (d.toDateString() === yest.toDateString()) return 'Yesterday'
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  return `${days[d.getDay()]} ${months[d.getMonth()]} ${d.getDate()}`
}

function fmtTime(id) {
  const d = new Date(parseInt(id))
  return `${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`
}

const SESSION_TYPE_LABELS = {
  nails: 'Nail board',
  board: 'Nail board',
  breath: 'Breath ring',
  pure: 'Pure focus',
}

export function HomeScreen({ nav }) {
  const { user } = useUser()
  const firstName = user?.firstName || user?.fullName?.split(' ')[0] || 'there'

  const {
    selectedMood,
    setMood,
    clearAll,
    _hasHydrated,
    practiceLog,
    setSelectedSession,
  } = useAppStore()
  const selectedMoodData = selectedMood
    ? MOOD_OPTS.find((o) => o.k === selectedMood)
    : null
  const MoodIcon = selectedMoodData?.I || null

  const streak = calcStreak(practiceLog)
  const hasAnyPractice = practiceLog.length > 0

  const today = new Date()
  const last7Dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today)
    d.setDate(d.getDate() - 6 + i)
    return d.toLocaleDateString('en-CA')
  })
  const practiceDates = new Set(practiceLog.map((e) => e.date))

  const lastSession = practiceLog.length
    ? [...practiceLog].sort(
        (a, b) => (Number(b.id) || 0) - (Number(a.id) || 0),
      )[0]
    : null

  const recentSessions = [...practiceLog]
    .sort((a, b) => (Number(b.id) || 0) - (Number(a.id) || 0))
    .slice(0, 5)

  const handleClearData = async () => {
    if (!window.confirm('Clear all stored data? This cannot be undone.')) return
    clearAll()
    await useAppStore.persist.clearStorage()
  }

  const isDev = true

  return (
    <div className='h-full overflow-auto bg-bg'>
      <div className='flex flex-col gap-[22px] pt-[52px] px-6 pb-[100px]'>
        {/* top bar */}
        <div className='flex items-center'>
          <div className='gv-brand'>gvozdi</div>
        </div>

        {/* greeting */}
        <div>
          <div className='text-text-3 uppercase mb-2 text-[12px] tracking-[0.14em]'>
            {getFormattedDate()}
          </div>
          <div className='display text-[30px] leading-[1.15]'>
            {getGreeting()},
            <br />
            {firstName}.
          </div>
          {_hasHydrated && selectedMood && (
            <div className='mt-[10px] animate-fade-up flex items-center gap-[8px]'>
              {MoodIcon && (
                <MoodIcon size={14} className='text-text-2 shrink-0' />
              )}
              <div className='display font-light text-text-2 text-[15px] leading-[1.4] italic'>
                {MOOD_QUOTES[selectedMood]}
              </div>
            </div>
          )}
        </div>

        {/* streak */}
        <div
          className='flex items-center justify-between card flat'
          style={{ padding: 18, opacity: hasAnyPractice ? 1 : 0.6 }}
        >
          <div>
            <div className='text-text-2 mb-1 text-[12px]'>Current streak</div>
            <div className='flex items-baseline gap-[6px]'>
              <div
                className='num display text-[38px] leading-none font-light'
                style={{
                  color: hasAnyPractice ? 'var(--p-text)' : 'var(--p-text-3)',
                }}
              >
                {streak}
              </div>
              <div className='text-text-2 text-[13px]'>days</div>
            </div>
            {!hasAnyPractice && (
              <div className='text-text-3 text-[11px] mt-1'>
                Practice today to start
              </div>
            )}
          </div>
          <div className='flex gap-1'>
            {last7Dates.map((date, i) => (
              <div
                key={i}
                className={`w-2 h-7 rounded-[4px] ${practiceDates.has(date) ? 'bg-streak' : 'bg-bg-3'}`}
              />
            ))}
          </div>
        </div>

        {/* mood — hidden after hydration if mood already selected */}
        {_hasHydrated && !selectedMood && (
          <div>
            <div className='text-text-2 mb-[10px] text-[13px]'>
              How does it land?
            </div>
            <div className='grid grid-cols-4 gap-2'>
              {MOOD_OPTS.map((o) => {
                const I = o.I
                return (
                  <button
                    key={o.k}
                    onClick={() => setMood(o.k)}
                    className='border-none rounded-sm flex flex-col items-center gap-[6px] transition-colors duration-150 pt-3 px-1 pb-[10px] bg-bg-2 text-text-2'
                  >
                    <I size={18} />
                    <span className='font-medium text-[11px]'>{o.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* today's practice CTA */}
        <div className='bg-primary text-on-primary rounded-lg flex flex-col relative overflow-hidden p-[22px] gap-4'>
          <svg
            width='120'
            height='120'
            viewBox='0 0 120 120'
            className='absolute opacity-[0.12] -right-5 -top-5'
          >
            {Array.from({ length: 64 }).map((_, i) => (
              <circle
                key={i}
                cx={(i % 8) * 16 + 4}
                cy={Math.floor(i / 8) * 16 + 4}
                r='1.4'
                fill='currentColor'
              />
            ))}
          </svg>
          <div className='relative'>
            <div className='uppercase mb-[6px] text-[11px] opacity-[0.65] tracking-[0.14em]'>
              Today's practice
            </div>
            <div className='display text-[26px] leading-[1.1] font-light'>
              6 minutes
              <br />
              on the board
            </div>
          </div>
          <div className='relative flex items-center justify-between mt-1'>
            <div className='text-[12px] opacity-70'>
              {lastSession
                ? `Last time · ${fmtDuration(lastSession.durationSec)} · ${SESSION_TYPE_LABELS[lastSession.type] ?? lastSession.type}`
                : 'Your first session'}
            </div>
            <button
              onClick={() => nav('session-setup')}
              className='border-none bg-on-primary text-primary rounded-pill flex items-center gap-[6px] font-medium py-3 px-[18px] text-[14px]'
            >
              Begin <Icons.chevron_right size={14} />
            </button>
          </div>
        </div>

        {/* recommended */}
        <div>
          <div className='flex justify-between items-baseline mb-[10px]'>
            <div className='text-text-2 text-[13px]'>
              Suggested · short reads
            </div>
            <div className='text-text-3 text-[12px]'>See all</div>
          </div>
          <div className='flex gap-[10px] overflow-x-auto -mr-6 pr-6'>
            {[
              {
                t: 'Why the board hurts less on day 12',
                s: '3 min · essay',
                tone: 1,
              },
              {
                t: 'A small guide to box breathing',
                s: '2 min · audio',
                tone: 2,
              },
              { t: 'On not tracking everything', s: '5 min · essay', tone: 1 },
            ].map((c, i) => (
              <div
                key={i}
                className='card min-w-[200px] overflow-hidden border border-divider p-0'
              >
                <div
                  className='h-[100px] relative'
                  style={{
                    background:
                      c.tone === 1
                        ? 'linear-gradient(135deg, var(--p-illus) 0%, var(--p-illus-2) 100%)'
                        : 'linear-gradient(135deg, var(--p-bg-3) 0%, var(--p-illus) 100%)',
                  }}
                >
                  <svg
                    width='100%'
                    height='100%'
                    className='absolute inset-0 opacity-[0.35]'
                  >
                    {Array.from({ length: 12 }).map((_, k) => (
                      <circle
                        key={k}
                        cx={20 + (k % 4) * 48}
                        cy={20 + Math.floor(k / 4) * 32}
                        r='1.6'
                        fill='var(--p-text)'
                      />
                    ))}
                  </svg>
                </div>
                <div className='p-[14px]'>
                  <div className='font-medium text-text mb-[6px] text-[14px] leading-[1.3]'>
                    {c.t}
                  </div>
                  <div className='text-text-3 text-[11px]'>{c.s}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* recent sessions */}
        <div>
          <div className='flex justify-between items-baseline mb-[10px]'>
            <div className='text-text-2 text-[13px]'>Recent sessions</div>
            <button
              onClick={() => nav('sessions-list')}
              className='border-none bg-transparent p-0 text-text-3 text-[12px]'
            >
              Show all
            </button>
          </div>
          {recentSessions.length === 0 ? (
            <div className='text-text-3 text-[12px] py-2'>No sessions yet</div>
          ) : (
            <div className='flex flex-col gap-px overflow-hidden rounded-md bg-divider'>
              {recentSessions.map((entry) => (
                <button
                  key={entry.id}
                  onClick={() => {
                    setSelectedSession(entry.id, 'home')
                    nav('session-detail')
                  }}
                  className='flex items-center w-full gap-3 px-4 py-3 text-left border-none bg-surface'
                >
                  <div className='flex-none w-[76px]'>
                    <div className='text-text text-[13px] font-medium leading-tight'>
                      {fmtRelDate(entry.id)}
                    </div>
                    <div className='text-text-3 text-[11px] mt-[2px]'>
                      {fmtTime(entry.id)}
                    </div>
                  </div>
                  <div className='flex-1 min-w-0'>
                    <span className='num text-text text-[13px] font-medium'>
                      {fmtDuration(entry.durationSec)}
                    </span>
                    <span className='text-text-3 text-[11px]'>
                      {' · '}
                      {SESSION_TYPE_LABELS[entry.type] ?? entry.type}
                    </span>
                  </div>
                  <div className='flex items-center gap-[6px] shrink-0'>
                    {entry.goalAchieved === true && (
                      <span
                        className='text-[11px] font-medium'
                        style={{ color: '#4a8c42' }}
                      >
                        ✓
                      </span>
                    )}
                    {entry.goalAchieved === false && (
                      <span className='text-text-3 text-[11px]'>—</span>
                    )}
                    <Icons.chevron_right size={13} />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* dev: clear stored data */}
        {isDev && (
          <button
            onClick={handleClearData}
            className='flex items-center justify-center gap-[6px] w-full py-[10px] border border-dashed border-divider rounded-md text-text-3 text-[11px] bg-transparent'
          >
            <Icons.close size={11} />
            Clear stored data
          </button>
        )}
      </div>
    </div>
  )
}
