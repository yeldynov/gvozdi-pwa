import Icons from '../icons'
import { useAppStore } from '../store/useAppStore'
import { fmt } from '../hooks/useSessionTimer'

const TYPE_LABELS = {
  nails: 'Nail board',
  board: 'Nail board',
  breath: 'Breath ring',
  pure: 'Pure focus',
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

function GoalBadge({ entry }) {
  if (entry.goalAchieved === true)
    return (
      <span
        className='text-[11px] font-medium tracking-[0.04em]'
        style={{ color: '#4a8c42' }}
      >
        ✓ Goal
      </span>
    )
  if (entry.goalAchieved === false)
    return <span className='text-text-3 text-[11px]'>Partial</span>
  return null
}

export function SessionsListScreen({ nav }) {
  const { practiceLog, setSelectedSession } = useAppStore()
  const sorted = [...practiceLog].sort((a, b) => b.id.localeCompare(a.id))

  function open(id) {
    setSelectedSession(id, 'sessions-list')
    nav('session-detail')
  }

  return (
    <div className='h-full flex flex-col bg-bg'>
      <div
        className='flex items-center gap-3 px-6 pt-[52px] pb-4'
        style={{ borderBottom: '1px solid var(--p-divider)' }}
      >
        <button
          onClick={() => nav('home')}
          className='border-none bg-bg-2 w-10 h-10 rounded-pill text-text flex items-center justify-center shrink-0'
        >
          <Icons.chevron_left size={20} />
        </button>
        <div className='text-text font-medium text-[16px]'>All sessions</div>
        <div className='text-text-3 text-[12px] ml-auto'>
          {sorted.length} total
        </div>
      </div>

      {sorted.length === 0 ? (
        <div className='flex-1 flex items-center justify-center text-text-3 text-[13px]'>
          No sessions yet
        </div>
      ) : (
        <div className='flex-1 overflow-auto'>
          {sorted.map((entry) => (
            <button
              key={entry.id}
              onClick={() => open(entry.id)}
              className='border-none bg-transparent w-full flex items-center gap-4 py-[14px] px-6 text-left'
              style={{ borderBottom: '1px solid var(--p-divider)' }}
            >
              <div className='flex-none w-[80px]'>
                <div className='text-text text-[13px] font-medium leading-tight'>
                  {fmtRelDate(entry.id)}
                </div>
                <div className='text-text-3 text-[11px] mt-[3px]'>
                  {fmtTime(entry.id)}
                </div>
              </div>

              <div className='flex-1 min-w-0'>
                <div className='num text-text text-[17px] font-medium leading-tight'>
                  {fmt(entry.durationSec)}
                </div>
                <div className='text-text-3 text-[11px] mt-[3px]'>
                  {TYPE_LABELS[entry.type] ?? entry.type}
                </div>
              </div>

              <div className='flex items-center gap-2 shrink-0'>
                <GoalBadge entry={entry} />
                <Icons.chevron_right size={14} />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
