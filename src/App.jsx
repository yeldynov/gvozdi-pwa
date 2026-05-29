import { useState } from 'react'
import { useAuth } from '@clerk/react'
import Icons from './icons'
import { WelcomeScreen } from './screens/WelcomeScreen'
import { PracticeSelectScreen } from './screens/PracticeSelectScreen'
import { HomeScreen } from './screens/HomeScreen'
import { LibraryScreen } from './screens/LibraryScreen'
import { ProgressScreen } from './screens/ProgressScreen'
import { ProfileScreen } from './screens/ProfileScreen'
import { PaywallScreen } from './screens/PaywallScreen'
import { SessionSetupScreen } from './screens/SessionSetupScreen'
import { SessionActiveNails } from './screens/SessionActiveNails'
import { SessionActivePure } from './screens/SessionActivePure'
import { SessionActiveBoard } from './screens/SessionActiveBoard'
import { SessionDoneScreen } from './screens/SessionDoneScreen'
import { SessionsListScreen } from './screens/SessionsListScreen'
import { SessionDetailScreen } from './screens/SessionDetailScreen'
import { MilestoneDetailScreen } from './screens/MilestoneDetailScreen'
import { AchievementOverlay } from './screens/AchievementOverlay'
import './globals.css'

function BottomNav({ tab, setTab }) {
  const items = [
    { k: 'home', l: 'Home', I: Icons.home },
    { k: 'session', l: 'Practice', I: Icons.moon },
    { k: 'library', l: 'Library', I: Icons.compass },
    { k: 'progress', l: 'Progress', I: Icons.chart },
    { k: 'profile', l: 'Profile', I: Icons.user },
  ]
  return (
    <div
      className='absolute bottom-0 left-0 right-0 z-[55] border-t border-divider pt-2 px-4 flex justify-around items-start'
      style={{
        background: 'color-mix(in oklab, var(--p-bg) 88%, transparent)',
        backdropFilter: 'blur(24px) saturate(180%)',
        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        paddingBottom: 'max(20px, env(safe-area-inset-bottom, 20px))',
      }}
    >
      {items.map(({ k, l, I }) => {
        const on = tab === k
        return (
          <button
            key={k}
            onClick={() => setTab(k)}
            className={`border-none bg-transparent py-1 px-3 flex flex-col items-center gap-1 cursor-pointer ${on ? 'text-text' : 'text-text-3'}`}
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            <I size={22} />
            <span
              className={`text-[10px] tracking-[0.01em] ${on ? 'font-semibold' : 'font-medium'}`}
            >
              {l}
            </span>
          </button>
        )
      })}
    </div>
  )
}

function PWAFrame({ children, bottomNav }) {
  return (
    <div className='relative w-full h-full overflow-hidden bg-bg'>
      <div className='absolute inset-0'>{children}</div>
      {bottomNav}
    </div>
  )
}

function App() {
  const { isLoaded, isSignedIn } = useAuth()
  const [screen, setScreen] = useState('home')

  const tabRoutes = ['home', 'session', 'library', 'progress', 'profile']
  const isTab = tabRoutes.includes(screen)

  const nav = (to) => {
    if (to === 'session-active') setScreen('session-nails')
    else setScreen(to)
  }

  if (!isLoaded) {
    return <div className='h-full bg-bg' />
  }

  if (!isSignedIn) {
    return (
      <PWAFrame bottomNav={null}>
        <WelcomeScreen />
      </PWAFrame>
    )
  }

  const screens = {
    'practice-select': <PracticeSelectScreen nav={nav} />,
    home: <HomeScreen nav={nav} />,
    session: <SessionSetupScreen nav={nav} />,
    library: <LibraryScreen nav={nav} />,
    progress: <ProgressScreen nav={nav} />,
    profile: <ProfileScreen nav={nav} />,
    paywall: <PaywallScreen nav={nav} />,
    'session-setup': <SessionSetupScreen nav={nav} />,
    'session-nails': <SessionActiveNails nav={nav} />,
    'session-pure': <SessionActivePure nav={nav} />,
    'session-board': <SessionActiveBoard nav={nav} />,
    'session-done': <SessionDoneScreen nav={nav} />,
    'sessions-list': <SessionsListScreen nav={nav} />,
    'session-detail': <SessionDetailScreen nav={nav} />,
    'milestone-detail': <MilestoneDetailScreen nav={nav} />,
  }

  return (
    <PWAFrame
      bottomNav={isTab ? <BottomNav tab={screen} setTab={setScreen} /> : null}
    >
      {screens[screen] || <HomeScreen nav={nav} />}
      <AchievementOverlay />
    </PWAFrame>
  )
}

export default function Root() {
  return (
    <div className='gv palette-earthy' style={{ height: '100%' }}>
      <App />
    </div>
  )
}
