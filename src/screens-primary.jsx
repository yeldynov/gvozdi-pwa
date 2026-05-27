/* screens-primary.jsx — Welcome, PracticeSelection, Home */

import { useState, useEffect, useRef } from 'react';
import Icons from './icons';

// ─────────────────────────────────────────────────────────────
// Welcome — first-run signup
// ─────────────────────────────────────────────────────────────
export function WelcomeScreen({ nav }) {
  return (
    <div style={{
      height: '100%', display: 'flex', flexDirection: 'column',
      padding: '64px 28px 36px', background: 'var(--p-bg)',
      animation: 'gv-fade-up .5s ease both',
    }}>
      {/* mark */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{
          width: 28, height: 28, borderRadius: 999,
          border: '1.5px solid var(--p-text)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{ width: 5, height: 5, borderRadius: 999, background: 'var(--p-text)' }} />
        </div>
        <div style={{ fontFamily: 'var(--f-display)', fontWeight: 400, fontSize: 18, letterSpacing: '0.02em' }}>
          gvozdi
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 16, marginTop: -40 }}>
        <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--p-text-2)', letterSpacing: '0.16em', textTransform: 'uppercase' }}>
          A practice, not an app
        </div>
        <div className="display" style={{ fontSize: 54, lineHeight: 1.02, color: 'var(--p-text)' }}>
          Stand on<br/>nails. <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--p-text-2)' }}>Quietly.</em>
        </div>
        <div style={{ fontSize: 15, lineHeight: 1.55, color: 'var(--p-text-2)', maxWidth: 280, marginTop: 8 }}>
          A timer, a streak, and a few honest words about how it felt. Nothing else.
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <button className="btn" onClick={() => nav('practice-select')}>
          Begin your practice
        </button>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn ghost" style={{ flex: 1, padding: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <Icons.apple size={18}/> Apple
          </button>
          <button className="btn ghost" style={{ flex: 1, padding: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <Icons.google size={18}/> Google
          </button>
        </div>
        <div style={{ textAlign: 'center', fontSize: 13, color: 'var(--p-text-2)', marginTop: 4 }}>
          Already practicing? <span style={{ color: 'var(--p-text)', borderBottom: '1px solid var(--p-text)', paddingBottom: 1 }}>Sign in</span>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Practice Selection — onboarding step 2
// ─────────────────────────────────────────────────────────────
export function PracticeSelectScreen({ nav }) {
  const [picked, setPicked] = useState(['nails', 'breath']);
  const toggle = (k) => setPicked(p => p.includes(k) ? p.filter(x => x !== k) : [...p, k]);

  const opts = [
    { k: 'nails',   label: 'Nail board',    sub: 'The main practice', icon: Icons.nails },
    { k: 'breath',  label: 'Breathwork',    sub: 'Box · 4-7-8',       icon: Icons.drop },
    { k: 'cold',    label: 'Cold exposure', sub: 'Shower · ice bath', icon: Icons.spark },
    { k: 'sit',     label: 'Sitting',       sub: 'Silent meditation', icon: Icons.moon },
    { k: 'walk',    label: 'Mindful walk',  sub: 'Outdoor presence',  icon: Icons.leaf },
    { k: 'journal', label: 'Journaling',    sub: 'A few honest lines',icon: Icons.edit },
  ];

  return (
    <div style={{
      height: '100%', display: 'flex', flexDirection: 'column',
      padding: '56px 24px 32px', background: 'var(--p-bg)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
        <button onClick={() => nav('welcome')} style={{ border: 'none', background: 'transparent', color: 'var(--p-text-2)', display: 'flex', alignItems: 'center', padding: 0 }}>
          <Icons.chevron_left size={24}/>
        </button>
        <div style={{ display: 'flex', gap: 4 }}>
          <div style={{ width: 24, height: 3, borderRadius: 2, background: 'var(--p-text)' }}/>
          <div style={{ width: 24, height: 3, borderRadius: 2, background: 'var(--p-text)' }}/>
          <div style={{ width: 24, height: 3, borderRadius: 2, background: 'var(--p-bg-3)' }}/>
        </div>
        <div style={{ fontSize: 14, color: 'var(--p-text-2)' }}>Skip</div>
      </div>

      <div style={{ marginBottom: 24 }}>
        <div className="display" style={{ fontSize: 32, lineHeight: 1.1, marginBottom: 8 }}>Your practice</div>
        <div style={{ fontSize: 14, color: 'var(--p-text-2)', lineHeight: 1.5 }}>
          Pick what you actually do. You can change this any time — the app won't argue.
        </div>
      </div>

      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, alignContent: 'start' }}>
        {opts.map(o => {
          const on = picked.includes(o.k);
          const I = o.icon;
          return (
            <button key={o.k} onClick={() => toggle(o.k)} style={{
              background: on ? 'var(--p-primary)' : 'var(--p-surface)',
              color: on ? 'var(--p-on-primary)' : 'var(--p-text)',
              border: '1px solid ' + (on ? 'var(--p-primary)' : 'var(--p-divider)'),
              borderRadius: 'var(--r-md)', padding: 16,
              display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
              gap: 10, minHeight: 116, textAlign: 'left',
              transition: 'all .15s',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
                <I size={22}/>
                <div style={{
                  width: 18, height: 18, borderRadius: 999,
                  border: '1.5px solid ' + (on ? 'var(--p-on-primary)' : 'var(--p-divider)'),
                  background: on ? 'var(--p-on-primary)' : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {on && <div style={{ color: 'var(--p-primary)', display: 'flex' }}><Icons.check size={12}/></div>}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 2 }}>{o.label}</div>
                <div style={{ fontSize: 12, opacity: 0.7 }}>{o.sub}</div>
              </div>
            </button>
          );
        })}
      </div>

      <button className="btn" onClick={() => nav('home')} style={{ marginTop: 20 }}>
        Continue
      </button>
      <div style={{ textAlign: 'center', fontSize: 12, color: 'var(--p-text-3)', marginTop: 12 }}>
        You can change these later in settings.
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Weekly bar chart (inline SVG, palette-aware)
// ─────────────────────────────────────────────────────────────
export function WeeklyChart({ data, max = 30, height = 72, accent }) {
  const days = ['M','T','W','T','F','S','S'];
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: height + 22 }}>
      {data.map((v, i) => (
        <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <div style={{ flex: 1, width: '100%', display: 'flex', alignItems: 'flex-end' }}>
            <div style={{
              width: '100%',
              height: `${Math.max(4, (v / max) * height)}px`,
              background: v === 0 ? 'var(--p-bg-3)' : (accent || 'var(--p-text)'),
              borderRadius: 4,
              opacity: v === 0 ? 0.5 : (i === 6 ? 1 : 0.85),
            }}/>
          </div>
          <div style={{ fontSize: 10, color: 'var(--p-text-3)', fontWeight: 500 }}>{days[i]}</div>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Home — dashboard
// ─────────────────────────────────────────────────────────────
export function HomeScreen({ nav }) {
  const mood = useState('settled');
  const [, setM] = mood; const [moodV] = mood;
  const moodOpts = [
    { k: 'tense',   label: 'Tense',   I: Icons.spark },
    { k: 'neutral', label: 'Neutral', I: Icons.moon },
    { k: 'settled', label: 'Settled', I: Icons.leaf },
    { k: 'open',    label: 'Open',    I: Icons.heart },
  ];

  return (
    <div style={{ height: '100%', overflow: 'auto', background: 'var(--p-bg)' }}>
      <div style={{ padding: '52px 24px 100px', display: 'flex', flexDirection: 'column', gap: 22 }}>
        {/* top bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontFamily: 'var(--f-display)', fontSize: 18, fontWeight: 400, letterSpacing: '0.02em' }}>gvozdi</div>
          <div style={{ display: 'flex', gap: 14, color: 'var(--p-text-2)' }}>
            <Icons.search/>
            <Icons.bell/>
          </div>
        </div>

        {/* greeting */}
        <div>
          <div style={{ fontSize: 12, color: 'var(--p-text-3)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 8 }}>
            Monday · Oct 23
          </div>
          <div className="display" style={{ fontSize: 30, lineHeight: 1.15 }}>
            Good morning,<br/>Alex.
          </div>
        </div>

        {/* streak */}
        <div className="card flat" style={{ padding: 18, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 12, color: 'var(--p-text-2)', marginBottom: 4 }}>Current streak</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <div className="num display" style={{ fontSize: 38, lineHeight: 1, fontWeight: 300 }}>12</div>
              <div style={{ fontSize: 13, color: 'var(--p-text-2)' }}>days</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            {Array.from({length: 7}).map((_,i) => (
              <div key={i} style={{
                width: 8, height: 28, borderRadius: 4,
                background: i < 5 ? 'var(--p-streak)' : 'var(--p-bg-3)',
              }}/>
            ))}
          </div>
        </div>

        {/* mood */}
        <div>
          <div style={{ fontSize: 13, color: 'var(--p-text-2)', marginBottom: 10 }}>How does it land?</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
            {moodOpts.map(o => {
              const on = moodV === o.k;
              const I = o.I;
              return (
                <button key={o.k} onClick={() => setM(o.k)} style={{
                  border: 'none', background: on ? 'var(--p-primary)' : 'var(--p-bg-2)',
                  color: on ? 'var(--p-on-primary)' : 'var(--p-text-2)',
                  borderRadius: 'var(--r-sm)', padding: '12px 4px 10px',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                  transition: 'background .15s',
                }}>
                  <I size={18}/>
                  <span style={{ fontSize: 11, fontWeight: 500 }}>{o.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* today's practice CTA */}
        <div style={{
          background: 'var(--p-primary)', color: 'var(--p-on-primary)',
          borderRadius: 'var(--r-lg)', padding: 22,
          display: 'flex', flexDirection: 'column', gap: 16, position: 'relative', overflow: 'hidden',
        }}>
          {/* nail dots watermark */}
          <svg width="120" height="120" viewBox="0 0 120 120" style={{ position: 'absolute', right: -20, top: -20, opacity: 0.12 }}>
            {Array.from({length: 64}).map((_,i) => (
              <circle key={i} cx={(i % 8) * 16 + 4} cy={Math.floor(i/8) * 16 + 4} r="1.4" fill="currentColor"/>
            ))}
          </svg>
          <div style={{ position: 'relative' }}>
            <div style={{ fontSize: 11, opacity: 0.65, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 6 }}>
              Today's practice
            </div>
            <div className="display" style={{ fontSize: 26, lineHeight: 1.1, fontWeight: 300 }}>
              6 minutes<br/>on the board
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', marginTop: 4 }}>
            <div style={{ fontSize: 12, opacity: 0.7 }}>Last time · 5:30 · settled</div>
            <button onClick={() => nav('session-setup')} style={{
              border: 'none', background: 'var(--p-on-primary)', color: 'var(--p-primary)',
              padding: '12px 18px', borderRadius: 'var(--r-pill)', display: 'flex', alignItems: 'center', gap: 6,
              fontSize: 14, fontWeight: 500,
            }}>
              Begin <Icons.chevron_right size={14}/>
            </button>
          </div>
        </div>

        {/* recommended */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
            <div style={{ fontSize: 13, color: 'var(--p-text-2)' }}>Suggested · short reads</div>
            <div style={{ fontSize: 12, color: 'var(--p-text-3)' }}>See all</div>
          </div>
          <div style={{ display: 'flex', gap: 10, overflowX: 'auto', marginRight: -24, paddingRight: 24 }}>
            {[
              { t: 'Why the board hurts less on day 12', s: '3 min · essay', tone: 1 },
              { t: 'A small guide to box breathing', s: '2 min · audio', tone: 2 },
              { t: 'On not tracking everything', s: '5 min · essay', tone: 1 },
            ].map((c, i) => (
              <div key={i} className="card" style={{ minWidth: 200, padding: 0, overflow: 'hidden', border: '1px solid var(--p-divider)' }}>
                <div style={{
                  height: 100,
                  background: c.tone === 1
                    ? 'linear-gradient(135deg, var(--p-illus) 0%, var(--p-illus-2) 100%)'
                    : 'linear-gradient(135deg, var(--p-bg-3) 0%, var(--p-illus) 100%)',
                  position: 'relative',
                }}>
                  <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.35 }}>
                    {Array.from({length: 12}).map((_,k) => (
                      <circle key={k} cx={20 + (k%4)*48} cy={20 + Math.floor(k/4)*32} r="1.6" fill="var(--p-text)"/>
                    ))}
                  </svg>
                </div>
                <div style={{ padding: 14 }}>
                  <div style={{ fontSize: 14, fontWeight: 500, lineHeight: 1.3, marginBottom: 6, color: 'var(--p-text)' }}>{c.t}</div>
                  <div style={{ fontSize: 11, color: 'var(--p-text-3)' }}>{c.s}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* this week */}
        <div className="card flat" style={{ padding: 18 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
            <div style={{ fontSize: 13, color: 'var(--p-text-2)' }}>This week</div>
            <div style={{ fontSize: 11, color: 'var(--p-text-3)' }}>minutes per day</div>
          </div>
          <WeeklyChart data={[4, 6, 0, 5, 7, 8, 6]} max={10}/>
          <div className="divider" style={{ margin: '14px -18px 14px' }}/>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 11, color: 'var(--p-text-3)' }}>This week</div>
              <div className="num" style={{ fontSize: 18, fontWeight: 500, marginTop: 2 }}>36 <span style={{ fontSize: 11, color: 'var(--p-text-3)', fontWeight: 400 }}>min</span></div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: 'var(--p-text-3)' }}>Sessions</div>
              <div className="num" style={{ fontSize: 18, fontWeight: 500, marginTop: 2 }}>6</div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: 'var(--p-text-3)' }}>Avg. mood</div>
              <div style={{ fontSize: 14, fontWeight: 500, marginTop: 4, color: 'var(--p-success)' }}>Settled</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
