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

export function MilestoneDetailScreen({ nav }) {
  const { selectedMilestoneId } = useAppStore()
  const milestone = ACHIEVEMENTS.find((a) => a.id === selectedMilestoneId)

  useEffect(() => {
    if (!milestone) nav('progress')
  }, [milestone])

  if (!milestone) return null

  const I = ICON_MAP[milestone.icon] || Icons.star

  return (
    <div className='h-full overflow-auto bg-bg'>
      <div className='px-6 pt-[52px] pb-[100px]'>
        {/* back */}
        <button
          className='flex items-center gap-2 text-text-2 mb-8 border-none bg-transparent p-0 cursor-pointer'
          onClick={() => nav('progress')}
        >
          <Icons.chevron_left size={18} />
          <span className='text-[14px] font-medium'>Progress</span>
        </button>

        {/* badge */}
        <div className='flex flex-col items-center text-center pt-8 pb-10'>
          <div
            className='flex items-center justify-center w-24 h-24 rounded-pill mb-6'
            style={{
              border: '2px solid ' + milestone.ring,
              color: milestone.ring,
            }}
          >
            <I size={40} />
          </div>
          <div className='display text-[28px] leading-[1.1] mb-2'>
            {milestone.label}
          </div>
          <div className='text-text-2 text-[15px]'>{milestone.desc}</div>
        </div>

        {/* divider */}
        <div className='border-t border-divider mb-6' />

        {/* detail card */}
        <div className='card' style={{ padding: 18 }}>
          <div className='text-text-3 uppercase text-[11px] tracking-[0.1em] mb-3'>
            Achievement
          </div>
          <div className='flex items-center gap-4'>
            <div
              className='flex items-center justify-center w-10 h-10 rounded-pill shrink-0'
              style={{
                border: '1.5px solid ' + milestone.ring,
                color: milestone.ring,
              }}
            >
              <I size={18} />
            </div>
            <div>
              <div className='font-semibold text-[15px]'>{milestone.label}</div>
              <div className='text-text-3 text-[12px] mt-[2px]'>
                {milestone.desc}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
