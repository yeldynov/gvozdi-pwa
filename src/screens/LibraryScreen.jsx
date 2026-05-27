import { useState } from 'react'
import Icons from '../icons'

export function LibraryScreen({ nav }) {
  const [cat, setCat] = useState('all')
  const cats = [
    { k: 'all', l: 'All' },
    { k: 'board', l: 'Nail board' },
    { k: 'breath', l: 'Breath' },
    { k: 'cold', l: 'Cold' },
    { k: 'sit', l: 'Sitting' },
  ]

  const featured = {
    title: 'Standing through the second wave',
    desc: 'For when you know what to do but still want a voice in your ear.',
  }

  const items = [
    {
      t: 'Box breathing',
      sub: 'Breath · beginner',
      m: 4,
      tone: 1,
      tags: ['Calm', 'Anxiety'],
      I: Icons.drop,
      cat: 'breath',
    },
    {
      t: 'Standing 6:00',
      sub: 'Nail board · all levels',
      m: 6,
      tone: 2,
      tags: ['Daily'],
      I: Icons.nails,
      cat: 'board',
    },
    {
      t: 'Cold shower protocol',
      sub: 'Cold · intermediate',
      m: 3,
      tone: 3,
      tags: ['Recovery'],
      I: Icons.spark,
      cat: 'cold',
    },
    {
      t: '4-7-8 winddown',
      sub: 'Breath · all levels',
      m: 5,
      tone: 1,
      tags: ['Sleep'],
      I: Icons.moon,
      cat: 'breath',
    },
    {
      t: 'Standing 12:00',
      sub: 'Nail board · advanced',
      m: 12,
      tone: 2,
      tags: ['Willpower'],
      I: Icons.nails,
      cat: 'board',
    },
    {
      t: 'Open awareness sit',
      sub: 'Sitting · all levels',
      m: 10,
      tone: 1,
      tags: ['Calm'],
      I: Icons.leaf,
      cat: 'sit',
    },
  ]
  const filtered = cat === 'all' ? items : items.filter((i) => i.cat === cat)

  return (
    <div className='h-full overflow-auto bg-bg'>
      <div className='pt-[52px] pb-[100px]'>
        {/* header */}
        <div className='flex justify-between items-center px-6 mb-[18px]'>
          <div className='display text-[28px] leading-[1.1]'>Library</div>
          <div className='flex gap-3 text-text-2'>
            <Icons.search />
            <Icons.more />
          </div>
        </div>

        {/* categories */}
        <div className='flex gap-2 overflow-x-auto pb-[18px] px-6'>
          {cats.map((c) => (
            <button
              key={c.k}
              onClick={() => setCat(c.k)}
              className={`chip ${cat === c.k ? 'on' : ''} border-none whitespace-nowrap`}
              style={{ padding: '8px 14px', fontSize: 13 }}
            >
              {c.l}
            </button>
          ))}
        </div>

        {/* featured */}
        <div className='px-6 pb-6'>
          <div className='text-text-3 uppercase mb-[10px] text-[11px] tracking-[0.12em]'>
            Featured this week
          </div>
          <div
            className='relative rounded-lg overflow-hidden h-[200px]'
            style={{
              background:
                'linear-gradient(160deg, var(--p-illus) 0%, var(--p-illus-2) 100%)',
            }}
          >
            <svg
              width='100%'
              height='100%'
              className='absolute inset-0 opacity-40'
            >
              {Array.from({ length: 80 }).map((_, i) => (
                <circle
                  key={i}
                  cx={(i % 10) * 38 + 19}
                  cy={Math.floor(i / 10) * 30 + 15}
                  r='1.6'
                  fill='var(--p-text)'
                />
              ))}
            </svg>
            <div
              className='absolute inset-0'
              style={{
                background:
                  'linear-gradient(to top, rgba(0,0,0,0.35), transparent 60%)',
              }}
            />
            <div className='absolute text-white left-[18px] right-[18px] bottom-[18px]'>
              <div className='uppercase mb-1 text-[11px] opacity-80 tracking-[0.12em]'>
                Guided · 12 min
              </div>
              <div className='display text-[22px] leading-[1.15] font-normal'>
                {featured.title}
              </div>
              <div className='mt-[6px] text-[12px] opacity-[0.85]'>
                {featured.desc}
              </div>
            </div>
            <button className='absolute flex items-center justify-center rounded-pill border-none top-4 right-4 w-10 h-10 bg-white/95 text-[#1a1815]'>
              <Icons.play size={16} />
            </button>
          </div>
        </div>

        {/* list */}
        <div className='px-6'>
          <div className='flex justify-between items-baseline mb-[10px]'>
            <div className='font-semibold text-text text-[14px]'>
              {cat === 'all'
                ? 'All practices'
                : cats.find((c) => c.k === cat).l}
            </div>
            <div className='text-text-3 text-[12px]'>
              {filtered.length} items
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            {filtered.map((it, i) => {
              const I = it.I
              const swatch =
                it.tone === 1
                  ? 'var(--p-accent)'
                  : it.tone === 2
                    ? 'var(--p-illus-2)'
                    : 'var(--p-primary)'
              return (
                <div
                  key={i}
                  className='card flex items-center gap-[14px]'
                  style={{ padding: 12 }}
                >
                  <div
                    className='w-12 h-12 rounded-sm flex items-center justify-center shrink-0'
                    style={{
                      background: swatch,
                      color:
                        it.tone === 3 ? 'var(--p-on-primary)' : 'var(--p-text)',
                    }}
                  >
                    <I size={20} />
                  </div>
                  <div className='flex-1 min-w-0'>
                    <div className='font-medium mb-[3px] text-[15px] leading-[1.2]'>
                      {it.t}
                    </div>
                    <div className='text-text-2 text-[12px]'>{it.sub}</div>
                    <div className='flex gap-1 mt-[6px]'>
                      {it.tags.map((t) => (
                        <span
                          key={t}
                          className='chip'
                          style={{ padding: '3px 8px', fontSize: 10 }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className='text-right'>
                    <div className='num font-medium text-[14px]'>{it.m}</div>
                    <div className='text-text-3 text-[10px]'>min</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
