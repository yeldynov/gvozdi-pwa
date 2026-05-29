import { useState, useEffect } from 'react'
import Icons from '../icons'
import { useSessionTimer, fmt } from '../hooks/useSessionTimer'
import { useAppStore } from '../store/useAppStore'

const TENSION_OPTS = [
  { k: 'intense', l: 'Intense', I: Icons.flame },
  { k: 'tense', l: 'Tense', I: Icons.spark },
  { k: 'mild', l: 'Mild', I: Icons.moon },
  { k: 'easy', l: 'Easy', I: Icons.leaf },
]

function SaveModal({
  elapsed,
  total,
  goalAchieved,
  tension,
  setTension,
  comment,
  setComment,
  onSave,
  onCancel,
}) {
  return (
    <div
      className='absolute inset-0 z-50 flex flex-col justify-end'
      style={{ background: 'rgba(0,0,0,0.45)' }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onCancel()
      }}
    >
      <div className='bg-bg rounded-t-[20px] px-6 pt-6 pb-10 flex flex-col gap-5 animate-fade-up'>
        <div className='flex items-center justify-between'>
          <div className='text-text font-semibold text-[16px]'>
            Save session
          </div>
          <button
            onClick={onCancel}
            className='border-none bg-transparent text-text-3 p-0'
          >
            <Icons.close size={20} />
          </button>
        </div>

        <div className='flex items-center gap-3'>
          <div className='num display text-[40px] font-extralight text-text leading-none'>
            {fmt(elapsed)}
          </div>
          {goalAchieved ? (
            <div
              className='flex items-center gap-1 text-[12px] tracking-[0.06em]'
              style={{ color: '#4a8c42' }}
            >
              <Icons.check size={14} /> Goal reached
            </div>
          ) : (
            <div className='text-text-3 text-[12px]'>of {fmt(total)} goal</div>
          )}
        </div>

        <div>
          <div className='text-text-3 uppercase mb-3 text-[11px] tracking-[0.12em]'>
            How intense was it?
          </div>
          <div className='flex gap-2'>
            {TENSION_OPTS.map(({ k, l, I }) => {
              const on = tension === k
              return (
                <button
                  key={k}
                  onClick={() => setTension(k)}
                  className={`flex-1 flex flex-col items-center gap-[6px] py-3 rounded-md border-none transition-colors duration-150 ${on ? 'bg-primary text-on-primary' : 'bg-bg-2 text-text-2'}`}
                >
                  <I size={18} />
                  <span className='text-[10px] tracking-[0.06em]'>{l}</span>
                </button>
              )
            })}
          </div>
        </div>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder='One honest line…'
          rows={2}
          className='w-full bg-surface border border-divider rounded-md px-3 py-2 text-text text-[14px] placeholder:text-text-3 resize-none outline-none focus:border-primary transition-colors'
        />

        <div className='flex gap-3'>
          <button className='btn ghost flex-1' onClick={onCancel}>
            Cancel
          </button>
          <button className='btn flex-1' onClick={onSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export function SessionActiveNails({ nav }) {
  const setCurrentSessionType = useAppStore((s) => s.setCurrentSessionType)
  const sessionDuration = useAppStore((s) => s.sessionDuration)
  const logPractice = useAppStore((s) => s.logPractice)
  const setPendingCompletion = useAppStore((s) => s.setPendingCompletion)
  const total = sessionDuration * 60
  const t = useSessionTimer(total)

  const R = 124,
    C = 2 * Math.PI * R
  const offset = C * (1 - t.progress)
  const overtime = t.elapsed >= total
  const overtimeElapsed = overtime ? t.elapsed - total : 0

  const [showModal, setShowModal] = useState(false)
  const [tension, setTension] = useState(null)
  const [comment, setComment] = useState('')

  useEffect(() => {
    setCurrentSessionType('nails')
  }, [])

  function handleSave() {
    logPractice({
      type: 'nails',
      durationSec: t.elapsed,
      goalSec: total,
      goalAchieved: t.elapsed >= total,
      tension,
      comment,
    })
    setPendingCompletion(true)
    nav('session-done')
  }

  const canSave = !t.running
  const ringColor = overtime ? '#4a8c42' : 'var(--p-primary)'
  const trackColor = overtime ? '#4a8c42' : 'var(--p-bg-3)'

  const statusText =
    overtime && t.running
      ? 'Goal reached · keep going'
      : !t.running
        ? 'Paused'
        : 'Standing · breathe steady'

  return (
    <div
      className='h-full flex flex-col pt-[52px] px-6 pb-7 animate-fade-up-md'
      style={{
        background:
          'radial-gradient(ellipse at 50% 30%, var(--p-bg-2) 0%, var(--p-bg) 60%)',
      }}
    >
      <div className='flex justify-between items-center'>
        <button
          onClick={() => nav('home')}
          className='border-none bg-transparent text-text-2 flex items-center p-0'
        >
          <Icons.close size={22} />
        </button>
        <div className='text-text-3 uppercase text-[11px] tracking-[0.14em]'>
          Nail board
        </div>
        <button className='border-none bg-transparent text-text-2 flex items-center p-0'>
          <Icons.more size={22} />
        </button>
      </div>

      <div className='flex-1 flex flex-col items-center justify-center gap-6'>
        <div
          className='text-[13px] tracking-[0.06em] transition-colors duration-500'
          style={{ color: overtime ? '#4a8c42' : 'var(--p-text-2)' }}
        >
          {statusText}
        </div>

        {/* ring */}
        <div className='relative' style={{ width: 280, height: 280 }}>
          <svg width='280' height='280' viewBox='0 0 280 280'>
            <circle
              cx='140'
              cy='140'
              r={R}
              fill='none'
              stroke={trackColor}
              strokeWidth='2'
              style={{
                transformOrigin: '140px 140px',
                animation: t.running
                  ? 'gv-breathe-ring 8s ease-in-out infinite'
                  : 'none',
                transition: 'stroke 0.8s ease',
              }}
            />
            <circle
              cx='140'
              cy='140'
              r={R}
              fill='none'
              stroke={ringColor}
              strokeWidth='2'
              strokeDasharray={C}
              strokeDashoffset={offset}
              strokeLinecap='round'
              transform='rotate(-90 140 140)'
              style={{
                transition: 'stroke-dashoffset 1s linear, stroke 0.8s ease',
              }}
            />
            {Array.from({ length: 60 }).map((_, i) => {
              const a = (i / 60) * 2 * Math.PI - Math.PI / 2
              const r1 = R - 8,
                r2 = R - 4
              return (
                <line
                  key={i}
                  x1={140 + Math.cos(a) * r1}
                  y1={140 + Math.sin(a) * r1}
                  x2={140 + Math.cos(a) * r2}
                  y2={140 + Math.sin(a) * r2}
                  stroke='var(--p-text-3)'
                  strokeWidth='1'
                  opacity={i % 5 === 0 ? 0.6 : 0.25}
                />
              )
            })}
          </svg>

          {/* breath dot */}
          <div
            className={`absolute rounded-pill bg-primary top-1/2 left-1/2 w-[110px] h-[110px] -ml-[55px] -mt-[55px] opacity-40 ${t.running ? 'animate-breathe' : ''}`}
          />

          {/* time */}
          <div className='absolute text-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px]'>
            {overtime ? (
              <>
                <div
                  className='num display text-[48px] leading-none font-extralight'
                  style={{ color: '#4a8c42' }}
                >
                  +{fmt(overtimeElapsed)}
                </div>
                <div className='text-text-3 uppercase mt-[6px] text-[11px] tracking-[0.12em]'>
                  goal {fmt(total)}
                </div>
              </>
            ) : (
              <>
                <div className='num display text-[56px] leading-none font-extralight text-text'>
                  {fmt(t.remaining)}
                </div>
                <div className='text-text-3 uppercase mt-[6px] text-[11px] tracking-[0.12em]'>
                  of {fmt(total)}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* controls */}
      <div className='flex justify-center items-center gap-5'>
        {/* DEV: remove before release */}
        <button
          onClick={() => t.addSeconds(180)}
          className='border-none bg-bg-2 text-text-3 text-[11px] rounded-pill px-3 py-1'
        >
          +3 min
        </button>
        <button
          onClick={t.toggle}
          className='border-none bg-primary text-on-primary w-[72px] h-[72px] rounded-pill flex items-center justify-center'
        >
          {t.running ? <Icons.pause size={26} /> : <Icons.play size={26} />}
        </button>
        <button
          disabled={t.running}
          onClick={() => setShowModal(true)}
          className={`border-none bg-bg-2 w-[52px] h-[52px] rounded-pill flex items-center justify-center transition-all duration-200 ${canSave ? 'text-text-2 opacity-100' : 'text-text-3 opacity-25 cursor-default'}`}
        >
          <Icons.check size={20} />
        </button>
      </div>

      {showModal && (
        <SaveModal
          elapsed={t.elapsed}
          total={total}
          goalAchieved={t.elapsed >= total}
          tension={tension}
          setTension={setTension}
          comment={comment}
          setComment={setComment}
          onSave={handleSave}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  )
}
