export function WeeklyChart({ data, max = 30, height = 72, accent }) {
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
  return (
    <div className='flex items-end gap-2' style={{ height: height + 22 }}>
      {data.map((v, i) => (
        <div key={i} className='flex-1 flex flex-col items-center gap-[6px]'>
          <div className='flex-1 w-full flex items-end'>
            <div
              className='w-full rounded-[4px]'
              style={{
                height: `${Math.max(4, (v / max) * height)}px`,
                background:
                  v === 0 ? 'var(--p-bg-3)' : accent || 'var(--p-text)',
                opacity: v === 0 ? 0.5 : i === 6 ? 1 : 0.85,
              }}
            />
          </div>
          <div className='text-text-3 font-medium text-[10px]'>{days[i]}</div>
        </div>
      ))}
    </div>
  )
}
