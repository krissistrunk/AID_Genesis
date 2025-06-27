'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Zap, Globe, Shield, Database } from 'lucide-react'
import { useProjectStore } from '@/store/projectStore'

const performanceTargets = [
  { id: 'lighthouse', name: 'Lighthouse Score', target: 90, unit: '/100', icon: Zap },
  { id: 'loadTime', name: 'Page Load Time', target: 3, unit: 'seconds', icon: Globe },
  { id: 'firstPaint', name: 'First Contentful Paint', target: 1.5, unit: 'seconds', icon: Zap },
  { id: 'bundleSize', name: 'Bundle Size', target: 250, unit: 'KB', icon: Database },
]

const optimizationFeatures = [
  { 
    id: 'caching', 
    name: 'Intelligent Caching', 
    description: 'Browser and server-side caching strategies',
    impact: 'High',
    complexity: 'Medium'
  },
  { 
    id: 'compression', 
    name: 'Asset Compression', 
    description: 'Gzip/Brotli compression for all assets',
    impact: 'High',
    complexity: 'Low'
  },
  { 
    id: 'lazy-loading', 
    name: 'Lazy Loading', 
    description: 'Load images and components on demand',
    impact: 'Medium',
    complexity: 'Low'
  },
  { 
    id: 'code-splitting', 
    name: 'Code Splitting', 
    description: 'Split bundles for faster initial loads',
    impact: 'High',
    complexity: 'Medium'
  },
  { 
    id: 'cdn', 
    name: 'CDN Integration', 
    description: 'Global content delivery network',
    impact: 'High',
    complexity: 'Medium'
  },
  { 
    id: 'preloading', 
    name: 'Resource Preloading', 
    description: 'Preload critical resources',
    impact: 'Medium',
    complexity: 'Low'
  },
]

const scalabilityOptions = [
  { id: 'horizontal', name: 'Horizontal Scaling', description: 'Multiple server instances' },
  { id: 'vertical', name: 'Vertical Scaling', description: 'Increased server resources' },
  { id: 'microservices', name: 'Microservices', description: 'Service-based architecture' },
  { id: 'serverless', name: 'Serverless Functions', description: 'Function-as-a-Service approach' },
]

