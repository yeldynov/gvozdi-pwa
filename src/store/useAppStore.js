import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { idbStorage } from './idbStorage'
import { calcEarnedAchievementIds } from './achievements'

export const useAppStore = create(
  persist(
    (set) => ({
      selectedMood: null,
      moodLog: [],
      practiceLog: [],
      currentSessionType: null,
      sessionDuration: 6,
      sessionSaved: false,
      selectedSessionId: null,
      sessionDetailBack: 'home',
      earnedAchievementIds: [],
      pendingAchievement: null,
      _hasHydrated: false,

      setMood: (mood) =>
        set((state) => {
          const today = new Date().toISOString().slice(0, 10)
          const log = state.moodLog.filter((e) => e.date !== today)
          return {
            selectedMood: mood,
            moodLog: [...log, { date: today, mood }],
          }
        }),

      clearMood: () => set({ selectedMood: null }),

      setCurrentSessionType: (type) => set({ currentSessionType: type }),

      setSessionDuration: (dur) => set({ sessionDuration: dur }),

      logPractice: ({ type, durationSec, goalSec, goalAchieved, tension, comment }) =>
        set((state) => {
          const date = new Date().toISOString().slice(0, 10)
          const entry = {
            id: Date.now().toString(),
            date,
            type,
            durationSec,
            ...(goalSec !== undefined && { goalSec }),
            ...(goalAchieved !== undefined && { goalAchieved }),
            ...(tension && { tension }),
            ...(comment && { comment }),
          }
          const newPracticeLog = [...state.practiceLog, entry]

          const newEarnedIds = calcEarnedAchievementIds(newPracticeLog)
          const newlyEarned = newEarnedIds.filter(
            (id) => !state.earnedAchievementIds.includes(id),
          )

          return {
            practiceLog: newPracticeLog,
            earnedAchievementIds: [
              ...new Set([...state.earnedAchievementIds, ...newEarnedIds]),
            ],
            pendingAchievement:
              newlyEarned.length > 0
                ? newlyEarned[newlyEarned.length - 1]
                : null,
            sessionSaved: true,
          }
        }),

      consumeSessionSaved: () => set({ sessionSaved: false }),

      updateLastEntryPostMood: (postMood) =>
        set((state) => {
          if (!state.practiceLog.length) return {}
          const log = [...state.practiceLog]
          log[log.length - 1] = { ...log[log.length - 1], postMood }
          return { practiceLog: log }
        }),

      setSelectedSession: (id, back = 'home') =>
        set({ selectedSessionId: id, sessionDetailBack: back }),

      clearPendingAchievement: () => set({ pendingAchievement: null }),

      clearAll: () =>
        set({
          selectedMood: null,
          moodLog: [],
          practiceLog: [],
          earnedAchievementIds: [],
          pendingAchievement: null,
        }),

      setHasHydrated: (v) => set({ _hasHydrated: v }),
    }),
    {
      name: 'gvozdi-state',
      storage: createJSONStorage(() => idbStorage),
      partialize: (state) => ({
        selectedMood: state.selectedMood,
        moodLog: state.moodLog,
        practiceLog: state.practiceLog,
        earnedAchievementIds: state.earnedAchievementIds,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      },
    },
  ),
)
