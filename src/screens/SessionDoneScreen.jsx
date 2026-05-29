import { useState, useEffect, useRef } from 'react'
import Icons from '../icons'
import { useAppStore } from '../store/useAppStore'
import { calcStreak } from '../store/achievements'
import { fmt } from '../hooks/useSessionTimer'

const TENSION_OPTS = [
  { k: 'intense', l: 'Intense', I: Icons.flame },
  { k: 'tense', l: 'Tense', I: Icons.spark },
  { k: 'mild', l: 'Mild', I: Icons.moon },
  { k: 'easy', l: 'Easy', I: Icons.leaf },
]

export function SessionDoneScreen({ nav }) {
  const [editing, setEditing] = useState(false)
  const [commentDraft, setCommentDraft] = useState('')

  const {
    practiceLog,
    currentSessionType,
    logPractice,
    sessionDuration,
    sessionSaved,
    consumeSessionSaved,
    updateLastEntryComment,
    pendingCompletion,
    clearPendingCompletion,
  } = useAppStore()
  const hasLogged = useRef(false)

  useEffect(() => {
    if (!hasLogged.current && pendingCompletion) {
      hasLogged.current = true
      if (sessionSaved) {
        consumeSessionSaved()
      } else {
        logPractice({
          type: currentSessionType ?? 'board',
          durationSec: sessionDuration * 60,
        })
      }
      clearPendingCompletion()
    }
  }, [])

  const lastEntry = practiceLog[practiceLog.length - 1]
  const displayDurationSec = lastEntry?.durationSec ?? sessionDuration * 60

  useEffect(() => {
    if (lastEntry?.comment) setCommentDraft(lastEntry.comment)
  }, [lastEntry?.id])

  const streak = calcStreak(practiceLog)

  return (
    <div className='h-full flex flex-col bg-bg pt-[60px] px-6 pb-7 animate-completion'>
      <div className='flex flex-col flex-1'>
        {/* big mark */}
        <div className='flex justify-center mb-6'>
          <div className='w-[88px] h-[88px] rounded-pill flex items-center justify-center relative border-[1.5px] border-primary'>
            <Icons.check size={36} />
            <div className='absolute rounded-pill border border-divider [inset:-10px]' />
            <div className='absolute rounded-pill border border-divider [inset:-22px]' />
          </div>
        </div>

        <div className='text-center mb-7'>
          <div className='text-text-3 uppercase mb-2 text-[12px] tracking-[0.14em]'>
            Session {practiceLog.length} · complete
          </div>
          <div className='display text-[30px] leading-[1.1]'>
            {displayDurationSec >= 60
              ? `${Math.floor(displayDurationSec / 60)} minutes.`
              : null}
            {displayDurationSec >= 60 && <br />}
            Well done.
          </div>
        </div>

        {/* stats row */}
        <div className='flex justify-around py-5 border-t border-b border-divider'>
          <div className='text-center'>
            <div className='num display text-[32px] font-light leading-none'>
              {fmt(displayDurationSec)}
            </div>
            <div className='text-text-3 uppercase mt-[6px] text-[10px] tracking-[0.1em]'>
              duration
            </div>
          </div>
          <div className='w-[1px] bg-divider' />
          <div className='text-center'>
            <div className='num display text-[32px] font-light leading-none'>
              {streak}
            </div>
            <div className='text-text-3 uppercase mt-[6px] text-[10px] tracking-[0.1em]'>
              day streak
            </div>
          </div>
        </div>

        {/* tension */}
        {lastEntry?.tension && (
          <div className='mt-7'>
            <div className='flex gap-2'>
              {TENSION_OPTS.map(({ k, l, I }) => {
                const on = lastEntry.tension === k
                return (
                  <div
                    key={k}
                    className={`flex-1 flex flex-col items-center gap-[6px] py-3 rounded-md transition-colors duration-150 ${on ? 'bg-primary text-on-primary' : 'bg-bg-2 text-text-2'}`}
                  >
                    <I size={18} />
                    <span className='text-[10px] tracking-[0.06em]'>{l}</span>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* journal prompt */}
        <div className='card flat mt-[14px]' style={{ padding: 16 }}>
          <div className='text-text-3 uppercase mb-2 text-[11px] tracking-[0.1em]'>
            One honest line
          </div>
          {editing ? (
            <>
              <textarea
                value={commentDraft}
                onChange={(e) => setCommentDraft(e.target.value)}
                className='w-full bg-transparent text-text text-[14px] leading-[1.5] resize-none outline-none'
                rows={3}
                autoFocus
                placeholder='How did this session feel?'
              />
              <button
                onClick={() => {
                  updateLastEntryComment(commentDraft)
                  setEditing(false)
                }}
                className='mt-[10px] text-primary text-[12px]'
              >
                Save
              </button>
            </>
          ) : (
            <>
              <div className='text-text-2 italic text-[14px] leading-[1.5]'>
                {lastEntry?.comment
                  ? `"${lastEntry.comment}"`
                  : 'Add a note about this session...'}
              </div>
              <div
                className='mt-[10px] text-text-3 flex items-center gap-[6px] text-[12px] cursor-pointer'
                onClick={() => setEditing(true)}
              >
                <Icons.edit size={13} />{' '}
                {lastEntry?.comment ? 'Edit' : 'Add'}
              </div>
            </>
          )}
        </div>
      </div>

      <div className='flex gap-[10px]'>
        <button className='flex-1 btn ghost' onClick={() => nav('home')}>
          Done
        </button>
        <button className='flex-1 btn' onClick={() => nav('progress')}>
          See progress
        </button>
      </div>
    </div>
  )
}
