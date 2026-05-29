import { useState, useEffect, useRef } from 'react'

export function fmt(sec) {
  const m = Math.floor(sec / 60),
    s = Math.floor(sec % 60)
  return `${m}:${String(s).padStart(2, '0')}`
}

export function useSessionTimer(totalSec) {
  const [running, setRunning] = useState(true)
  const [elapsed, setElapsed] = useState(0)
  const ref = useRef(null)
  useEffect(() => {
    if (!running) return
    ref.current = setInterval(() => {
      setElapsed((e) => e + 1)
    }, 1000)
    return () => clearInterval(ref.current)
  }, [running, totalSec])
  return {
    elapsed,
    remaining: Math.max(0, totalSec - elapsed),
    progress: totalSec > 0 ? Math.min(1, elapsed / totalSec) : 0,
    running,
    toggle: () => setRunning((r) => !r),
    addSeconds: (s) => setElapsed((e) => e + s),
    reset: () => {
      setElapsed(0)
      setRunning(true)
    },
  }
}
