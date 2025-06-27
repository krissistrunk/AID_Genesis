'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import Header from './Header'
import Sidebar from './Sidebar'
import ProjectWizard from './ProjectWizard'
import CodeEditor from './CodeEditor'
import ProjectStructure from './ProjectStructure'
import ExportPanel from './ExportPanel'
import ProgressIndicator from './ProgressIndicator'
import WelcomeScreen from './WelcomeScreen'
import { useProjectStore } from '@/store/projectStore'

export default function CodeGenerationInterface() {
  const { currentStep, isGenerating, project, completedSteps } = useProjectStore()
  const [activePanel, setActivePanel] = useState<'welcome' | 'wizard' | 'editor' | 'structure' | 'export'>('welcome')

  const getPanelComponent = () => {
    switch (activePanel) {
      case 'welcome':
        return <WelcomeScreen onGetStarted={() => setActivePanel('wizard')} />
      case 'wizard':
        return <ProjectWizard />
      case 'editor':
        return <CodeEditor />
      case 'structure':
        return <ProjectStructure />
      case 'export':
        return <ExportPanel />
      default:
        return <WelcomeScreen onGetStarted={() => setActivePanel('wizard')} />
    }
  }

  const shouldShowWelcome = !project.name && completedSteps.length === 0

  return (
    <div className="h-screen flex flex-col bg-mesh">
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            color: '#1e293b',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '16px',
            padding: '16px',
            fontSize: '14px',
            fontWeight: '500',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#ffffff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#ffffff',
            },
          },
        }}
      />
      
      {/* Header */}
      <Header />
      
      {/* Progress Indicator */}
      <AnimatePresence>
        {isGenerating && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="border-b border-white/20 bg-white/60 backdrop-blur-xl"
          >
            <ProgressIndicator />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Conditional Sidebar - only show after welcome */}
        <AnimatePresence>
          {!shouldShowWelcome && (
            <motion.div
              initial={{ x: -320, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -320, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <Sidebar 
                activePanel={activePanel === 'welcome' ? 'wizard' : activePanel} 
                onPanelChange={setActivePanel}
              />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Main Panel */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePanel}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex-1 overflow-hidden"
            >
              {getPanelComponent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Floating Action Elements */}
      {!shouldShowWelcome && (
        <motion.div
          className="fixed bottom-6 right-6 z-40"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <div className="flex flex-col space-y-3">
            {/* Progress Ring */}
            <div className="relative">
              <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.2)"
                  strokeWidth="6"
                />
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  fill="none"
                  stroke="url(#progressGradient)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={`${(completedSteps.length / 4) * 175.93} 175.93`}
                  className="transition-all duration-500"
                />
                <defs>
                  <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-bold text-slate-700">
                  {Math.round((completedSteps.length / 4) * 100)}%
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}