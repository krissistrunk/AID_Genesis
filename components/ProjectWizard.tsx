'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle, 
  Sparkles,
  Code,
  Palette,
  Zap,
  Globe
} from 'lucide-react'
import { useProjectStore } from '@/store/projectStore'
import TechnologySelector from './wizard/TechnologySelector'
import FeatureSelector from './wizard/FeatureSelector'
import DesignPreferences from './wizard/DesignPreferences'
import PerformanceSettings from './wizard/PerformanceSettings'

const wizardSteps = [
  { id: 'basic', title: 'Project Basics', icon: Sparkles, description: 'Name and describe your project' },
  { id: 'tech', title: 'Technology Stack', icon: Code, description: 'Choose your preferred technologies' },
  { id: 'features', title: 'Features & Functionality', icon: Zap, description: 'Select desired features' },
  { id: 'design', title: 'Design Preferences', icon: Palette, description: 'Configure UI/UX preferences' },
  { id: 'performance', title: 'Performance Requirements', icon: Globe, description: 'Set performance goals' },
]

export default function ProjectWizard() {
  const [currentStep, setCurrentStep] = useState(0)
  const { project, updateProject, markStepCompleted, startGeneration } = useProjectStore()
  
  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: {
      name: project.name || '',
      description: project.description || '',
      projectType: project.projectType || 'web-app',
    }
  })

  const watchedValues = watch()

  const handleNext = () => {
    if (currentStep < wizardSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const onSubmit = (data: any) => {
    updateProject(data)
    markStepCompleted('wizard')
    startGeneration()
  }

  const renderStepContent = () => {
    switch (wizardSteps[currentStep].id) {
      case 'basic':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-genesis-gray-700 mb-2">
                Project Name *
              </label>
              <input
                {...register('name', { required: 'Project name is required' })}
                className="input-field"
                placeholder="Enter your project name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-genesis-gray-700 mb-2">
                Project Description *
              </label>
              <textarea
                {...register('description', { required: 'Description is required' })}
                rows={4}
                className="textarea-field"
                placeholder="Describe what your project does and its main objectives"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-genesis-gray-700 mb-2">
                Project Type
              </label>
              <select {...register('projectType')} className="input-field">
                <option value="web-app">Web Application</option>
                <option value="mobile-app">Mobile Application</option>
                <option value="desktop-app">Desktop Application</option>
                <option value="api">API/Backend Service</option>
                <option value="library">Library/Package</option>
                <option value="website">Static Website</option>
              </select>
            </div>
          </div>
        )

      case 'tech':
        return <TechnologySelector />

      case 'features':
        return <FeatureSelector />

      case 'design':
        return <DesignPreferences />

      case 'performance':
        return <PerformanceSettings />

      default:
        return null
    }
  }

  const isStepValid = () => {
    switch (wizardSteps[currentStep].id) {
      case 'basic':
        return watchedValues.name && watchedValues.description
      default:
        return true
    }
  }

  return (
    <div className="h-full flex flex-col">
      {/* Step Indicator */}
      <div className="bg-white border-b border-genesis-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h2 className="text-lg font-semibold text-genesis-gray-900">
              Project Configuration
            </h2>
            <span className="text-sm text-genesis-gray-500">
              Step {currentStep + 1} of {wizardSteps.length}
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-2">
            {wizardSteps.map((step, index) => {
              const Icon = step.icon
              const isActive = index === currentStep
              const isCompleted = index < currentStep
              
              return (
                <div key={step.id} className="flex items-center">
                  <motion.div
                    className={`
                      w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium
                      ${isActive 
                        ? 'bg-genesis-orange text-white' 
                        : isCompleted 
                        ? 'bg-green-500 text-white'
                        : 'bg-genesis-gray-200 text-genesis-gray-500'
                      }
                    `}
                    whileHover={{ scale: 1.1 }}
                  >
                    {isCompleted ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <Icon className="w-4 h-4" />
                    )}
                  </motion.div>
                  
                  {index < wizardSteps.length - 1 && (
                    <div className={`
                      w-8 h-0.5 mx-2
                      ${isCompleted ? 'bg-green-500' : 'bg-genesis-gray-200'}
                    `} />
                  )}
                </div>
              )
            })}
          </div>
        </div>
        
        <div className="mt-4">
          <h3 className="text-xl font-bold text-genesis-gray-900">
            {wizardSteps[currentStep].title}
          </h3>
          <p className="text-genesis-gray-600 mt-1">
            {wizardSteps[currentStep].description}
          </p>
        </div>
      </div>

      {/* Step Content */}
      <div className="flex-1 overflow-y-auto">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="p-6"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl">
            {renderStepContent()}
          </form>
        </motion.div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-t border-genesis-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.button
            type="button"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className={`
              flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200
              ${currentStep === 0
                ? 'text-genesis-gray-400 cursor-not-allowed'
                : 'text-genesis-gray-700 hover:bg-genesis-gray-100'
              }
            `}
            whileHover={currentStep > 0 ? { x: -4 } : {}}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </motion.button>

          <div className="flex items-center space-x-3">
            {currentStep === wizardSteps.length - 1 ? (
              <motion.button
                onClick={handleSubmit(onSubmit)}
                disabled={!isStepValid()}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Project
              </motion.button>
            ) : (
              <motion.button
                type="button"
                onClick={handleNext}
                disabled={!isStepValid()}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}