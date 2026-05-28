import { useState, useEffect, useRef } from 'react'
import Icons from '../icons'
import { useAppStore } from '../store/useAppStore'
import { calcStreak } from '../store/achievements'
import { fmt } from '../hooks/useSessionTimer'

export function SessionDoneScreen({ nav }) {
  const [mood, setMood] = useState('settled')
  const moods = [
    { k: 'tense', l: 'Tense' },
    { k: 'mixed', l: 'Mixed' },
    { k: 'settled', l: 'Settled' },
    { k: 'open', l: 'Open' },
  ]

  const {
    practiceLog,
    currentSessionType,
    logPractice,
    sessionDuration,
    sessionSaved,
    consumeSessionSaved,
    updateLastEntryPostMood,
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
            {Math.floor(displayDurationSec / 60)} minutes.
            <br />
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
          <div className='w-[1px] bg-divider' />
          <div className='text-center'>
            <div className='num display text-[32px] font-light leading-none'>
              ↘ 4
            </div>
            <div className='text-text-3 uppercase mt-[6px] text-[10px] tracking-[0.1em]'>
              resting bpm
            </div>
          </div>
        </div>

        {/* mood */}
        <div className='mt-7'>
          <div className='text-text-2 mb-[10px] text-[13px]'>
            How did it land?
          </div>
          <div className='flex gap-[6px]'>
            {moods.map((m) => {
              const on = mood === m.k
              return (
                <button
                  key={m.k}
                  onClick={() => {
                    setMood(m.k)
                    updateLastEntryPostMood(m.k)
                  }}
                  className={`flex-1 rounded-pill font-medium transition-all duration-150 py-[10px] px-1 text-[13px] ${on ? 'bg-primary text-on-primary border-primary' : 'bg-transparent text-text border-divider'} border`}
                >
                  {m.l}
                </button>
              )
            })}
          </div>
        </div>

        {/* journal prompt */}
        <div className='card flat mt-[14px]' style={{ padding: 16 }}>
          <div className='text-text-3 uppercase mb-2 text-[11px] tracking-[0.1em]'>
            One honest line
          </div>
          <div className='text-text-2 italic text-[14px] leading-[1.5]'>
            "The middle was the hardest. Then it wasn't."
          </div>
          <div className='mt-[10px] text-text-3 flex items-center gap-[6px] text-[12px]'>
            <Icons.edit size={13} /> Edit
          </div>
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
