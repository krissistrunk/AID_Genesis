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
  CheckCircle,
  ArrowRight,
  Zap,
  Sparkles
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
      description: 'Configure your project details',
      isCompleted: completedSteps.includes('wizard'),
      isAvailable: true,
      gradient: 'from-blue-500 to-indigo-600'
    },
    {
      id: 'editor' as const,
      label: 'Code Editor',
      icon: Code,
      description: 'Review and edit generated code',
      isCompleted: completedSteps.includes('editor'),
      isAvailable: project.name !== '',
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      id: 'structure' as const,
      label: 'Project Structure',
      icon: FolderTree,
      description: 'Explore project architecture',
      isCompleted: completedSteps.includes('structure'),
      isAvailable: project.name !== '',
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      id: 'export' as const,
      label: 'Export & Deploy',
      icon: Download,
      description: 'Download and deploy your project',
      isCompleted: completedSteps.includes('export'),
      isAvailable: project.files.length > 0,
      gradient: 'from-orange-500 to-red-600'
    },
  ]

  const quickActions = [
    {
      label: 'Generate Docs',
      icon: FileText,
      action: () => console.log('Generate docs'),
      color: 'text-blue-600 hover:text-blue-700'
    },
    {
      label: 'Templates',
      icon: Layers,
      action: () => console.log('Templates'),
      color: 'text-purple-600 hover:text-purple-700'
    },
    {
      label: 'Settings',
      icon: Settings2,
      action: () => console.log('Settings'),
      color: 'text-slate-600 hover:text-slate-700'
    },
  ]

  return (
    <div className="sidebar-nav">
      <div className="p-6">
        {/* Progress Overview */}
        <motion.div
          className="mb-8 p-5 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-2xl border border-indigo-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-slate-900">Project Progress</h3>
            <span className="text-sm font-medium text-indigo-600">
              {Math.round((completedSteps.length / navigationItems.length) * 100)}%
            </span>
          </div>
          
          <div className="progress-bar mb-3">
            <motion.div
              className="progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${(completedSteps.length / navigationItems.length) * 100}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
          
          <p className="text-xs text-slate-600">
            {completedSteps.length} of {navigationItems.length} steps completed
          </p>
        </motion.div>

        {/* Navigation */}
        <div className="space-y-3 mb-8">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
            Development Workflow
          </h2>
          
          {navigationItems.map((item, index) => {
            const Icon = item.icon
            const isActive = activePanel === item.id
            const isDisabled = !item.isAvailable
            
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <motion.button
                  onClick={() => !isDisabled && onPanelChange(item.id)}
                  disabled={isDisabled}
                  className={`
                    w-full group relative overflow-hidden rounded-2xl transition-all duration-300
                    ${isActive 
                      ? 'scale-105 shadow-xl' 
                      : isDisabled
                      ? 'cursor-not-allowed opacity-50'
                      : 'hover:scale-[1.02] hover:shadow-lg'
                    }
                  `}
                  whileHover={!isDisabled ? { x: 4 } : {}}
                  whileTap={!isDisabled ? { scale: 0.98 } : {}}
                >
                  {/* Background with gradient */}
                  <div className={`
                    absolute inset-0 transition-all duration-300
                    ${isActive 
                      ? `bg-gradient-to-r ${item.gradient} opacity-100` 
                      : 'bg-white/60 group-hover:bg-white/80'
                    }
                  `} />
                  
                  {/* Content */}
                  <div className="relative p-4 flex items-center space-x-3">
                    <div className={`
                      relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300
                      ${isActive 
                        ? 'bg-white/20 backdrop-blur-sm' 
                        : 'bg-slate-100 group-hover:bg-slate-200'
                      }
                    `}>
                      <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-600'}`} />
                      
                      {item.isCompleted && (
                        <motion.div
                          className="absolute -top-1 -right-1"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.5 }}
                        >
                          <CheckCircle className="w-4 h-4 text-green-500 bg-white rounded-full" />
                        </motion.div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0 text-left">
                      <p className={`font-semibold truncate ${isActive ? 'text-white' : 'text-slate-900'}`}>
                        {item.label}
                      </p>
                      <p className={`text-xs truncate ${isActive ? 'text-white/80' : 'text-slate-500'}`}>
                        {item.description}
                      </p>
                    </div>
                    
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <ArrowRight className="w-4 h-4 text-white/80" />
                      </motion.div>
                    )}
                  </div>
                </motion.button>
              </motion.div>
            )
          })}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
            Quick Actions
          </h3>
          
          <div className="space-y-2">
            {quickActions.map((action, index) => {
              const Icon = action.icon
              return (
                <motion.button
                  key={index}
                  onClick={action.action}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 bg-white/40 hover:bg-white/60 border border-white/20 hover:border-white/40 ${action.color}`}
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{action.label}</span>
                </motion.button>
              )
            })}
          </div>
        </div>

        {/* Project Status Card */}
        {project.name && (
          <motion.div
            className="card-premium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 text-sm">
                  {project.name}
                </h4>
                <p className="text-xs text-slate-500">Active Project</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-600">Completion</span>
                <span className="font-semibold text-slate-900">
                  {Math.round((completedSteps.length / navigationItems.length) * 100)}%
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="text-center p-2 bg-indigo-50 rounded-lg">
                  <div className="font-semibold text-indigo-700">{project.files.length}</div>
                  <div className="text-indigo-600">Files</div>
                </div>
                <div className="text-center p-2 bg-purple-50 rounded-lg">
                  <div className="font-semibold text-purple-700">{(project.features || []).length}</div>
                  <div className="text-purple-600">Features</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}