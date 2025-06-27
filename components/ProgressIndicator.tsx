'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Code, Zap, CheckCircle } from 'lucide-react'
import { useProjectStore } from '@/store/projectStore'

const generationSteps = [
  {
    id: 'analyzing',
    title: 'Analyzing Requirements',
    description: 'Processing your project specifications',
    icon: Sparkles,
    duration: 2000
  },
  {
    id: 'generating',
    title: 'Generating Code',
    description: 'Creating components and structure',
    icon: Code,
    duration: 3000
  },
  {
    id: 'optimizing',
    title: 'Optimizing Performance',
    description: 'Applying best practices and optimizations',
    icon: Zap,
    duration: 2000
  },
  {
    id: 'finalizing',
    title: 'Finalizing Project',
    description: 'Preparing files for export',
    icon: CheckCircle,
    duration: 1500
  }
]

export default function ProgressIndicator() {
  const { isGenerating, generationProgress } = useProjectStore()
  const [currentStep, setCurrentStep] = useState(0)
  const [stepProgress, setStepProgress] = useState(0)

  useEffect(() => {
    if (!isGenerating) return

    let stepIndex = 0
    let stepStartTime = Date.now()
    
    const updateProgress = () => {
      const currentStepData = generationSteps[stepIndex]
      if (!currentStepData) return

      const elapsed = Date.now() - stepStartTime
      const progress = Math.min(elapsed / currentStepData.duration, 1)
      
      setCurrentStep(stepIndex)
      setStepProgress(progress)

      if (progress >= 1 && stepIndex < generationSteps.length - 1) {
        stepIndex++
        stepStartTime = Date.now()
      }
    }

    const interval = setInterval(updateProgress, 50)
    return () => clearInterval(interval)
  }, [isGenerating])

  if (!isGenerating) return null

  const overallProgress = ((currentStep + stepProgress) / generationSteps.length) * 100

  return (
    <div className="px-6 py-4">
      <div className="max-w-4xl mx-auto">
        {/* Overall Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-genesis-gray-900">
              Generating Your Project
            </h3>
            <span className="text-sm font-medium text-genesis-gray-600">
              {Math.round(overallProgress)}%
            </span>
          </div>
          
          <div className="progress-bar">
            <motion.div
              className="progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${overallProgress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Step Indicators */}
        <div className="grid grid-cols-4 gap-4">
          {generationSteps.map((step, index) => {
            const Icon = step.icon
            const isActive = index === currentStep
            const isCompleted = index < currentStep
            const isCurrent = index === currentStep

            return (
              <motion.div
                key={step.id}
                className={`
                  relative p-4 rounded-lg border-2 transition-all duration-300
                  ${isActive 
                    ? 'border-genesis-orange bg-genesis-orange/5' 
                    : isCompleted 
                    ? 'border-green-500 bg-green-50'
                    : 'border-genesis-gray-200 bg-white'
                  }
                `}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Step Icon */}
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center mb-3 mx-auto
                  ${isActive 
                    ? 'bg-genesis-orange text-white' 
                    : isCompleted 
                    ? 'bg-green-500 text-white'
                    : 'bg-genesis-gray-200 text-genesis-gray-500'
                  }
                `}>
                  {isCompleted ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <Icon className={`w-5 h-5 ${isActive ? 'animate-pulse' : ''}`} />
                  )}
                </div>

                {/* Step Content */}
                <div className="text-center">
                  <h4 className={`
                    font-medium text-sm mb-1
                    ${isActive || isCompleted ? 'text-genesis-gray-900' : 'text-genesis-gray-500'}
                  `}>
                    {step.title}
                  </h4>
                  <p className={`
                    text-xs
                    ${isActive || isCompleted ? 'text-genesis-gray-600' : 'text-genesis-gray-400'}
                  `}>
                    {step.description}
                  </p>
                </div>

                {/* Step Progress Bar */}
                {isCurrent && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1 bg-genesis-gray-200 rounded-b-lg overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <motion.div
                      className="h-full bg-genesis-orange"
                      initial={{ width: 0 }}
                      animate={{ width: `${stepProgress * 100}%` }}
                      transition={{ duration: 0.1 }}
                    />
                  </motion.div>
                )}

                {/* Completion Indicator */}
                {isCompleted && (
                  <motion.div
                    className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    <CheckCircle className="w-4 h-4 text-white" />
                  </motion.div>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Current Step Details */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 text-center"
        >
          <p className="text-genesis-gray-700">
            {generationSteps[currentStep]?.description}
          </p>
          
          {/* Animated Dots */}
          <div className="flex items-center justify-center space-x-1 mt-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-genesis-orange rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}