import { useEffect } from 'react'
import Icons from '../icons'
import { useAppStore } from '../store/useAppStore'
import { ACHIEVEMENTS } from '../store/achievements'

const ICON_MAP = {
  flame: Icons.flame,
  shield: Icons.shield,
  star: Icons.star,
  spark: Icons.spark,
  check: Icons.check,
}

export function AchievementOverlay() {
  const { pendingAchievement, clearPendingAchievement } = useAppStore()
  const achievement = pendingAchievement
    ? ACHIEVEMENTS.find((a) => a.id === pendingAchievement)
    : null

  useEffect(() => {
    if (!achievement) return
    const timer = setTimeout(clearPendingAchievement, 4000)
    return () => clearTimeout(timer)
  }, [achievement])

  if (!achievement) return null

  const I = ICON_MAP[achievement.icon] || Icons.star

  return (
    <div
      className='absolute inset-0 z-[100] flex items-center justify-center achievement-overlay-in'
      style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)' }}
      onClick={clearPendingAchievement}
    >
      <div className='achievement-badge-pop flex flex-col items-center gap-5 px-10 py-10 text-center'>
        <div className='text-[11px] uppercase tracking-[0.2em]' style={{ color: 'rgba(255,255,255,0.55)' }}>
          Achievement unlocked
        </div>
        <div
          className='w-24 h-24 rounded-pill flex items-center justify-center achievement-icon-pulse'
          style={{
            border: `2px solid ${achievement.ring}`,
            background: 'var(--p-surface)',
            color: achievement.ring,
          }}
        >
          <I size={38} />
        </div>
        <div>
          <div className='display text-[28px] leading-[1.1] mb-[6px]' style={{ color: 'rgba(255,255,255,0.95)' }}>
            {achievement.label}
          </div>
          <div className='text-[14px]' style={{ color: 'rgba(255,255,255,0.6)' }}>
            {achievement.desc}
          </div>
        </div>
        <div className='text-[12px]' style={{ color: 'rgba(255,255,255,0.35)' }}>
          Tap to continue
        </div>
      </div>
    </div>
  )
}
