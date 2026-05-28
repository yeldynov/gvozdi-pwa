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
  const uniqueDates = [...new Set(practiceLog.map((e) => e.date))].sort().reverse()
  const today = new Date().toISOString().slice(0, 10)
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10)

  if (uniqueDates[0] !== today && uniqueDates[0] !== yesterday) return 0

  let streak = 0
  let expected = uniqueDates[0]
  for (const date of uniqueDates) {
    if (date === expected) {
      streak++
      const d = new Date(expected + 'T12:00:00')
      d.setDate(d.getDate() - 1)
      expected = d.toISOString().slice(0, 10)
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
