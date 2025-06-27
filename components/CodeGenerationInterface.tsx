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
import { useProjectStore } from '@/store/projectStore'

export default function CodeGenerationInterface() {
  const { currentStep, isGenerating, project } = useProjectStore()
  const [activePanel, setActivePanel] = useState<'wizard' | 'editor' | 'structure' | 'export'>('wizard')

  const getPanelComponent = () => {
    switch (activePanel) {
      case 'wizard':
        return <ProjectWizard />
      case 'editor':
        return <CodeEditor />
      case 'structure':
        return <ProjectStructure />
      case 'export':
        return <ExportPanel />
      default:
        return <ProjectWizard />
    }
  }

  return (
    <div className="h-screen flex flex-col bg-genesis-gray-50">
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#fff',
            color: '#1e293b',
            border: '1px solid #e2e8f0',
            borderRadius: '0.75rem',
            padding: '1rem',
            fontSize: '0.875rem',
            fontWeight: '500',
          },
        }}
      />
      
      {/* Header */}
      <Header />
      
      {/* Progress Indicator */}
      {isGenerating && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="border-b border-genesis-gray-200 bg-white"
        >
          <ProgressIndicator />
        </motion.div>
      )}
      
      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <Sidebar 
          activePanel={activePanel} 
          onPanelChange={setActivePanel}
        />
        
        {/* Main Panel */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePanel}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="flex-1 overflow-hidden"
            >
              {getPanelComponent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}