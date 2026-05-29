import { useState } from 'react'
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
  const { practiceLog, selectedSessionId, sessionDetailBack, updateEntry, deleteEntry } = useAppStore()
  const entry = practiceLog.find((e) => e.id === selectedSessionId)

  const [editingComment, setEditingComment] = useState(false)
  const [commentDraft, setCommentDraft] = useState('')
  const [confirmDelete, setConfirmDelete] = useState(false)

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

  const back = sessionDetailBack ?? 'home'

  function handleDelete() {
    deleteEntry(entry.id)
    nav(back)
  }

  return (
    <div className='h-full flex flex-col bg-bg overflow-auto'>
      <div className='px-6 pt-[52px] pb-6'>
        {/* header */}
        <div className='flex items-center gap-3 mb-7'>
          <button
            onClick={() => nav(back)}
            className='border-none bg-bg-2 w-10 h-10 rounded-pill text-text flex items-center justify-center shrink-0'
          >
            <Icons.chevron_left size={20} />
          </button>
          <div className='text-text font-medium text-[16px] flex-1'>
            {TYPE_LABELS[entry.type] ?? entry.type}
          </div>
          <button
            onClick={() => setConfirmDelete(true)}
            className='border-none bg-transparent w-10 h-10 flex items-center justify-center'
            style={{ color: '#e05252' }}
          >
            <Icons.trash size={18} />
          </button>
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

        {/* tension picker */}
        <div className='mb-3'>
          <div className='text-text-3 uppercase text-[10px] tracking-[0.1em] mb-2'>
            Intensity
          </div>
          <div className='flex gap-2'>
            {TENSION_OPTS.map(({ k, l, I }) => {
              const on = entry.tension === k
              return (
                <button
                  key={k}
                  onClick={() => updateEntry(entry.id, { tension: k })}
                  className={`flex-1 flex flex-col items-center gap-[6px] py-3 rounded-md border-none transition-colors duration-150 ${on ? 'bg-primary text-on-primary' : 'bg-bg-2 text-text-2'}`}
                >
                  <I size={18} />
                  <span className='text-[10px] tracking-[0.06em]'>{l}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* comment */}
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
          {editingComment ? (
            <>
              <textarea
                value={commentDraft}
                onChange={(e) => setCommentDraft(e.target.value)}
                className='w-full bg-transparent text-text text-[14px] leading-[1.55] resize-none outline-none'
                rows={3}
                autoFocus
                placeholder='Add a note…'
              />
              <button
                onClick={() => {
                  updateEntry(entry.id, { comment: commentDraft })
                  setEditingComment(false)
                }}
                className='mt-2 text-primary text-[12px]'
              >
                Save
              </button>
            </>
          ) : (
            <>
              {entry.comment ? (
                <div className='text-text-2 text-[14px] leading-[1.55] italic'>
                  "{entry.comment}"
                </div>
              ) : (
                <div className='text-text-3 text-[14px]'>No note</div>
              )}
              <div
                className='mt-2 text-text-3 flex items-center gap-[6px] text-[12px] cursor-pointer'
                onClick={() => {
                  setCommentDraft(entry.comment ?? '')
                  setEditingComment(true)
                }}
              >
                <Icons.edit size={13} /> {entry.comment ? 'Edit' : 'Add'}
              </div>
            </>
          )}
        </div>
      </div>

      {confirmDelete && (
        <div
          className='absolute inset-0 z-50 flex items-center justify-center px-6'
          style={{ background: 'rgba(0,0,0,0.45)' }}
          onClick={() => setConfirmDelete(false)}
        >
          <div
            className='bg-bg rounded-[20px] px-6 py-6 flex flex-col gap-4 w-full animate-fade-up'
            onClick={(e) => e.stopPropagation()}
          >
            <div className='text-text font-semibold text-[16px]'>
              Delete session?
            </div>
            <div className='text-text-2 text-[14px] leading-[1.5]'>
              This will permanently remove the session from your log. This cannot be undone.
            </div>
            <div className='flex gap-3'>
              <button
                onClick={() => setConfirmDelete(false)}
                className='flex-1 btn ghost'
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className='flex-1 btn'
                style={{ background: '#e05252', borderColor: '#e05252' }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
