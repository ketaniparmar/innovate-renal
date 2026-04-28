import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { FacilityInputs } from '../advisory/leakage-engine';
import { NewCenterInputs } from '../advisory/cost-model';

interface AdvisorySessionState {
  // Store the user's active journey
  activeJourney: "NEW_CENTER" | "RUNNING_CENTER" | null;
  
  // Data payloads
  runningCenterData: FacilityInputs | null;
  newCenterData: NewCenterInputs | null;

  // Actions
  setRunningCenterData: (data: FacilityInputs) => void;
  setNewCenterData: (data: NewCenterInputs) => void;
  clearSession: () => void;
}

export const useAdvisorySession = create<AdvisorySessionState>()(
  persist(
    (set) => ({
      activeJourney: null,
      runningCenterData: null,
      newCenterData: null,

      setRunningCenterData: (data) => set({ 
        runningCenterData: data, 
        activeJourney: "RUNNING_CENTER" 
      }),
      
      setNewCenterData: (data) => set({ 
        newCenterData: data, 
        activeJourney: "NEW_CENTER" 
      }),

      clearSession: () => set({ 
        activeJourney: null, 
        runningCenterData: null, 
        newCenterData: null 
      }),
    }),
    {
      name: 'innovate-advisory-session', // unique name
      storage: createJSONStorage(() => sessionStorage), // CLEARED when browser tab closes
    }
  )
);