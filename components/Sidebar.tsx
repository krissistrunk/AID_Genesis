'use client'

import { motion } from 'framer-motion'
import { 
  Wand2, 
  Code, 
  FolderTree, 
  Download, 
  FileText,
  Layers,
  Settings2,
  CheckCircle
} from 'lucide-react'
import { useProjectStore } from '@/store/projectStore'

interface SidebarProps {
  activePanel: 'wizard' | 'editor' | 'structure' | 'export'
  onPanelChange: (panel: 'wizard' | 'editor' | 'structure' | 'export') => void
}

export default function Sidebar({ activePanel, onPanelChange }: SidebarProps) {
  const { project, completedSteps } = useProjectStore()

  const navigationItems = [
    {
      id: 'wizard' as const,
      label: 'Project Setup',
      icon: Wand2,
      description: 'Configure your project',
      isCompleted: completedSteps.includes('wizard'),
      isAvailable: true,
    },
    {
      id: 'editor' as const,
      label: 'Code Editor',
      icon: Code,
      description: 'View and edit generated code',
      isCompleted: completedSteps.includes('editor'),
      isAvailable: project.name !== '',
    },
    {
      id: 'structure' as const,
      label: 'Project Structure',
      icon: FolderTree,
      description: 'Visualize project architecture',
      isCompleted: completedSteps.includes('structure'),
      isAvailable: project.name !== '',
    },
    {
      id: 'export' as const,
      label: 'Export & Deploy',
      icon: Download,
      description: 'Download and deploy your project',
      isCompleted: completedSteps.includes('export'),
      isAvailable: project.files.length > 0,
    },
  ]

  const quickActions = [
    {
      label: 'Generate Documentation',
      icon: FileText,
      action: () => console.log('Generate docs'),
    },
    {
      label: 'Project Templates',
      icon: Layers,
      action: () => console.log('Templates'),
    },
    {
      label: 'Advanced Settings',
      icon: Settings2,
      action: () => console.log('Settings'),
    },
  ]

  return (
    <div className="sidebar-nav">
      <div className="p-6">
        {/* Navigation */}
        <div className="space-y-2">
          <h2 className="text-xs font-semibold text-genesis-gray-500 uppercase tracking-wide mb-4">
            Project Workflow
          </h2>
          
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = activePanel === item.id
            const isDisabled = !item.isAvailable
            
            return (
              <motion.button
                key={item.id}
                whileHover={!isDisabled ? { x: 4 } : {}}
                whileTap={!isDisabled ? { scale: 0.98 } : {}}
                onClick={() => !isDisabled && onPanelChange(item.id)}
                disabled={isDisabled}
                className={`
                  w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200
                  ${isActive 
                    ? 'bg-genesis-orange text-white shadow-lg' 
                    : isDisabled
                    ? 'text-genesis-gray-400 cursor-not-allowed'
                    : 'text-genesis-gray-700 hover:bg-genesis-gray-100'
                  }
                `}
              >
                <div className="relative">
                  <Icon className="w-5 h-5" />
                  {item.isCompleted && (
                    <CheckCircle className="w-3 h-3 text-green-500 absolute -top-1 -right-1" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{item.label}</p>
                  <p className={`text-xs truncate ${isActive ? 'text-white/80' : 'text-genesis-gray-500'}`}>
                    {item.description}
                  </p>
                </div>
              </motion.button>
            )
          })}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 pt-6 border-t border-genesis-gray-200">
          <h3 className="text-xs font-semibold text-genesis-gray-500 uppercase tracking-wide mb-4">
            Quick Actions
          </h3>
          
          <div className="space-y-1">
            {quickActions.map((action, index) => {
              const Icon = action.icon
              return (
                <motion.button
                  key={index}
                  whileHover={{ x: 2 }}
                  onClick={action.action}
                  className="w-full flex items-center space-x-3 px-3 py-2 text-genesis-gray-600 hover:text-genesis-gray-900 hover:bg-genesis-gray-50 rounded-lg text-sm transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                  <span>{action.label}</span>
                </motion.button>
              )
            })}
          </div>
        </div>

        {/* Project Status */}
        {project.name && (
          <div className="mt-8 pt-6 border-t border-genesis-gray-200">
            <div className="bg-genesis-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-genesis-gray-900 mb-2">
                Project Status
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-genesis-gray-600">Completion</span>
                  <span className="font-medium">
                    {Math.round((completedSteps.length / navigationItems.length) * 100)}%
                  </span>
                </div>
                <div className="progress-bar">
                  <motion.div
                    className="progress-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${(completedSteps.length / navigationItems.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}