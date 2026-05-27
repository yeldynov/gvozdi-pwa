/* screens-secondary.jsx — Library, Progress, Profile, Paywall */

import { useState } from 'react';
import Icons from './icons';
import { WeeklyChart } from './screens-primary';

// ─────────────────────────────────────────────────────────────
// Library — activity catalogue with categories
// ─────────────────────────────────────────────────────────────
export function LibraryScreen({ nav }) {
  const [cat, setCat] = useState('all');
  const cats = [
    { k: 'all',    l: 'All' },
    { k: 'board',  l: 'Nail board' },
    { k: 'breath', l: 'Breath' },
    { k: 'cold',   l: 'Cold' },
    { k: 'sit',    l: 'Sitting' },
  ];

  const featured = {
    title: 'Standing through the second wave',
    sub: 'Guided · 12 min · intermediate',
    desc: 'For when you know what to do but still want a voice in your ear.',
  };

  const items = [
    { t: 'Box breathing', sub: 'Breath · beginner', m: 4, tone: 1, tags: ['Calm', 'Anxiety'], I: Icons.drop, cat: 'breath' },
    { t: 'Standing 6:00', sub: 'Nail board · all levels', m: 6, tone: 2, tags: ['Daily'], I: Icons.nails, cat: 'board' },
    { t: 'Cold shower protocol', sub: 'Cold · intermediate', m: 3, tone: 3, tags: ['Recovery'], I: Icons.spark, cat: 'cold' },
    { t: '4-7-8 winddown', sub: 'Breath · all levels', m: 5, tone: 1, tags: ['Sleep'], I: Icons.moon, cat: 'breath' },
    { t: 'Standing 12:00', sub: 'Nail board · advanced', m: 12, tone: 2, tags: ['Willpower'], I: Icons.nails, cat: 'board' },
    { t: 'Open awareness sit', sub: 'Sitting · all levels', m: 10, tone: 1, tags: ['Calm'], I: Icons.leaf, cat: 'sit' },
  ];
  const filtered = cat === 'all' ? items : items.filter(i => i.cat === cat);

  return (
    <div style={{ height: '100%', overflow: 'auto', background: 'var(--p-bg)' }}>
      <div style={{ padding: '52px 0 100px' }}>
        {/* header */}
        <div style={{ padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
          <div className="display" style={{ fontSize: 28, lineHeight: 1.1 }}>Library</div>
          <div style={{ display: 'flex', gap: 12, color: 'var(--p-text-2)' }}>
            <Icons.search/>
            <Icons.more/>
          </div>
        </div>

        {/* categories */}
        <div style={{ display: 'flex', gap: 8, padding: '0 24px 18px', overflowX: 'auto' }}>
          {cats.map(c => (
            <button key={c.k} onClick={() => setCat(c.k)}
              className={'chip ' + (cat === c.k ? 'on' : '')}
              style={{ border: 'none', padding: '8px 14px', fontSize: 13, whiteSpace: 'nowrap' }}>
              {c.l}
            </button>
          ))}
        </div>

        {/* featured */}
        <div style={{ padding: '0 24px 24px' }}>
          <div style={{ fontSize: 11, color: 'var(--p-text-3)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>
            Featured this week
          </div>
          <div style={{
            position: 'relative', borderRadius: 'var(--r-lg)', overflow: 'hidden',
            height: 200,
            background: 'linear-gradient(160deg, var(--p-illus) 0%, var(--p-illus-2) 100%)',
          }}>
            <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.4 }}>
              {Array.from({length: 80}).map((_,i) => (
                <circle key={i} cx={(i%10)*38 + 19} cy={Math.floor(i/10)*30 + 15} r="1.6" fill="var(--p-text)"/>
              ))}
            </svg>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.35), transparent 60%)' }}/>
            <div style={{ position: 'absolute', left: 18, right: 18, bottom: 18, color: '#fff' }}>
              <div style={{ fontSize: 11, opacity: 0.8, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 4 }}>
                Guided · 12 min
              </div>
              <div className="display" style={{ fontSize: 22, lineHeight: 1.15, fontWeight: 400 }}>
                {featured.title}
              </div>
              <div style={{ fontSize: 12, opacity: 0.85, marginTop: 6 }}>{featured.desc}</div>
            </div>
            <button style={{
              position: 'absolute', top: 16, right: 16,
              border: 'none', background: 'rgba(255,255,255,0.95)', color: '#1a1815',
              width: 40, height: 40, borderRadius: 999,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icons.play size={16}/>
            </button>
          </div>
        </div>

        {/* list */}
        <div style={{ padding: '0 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--p-text)' }}>
              {cat === 'all' ? 'All practices' : cats.find(c => c.k === cat).l}
            </div>
            <div style={{ fontSize: 12, color: 'var(--p-text-3)' }}>{filtered.length} items</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {filtered.map((it, i) => {
              const I = it.I;
              const swatch = it.tone === 1 ? 'var(--p-accent)' : it.tone === 2 ? 'var(--p-illus-2)' : 'var(--p-primary)';
              return (
                <div key={i} className="card" style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 12 }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 'var(--r-sm)',
                    background: swatch,
                    color: it.tone === 3 ? 'var(--p-on-primary)' : 'var(--p-text)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <I size={20}/>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 3, lineHeight: 1.2 }}>{it.t}</div>
                    <div style={{ fontSize: 12, color: 'var(--p-text-2)' }}>{it.sub}</div>
                    <div style={{ display: 'flex', gap: 4, marginTop: 6 }}>
                      {it.tags.map(t => (
                        <span key={t} className="chip" style={{ padding: '3px 8px', fontSize: 10 }}>{t}</span>
                      ))}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div className="num" style={{ fontSize: 14, fontWeight: 500 }}>{it.m}</div>
                    <div style={{ fontSize: 10, color: 'var(--p-text-3)' }}>min</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Progress — charts + milestones
// ─────────────────────────────────────────────────────────────
export function ProgressScreen({ nav }) {
  const [period, setPeriod] = useState('week');
  const bars = [4, 6, 0, 5, 7, 8, 6];
  const max = 10;
  const mood = [62, 68, 65, 75, 78, 86, 84];
  const moodMin = 50, moodMax = 95;
  const W = 320, H = 80;
  const pts = mood.map((v, i) => {
    const x = (i / (mood.length - 1)) * W;
    const y = H - ((v - moodMin) / (moodMax - moodMin)) * H;
    return [x, y];
  });
  const path = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
  const area = path + ` L ${W} ${H} L 0 ${H} Z`;

  return (
    <div style={{ height: '100%', overflow: 'auto', background: 'var(--p-bg)' }}>
      <div style={{ padding: '52px 24px 100px' }}>
        {/* header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
          <div className="display" style={{ fontSize: 28, lineHeight: 1.1 }}>Progress</div>
          <div style={{ display: 'flex', gap: 12, color: 'var(--p-text-2)' }}>
            <Icons.settings/>
          </div>
        </div>

        {/* period toggle */}
        <div style={{ display: 'flex', background: 'var(--p-bg-2)', borderRadius: 'var(--r-md)', padding: 4, marginBottom: 20 }}>
          {['week','month','year'].map(p => (
            <button key={p} onClick={() => setPeriod(p)} style={{
              flex: 1, border: 'none', borderRadius: 'var(--r-sm)', padding: '10px',
              background: period === p ? 'var(--p-surface)' : 'transparent',
              color: period === p ? 'var(--p-text)' : 'var(--p-text-2)',
              fontSize: 13, fontWeight: 500, textTransform: 'capitalize',
              boxShadow: period === p ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
              transition: 'all .15s',
            }}>{p}</button>
          ))}
        </div>

        {/* summary tiles */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 20 }}>
          {[
            { l: 'Total minutes', v: '36', sub: '↑ 12% vs last week', col: 'var(--p-text)' },
            { l: 'Current streak', v: '12', sub: 'days · top 5% this month', col: 'var(--p-streak)' },
          ].map(s => (
            <div key={s.l} className="card flat" style={{ padding: 16 }}>
              <div style={{ fontSize: 11, color: 'var(--p-text-3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>{s.l}</div>
              <div className="num display" style={{ fontSize: 36, lineHeight: 1, fontWeight: 300, color: s.col }}>{s.v}</div>
              <div style={{ fontSize: 11, color: 'var(--p-text-3)', marginTop: 6 }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* minutes chart */}
        <div className="card" style={{ padding: 18, marginBottom: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>Minutes on the board</div>
              <div style={{ fontSize: 11, color: 'var(--p-text-3)', marginTop: 2 }}>Daily practice this week</div>
            </div>
            <div style={{ color: 'var(--p-text-3)' }}><Icons.more size={16}/></div>
          </div>
          <WeeklyChart data={bars} max={max} height={80}/>
        </div>

        {/* mood stability */}
        <div className="card" style={{ padding: 18, marginBottom: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>How it lands</div>
              <div style={{ fontSize: 11, color: 'var(--p-text-3)', marginTop: 2 }}>Settled-rate · 7 days</div>
            </div>
            <span className="chip" style={{ background: 'var(--p-success)', color: 'var(--p-bg)', padding: '4px 8px', fontSize: 11 }}>+18%</span>
          </div>
          <svg viewBox={`0 0 ${W} ${H + 24}`} width="100%" height="120" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
            <defs>
              <linearGradient id="gv-mood-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--p-success)" stopOpacity="0.32"/>
                <stop offset="100%" stopColor="var(--p-success)" stopOpacity="0"/>
              </linearGradient>
            </defs>
            <path d={area} fill="url(#gv-mood-fill)"/>
            <path d={path} fill="none" stroke="var(--p-success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            {pts.map((p, i) => (
              <circle key={i} cx={p[0]} cy={p[1]} r={i === pts.length - 1 ? 4 : 2.5}
                fill={i === pts.length - 1 ? 'var(--p-success)' : 'var(--p-surface)'}
                stroke="var(--p-success)" strokeWidth="1.5"/>
            ))}
          </svg>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: 10, color: 'var(--p-text-3)' }}>
            {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d => <span key={d}>{d}</span>)}
          </div>
        </div>

        {/* milestones */}
        <div style={{ fontSize: 12, color: 'var(--p-text-2)', letterSpacing: '0.1em', textTransform: 'uppercase', margin: '8px 4px 10px' }}>
          Recent milestones
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { I: Icons.flame,  t: 'Twelve days in a row',     s: 'Yesterday', ring: 'var(--p-streak)' },
            { I: Icons.spark,  t: '10 hours total practice',  s: 'Mon · Oct 16', ring: 'var(--p-accent)' },
            { I: Icons.shield, t: 'First 12-minute session',  s: 'Sun · Oct 15', ring: 'var(--p-success)' },
          ].map((m, i) => {
            const I = m.I;
            return (
              <div key={i} className="card" style={{ padding: 14, display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 999,
                  border: '1.5px solid ' + m.ring, color: m.ring,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <I size={18}/>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{m.t}</div>
                  <div style={{ fontSize: 11, color: 'var(--p-text-3)', marginTop: 2 }}>{m.s}</div>
                </div>
                <Icons.chevron_right size={16} style={{ color: 'var(--p-text-3)' }}/>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Profile — identity + goals + settings + sign out
// ─────────────────────────────────────────────────────────────
export function ProfileScreen({ nav }) {
  return (
    <div style={{ height: '100%', overflow: 'auto', background: 'var(--p-bg)' }}>
      <div style={{ padding: '52px 0 100px' }}>
        {/* header */}
        <div style={{ padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <button style={{ border: 'none', background: 'transparent', color: 'var(--p-text-2)', padding: 0, display: 'flex' }}>
            <Icons.chevron_left size={22}/>
          </button>
          <div style={{ fontSize: 14, color: 'var(--p-text)', fontWeight: 500 }}>Profile</div>
          <button style={{ border: 'none', background: 'transparent', color: 'var(--p-text-2)', padding: 0, display: 'flex' }}>
            <Icons.settings size={20}/>
          </button>
        </div>

        {/* identity */}
        <div style={{ padding: '0 24px 24px', textAlign: 'center' }}>
          <div style={{
            width: 80, height: 80, borderRadius: 999, margin: '0 auto 14px',
            background: 'linear-gradient(135deg, var(--p-illus) 0%, var(--p-illus-2) 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 28, fontWeight: 500, color: 'var(--p-text)',
            fontFamily: 'var(--f-display)',
          }}>A</div>
          <div className="display" style={{ fontSize: 22, lineHeight: 1.15, marginBottom: 4 }}>Alex Petrova</div>
          <div style={{ fontSize: 13, color: 'var(--p-text-2)', fontStyle: 'italic' }}>"Show up before motivation does."</div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 12 }}>
            <span className="chip">Level 3 · Practitioner</span>
            <span className="chip" style={{ background: 'var(--p-streak)', color: 'var(--p-on-primary)' }}>12 day streak</span>
          </div>
        </div>

        {/* current goals */}
        <div style={{ padding: '0 24px 8px' }}>
          <div style={{ fontSize: 12, color: 'var(--p-text-2)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>
            Current goals
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { l: 'Daily 6-min board', v: 12, t: 30, I: Icons.nails },
              { l: 'Box breathing 3×/week', v: 2, t: 3, I: Icons.drop },
            ].map((g, i) => {
              const I = g.I;
              const pct = g.v / g.t;
              return (
                <div key={i} className="card" style={{ padding: 14 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: 8, background: 'var(--p-bg-2)',
                      color: 'var(--p-text-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}>
                      <I size={16}/>
                    </div>
                    <div style={{ flex: 1, fontSize: 14, fontWeight: 500 }}>{g.l}</div>
                    <div className="num" style={{ fontSize: 13, color: 'var(--p-text-2)' }}>
                      <span style={{ color: 'var(--p-text)', fontWeight: 500 }}>{g.v}</span>/{g.t}
                    </div>
                  </div>
                  <div style={{ height: 4, background: 'var(--p-bg-3)', borderRadius: 999, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${pct * 100}%`, background: 'var(--p-success)', borderRadius: 999 }}/>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* achievements */}
        <div style={{ padding: '24px 24px 8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
            <div style={{ fontSize: 12, color: 'var(--p-text-2)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Achievements
            </div>
            <div style={{ fontSize: 12, color: 'var(--p-text-3)' }}>View all</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
            {[
              { I: Icons.flame,  l: 'Streak 7',    unlocked: true,  ring: 'var(--p-streak)' },
              { I: Icons.shield, l: '10 hours',    unlocked: true,  ring: 'var(--p-success)' },
              { I: Icons.star,   l: 'Early bird',  unlocked: true,  ring: 'var(--p-accent)' },
              { I: Icons.lock,   l: 'Locked',      unlocked: false, ring: 'var(--p-divider)' },
            ].map((a, i) => {
              const I = a.I;
              return (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{
                    width: 56, height: 56, margin: '0 auto 6px', borderRadius: 999,
                    border: '1.5px solid ' + a.ring,
                    background: a.unlocked ? 'var(--p-surface)' : 'transparent',
                    color: a.unlocked ? a.ring : 'var(--p-text-3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    opacity: a.unlocked ? 1 : 0.5,
                  }}>
                    <I size={22}/>
                  </div>
                  <div style={{ fontSize: 11, color: a.unlocked ? 'var(--p-text-2)' : 'var(--p-text-3)' }}>{a.l}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* settings */}
        <div style={{ padding: '24px 24px 8px' }}>
          <div style={{ fontSize: 12, color: 'var(--p-text-2)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>
            Settings
          </div>
          <div style={{ background: 'var(--p-surface)', borderRadius: 'var(--r-md)', overflow: 'hidden', border: '1px solid var(--p-divider)' }}>
            {[
              { l: 'Daily reminder', r: '8:30 AM', toggle: true, on: true,  I: Icons.bell },
              { l: 'Quiet mode',     r: 'Auto',     toggle: true, on: false, I: Icons.moon },
              { l: 'Connected: Oura', r: 'Connected', toggle: false, I: Icons.pulse },
              { l: 'Gvozdi+',        r: 'Free plan · upgrade', toggle: false, I: Icons.star, onClick: () => nav('paywall') },
            ].map((s, i, a) => {
              const I = s.I;
              return (
                <div key={i} onClick={s.onClick} style={{
                  padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 14,
                  borderBottom: i < a.length - 1 ? '1px solid var(--p-divider)' : 'none',
                  cursor: s.onClick ? 'pointer' : 'default',
                }}>
                  <div style={{ color: 'var(--p-text-2)', display: 'flex' }}><I size={18}/></div>
                  <div style={{ flex: 1, fontSize: 14 }}>{s.l}</div>
                  {s.toggle ? (
                    <div style={{
                      width: 36, height: 20, borderRadius: 999,
                      background: s.on ? 'var(--p-primary)' : 'var(--p-bg-3)',
                      position: 'relative', transition: 'background .15s',
                    }}>
                      <div style={{
                        position: 'absolute', top: 2, left: s.on ? 18 : 2,
                        width: 16, height: 16, borderRadius: 999,
                        background: 'var(--p-surface)', boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
                        transition: 'left .15s',
                      }}/>
                    </div>
                  ) : (
                    <>
                      <div style={{ fontSize: 12, color: 'var(--p-text-2)' }}>{s.r}</div>
                      <Icons.chevron_right size={14} style={{ color: 'var(--p-text-3)' }}/>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ padding: '20px 24px 0' }}>
          <button className="btn ghost" style={{ color: 'var(--p-text-2)' }}>Sign out</button>
          <div style={{ textAlign: 'center', fontSize: 11, color: 'var(--p-text-3)', marginTop: 18 }}>
            gvozdi v1.0 · made calmly
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Paywall — Gvozdi+ upgrade
// ─────────────────────────────────────────────────────────────
export function PaywallScreen({ nav }) {
  const [plan, setPlan] = useState('annual');
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--p-bg)' }}>
      <div style={{ padding: '52px 24px 24px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={() => nav('profile')} style={{ border: 'none', background: 'transparent', color: 'var(--p-text-2)', padding: 0, display: 'flex' }}>
          <Icons.close size={22}/>
        </button>
        <button style={{ border: 'none', background: 'transparent', color: 'var(--p-text-2)', padding: 0, fontSize: 13 }}>Restore</button>
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: '0 24px 16px' }}>
        {/* mark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 999,
            border: '1.5px solid var(--p-text)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{ width: 5, height: 5, borderRadius: 999, background: 'var(--p-text)' }} />
          </div>
          <div style={{ fontFamily: 'var(--f-display)', fontSize: 18 }}>gvozdi+</div>
        </div>

        <div className="display" style={{ fontSize: 36, lineHeight: 1.05, marginBottom: 12 }}>
          A small fee.<br/>
          <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--p-text-2)' }}>A long practice.</em>
        </div>
        <div style={{ fontSize: 14, color: 'var(--p-text-2)', lineHeight: 1.55, marginBottom: 24 }}>
          Free forever for daily sessions. <strong style={{ color: 'var(--p-text)' }}>Gvozdi+</strong> opens 80+ guided sessions, multi-device sync, and the data export your therapist actually wants.
        </div>

        {/* feature list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 28 }}>
          {[
            { I: Icons.library, t: '80+ guided audio sessions',  s: 'For the days when "just stand" isn\'t enough.' },
            { I: Icons.chart,   t: 'Full history & data export', s: 'CSV, Apple Health, Oura. Your data, yours.' },
            { I: Icons.heart,   t: 'Biometric pairing',          s: 'HRV-aware pacing. Live heart rate during sessions.' },
            { I: Icons.leaf,    t: 'Soundscapes & breath guides',s: 'Eight tracks, low-frequency, headphone-friendly.' },
          ].map((f, i) => {
            const I = f.I;
            return (
              <div key={i} style={{ display: 'flex', gap: 14 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                  background: 'var(--p-bg-2)', color: 'var(--p-text)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <I size={16}/>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 3 }}>{f.t}</div>
                  <div style={{ fontSize: 12, color: 'var(--p-text-2)', lineHeight: 1.5 }}>{f.s}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* plans */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { k: 'annual',  l: 'Annual',  p: '$3.50/mo', sub: 'billed $42/yr · best value', save: 'Save 41%' },
            { k: 'monthly', l: 'Monthly', p: '$5.99/mo', sub: 'billed monthly · cancel any time', save: null },
          ].map(o => {
            const on = plan === o.k;
            return (
              <button key={o.k} onClick={() => setPlan(o.k)} style={{
                border: '1.5px solid ' + (on ? 'var(--p-primary)' : 'var(--p-divider)'),
                background: on ? 'var(--p-bg-2)' : 'var(--p-surface)',
                color: 'var(--p-text)', borderRadius: 'var(--r-md)', padding: 16,
                display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left',
                transition: 'all .15s',
              }}>
                <div style={{
                  width: 20, height: 20, borderRadius: 999,
                  border: '1.5px solid ' + (on ? 'var(--p-primary)' : 'var(--p-divider)'),
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  {on && <div style={{ width: 10, height: 10, borderRadius: 999, background: 'var(--p-primary)' }}/>}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ fontSize: 15, fontWeight: 600 }}>{o.l}</div>
                    {o.save && <span className="chip" style={{ background: 'var(--p-success)', color: 'var(--p-bg)', fontSize: 10, padding: '2px 8px' }}>{o.save}</span>}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--p-text-2)', marginTop: 2 }}>{o.sub}</div>
                </div>
                <div className="num" style={{ fontSize: 15, fontWeight: 500 }}>{o.p}</div>
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ padding: '12px 24px 28px' }}>
        <button className="btn" onClick={() => nav('home')}>
          Try 7 days free
        </button>
        <div style={{ textAlign: 'center', fontSize: 11, color: 'var(--p-text-3)', marginTop: 12 }}>
          No charge for 7 days. Cancel any time. Terms · Privacy.
        </div>
      </div>
    </div>
  );
}
