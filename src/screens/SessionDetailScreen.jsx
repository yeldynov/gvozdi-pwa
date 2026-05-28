import Icons from '../icons'
import { useAppStore } from '../store/useAppStore'
import { fmt } from '../hooks/useSessionTimer'

const TYPE_LABELS = {
  nails: 'Nail board',
  board: 'Nail board',
  breath: 'Breath ring',
  pure: 'Pure focus',
}

const TENSION_OPTS = [
  { k: 'intense', l: 'Intense', I: Icons.flame },
  { k: 'tense', l: 'Tense', I: Icons.spark },
  { k: 'mild', l: 'Mild', I: Icons.moon },
  { k: 'easy', l: 'Easy', I: Icons.leaf },
]

function fmtFullDate(id) {
  const d = new Date(parseInt(id))
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
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  return `${days[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()}`
}

function fmtTime(id) {
  const d = new Date(parseInt(id))
  return `${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`
}

function StatCell({ label, children }) {
  return (
    <div className='flex-1 flex flex-col items-center py-4 gap-[6px]'>
      {children}
      <div className='text-text-3 uppercase text-[10px] tracking-[0.1em]'>
        {label}
      </div>
    </div>
  )
}

export function SessionDetailScreen({ nav }) {
  const { practiceLog, selectedSessionId, sessionDetailBack } = useAppStore()
  const entry = practiceLog.find((e) => e.id === selectedSessionId)

  if (!entry) {
    return (
      <div className='h-full flex flex-col bg-bg pt-[52px] px-6'>
        <button
          onClick={() => nav(sessionDetailBack ?? 'home')}
          className='border-none bg-bg-2 w-10 h-10 rounded-pill text-text flex items-center justify-center mb-6'
        >
          <Icons.chevron_left size={20} />
        </button>
        <div className='text-text-3 text-[14px]'>Session not found.</div>
      </div>
    )
  }

  const tensionOpt = entry.tension
    ? TENSION_OPTS.find((o) => o.k === entry.tension)
    : null
  const TensionIcon = tensionOpt?.I || null

  return (
    <div className='h-full flex flex-col bg-bg overflow-auto'>
      <div className='px-6 pt-[52px] pb-6'>
        {/* header */}
        <div className='flex items-center gap-3 mb-7'>
          <button
            onClick={() => nav(sessionDetailBack ?? 'home')}
            className='border-none bg-bg-2 w-10 h-10 rounded-pill text-text flex items-center justify-center shrink-0'
          >
            <Icons.chevron_left size={20} />
          </button>
          <div className='text-text font-medium text-[16px]'>
            {TYPE_LABELS[entry.type] ?? entry.type}
          </div>
        </div>

        {/* date / time */}
        <div className='mb-6'>
          <div className='display text-[28px] leading-[1.1]'>
            {fmtFullDate(entry.id)}
          </div>
          <div className='text-text-3 text-[13px] mt-[6px]'>
            {fmtTime(entry.id)}
          </div>
        </div>

        {/* stats card */}
        <div
          className='rounded-md flex divide-x divide-divider mb-5'
          style={{
            background: 'var(--p-surface)',
            border: '1px solid var(--p-divider)',
          }}
        >
          <StatCell label='Duration'>
            <div className='num display text-[28px] font-light text-text leading-none'>
              {fmt(entry.durationSec)}
            </div>
          </StatCell>

          {entry.goalSec !== undefined && (
            <StatCell label='Goal'>
              <div className='num display text-[28px] font-light text-text leading-none'>
                {fmt(entry.goalSec)}
              </div>
            </StatCell>
          )}

          {entry.goalAchieved !== undefined && (
            <StatCell label={entry.goalAchieved ? 'Reached' : 'Partial'}>
              {entry.goalAchieved ? (
                <Icons.check size={22} style={{ color: '#4a8c42' }} />
              ) : (
                <Icons.close size={20} className='text-text-3' />
              )}
            </StatCell>
          )}
        </div>

        {/* tension */}
        {tensionOpt && (
          <div
            className='rounded-md flex items-center gap-3 px-4 py-3.5 mb-3'
            style={{
              background: 'var(--p-surface)',
              border: '1px solid var(--p-divider)',
            }}
          >
            <div className='text-text-2'>
              <TensionIcon size={18} />
            </div>
            <div>
              <div className='text-text-3 uppercase text-[10px] tracking-[0.1em] mb-[3px]'>
                Intensity
              </div>
              <div className='text-text text-[14px] font-medium'>
                {tensionOpt.l}
              </div>
            </div>
          </div>
        )}

        {/* comment */}
        {entry.comment && (
          <div
            className='rounded-md px-4 py-[14px]'
            style={{
              background: 'var(--p-surface)',
              border: '1px solid var(--p-divider)',
            }}
          >
            <div className='text-text-3 uppercase text-[10px] tracking-[0.1em] mb-2'>
              Note
            </div>
            <div className='text-text-2 text-[14px] leading-[1.55] italic'>
              "{entry.comment}"
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
