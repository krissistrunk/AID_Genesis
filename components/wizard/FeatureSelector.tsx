'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Plus } from 'lucide-react'
import { useProjectStore } from '@/store/projectStore'

const featureCategories = {
  authentication: {
    title: 'Authentication & Security',
    features: [
      { id: 'auth-basic', name: 'Basic Login/Register', description: 'Email and password authentication' },
      { id: 'auth-social', name: 'Social Login', description: 'Google, Facebook, GitHub login' },
      { id: 'auth-2fa', name: 'Two-Factor Auth', description: 'SMS or app-based 2FA' },
      { id: 'auth-oauth', name: 'OAuth 2.0', description: 'API authentication system' },
    ]
  },
  data: {
    title: 'Data Management',
    features: [
      { id: 'data-crud', name: 'CRUD Operations', description: 'Create, Read, Update, Delete' },
      { id: 'data-search', name: 'Search & Filtering', description: 'Advanced search capabilities' },
      { id: 'data-export', name: 'Data Export', description: 'CSV, PDF, Excel export' },
      { id: 'data-import', name: 'Data Import', description: 'Bulk data import features' },
      { id: 'data-backup', name: 'Automated Backup', description: 'Scheduled data backups' },
    ]
  },
  ui: {
    title: 'User Interface',
    features: [
      { id: 'ui-responsive', name: 'Responsive Design', description: 'Mobile-first responsive layout' },
      { id: 'ui-dashboard', name: 'Admin Dashboard', description: 'Management interface' },
      { id: 'ui-themes', name: 'Multiple Themes', description: 'Light/dark mode support' },
      { id: 'ui-charts', name: 'Charts & Analytics', description: 'Data visualization components' },
      { id: 'ui-notifications', name: 'Notifications', description: 'Real-time notifications' },
    ]
  },
  integration: {
    title: 'Integrations',
    features: [
      { id: 'api-rest', name: 'REST API', description: 'RESTful API endpoints' },
      { id: 'api-graphql', name: 'GraphQL API', description: 'Flexible query language' },
      { id: 'integration-payment', name: 'Payment Processing', description: 'Stripe, PayPal integration' },
      { id: 'integration-email', name: 'Email Service', description: 'Automated email sending' },
      { id: 'integration-sms', name: 'SMS Service', description: 'Text messaging integration' },
    ]
  },
  performance: {
    title: 'Performance & Scalability',
    features: [
      { id: 'perf-caching', name: 'Caching System', description: 'Redis/Memcached caching' },
      { id: 'perf-cdn', name: 'CDN Integration', description: 'Content delivery network' },
      { id: 'perf-compression', name: 'Asset Compression', description: 'Optimized asset delivery' },
      { id: 'perf-lazy', name: 'Lazy Loading', description: 'Performance optimization' },
      { id: 'perf-monitoring', name: 'Performance Monitoring', description: 'Real-time performance tracking' },
    ]
  }
}

export default function FeatureSelector() {
  const { project, updateProject } = useProjectStore()
  const [selectedFeatures, setSelectedFeatures] = useState(new Set(project.features || []))
  const [customFeature, setCustomFeature] = useState('')

  const handleFeatureToggle = (featureId: string) => {
    const updated = new Set(selectedFeatures)
    if (updated.has(featureId)) {
      updated.delete(featureId)
    } else {
      updated.add(featureId)
    }
    setSelectedFeatures(updated)
    updateProject({ features: Array.from(updated) })
  }

  const handleAddCustomFeature = () => {
    if (customFeature.trim()) {
      const customId = `custom-${Date.now()}`
      const updated = new Set([...selectedFeatures, customId])
      setSelectedFeatures(updated)
      updateProject({ 
        features: Array.from(updated),
        customFeatures: [...(project.customFeatures || []), customFeature.trim()]
      })
      setCustomFeature('')
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-genesis-gray-900 mb-2">
          Select Project Features
        </h3>
        <p className="text-genesis-gray-600">
          Choose the features and functionality you want in your project. You can select multiple options.
        </p>
      </div>

      {Object.entries(featureCategories).map(([categoryKey, category]) => (
        <div key={categoryKey} className="space-y-4">
          <h4 className="text-lg font-medium text-genesis-gray-900">
            {category.title}
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {category.features.map((feature) => {
              const isSelected = selectedFeatures.has(feature.id)
              
              return (
                <motion.button
                  key={feature.id}
                  onClick={() => handleFeatureToggle(feature.id)}
                  className={`
                    p-4 rounded-lg border-2 text-left transition-all duration-200
                    ${isSelected
                      ? 'border-genesis-orange bg-genesis-orange/5 shadow-lg'
                      : 'border-genesis-gray-200 hover:border-genesis-gray-300 hover:shadow-md'
                    }
                  `}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h5 className="font-medium text-genesis-gray-900">
                        {feature.name}
                      </h5>
                      <p className="text-sm text-genesis-gray-600 mt-1">
                        {feature.description}
                      </p>
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
                        >
                          <Check className="w-4 h-4 text-white" />
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.button>
              )
            })}
          </div>
        </div>
      ))}

      {/* Custom Features */}
      <div className="border-t border-genesis-gray-200 pt-6">
        <h4 className="text-lg font-medium text-genesis-gray-900 mb-3">
          Custom Features
        </h4>
        
        <div className="flex space-x-3 mb-4">
          <input
            type="text"
            value={customFeature}
            onChange={(e) => setCustomFeature(e.target.value)}
            placeholder="Describe a custom feature..."
            className="flex-1 input-field"
            onKeyPress={(e) => e.key === 'Enter' && handleAddCustomFeature()}
          />
          <motion.button
            onClick={handleAddCustomFeature}
            disabled={!customFeature.trim()}
            className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Plus className="w-4 h-4" />
          </motion.button>
        </div>

        {project.customFeatures && project.customFeatures.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-genesis-gray-700">Added Custom Features:</p>
            <div className="space-y-1">
              {project.customFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 text-sm text-genesis-gray-600"
                >
                  <Check className="w-4 h-4 text-genesis-orange" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Feature Summary */}
      <div className="bg-genesis-gray-50 rounded-lg p-4">
        <h5 className="font-medium text-genesis-gray-900 mb-2">
          Selected Features ({selectedFeatures.size})
        </h5>
        <p className="text-sm text-genesis-gray-600">
          {selectedFeatures.size > 0 
            ? `You've selected ${selectedFeatures.size} features for your project.`
            : 'No features selected yet. Choose the functionality you need for your project.'
          }
        </p>
      </div>
    </div>
  )
}