'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Palette, Monitor, Smartphone, Tablet } from 'lucide-react'
import { useProjectStore } from '@/store/projectStore'

const colorSchemes = [
  { id: 'blue', name: 'Ocean Blue', primary: '#0066CC', secondary: '#E6F3FF', description: 'Professional and trustworthy' },
  { id: 'green', name: 'Forest Green', primary: '#22C55E', secondary: '#ECFDF5', description: 'Natural and growth-focused' },
  { id: 'purple', name: 'Royal Purple', primary: '#8B5CF6', secondary: '#F3E8FF', description: 'Creative and innovative' },
  { id: 'orange', name: 'Sunset Orange', primary: '#FF6B35', secondary: '#FFF7ED', description: 'Energetic and friendly' },
  { id: 'gray', name: 'Modern Gray', primary: '#6B7280', secondary: '#F9FAFB', description: 'Minimal and sophisticated' },
  { id: 'red', name: 'Crimson Red', primary: '#EF4444', secondary: '#FEF2F2', description: 'Bold and attention-grabbing' },
]

const designStyles = [
  { id: 'modern', name: 'Modern', description: 'Clean lines, minimalist approach' },
  { id: 'classic', name: 'Classic', description: 'Traditional, timeless design' },
  { id: 'playful', name: 'Playful', description: 'Fun, vibrant, and engaging' },
  { id: 'corporate', name: 'Corporate', description: 'Professional, business-focused' },
  { id: 'creative', name: 'Creative', description: 'Artistic, unique layouts' },
  { id: 'minimal', name: 'Minimal', description: 'Less is more philosophy' },
]

const layoutOptions = [
  { id: 'sidebar', name: 'Sidebar Navigation', description: 'Fixed side navigation panel' },
  { id: 'topnav', name: 'Top Navigation', description: 'Horizontal navigation bar' },
  { id: 'dashboard', name: 'Dashboard Layout', description: 'Grid-based dashboard design' },
  { id: 'landing', name: 'Landing Page', description: 'Marketing-focused layout' },
  { id: 'blog', name: 'Blog Layout', description: 'Content-focused design' },
  { id: 'ecommerce', name: 'E-commerce', description: 'Product showcase layout' },
]

