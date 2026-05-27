import { useState } from 'react';
import Icons from '../icons';

export function PaywallScreen({ nav }) {
  const [plan, setPlan] = useState('annual');
  return (
    <div className="h-full flex flex-col bg-bg">
      <div className="px-6 flex justify-between items-center pt-[52px] pb-6">
        <button
          onClick={() => nav('profile')}
          className="border-none bg-transparent text-text-2 p-0 flex"
        >
          <Icons.close size={22} />
        </button>
        <button className="border-none bg-transparent text-text-2 p-0 text-[13px]">Restore</button>
      </div>

      <div className="flex-1 overflow-auto px-6 pb-4">
        {/* mark */}
        <div className="flex items-center gap-2 mb-[18px]">
          <div className="w-7 h-7 rounded-pill flex items-center justify-center border-[1.5px] border-text">
            <div className="w-[5px] h-[5px] rounded-pill bg-text" />
          </div>
          <div className="font-display text-[18px]">gvozdi+</div>
        </div>

        <div className="display mb-3 text-[36px] leading-[1.05]">
          A small fee.<br />
          <em className="text-text-2 italic font-light">A long practice.</em>
        </div>
        <div className="text-text-2 mb-6 text-[14px] leading-[1.55]">
          Free forever for daily sessions.{' '}
          <strong className="text-text">Gvozdi+</strong> opens 80+ guided sessions, multi-device sync, and the data export your therapist actually wants.
        </div>

        {/* feature list */}
        <div className="flex flex-col gap-4 mb-7">
          {[
            { I: Icons.library, t: '80+ guided audio sessions',   s: "For the days when \"just stand\" isn't enough." },
            { I: Icons.chart,   t: 'Full history & data export',  s: 'CSV, Apple Health, Oura. Your data, yours.' },
            { I: Icons.heart,   t: 'Biometric pairing',           s: 'HRV-aware pacing. Live heart rate during sessions.' },
            { I: Icons.leaf,    t: 'Soundscapes & breath guides', s: 'Eight tracks, low-frequency, headphone-friendly.' },
          ].map((f, i) => {
            const I = f.I;
            return (
              <div key={i} className="flex gap-[14px]">
                <div className="w-8 h-8 rounded-xs shrink-0 bg-bg-2 text-text flex items-center justify-center">
                  <I size={16} />
                </div>
                <div className="flex-1">
                  <div className="font-medium mb-[3px] text-[14px]">{f.t}</div>
                  <div className="text-text-2 text-[12px] leading-[1.5]">{f.s}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* plans */}
        <div className="flex flex-col gap-2">
          {[
            { k: 'annual',  l: 'Annual',  p: '$3.50/mo', sub: 'billed $42/yr · best value', save: 'Save 41%' },
            { k: 'monthly', l: 'Monthly', p: '$5.99/mo', sub: 'billed monthly · cancel any time', save: null },
          ].map(o => {
            const on = plan === o.k;
            return (
              <button
                key={o.k}
                onClick={() => setPlan(o.k)}
                className={`${on ? 'border-primary bg-bg-2' : 'border-divider bg-surface'} border-[1.5px] text-text rounded-md p-4 flex items-center gap-3 text-left transition-all duration-150`}
              >
                <div
                  className="w-5 h-5 rounded-pill flex items-center justify-center shrink-0"
                  style={{ border: '1.5px solid ' + (on ? 'var(--p-primary)' : 'var(--p-divider)') }}
                >
                  {on && <div className="w-[10px] h-[10px] rounded-pill bg-primary" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="font-semibold text-[15px]">{o.l}</div>
                    {o.save && (
                      <span className="chip bg-success text-bg" style={{ fontSize: 10, padding: '2px 8px' }}>{o.save}</span>
                    )}
                  </div>
                  <div className="text-text-2 mt-[2px] text-[12px]">{o.sub}</div>
                </div>
                <div className="num font-medium text-[15px]">{o.p}</div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="pt-3 px-6 pb-7">
        <button className="btn" onClick={() => nav('home')}>
          Try 7 days free
        </button>
        <div className="text-center text-text-3 mt-3 text-[11px]">
          No charge for 7 days. Cancel any time. Terms · Privacy.
        </div>
      </div>
    </div>
  );
}
