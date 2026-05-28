import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { idbStorage } from './idbStorage'

export const useAppStore = create(
  persist(
    (set) => ({
      selectedMood: null,
      moodLog: [],
      _hasHydrated: false,
      setMood: (mood) => set((state) => {
        const today = new Date().toISOString().slice(0, 10)
        const log = state.moodLog.filter(e => e.date !== today)
        return { selectedMood: mood, moodLog: [...log, { date: today, mood }] }
      }),
      clearMood: () => set({ selectedMood: null }),
      clearAll: () => set({ selectedMood: null, moodLog: [] }),
      setHasHydrated: (v) => set({ _hasHydrated: v }),
    }),
    {
      name: 'gvozdi-state',
      storage: createJSONStorage(() => idbStorage),
      partialize: (state) => ({ selectedMood: state.selectedMood, moodLog: state.moodLog }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      },
    }
  )
)
