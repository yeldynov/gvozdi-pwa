import { useState } from 'react';
import Icons from './icons';
import { WelcomeScreen, PracticeSelectScreen, HomeScreen } from './screens-primary';
import {
  SessionSetupScreen, SessionActiveBreath, SessionActivePure,
  SessionActiveBoard, SessionDoneScreen,
} from './screens-session';
import { LibraryScreen, ProgressScreen, ProfileScreen, PaywallScreen } from './screens-secondary';
import './tokens.css';

function BottomNav({ tab, setTab }) {
  const items = [
    { k: 'home', l: 'Home', I: Icons.home },
    { k: 'library', l: 'Library', I: Icons.compass },
    { k: 'progress', l: 'Progress', I: Icons.chart },
    { k: 'profile', l: 'Profile', I: Icons.user },
  ]
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 55,
        background: 'color-mix(in oklab, var(--p-bg) 88%, transparent)',
        backdropFilter: 'blur(24px) saturate(180%)',
        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        borderTop: '1px solid var(--p-divider)',
        paddingTop: 8,
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 'max(20px, env(safe-area-inset-bottom, 20px))',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
      }}
    >
      {items.map(({ k, l, I }) => {
        const on = tab === k
        return (
          <button
            key={k}
            onClick={() => setTab(k)}
            style={{
              border: 'none',
              background: 'transparent',
              padding: '4px 12px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              color: on ? 'var(--p-text)' : 'var(--p-text-3)',
              cursor: 'pointer',
              WebkitTapHighlightColor: 'transparent',
            }}
          >
            <I size={22} />
            <span
              style={{
                fontSize: 10,
                fontWeight: on ? 600 : 500,
                letterSpacing: '0.01em',
              }}
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
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        background: 'var(--p-bg)',
      }}
    >
      <div style={{ position: 'absolute', inset: 0 }}>{children}</div>
      {bottomNav}
    </div>
  )
}

function App({ start = 'welcome' }) {
  const [screen, setScreen] = useState(start)

  const tabRoutes = ['home', 'library', 'progress', 'profile']
  const isTab = tabRoutes.includes(screen)

  const nav = (to) => {
    if (to === 'session-active') setScreen('session-breath')
    else setScreen(to)
  }

  const screens = {
    welcome: <WelcomeScreen nav={nav} />,
    'practice-select': <PracticeSelectScreen nav={nav} />,
    home: <HomeScreen nav={nav} />,
    library: <LibraryScreen nav={nav} />,
    progress: <ProgressScreen nav={nav} />,
    profile: <ProfileScreen nav={nav} />,
    paywall: <PaywallScreen nav={nav} />,
    'session-setup': <SessionSetupScreen nav={nav} sessionVariant='breath' />,
    'session-breath': <SessionActiveBreath nav={nav} />,
    'session-pure': <SessionActivePure nav={nav} />,
    'session-board': <SessionActiveBoard nav={nav} />,
    'session-done': <SessionDoneScreen nav={nav} />,
  }

  return (
    <PWAFrame
      bottomNav={isTab ? <BottomNav tab={screen} setTab={setScreen} /> : null}
    >
      {screens[screen] || <WelcomeScreen nav={nav} />}
    </PWAFrame>
  )
}

export default function Root() {
  return (
    <div className='gv palette-minimalist' style={{ height: '100%' }}>
      <App start='welcome' />
    </div>
  )
}
