import { create } from "zustand";
import {devtools, persist } from "zustand/middleware";

export interface HabitStates {
  id: number;
  name: string;
  frequency: "daily" | "weekly" | "monthly";
  completedDate: string[];
  createdAt: string;
}

export interface HabitStatesStore {
  habits: HabitStates[];
  addHabit: (
    name: string,
    frequency: "daily" | "weekly" | "monthly"
  ) => void;
  removeHabit:(id:number)=>void
  toggleHabitCompletion: (id: number, date: string) => void;
  // fetchData:()=>Promise<void>;
  isLoading: boolean;
  error : string | null;
}

const useHabit = create<HabitStatesStore>()(
  ((set) => ({
    habits: [],
    isLoading: false,
    error: null,
    addHabit(name, frequency) {
      //make addHabit function here
    },removeHabit:(id)=>set((state)=>({
        habits:state.habits.filter((habit)=>habit.id !== id)
      })),
      toggleHabitCompletion: (id, date) =>
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
  })
      
  }),{ name: "habit-tracker-store"
   }))
);

export default useHabit;
