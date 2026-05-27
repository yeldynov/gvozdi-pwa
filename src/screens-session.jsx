/* screens-session.jsx — Session Setup, 3 active session variants, Done */

import { useState, useEffect, useRef } from 'react';
import Icons from './icons';

function fmt(sec) {
  const m = Math.floor(sec / 60), s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

// ─────────────────────────────────────────────────────────────
// Session Setup — pick a duration + intent before launching
// ─────────────────────────────────────────────────────────────
export function SessionSetupScreen({ nav, sessionVariant }) {
  const [dur, setDur] = useState(6);
  const options = [3, 6, 10, 15];

  return (
    <div style={{
      height: '100%', display: 'flex', flexDirection: 'column',
      padding: '56px 24px 32px', background: 'var(--p-bg)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <button onClick={() => nav('home')} style={{ border: 'none', background: 'var(--p-bg-2)', width: 40, height: 40, borderRadius: 999, color: 'var(--p-text)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icons.chevron_left size={20}/>
        </button>
        <div style={{ fontSize: 13, color: 'var(--p-text-2)' }}>Session setup</div>
        <button style={{ border: 'none', background: 'var(--p-bg-2)', width: 40, height: 40, borderRadius: 999, color: 'var(--p-text)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icons.settings size={18}/>
        </button>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 28 }}>
        <div>
          <div style={{ fontSize: 12, color: 'var(--p-text-3)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 8 }}>
            Nail board
          </div>
          <div className="display" style={{ fontSize: 34, lineHeight: 1.1 }}>
            How long today?
          </div>
        </div>

        {/* duration tiles */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
          {options.map(o => {
            const on = dur === o;
            return (
              <button key={o} onClick={() => setDur(o)} style={{
                border: 'none', background: on ? 'var(--p-primary)' : 'var(--p-bg-2)',
                color: on ? 'var(--p-on-primary)' : 'var(--p-text)',
                borderRadius: 'var(--r-md)', padding: '18px 8px',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
                transition: 'background .15s',
              }}>
                <span className="num" style={{ fontSize: 22, fontWeight: 500 }}>{o}</span>
                <span style={{ fontSize: 11, opacity: 0.7 }}>min</span>
              </button>
            );
          })}
        </div>

        {/* custom slider */}
        <div className="card flat">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ fontSize: 13, color: 'var(--p-text-2)' }}>Custom</span>
            <span className="num" style={{ fontSize: 13, color: 'var(--p-text)' }}>{dur}:00</span>
          </div>
          <div style={{ position: 'relative', height: 6, background: 'var(--p-bg-3)', borderRadius: 999 }}>
            <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: `${(dur/30)*100}%`, background: 'var(--p-primary)', borderRadius: 999 }}/>
            <div style={{ position: 'absolute', top: '50%', left: `${(dur/30)*100}%`, transform: 'translate(-50%, -50%)', width: 20, height: 20, borderRadius: 999, background: 'var(--p-surface)', boxShadow: '0 2px 6px rgba(0,0,0,0.12)', border: '1px solid var(--p-divider)' }}/>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 11, color: 'var(--p-text-3)' }}>
            <span>1 min</span><span>15</span><span>30 min</span>
          </div>
        </div>

        {/* options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1, background: 'var(--p-divider)', borderRadius: 'var(--r-md)', overflow: 'hidden' }}>
          {[
            { l: 'Guided audio',    v: 'Off',          I: Icons.pulse },
            { l: 'Ambient sound',   v: 'Rain · quiet', I: Icons.drop },
            { l: 'Breath pacing',   v: '4–7–8',        I: Icons.leaf },
          ].map((r, i) => {
            const Ir = r.I;
            return (
              <div key={i} style={{ padding: '14px 16px', background: 'var(--p-surface)', display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ color: 'var(--p-text-2)', display: 'flex' }}><Ir size={18}/></div>
                <div style={{ flex: 1, fontSize: 14, color: 'var(--p-text)' }}>{r.l}</div>
                <div style={{ fontSize: 13, color: 'var(--p-text-2)' }}>{r.v}</div>
                <div style={{ color: 'var(--p-text-3)', display: 'flex' }}><Icons.chevron_right size={16}/></div>
              </div>
            );
          })}
        </div>
      </div>

      <button className="btn" onClick={() => nav('session-active')}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
        <Icons.play size={16}/> Begin · {dur} min
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Shared timer hook
// ─────────────────────────────────────────────────────────────
function useSessionTimer(totalSec) {
  const [running, setRunning] = useState(true);
  const [elapsed, setElapsed] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    if (!running) return;
    ref.current = setInterval(() => {
      setElapsed(e => Math.min(totalSec, e + 1));
    }, 1000);
    return () => clearInterval(ref.current);
  }, [running, totalSec]);
  return {
    elapsed, remaining: totalSec - elapsed,
    progress: elapsed / totalSec,
    running, toggle: () => setRunning(r => !r),
    reset: () => { setElapsed(0); setRunning(true); },
  };
}

// ─────────────────────────────────────────────────────────────
// Variant A — Breath Ring
// ─────────────────────────────────────────────────────────────
export function SessionActiveBreath({ nav }) {
  const total = 360;
  const t = useSessionTimer(total);
  const R = 124, C = 2 * Math.PI * R;
  const offset = C * (1 - t.progress);

  useEffect(() => { if (t.remaining === 0) nav('session-done'); }, [t.remaining]);

  return (
    <div style={{
      height: '100%', display: 'flex', flexDirection: 'column',
      padding: '52px 24px 28px',
      background: 'radial-gradient(ellipse at 50% 30%, var(--p-bg-2) 0%, var(--p-bg) 60%)',
      animation: 'gv-fade-up .6s ease both',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={() => nav('home')} style={{ border: 'none', background: 'transparent', color: 'var(--p-text-2)', display: 'flex', alignItems: 'center', padding: 0 }}>
          <Icons.close size={22}/>
        </button>
        <div style={{ fontSize: 11, color: 'var(--p-text-3)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
          Breath ring
        </div>
        <button style={{ border: 'none', background: 'transparent', color: 'var(--p-text-2)', display: 'flex', alignItems: 'center', padding: 0 }}>
          <Icons.more size={22}/>
        </button>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24 }}>
        <div style={{ fontSize: 13, color: 'var(--p-text-2)', letterSpacing: '0.06em' }}>
          {t.running ? 'Breathe in · 4' : 'Paused'}
        </div>
        {/* ring */}
        <div style={{ position: 'relative', width: 280, height: 280 }}>
          <svg width="280" height="280" viewBox="0 0 280 280">
            <circle cx="140" cy="140" r={R} fill="none" stroke="var(--p-bg-3)" strokeWidth="2"/>
            <circle cx="140" cy="140" r={R} fill="none" stroke="var(--p-primary)" strokeWidth="2"
              strokeDasharray={C} strokeDashoffset={offset} strokeLinecap="round"
              transform="rotate(-90 140 140)" style={{ transition: 'stroke-dashoffset 1s linear' }}/>
            {Array.from({length: 60}).map((_,i) => {
              const a = (i/60) * 2 * Math.PI - Math.PI/2;
              const r1 = R - 8, r2 = R - 4;
              return <line key={i}
                x1={140 + Math.cos(a)*r1} y1={140 + Math.sin(a)*r1}
                x2={140 + Math.cos(a)*r2} y2={140 + Math.sin(a)*r2}
                stroke="var(--p-text-3)" strokeWidth="1" opacity={i%5===0?0.6:0.25}/>;
            })}
          </svg>
          {/* breath dot */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            width: 110, height: 110, marginLeft: -55, marginTop: -55,
            borderRadius: 999, background: 'var(--p-primary)',
            animation: t.running ? 'gv-breathe 8s ease-in-out infinite' : 'none',
            opacity: 0.4,
          }}/>
          {/* time */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            textAlign: 'center', color: 'var(--p-text)',
          }}>
            <div className="num display" style={{ fontSize: 56, lineHeight: 1, fontWeight: 200, letterSpacing: '-0.02em' }}>
              {fmt(t.remaining)}
            </div>
            <div style={{ fontSize: 11, color: 'var(--p-text-3)', marginTop: 6, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              of {fmt(total)}
            </div>
          </div>
        </div>

        {/* sub-stats */}
        <div style={{ display: 'flex', gap: 24 }}>
          {[
            { l: 'Heart', v: '64', u: 'bpm' },
            { l: 'Breath', v: '6.4', u: 'rpm' },
            { l: 'Steady', v: '92', u: '%' },
          ].map(s => (
            <div key={s.l} style={{ textAlign: 'center' }}>
              <div className="num" style={{ fontSize: 18, fontWeight: 500, color: 'var(--p-text)' }}>{s.v}</div>
              <div style={{ fontSize: 10, color: 'var(--p-text-3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 2 }}>
                {s.l} · {s.u}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* controls */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20 }}>
        <button onClick={t.reset} style={{ border: 'none', background: 'var(--p-bg-2)', color: 'var(--p-text-2)', width: 52, height: 52, borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icons.drop size={20}/>
        </button>
        <button onClick={t.toggle} style={{ border: 'none', background: 'var(--p-primary)', color: 'var(--p-on-primary)', width: 72, height: 72, borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {t.running ? <Icons.pause size={26}/> : <Icons.play size={26}/>}
        </button>
        <button onClick={() => nav('session-done')} style={{ border: 'none', background: 'var(--p-bg-2)', color: 'var(--p-text-2)', width: 52, height: 52, borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icons.check size={20}/>
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Variant B — Pure Numbers
// ─────────────────────────────────────────────────────────────
export function SessionActivePure({ nav }) {
  const total = 360;
  const t = useSessionTimer(total);
  useEffect(() => { if (t.remaining === 0) nav('session-done'); }, [t.remaining]);

  return (
    <div onClick={t.toggle} style={{
      height: '100%', position: 'relative',
      background: 'var(--p-bg)',
      display: 'flex', flexDirection: 'column', cursor: 'pointer',
      animation: 'gv-fade-up .6s ease both',
    }}>
      {/* corner: close */}
      <div style={{ position: 'absolute', top: 52, left: 24, right: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={(e) => { e.stopPropagation(); nav('home'); }} style={{ border: 'none', background: 'transparent', color: 'var(--p-text-3)', display: 'flex', padding: 0 }}>
          <Icons.close size={22}/>
        </button>
        <div style={{ fontSize: 11, color: 'var(--p-text-3)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>Quiet mode</div>
        <button onClick={(e) => { e.stopPropagation(); nav('session-done'); }} style={{ border: 'none', background: 'transparent', color: 'var(--p-text-3)', fontSize: 13, padding: 0 }}>End</button>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 32 }}>
        {/* time — huge */}
        <div style={{ textAlign: 'center' }}>
          <div className="num display" style={{
            fontSize: 132, lineHeight: 0.95, fontWeight: 200, color: 'var(--p-text)',
            letterSpacing: '-0.04em',
          }}>
            {fmt(t.remaining)}
          </div>
        </div>

        {/* thin progress line */}
        <div style={{ width: 240, height: 1, background: 'var(--p-divider)', position: 'relative' }}>
          <div style={{ position: 'absolute', top: -1, left: 0, height: 3, width: `${t.progress * 100}%`, background: 'var(--p-text)', transition: 'width 1s linear' }}/>
        </div>

        <div style={{ fontSize: 13, color: 'var(--p-text-3)', textAlign: 'center', maxWidth: 220, lineHeight: 1.5 }}>
          {t.running ? 'Tap anywhere to pause.' : 'Paused. Tap to resume.'}
        </div>
      </div>

      <div style={{ padding: '0 24px 28px', display: 'flex', justifyContent: 'center', gap: 8, color: 'var(--p-text-3)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        <span>Notifications muted</span><span>·</span><span>Screen will dim</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Variant C — Board View
// ─────────────────────────────────────────────────────────────
export function SessionActiveBoard({ nav }) {
  const total = 360;
  const t = useSessionTimer(total);
  useEffect(() => { if (t.remaining === 0) nav('session-done'); }, [t.remaining]);

  const cols = 11, rows = 17;
  const cellSize = 16;
  const boardW = cols * cellSize, boardH = rows * cellSize;

  return (
    <div style={{
      height: '100%', display: 'flex', flexDirection: 'column',
      padding: '52px 20px 28px', background: 'var(--p-bg)',
      animation: 'gv-fade-up .6s ease both',
    }}>
      {/* top */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <button onClick={() => nav('home')} style={{ border: 'none', background: 'transparent', color: 'var(--p-text-2)', display: 'flex', padding: 0 }}>
          <Icons.close size={22}/>
        </button>
        <div className="chip" style={{ background: 'var(--p-bg-2)', color: 'var(--p-text-2)' }}>
          <span style={{ width: 6, height: 6, borderRadius: 999, background: 'var(--p-error)', display: 'inline-block', animation: 'gv-pulse 2s infinite' }}/>
          LIVE · session 14
        </div>
        <button style={{ border: 'none', background: 'transparent', color: 'var(--p-text-2)', display: 'flex', padding: 0 }}>
          <Icons.more size={22}/>
        </button>
      </div>

      {/* time strip */}
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 16 }}>
        <div>
          <div className="num display" style={{ fontSize: 48, lineHeight: 1, fontWeight: 200 }}>{fmt(t.remaining)}</div>
          <div style={{ fontSize: 11, color: 'var(--p-text-3)', marginTop: 2, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            remaining · {Math.round(t.progress*100)}% done
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div className="num" style={{ fontSize: 22, fontWeight: 500, color: 'var(--p-error)' }}>68 <span style={{ fontSize: 11, color: 'var(--p-text-3)', fontWeight: 400 }}>bpm</span></div>
          <div style={{ fontSize: 11, color: 'var(--p-text-3)', marginTop: 2, letterSpacing: '0.08em' }}>↘ -4 vs start</div>
        </div>
      </div>

      {/* board */}
      <div style={{
        flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'var(--p-bg-2)', borderRadius: 'var(--r-lg)', padding: 18, marginBottom: 14,
      }}>
        <svg width={boardW + 24} height={boardH + 24} viewBox={`-12 -12 ${boardW + 24} ${boardH + 24}`}>
          <rect x="-8" y="-8" width={boardW + 16} height={boardH + 16} rx="6"
            fill="var(--p-illus)" stroke="var(--p-illus-2)" strokeWidth="1"/>
          {Array.from({length: rows}).map((_, r) =>
            Array.from({length: cols}).map((_, c) => {
              const cx = c * cellSize + cellSize/2;
              const cy = r * cellSize + cellSize/2;
              return <g key={`${r}-${c}`}>
                <circle cx={cx} cy={cy} r="2.4" fill="var(--p-illus-2)" opacity="0.5"/>
                <circle cx={cx} cy={cy} r="1.2" fill="var(--p-text)"/>
              </g>;
            })
          )}
          <g opacity="0.35">
            <ellipse cx={boardW*0.5} cy={boardH*0.32} rx="32" ry="44" fill="url(#heat)"/>
            <ellipse cx={boardW*0.5} cy={boardH*0.72} rx="36" ry="50" fill="url(#heat)"/>
          </g>
          <defs>
            <radialGradient id="heat">
              <stop offset="0%" stopColor="var(--p-error)" stopOpacity="0.8"/>
              <stop offset="60%" stopColor="var(--p-warn)" stopOpacity="0.5"/>
              <stop offset="100%" stopColor="var(--p-warn)" stopOpacity="0"/>
            </radialGradient>
          </defs>
        </svg>
        <div style={{ position: 'absolute', top: 14, left: 14, fontSize: 10, color: 'var(--p-text-3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          Pressure map · est.
        </div>
      </div>

      {/* metric row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6, marginBottom: 16 }}>
        {[
          { l: 'HRV',     v: '48',  u: 'ms',   tr: '+3' },
          { l: 'Calm',    v: '7.2', u: '/10',  tr: '+0.4' },
          { l: 'Breath',  v: '6.4', u: 'rpm',  tr: '-1.2' },
        ].map(s => (
          <div key={s.l} className="card" style={{ padding: 12 }}>
            <div style={{ fontSize: 10, color: 'var(--p-text-3)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{s.l}</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 4 }}>
              <div className="num" style={{ fontSize: 18, fontWeight: 500 }}>{s.v}</div>
              <div style={{ fontSize: 10, color: 'var(--p-text-3)' }}>{s.u}</div>
            </div>
            <div style={{ fontSize: 10, color: 'var(--p-success)', marginTop: 2 }}>{s.tr}</div>
          </div>
        ))}
      </div>

      {/* controls */}
      <div style={{ display: 'flex', gap: 10 }}>
        <button onClick={t.toggle} style={{
          flex: 1, border: 'none', borderRadius: 'var(--r-md)',
          padding: '16px', background: 'var(--p-primary)', color: 'var(--p-on-primary)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontSize: 15, fontWeight: 500,
        }}>
          {t.running ? <><Icons.pause size={18}/> Pause</> : <><Icons.play size={18}/> Resume</>}
        </button>
        <button onClick={() => nav('session-done')} style={{
          border: 'none', borderRadius: 'var(--r-md)',
          padding: '0 22px', background: 'var(--p-bg-2)', color: 'var(--p-text)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: 15, fontWeight: 500,
        }}>
          End
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Session Complete
// ─────────────────────────────────────────────────────────────
export function SessionDoneScreen({ nav }) {
  const [mood, setMood] = useState('settled');
  const moods = [
    { k: 'tense',   l: 'Tense' },
    { k: 'mixed',   l: 'Mixed' },
    { k: 'settled', l: 'Settled' },
    { k: 'open',    l: 'Open' },
  ];

  return (
    <div style={{
      height: '100%', display: 'flex', flexDirection: 'column',
      padding: '60px 24px 28px', background: 'var(--p-bg)',
      animation: 'gv-completion .6s ease both',
    }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* big mark */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
          <div style={{
            width: 88, height: 88, borderRadius: 999,
            border: '1.5px solid var(--p-primary)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative',
          }}>
            <Icons.check size={36}/>
            <div style={{ position: 'absolute', inset: -10, borderRadius: 999, border: '1px solid var(--p-divider)' }}/>
            <div style={{ position: 'absolute', inset: -22, borderRadius: 999, border: '1px solid var(--p-divider)' }}/>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ fontSize: 12, color: 'var(--p-text-3)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 8 }}>
            Session 14 · complete
          </div>
          <div className="display" style={{ fontSize: 30, lineHeight: 1.1 }}>
            Six minutes.<br/>Well done.
          </div>
        </div>

        {/* stats row */}
        <div style={{ display: 'flex', justifyContent: 'space-around', padding: '20px 0', borderTop: '1px solid var(--p-divider)', borderBottom: '1px solid var(--p-divider)' }}>
          <div style={{ textAlign: 'center' }}>
            <div className="num display" style={{ fontSize: 32, fontWeight: 300, lineHeight: 1 }}>6:00</div>
            <div style={{ fontSize: 10, color: 'var(--p-text-3)', marginTop: 6, letterSpacing: '0.1em', textTransform: 'uppercase' }}>duration</div>
          </div>
          <div style={{ width: 1, background: 'var(--p-divider)' }}/>
          <div style={{ textAlign: 'center' }}>
            <div className="num display" style={{ fontSize: 32, fontWeight: 300, lineHeight: 1 }}>13</div>
            <div style={{ fontSize: 10, color: 'var(--p-text-3)', marginTop: 6, letterSpacing: '0.1em', textTransform: 'uppercase' }}>day streak</div>
          </div>
          <div style={{ width: 1, background: 'var(--p-divider)' }}/>
          <div style={{ textAlign: 'center' }}>
            <div className="num display" style={{ fontSize: 32, fontWeight: 300, lineHeight: 1 }}>↘ 4</div>
            <div style={{ fontSize: 10, color: 'var(--p-text-3)', marginTop: 6, letterSpacing: '0.1em', textTransform: 'uppercase' }}>resting bpm</div>
          </div>
        </div>

        {/* mood */}
        <div style={{ marginTop: 28 }}>
          <div style={{ fontSize: 13, color: 'var(--p-text-2)', marginBottom: 10 }}>How did it land?</div>
          <div style={{ display: 'flex', gap: 6 }}>
            {moods.map(m => {
              const on = mood === m.k;
              return (
                <button key={m.k} onClick={() => setMood(m.k)} style={{
                  flex: 1, border: '1px solid ' + (on ? 'var(--p-primary)' : 'var(--p-divider)'),
                  background: on ? 'var(--p-primary)' : 'transparent',
                  color: on ? 'var(--p-on-primary)' : 'var(--p-text)',
                  borderRadius: 'var(--r-pill)', padding: '10px 4px',
                  fontSize: 13, fontWeight: 500, transition: 'all .15s',
                }}>{m.l}</button>
              );
            })}
          </div>
        </div>

        {/* journal prompt */}
        <div className="card flat" style={{ padding: 16, marginTop: 14 }}>
          <div style={{ fontSize: 11, color: 'var(--p-text-3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>One honest line</div>
          <div style={{ fontSize: 14, color: 'var(--p-text-2)', fontStyle: 'italic', lineHeight: 1.5 }}>
            "The middle was the hardest. Then it wasn't."
          </div>
          <div style={{ marginTop: 10, fontSize: 12, color: 'var(--p-text-3)', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Icons.edit size={13}/> Edit
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 10 }}>
        <button className="btn ghost" style={{ flex: 1 }} onClick={() => nav('home')}>Done</button>
        <button className="btn" style={{ flex: 1 }} onClick={() => nav('progress')}>See progress</button>
      </div>
    </div>
  );
}
