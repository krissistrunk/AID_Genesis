'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ProjectFile {
  name: string
  path: string
  content: string
  language: string
}

interface ProjectState {
  // Project data
  project: {
    name: string
    description: string
    projectType: string
    techStack: Record<string, string>
    features: string[]
    customFeatures: string[]
    customRequirements: string
    designPreferences: Record<string, any>
    performanceSettings: Record<string, any>
    files: ProjectFile[]
  }
  
  // UI state
  currentStep: number
  completedSteps: string[]
  isGenerating: boolean
  generationProgress: number
  
  // Actions
  updateProject: (updates: Partial<ProjectState['project']>) => void
  markStepCompleted: (step: string) => void
  startGeneration: () => void
  stopGeneration: () => void
  resetProject: () => void
}

const initialProject = {
  name: '',
  description: '',
  projectType: 'web-app',
  techStack: {},
  features: [],
  customFeatures: [],
  customRequirements: '',
  designPreferences: {},
  performanceSettings: {},
  files: []
}

export const useProjectStore = create<ProjectState>()(
  persist(
    (set, get) => ({
      // Initial state
      project: initialProject,
      currentStep: 0,
      completedSteps: [],
      isGenerating: false,
      generationProgress: 0,

      // Actions
      updateProject: (updates) => {
        set((state) => ({
          project: { ...state.project, ...updates }
        }))
      },

      markStepCompleted: (step) => {
        set((state) => ({
          completedSteps: state.completedSteps.includes(step) 
            ? state.completedSteps 
            : [...state.completedSteps, step]
        }))
      },

      startGeneration: () => {
        set({ isGenerating: true, generationProgress: 0 })
        
        // Simulate generation progress
        const interval = setInterval(() => {
          const { generationProgress, isGenerating } = get()
          
          if (!isGenerating) {
            clearInterval(interval)
            return
          }
          
          if (generationProgress >= 100) {
            set({ 
              isGenerating: false, 
              generationProgress: 100,
              completedSteps: [...get().completedSteps, 'generation']
            })
            clearInterval(interval)
          } else {
            set({ generationProgress: generationProgress + 2 })
          }
        }, 100)
      },

      stopGeneration: () => {
        set({ isGenerating: false })
      },

      resetProject: () => {
        set({
          project: initialProject,
          currentStep: 0,
          completedSteps: [],
          isGenerating: false,
          generationProgress: 0
        })
      }
    }),
    {
      name: 'aid-genesis-project',
      partialize: (state) => ({
        project: state.project,
        completedSteps: state.completedSteps
      })
    }
  )
)