export default function DesignPreferences() {
  const { project, updateProject } = useProjectStore()
  const [designPrefs, setDesignPrefs] = useState(project.designPreferences || {
    colorScheme: 'orange',
    style: 'modern',
    layout: 'sidebar',
    responsive: true,
    darkMode: false,
  })

  const updateDesignPref = (key: string, value: any) => {
    const updated = { ...designPrefs, [key]: value }
    setDesignPrefs(updated)
    updateProject({ designPreferences: updated })
  }

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-genesis-gray-900 mb-2">
          Design Preferences
        </h3>
        <p className="text-genesis-gray-600">
          Customize the visual appearance and user experience of your project.
        </p>
      </div>

      {/* Color Scheme */}
      <div className="space-y-4">
        <h4 className="text-lg font-medium text-genesis-gray-900">Color Scheme</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {colorSchemes.map((scheme) => (
            <motion.button
              key={scheme.id}
              onClick={() => updateDesignPref('colorScheme', scheme.id)}
              className={`
                p-4 rounded-lg border-2 text-left transition-all duration-200
                ${designPrefs.colorScheme === scheme.id
                  ? 'border-genesis-orange shadow-lg'
                  : 'border-genesis-gray-200 hover:border-genesis-gray-300'
                }
              `}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center space-x-3 mb-2">
                <div 
                  className="w-6 h-6 rounded-full"
                  style={{ backgroundColor: scheme.primary }}
                />
                <div 
                  className="w-6 h-6 rounded-full"
                  style={{ backgroundColor: scheme.secondary }}
                />
              </div>
              <h5 className="font-medium text-genesis-gray-900">{scheme.name}</h5>
              <p className="text-sm text-genesis-gray-600 mt-1">{scheme.description}</p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Design Style */}
      <div className="space-y-4">
        <h4 className="text-lg font-medium text-genesis-gray-900">Design Style</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {designStyles.map((style) => (
            <motion.button
              key={style.id}
              onClick={() => updateDesignPref('style', style.id)}
              className={`
                p-4 rounded-lg border-2 text-left transition-all duration-200
                ${designPrefs.style === style.id
                  ? 'border-genesis-orange bg-genesis-orange/5'
                  : 'border-genesis-gray-200 hover:border-genesis-gray-300'
                }
              `}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <h5 className="font-medium text-genesis-gray-900">{style.name}</h5>
              <p className="text-sm text-genesis-gray-600 mt-1">{style.description}</p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Layout Type */}
      <div className="space-y-4">
        <h4 className="text-lg font-medium text-genesis-gray-900">Layout Type</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {layoutOptions.map((layout) => (
            <motion.button
              key={layout.id}
              onClick={() => updateDesignPref('layout', layout.id)}
              className={`
                p-4 rounded-lg border-2 text-left transition-all duration-200
                ${designPrefs.layout === layout.id
                  ? 'border-genesis-orange bg-genesis-orange/5'
                  : 'border-genesis-gray-200 hover:border-genesis-gray-300'
                }
              `}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <h5 className="font-medium text-genesis-gray-900">{layout.name}</h5>
              <p className="text-sm text-genesis-gray-600 mt-1">{layout.description}</p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Responsive Design */}
      <div className="space-y-4">
        <h4 className="text-lg font-medium text-genesis-gray-900">Responsive Breakpoints</h4>
        <div className="grid grid-cols-3 gap-4">
          {[
            { id: 'mobile', icon: Smartphone, label: 'Mobile First', desc: '320px+' },
            { id: 'tablet', icon: Tablet, label: 'Tablet', desc: '768px+' },
            { id: 'desktop', icon: Monitor, label: 'Desktop', desc: '1024px+' },
          ].map(({ id, icon: Icon, label, desc }) => (
            <div key={id} className="text-center p-4 bg-genesis-gray-50 rounded-lg">
              <Icon className="w-8 h-8 text-genesis-orange mx-auto mb-2" />
              <h5 className="font-medium text-genesis-gray-900">{label}</h5>
              <p className="text-sm text-genesis-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Options */}
      <div className="space-y-4">
        <h4 className="text-lg font-medium text-genesis-gray-900">Additional Options</h4>
        <div className="space-y-3">
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={designPrefs.darkMode}
              onChange={(e) => updateDesignPref('darkMode', e.target.checked)}
              className="w-5 h-5 text-genesis-orange border-genesis-gray-300 rounded focus:ring-genesis-orange"
            />
            <div>
              <span className="font-medium text-genesis-gray-900">Dark Mode Support</span>
              <p className="text-sm text-genesis-gray-600">Include dark theme toggle</p>
            </div>
          </label>

          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={designPrefs.animations}
              onChange={(e) => updateDesignPref('animations', e.target.checked)}
              className="w-5 h-5 text-genesis-orange border-genesis-gray-300 rounded focus:ring-genesis-orange"
            />
            <div>
              <span className="font-medium text-genesis-gray-900">Smooth Animations</span>
              <p className="text-sm text-genesis-gray-600">Add transitions and micro-interactions</p>
            </div>
          </label>

          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={designPrefs.accessibility}
              onChange={(e) => updateDesignPref('accessibility', e.target.checked)}
              className="w-5 h-5 text-genesis-orange border-genesis-gray-300 rounded focus:ring-genesis-orange"
            />
            <div>
              <span className="font-medium text-genesis-gray-900">Accessibility Features</span>
              <p className="text-sm text-genesis-gray-600">WCAG 2.1 AA compliance</p>
            </div>
          </label>
        </div>
      </div>

      {/* Custom Styling */}
      <div className="space-y-4">
        <h4 className="text-lg font-medium text-genesis-gray-900">Custom Styling</h4>
        <textarea
          placeholder="Describe any specific design requirements or inspiration..."
          className="textarea-field"
          rows={3}
          value={designPrefs.customNotes || ''}
          onChange={(e) => updateDesignPref('customNotes', e.target.value)}
        />
      </div>
    </div>
  )
}