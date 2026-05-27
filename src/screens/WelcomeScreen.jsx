import { useClerk } from '@clerk/react'
import Icons from '../icons'

export function WelcomeScreen() {
  const { openSignIn, openSignUp } = useClerk()

  return (
    <div className='h-full flex flex-col bg-bg pt-16 px-7 pb-9 animate-fade-up'>
      <div className='flex items-center gap-2'>
        <div className='w-7 h-7 rounded-pill flex items-center justify-center border-[1.5px] border-text'>
          <div className='w-[5px] h-[5px] rounded-pill bg-text' />
        </div>
        <div className='gv-brand'>gvozdi</div>
      </div>

      <div className='flex-1 flex flex-col justify-center gap-4 -mt-10'>
        <div className='text-text-2 font-medium uppercase text-[13px] tracking-[0.16em]'>
          A practice, not an app
        </div>
        <div className='display text-text text-[54px] leading-[1.02]'>
          Stand on
          <br />
          nails. <em className='text-text-2 italic font-light'>Calmly.</em>
        </div>
        <div className='text-text-2 mt-2 text-[15px] leading-[1.55] max-w-[280px]'>
          A timer, a streak, and a few honest words about how it felt. Nothing
          else.
        </div>
      </div>

      <div className='flex flex-col gap-[10px]'>
        <button className='btn' onClick={() => openSignUp()}>
          Begin your practice
        </button>
        <button
          className='btn ghost flex items-center justify-center gap-2'
          onClick={() => openSignIn()}
        >
          <Icons.google size={18} /> Continue with Google
        </button>
        <div className='text-center text-text-2 mt-1 text-[13px]'>
          Already practicing?{' '}
          <span
            className='text-text border-b border-text pb-px cursor-pointer'
            onClick={() => openSignIn()}
          >
            Sign in
          </span>
        </div>
      </div>
    </div>
  )
}
