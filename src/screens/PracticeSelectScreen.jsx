import { useState } from 'react'
import Icons from '../icons'

export function PracticeSelectScreen({ nav }) {
  const [picked, setPicked] = useState(['nails', 'breath'])
  const toggle = (k) =>
    setPicked((p) => (p.includes(k) ? p.filter((x) => x !== k) : [...p, k]))

  const opts = [
    {
      k: 'nails',
      label: 'Nail board',
      sub: 'The main practice',
      icon: Icons.nails,
    },
    { k: 'breath', label: 'Breathwork', sub: 'Box · 4-7-8', icon: Icons.drop },
    {
      k: 'cold',
      label: 'Cold exposure',
      sub: 'Shower · ice bath',
      icon: Icons.spark,
    },
    { k: 'sit', label: 'Sitting', sub: 'Silent meditation', icon: Icons.moon },
    {
      k: 'walk',
      label: 'Mindful walk',
      sub: 'Outdoor presence',
      icon: Icons.leaf,
    },
    {
      k: 'journal',
      label: 'Journaling',
      sub: 'A few honest lines',
      icon: Icons.edit,
    },
  ]

  return (
    <div className='h-full flex flex-col bg-bg pt-14 px-6 pb-8'>
      <div className='flex items-center justify-between mb-7'>
        <button
          onClick={() => nav('welcome')}
          className='border-none bg-transparent text-text-2 flex items-center p-0'
        >
          <Icons.chevron_left size={24} />
        </button>
        <div className='flex gap-1'>
          <div className='w-6 h-[3px] rounded-sm bg-text' />
          <div className='w-6 h-[3px] rounded-sm bg-text' />
          <div className='w-6 h-[3px] rounded-sm bg-bg-3' />
        </div>
        <div className='text-text-2 text-[14px]'>Skip</div>
      </div>

      <div className='mb-6'>
        <div className='display mb-2 text-[32px] leading-[1.1]'>
          Your practice
        </div>
        <div className='text-text-2 text-[14px] leading-[1.5]'>
          Pick what you actually do. You can change this any time — the app
          won't argue.
        </div>
      </div>

      <div className='flex-1 grid grid-cols-2 gap-[10px] [align-content:start]'>
        {opts.map((o) => {
          const on = picked.includes(o.k)
          const I = o.icon
          return (
            <button
              key={o.k}
              onClick={() => toggle(o.k)}
              className={`${on ? 'bg-primary text-on-primary border-primary' : 'bg-surface text-text border-divider'} border rounded-md p-4 flex flex-col items-start gap-[10px] text-left transition-all duration-150 min-h-[116px]`}
            >
              <div className='flex justify-between items-start w-full'>
                <I size={22} />
                <div
                  className='w-[18px] h-[18px] rounded-pill flex items-center justify-center'
                  style={{
                    border:
                      '1.5px solid ' +
                      (on ? 'var(--p-on-primary)' : 'var(--p-divider)'),
                    background: on ? 'var(--p-on-primary)' : 'transparent',
                  }}
                >
                  {on && (
                    <div className='text-primary flex'>
                      <Icons.check size={12} />
                    </div>
                  )}
                </div>
              </div>
              <div>
                <div className='font-semibold mb-[2px] text-[15px]'>
                  {o.label}
                </div>
                <div className='text-[12px] opacity-70'>{o.sub}</div>
              </div>
            </button>
          )
        })}
      </div>

      <button className='btn mt-5' onClick={() => nav('home')}>
        Continue
      </button>
      <div className='text-center text-text-3 mt-3 text-[12px]'>
        You can change these later in settings.
      </div>
    </div>
  )
}