export default function PerformanceSettings() {
  const { project, updateProject } = useProjectStore()
  const [perfSettings, setPerfSettings] = useState(project.performanceSettings || {
    targets: {},
    optimizations: [],
    scalability: 'horizontal',
    monitoring: true,
  })

  const updatePerfSetting = (key: string, value: any) => {
    const updated = { ...perfSettings, [key]: value }
    setPerfSettings(updated)
    updateProject({ performanceSettings: updated })
  }

  const updateTarget = (targetId: string, value: number) => {
    const updated = { ...perfSettings.targets, [targetId]: value }
    updatePerfSetting('targets', updated)
  }

  const toggleOptimization = (optId: string) => {
    const current = perfSettings.optimizations || []
    const updated = current.includes(optId)
      ? current.filter(id => id !== optId)
      : [...current, optId]
    updatePerfSetting('optimizations', updated)
  }

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-genesis-gray-900 mb-2">
          Performance Requirements
        </h3>
        <p className="text-genesis-gray-600">
          Set performance targets and optimization preferences for your project.
        </p>
      </div>

      {/* Performance Targets */}
      <div className="space-y-4">
        <h4 className="text-lg font-medium text-genesis-gray-900">Performance Targets</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {performanceTargets.map((target) => {
            const Icon = target.icon
            const currentValue = perfSettings.targets[target.id] || target.target
            
            return (
              <div key={target.id} className="card">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-genesis-orange/10 rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-genesis-orange" />
                  </div>
                  <div>
                    <h5 className="font-medium text-genesis-gray-900">{target.name}</h5>
                    <p className="text-sm text-genesis-gray-600">Target: {target.target}{target.unit}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-genesis-gray-600">Current Target</span>
                    <span className="font-medium text-genesis-gray-900">
                      {currentValue}{target.unit}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={target.target * 0.5}
                    max={target.target * 1.5}
                    step={target.target * 0.1}
                    value={currentValue}
                    onChange={(e) => updateTarget(target.id, parseFloat(e.target.value))}
                    className="w-full h-2 bg-genesis-gray-200 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #FF6B35 0%, #FF6B35 ${((currentValue - target.target * 0.5) / (target.target * 1.5 - target.target * 0.5)) * 100}%, #e2e8f0 ${((currentValue - target.target * 0.5) / (target.target * 1.5 - target.target * 0.5)) * 100}%, #e2e8f0 100%)`
                    }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Optimization Features */}
      <div className="space-y-4">
        <h4 className="text-lg font-medium text-genesis-gray-900">Optimization Features</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {optimizationFeatures.map((opt) => {
            const isSelected = (perfSettings.optimizations || []).includes(opt.id)
            
            return (
              <motion.button
                key={opt.id}
                onClick={() => toggleOptimization(opt.id)}
                className={`
                  p-4 rounded-lg border-2 text-left transition-all duration-200
                  ${isSelected
                    ? 'border-genesis-orange bg-genesis-orange/5'
                    : 'border-genesis-gray-200 hover:border-genesis-gray-300'
                  }
                `}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h5 className="font-medium text-genesis-gray-900">{opt.name}</h5>
                      <span className={`
                        px-2 py-1 text-xs rounded-full
                        ${opt.impact === 'High' ? 'bg-green-100 text-green-800' :
                          opt.impact === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'}
                      `}>
                        {opt.impact} Impact
                      </span>
                    </div>
                    <p className="text-sm text-genesis-gray-600 mb-2">{opt.description}</p>
                    <span className="text-xs text-genesis-gray-500">
                      Complexity: {opt.complexity}
                    </span>
                  </div>
                  
                  <div className={`
                    w-6 h-6 rounded-full border-2 flex items-center justify-center ml-3 transition-all duration-200
                    ${isSelected 
                      ? 'border-genesis-orange bg-genesis-orange' 
                      : 'border-genesis-gray-300'
                    }
                  `}>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-2 h-2 bg-white rounded-full"
                      />
                    )}
                  </div>
                </div>
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Scalability Strategy */}
      <div className="space-y-4">
        <h4 className="text-lg font-medium text-genesis-gray-900">Scalability Strategy</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {scalabilityOptions.map((option) => (
            <motion.button
              key={option.id}
              onClick={() => updatePerfSetting('scalability', option.id)}
              className={`
                p-4 rounded-lg border-2 text-left transition-all duration-200
                ${perfSettings.scalability === option.id
                  ? 'border-genesis-orange bg-genesis-orange/5'
                  : 'border-genesis-gray-200 hover:border-genesis-gray-300'
                }
              `}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <h5 className="font-medium text-genesis-gray-900">{option.name}</h5>
              <p className="text-sm text-genesis-gray-600 mt-1">{option.description}</p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Monitoring & Analytics */}
      <div className="space-y-4">
        <h4 className="text-lg font-medium text-genesis-gray-900">Monitoring & Analytics</h4>
        <div className="space-y-3">
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={perfSettings.monitoring}
              onChange={(e) => updatePerfSetting('monitoring', e.target.checked)}
              className="w-5 h-5 text-genesis-orange border-genesis-gray-300 rounded focus:ring-genesis-orange"
            />
            <div>
              <span className="font-medium text-genesis-gray-900">Performance Monitoring</span>
              <p className="text-sm text-genesis-gray-600">Real-time performance tracking and alerts</p>
            </div>
          </label>

          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={perfSettings.analytics}
              onChange={(e) => updatePerfSetting('analytics', e.target.checked)}
              className="w-5 h-5 text-genesis-orange border-genesis-gray-300 rounded focus:ring-genesis-orange"
            />
            <div>
              <span className="font-medium text-genesis-gray-900">User Analytics</span>
              <p className="text-sm text-genesis-gray-600">Track user behavior and performance impact</p>
            </div>
          </label>

          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={perfSettings.errorTracking}
              onChange={(e) => updatePerfSetting('errorTracking', e.target.checked)}
              className="w-5 h-5 text-genesis-orange border-genesis-gray-300 rounded focus:ring-genesis-orange"
            />
            <div>
              <span className="font-medium text-genesis-gray-900">Error Tracking</span>
              <p className="text-sm text-genesis-gray-600">Automated error reporting and debugging</p>
            </div>
          </label>
        </div>
      </div>

      {/* Performance Summary */}
      <div className="bg-genesis-gray-50 rounded-lg p-4">
        <h5 className="font-medium text-genesis-gray-900 mb-2">Performance Summary</h5>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-genesis-gray-600">Optimizations</p>
            <p className="font-medium text-genesis-gray-900">
              {(perfSettings.optimizations || []).length} enabled
            </p>
          </div>
          <div>
            <p className="text-genesis-gray-600">Scalability</p>
            <p className="font-medium text-genesis-gray-900 capitalize">
              {perfSettings.scalability}
            </p>
          </div>
          <div>
            <p className="text-genesis-gray-600">Monitoring</p>
            <p className="font-medium text-genesis-gray-900">
              {perfSettings.monitoring ? 'Enabled' : 'Disabled'}
            </p>
          </div>
          <div>
            <p className="text-genesis-gray-600">Load Target</p>
            <p className="font-medium text-genesis-gray-900">
              {perfSettings.targets?.loadTime || 3}s
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}