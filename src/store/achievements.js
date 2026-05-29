export const ACHIEVEMENTS = [
  {
    id: 'first_session',
    label: 'First Step',
    desc: 'Completed your first practice',
    icon: 'check',
    ring: 'var(--p-success)',
  },
  {
    id: 'streak_3',
    label: '3-Day Streak',
    desc: 'Three days in a row',
    icon: 'flame',
    ring: 'var(--p-streak)',
  },
  {
    id: 'streak_7',
    label: 'One Week',
    desc: 'Seven days in a row',
    icon: 'flame',
    ring: 'var(--p-accent)',
  },
  {
    id: 'streak_14',
    label: 'Two Weeks',
    desc: 'Fourteen days straight',
    icon: 'flame',
    ring: 'var(--p-warn)',
  },
  {
    id: 'streak_30',
    label: 'One Month',
    desc: 'Thirty days of practice',
    icon: 'shield',
    ring: 'var(--p-accent)',
  },
  {
    id: 'streak_60',
    label: 'Two Months',
    desc: 'Sixty days of practice',
    icon: 'shield',
    ring: 'var(--p-warn)',
  },
  {
    id: 'streak_100',
    label: 'Century',
    desc: 'One hundred days',
    icon: 'spark',
    ring: 'var(--p-error)',
  },
  {
    id: 'sessions_10',
    label: '10 Sessions',
    desc: 'Completed ten practices',
    icon: 'star',
    ring: 'var(--p-success)',
  },
]

export function calcStreak(practiceLog) {
  if (!practiceLog?.length) return 0
  const uniqueDates = [...new Set(practiceLog.map((e) => e.date))]
    .sort()
    .reverse()
  const localDate = (d) => d.toLocaleDateString('en-CA')
  const today = localDate(new Date())
  const yesterday = localDate(new Date(Date.now() - 86400000))

  if (uniqueDates[0] !== today && uniqueDates[0] !== yesterday) return 0

  let streak = 0
  let expected = uniqueDates[0]
  for (const date of uniqueDates) {
    if (date === expected) {
      streak++
      const d = new Date(expected + 'T12:00:00')
      d.setDate(d.getDate() - 1)
      expected = localDate(d)
    } else {
      break
    }
  }
  return streak
}

export function calcEarnedAchievementIds(practiceLog) {
  const streak = calcStreak(practiceLog)
  const count = practiceLog?.length ?? 0
  const earned = []
  if (count >= 1) earned.push('first_session')
  if (streak >= 3) earned.push('streak_3')
  if (streak >= 7) earned.push('streak_7')
  if (streak >= 14) earned.push('streak_14')
  if (streak >= 30) earned.push('streak_30')
  if (streak >= 60) earned.push('streak_60')
  if (streak >= 100) earned.push('streak_100')
  if (count >= 10) earned.push('sessions_10')
  return earned
}

export function calcAchievementEarnedTimestamp(id, practiceLog) {
  if (!practiceLog?.length) return null
  const sorted = [...practiceLog].sort((a, b) =>
    a.date !== b.date ? a.date.localeCompare(b.date) : a.id.localeCompare(b.id),
  )

  if (id === 'first_session') return parseInt(sorted[0].id)
  if (id === 'sessions_10') return sorted[9] ? parseInt(sorted[9].id) : null

  const STREAK_TARGET = {
    streak_3: 3, streak_7: 7, streak_14: 14,
    streak_30: 30, streak_60: 60, streak_100: 100,
  }
  const target = STREAK_TARGET[id]
  if (!target) return null

  const uniqueDates = [...new Set(sorted.map((e) => e.date))].sort()
  let streak = 1
  for (let i = 1; i < uniqueDates.length; i++) {
    const prev = new Date(uniqueDates[i - 1] + 'T12:00:00')
    const curr = new Date(uniqueDates[i] + 'T12:00:00')
    if (Math.round((curr - prev) / 86400000) === 1) {
      streak++
      if (streak >= target) {
        const last = sorted.filter((e) => e.date === uniqueDates[i]).at(-1)
        return last ? parseInt(last.id) : null
      }
    } else {
      streak = 1
    }
  }
  return null
}
