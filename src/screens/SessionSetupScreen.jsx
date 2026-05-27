import { useState } from 'react'
import Icons from '../icons'

export function SessionSetupScreen({ nav }) {
  const [dur, setDur] = useState(6)
  const options = [3, 6, 10, 15]

  return (
    <div className='h-full flex flex-col bg-bg pt-14 px-6 pb-8'>
      <div className='flex justify-between items-center mb-8'>
        <button
          onClick={() => nav('home')}
          className='border-none bg-bg-2 w-10 h-10 rounded-pill text-text flex items-center justify-center'
        >
          <Icons.chevron_left size={20} />
        </button>
        <div className='text-text-2 text-[13px]'>Session setup</div>
        <button className='border-none bg-bg-2 w-10 h-10 rounded-pill text-text flex items-center justify-center'>
          <Icons.settings size={18} />
        </button>
      </div>

      <div className='flex-1 flex flex-col gap-7'>
        <div>
          <div className='text-text-3 uppercase mb-2 text-[12px] tracking-[0.14em]'>
            Nail board
          </div>
          <div className='display text-[34px] leading-[1.1]'>
            How long today?
          </div>
        </div>

        {/* duration tiles */}
        <div className='grid grid-cols-4 gap-2'>
          {options.map((o) => {
            const on = dur === o
            return (
              <button
                key={o}
                onClick={() => setDur(o)}
                className={`border-none rounded-md flex flex-col items-center gap-[2px] transition-colors duration-150 py-[18px] px-2 ${on ? 'bg-primary text-on-primary' : 'bg-bg-2 text-text'}`}
              >
                <span className='num font-medium text-[22px]'>{o}</span>
                <span className='text-[11px] opacity-70'>min</span>
              </button>
            )
          })}
        </div>

        {/* custom slider */}
        <div className='card flat'>
          <div className='flex justify-between mb-3'>
            <span className='text-text-2 text-[13px]'>Custom</span>
            <span className='num text-text text-[13px]'>{dur}:00</span>
          </div>
          <div className='relative h-[6px] bg-bg-3 rounded-pill'>
            <div
              className='absolute top-0 left-0 h-full bg-primary rounded-pill'
              style={{ width: `${(dur / 30) * 100}%` }}
            />
            <div
              className='absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-surface border border-divider rounded-pill'
              style={{
                left: `${(dur / 30) * 100}%`,
                boxShadow: '0 2px 6px rgba(0,0,0,0.12)',
              }}
            />
          </div>
          <div className='flex justify-between mt-2 text-text-3 text-[11px]'>
            <span>1 min</span>
            <span>15</span>
            <span>30 min</span>
          </div>
        </div>

        {/* options */}
        <div className='flex flex-col rounded-md overflow-hidden gap-px bg-divider'>
          {[
            { l: 'Guided audio', v: 'Off', I: Icons.pulse },
            { l: 'Ambient sound', v: 'Rain · quiet', I: Icons.drop },
            { l: 'Breath pacing', v: '4–7–8', I: Icons.leaf },
          ].map((r, i) => {
            const Ir = r.I
            return (
              <div
                key={i}
                className='bg-surface flex items-center gap-3 py-3.5 px-4'
              >
                <div className='text-text-2 flex'>
                  <Ir size={18} />
                </div>
                <div className='flex-1 text-text text-[14px]'>{r.l}</div>
                <div className='text-text-2 text-[13px]'>{r.v}</div>
                <div className='text-text-3 flex'>
                  <Icons.chevron_right size={16} />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <button
        className='btn flex items-center justify-center gap-2'
        onClick={() => nav('session-active')}
      >
        <Icons.play size={16} /> Begin · {dur} min
      </button>
    </div>
  )
}
