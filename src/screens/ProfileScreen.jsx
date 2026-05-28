import { useUser, useClerk } from '@clerk/react'
import Icons from '../icons'
import { useAppStore } from '../store/useAppStore'
import { ACHIEVEMENTS, calcStreak } from '../store/achievements'

const ICON_MAP = {
  flame: Icons.flame,
  shield: Icons.shield,
  star: Icons.star,
  spark: Icons.spark,
  check: Icons.check,
}

export function ProfileScreen({ nav }) {
  const { user } = useUser()
  const { signOut } = useClerk()
  const { practiceLog, earnedAchievementIds } = useAppStore()

  const streak = calcStreak(practiceLog)

  const name =
    user?.fullName ||
    user?.firstName ||
    user?.emailAddresses?.[0]?.emailAddress ||
    'User'
  const initial = name.charAt(0).toUpperCase()

  return (
    <div className='h-full overflow-auto bg-bg'>
      <div className='pt-[52px] pb-[100px]'>
        {/* header */}
        <div className='px-6 flex justify-between items-center mb-6'>
          <button className='border-none bg-transparent text-text-2 p-0 flex'>
            <Icons.chevron_left size={22} />
          </button>
          <div className='text-text font-medium text-[14px]'>Profile</div>
          <button className='border-none bg-transparent text-text-2 p-0 flex'>
            <Icons.settings size={20} />
          </button>
        </div>

        {/* identity */}
        <div className='px-6 pb-6 text-center'>
          <div className='w-20 h-20 rounded-pill mx-auto mb-[14px] flex items-center justify-center font-medium text-text bg-illus-gradient text-[28px] font-display'>
            {initial}
          </div>
          <div className='display mb-1 text-[22px] leading-[1.15]'>{name}</div>
          <div className='text-text-2 italic text-[13px]'>
            "Show up before motivation does."
          </div>
          <div className='flex justify-center gap-[6px] mt-3'>
            <span className='chip'>Level 3 · Practitioner</span>
            <span
              className='chip'
              style={{
                background: streak > 0 ? 'var(--p-streak)' : 'var(--p-bg-3)',
                color: streak > 0 ? 'var(--p-on-primary)' : 'var(--p-text-3)',
              }}
            >
              {streak > 0 ? `${streak} day streak` : 'No streak yet'}
            </span>
          </div>
        </div>

        {/* current goals */}
        <div className='px-6 pb-2'>
          <div className='text-text-2 uppercase mb-[10px] text-[12px] tracking-[0.1em]'>
            Current goals
          </div>
          <div className='flex flex-col gap-2'>
            {[
              { l: 'Daily 6-min board', v: Math.min(practiceLog.length, 30), t: 30, I: Icons.nails },
              { l: 'Box breathing 3×/week', v: Math.min(practiceLog.filter(e => e.type === 'breath').length, 3), t: 3, I: Icons.drop },
            ].map((g, i) => {
              const I = g.I
              const pct = g.v / g.t
              return (
                <div key={i} className='card' style={{ padding: 14 }}>
                  <div className='flex items-center gap-3 mb-2'>
                    <div className='w-8 h-8 rounded-xs bg-bg-2 text-text-2 flex items-center justify-center shrink-0'>
                      <I size={16} />
                    </div>
                    <div className='flex-1 font-medium text-[14px]'>{g.l}</div>
                    <div className='num text-text-2 text-[13px]'>
                      <span className='text-text font-medium'>{g.v}</span>/{g.t}
                    </div>
                  </div>
                  <div className='h-1 bg-bg-3 rounded-pill overflow-hidden'>
                    <div
                      className='h-full bg-success rounded-pill'
                      style={{ width: `${pct * 100}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* achievements */}
        <div className='px-6 pt-6 pb-2'>
          <div className='flex justify-between items-baseline mb-[10px]'>
            <div className='text-text-2 uppercase text-[12px] tracking-[0.1em]'>
              Achievements
            </div>
            <div className='text-text-3 text-[12px]'>{earnedAchievementIds.length}/{ACHIEVEMENTS.length}</div>
          </div>
          <div className='grid grid-cols-4 gap-3'>
            {ACHIEVEMENTS.map((a) => {
              const unlocked = earnedAchievementIds.includes(a.id)
              const I = ICON_MAP[a.icon] || Icons.star
              return (
                <div key={a.id} className='text-center'>
                  <div
                    className='w-14 h-14 mx-auto mb-[6px] rounded-pill flex items-center justify-center'
                    style={{
                      border: '1.5px solid ' + a.ring,
                      background: unlocked ? 'var(--p-surface)' : 'transparent',
                      color: unlocked ? a.ring : 'var(--p-text-3)',
                      opacity: unlocked ? 1 : 0.4,
                    }}
                  >
                    <I size={22} />
                  </div>
                  <div
                    className='text-[11px] leading-[1.3]'
                    style={{
                      color: unlocked ? 'var(--p-text-2)' : 'var(--p-text-3)',
                    }}
                  >
                    {a.label}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* settings */}
        <div className='px-6 pt-6 pb-2'>
          <div className='text-text-2 uppercase mb-[10px] text-[12px] tracking-[0.1em]'>
            Settings
          </div>
          <div className='bg-surface rounded-md overflow-hidden border border-divider'>
            {[
              {
                l: 'Daily reminder',
                r: '8:30 AM',
                toggle: true,
                on: true,
                I: Icons.bell,
              },
              {
                l: 'Quiet mode',
                r: 'Auto',
                toggle: true,
                on: false,
                I: Icons.moon,
              },
              {
                l: 'Connected: Oura',
                r: 'Connected',
                toggle: false,
                I: Icons.pulse,
              },
              {
                l: 'Gvozdi+',
                r: 'Free plan · upgrade',
                toggle: false,
                I: Icons.star,
                onClick: () => nav('paywall'),
              },
            ].map((s, i, a) => {
              const I = s.I
              return (
                <div
                  key={i}
                  onClick={s.onClick}
                  className={`flex items-center gap-[14px] py-3.5 px-4 ${i < a.length - 1 ? 'border-b border-divider' : ''} ${s.onClick ? 'cursor-pointer' : 'cursor-default'}`}
                >
                  <div className='text-text-2 flex'>
                    <I size={18} />
                  </div>
                  <div className='flex-1 text-[14px]'>{s.l}</div>
                  {s.toggle ? (
                    <div
                      className='relative transition-colors duration-150'
                      style={{
                        width: 36,
                        height: 20,
                        borderRadius: 999,
                        background: s.on ? 'var(--p-primary)' : 'var(--p-bg-3)',
                      }}
                    >
                      <div
                        className='absolute top-[2px] w-4 h-4 rounded-pill bg-surface transition-all duration-150'
                        style={{
                          left: s.on ? 18 : 2,
                          boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
                        }}
                      />
                    </div>
                  ) : (
                    <>
                      <div className='text-text-2 text-[12px]'>{s.r}</div>
                      <Icons.chevron_right
                        size={14}
                        style={{ color: 'var(--p-text-3)' }}
                      />
                    </>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <div className='px-6 pt-5'>
          <button className='btn ghost text-text-2' onClick={() => signOut()}>
            Sign out
          </button>
          <div className='text-center text-text-3 mt-[18px] text-[11px]'>
            gvozdi v1.0 · made calmly
          </div>
        </div>
      </div>
    </div>
  )
}
