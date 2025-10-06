import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface HabitStates {
  id: number;
  name: string;
  frequency: "daily" | "weekly" | "monthly";
  completedDate: string[];
  createdAt: string;
}

export interface HabitStatesStore {
  habits: HabitStates[];
  addHabit: (name: string, frequency: "daily" | "weekly" | "monthly") => void;
  removeHabit: (id: number) => void;
  toggleHabitCompletion: (id: number, date: string) => void;
  isLoading: boolean;
  error: string | null;
}

const useHabit = create<HabitStatesStore>()(
  devtools(
    persist(
      (set, get) => ({
        habits: [],
        isLoading: false,
        error: null,

        addHabit(name, frequency) {
          const newHabit: HabitStates = {
            id:
              get().habits.length > 0
                ? Math.max(...get().habits.map((h) => h.id)) + 1
                : 1,
            name,
            frequency,
            completedDate: [],
            createdAt: new Date().toISOString(),
          };
          set((state) => ({
            habits: [...state.habits, newHabit],
          }));
        },

        removeHabit(id) {
          set((state) => ({
            habits: state.habits.filter((habit) => habit.id !== id),
          }));
        },

        toggleHabitCompletion(id, date) {
          set((state) => ({
            habits: state.habits.map((habit) =>
              habit.id === id
                ? {
                    ...habit,
                    completedDate: habit.completedDate.includes(date)
                      ? habit.completedDate.filter((d) => d !== date)
                      : [...habit.completedDate, date],
                  }
                : habit
            ),
          }));
        },
      }),
      { name: "habit-tracker-store" }
    )
  )
);

export default useHabit;
