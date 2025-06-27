'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { useProjectStore } from '@/store/projectStore'

const technologies = {
  frontend: [
    { id: 'react', name: 'React', description: 'Popular React library for UIs', category: 'JavaScript' },
    { id: 'vue', name: 'Vue.js', description: 'Progressive framework for UIs', category: 'JavaScript' },
    { id: 'angular', name: 'Angular', description: 'Full-featured framework', category: 'TypeScript' },
    { id: 'svelte', name: 'Svelte', description: 'Compile-time optimized framework', category: 'JavaScript' },
    { id: 'nextjs', name: 'Next.js', description: 'React framework with SSR', category: 'React' },
    { id: 'nuxtjs', name: 'Nuxt.js', description: 'Vue framework with SSR', category: 'Vue' },
  ],
  backend: [
    { id: 'nodejs', name: 'Node.js', description: 'JavaScript runtime for servers', category: 'JavaScript' },
    { id: 'python', name: 'Python', description: 'Django/Flask frameworks', category: 'Python' },
    { id: 'java', name: 'Java', description: 'Spring Boot framework', category: 'Java' },
    { id: 'csharp', name: 'C#', description: '.NET Core framework', category: 'Microsoft' },
    { id: 'go', name: 'Go', description: 'Fast, compiled language', category: 'Google' },
    { id: 'rust', name: 'Rust', description: 'Memory-safe systems language', category: 'Mozilla' },
  ],
  database: [
    { id: 'postgresql', name: 'PostgreSQL', description: 'Advanced relational database', category: 'SQL' },
    { id: 'mysql', name: 'MySQL', description: 'Popular relational database', category: 'SQL' },
    { id: 'mongodb', name: 'MongoDB', description: 'Document-based NoSQL', category: 'NoSQL' },
    { id: 'redis', name: 'Redis', description: 'In-memory data store', category: 'Cache' },
    { id: 'sqlite', name: 'SQLite', description: 'Lightweight file database', category: 'SQL' },
    { id: 'firebase', name: 'Firebase', description: 'Google cloud database', category: 'Cloud' },
  ],
  styling: [
    { id: 'tailwind', name: 'Tailwind CSS', description: 'Utility-first CSS framework', category: 'CSS' },
    { id: 'bootstrap', name: 'Bootstrap', description: 'Component-based framework', category: 'CSS' },
    { id: 'materialui', name: 'Material-UI', description: 'React components library', category: 'React' },
    { id: 'antd', name: 'Ant Design', description: 'Enterprise React components', category: 'React' },
    { id: 'chakra', name: 'Chakra UI', description: 'Modular React components', category: 'React' },
    { id: 'styled', name: 'Styled Components', description: 'CSS-in-JS library', category: 'CSS-in-JS' },
  ],
}

export default function TechnologySelector() {
  const { project, updateProject } = useProjectStore()
  const [selectedTech, setSelectedTech] = useState(project.techStack || {})

  const handleTechToggle = (category: string, techId: string) => {
    const updated = {
      ...selectedTech,
      [category]: selectedTech[category] === techId ? null : techId
    }
    setSelectedTech(updated)
    updateProject({ techStack: updated })
  }

  const renderTechCategory = (categoryName: string, techs: any[]) => (
    <div className="space-y-3">
      <h4 className="text-lg font-semibold text-genesis-gray-900 capitalize">
        {categoryName}
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {techs.map((tech) => {
          const isSelected = selectedTech[categoryName] === tech.id
          
          return (
            <motion.button
              key={tech.id}
              onClick={() => handleTechToggle(categoryName, tech.id)}
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
                  <div className="flex items-center space-x-2">
                    <h5 className="font-medium text-genesis-gray-900">
                      {tech.name}
                    </h5>
                    <span className={`
                      px-2 py-1 text-xs rounded-full
                      ${isSelected 
                        ? 'bg-genesis-orange text-white' 
                        : 'bg-genesis-gray-100 text-genesis-gray-600'
                      }
                    `}>
                      {tech.category}
                    </span>
                  </div>
                  <p className="text-sm text-genesis-gray-600 mt-1">
                    {tech.description}
                  </p>
                </div>
                
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-6 h-6 bg-genesis-orange rounded-full flex items-center justify-center ml-3"
                  >
                    <Check className="w-4 h-4 text-white" />
                  </motion.div>
                )}
              </div>
            </motion.button>
          )
        })}
      </div>
    </div>
  )

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-genesis-gray-900 mb-2">
          Select Your Technology Stack
        </h3>
        <p className="text-genesis-gray-600">
          Choose the technologies you'd like to use for your project. You can select one option per category.
        </p>
      </div>

      {Object.entries(technologies).map(([category, techs]) => (
        <div key={category}>
          {renderTechCategory(category, techs)}
        </div>
      ))}

      {/* Custom Technology Input */}
      <div className="border-t border-genesis-gray-200 pt-6">
        <h4 className="text-lg font-semibold text-genesis-gray-900 mb-3">
          Custom Requirements
        </h4>
        <textarea
          placeholder="Specify any additional technologies, libraries, or requirements..."
          className="textarea-field"
          rows={3}
          onChange={(e) => updateProject({ customRequirements: e.target.value })}
          value={project.customRequirements || ''}
        />
      </div>
    </div>
  )
}