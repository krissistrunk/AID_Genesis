'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Download, 
  Github, 
  Upload, 
  FileArchive, 
  Globe, 
  Code, 
  Package,
  Folder,
  CheckCircle,
  ExternalLink,
  Copy
} from 'lucide-react'
import { useProjectStore } from '@/store/projectStore'
import toast from 'react-hot-toast'

const exportFormats = [
  {
    id: 'zip',
    name: 'ZIP Archive',
    description: 'Complete project as downloadable ZIP file',
    icon: FileArchive,
    format: 'zip',
    size: '~2.5 MB'
  },
  {
    id: 'github',
    name: 'GitHub Repository',
    description: 'Create new GitHub repository with your code',
    icon: Github,
    format: 'repository',
    size: 'Variable'
  },
  {
    id: 'codesandbox',
    name: 'CodeSandbox',
    description: 'Open project in CodeSandbox for instant editing',
    icon: Code,
    format: 'online',
    size: 'Hosted'
  },
  {
    id: 'stackblitz',
    name: 'StackBlitz',
    description: 'Launch project in StackBlitz development environment',
    icon: Globe,
    format: 'online',
    size: 'Hosted'
  }
]

const deploymentOptions = [
  {
    id: 'vercel',
    name: 'Vercel',
    description: 'Deploy to Vercel with automatic CI/CD',
    icon: Globe,
    status: 'recommended'
  },
  {
    id: 'netlify',
    name: 'Netlify',
    description: 'Deploy to Netlify with form handling',
    icon: Upload,
    status: 'popular'
  },
  {
    id: 'github-pages',
    name: 'GitHub Pages',
    description: 'Free hosting for static sites',
    icon: Github,
    status: 'free'
  }
]

export default function ExportPanel() {
  const { project } = useProjectStore()
  const [selectedExport, setSelectedExport] = useState<string | null>(null)
  const [isExporting, setIsExporting] = useState(false)
  const [exportProgress, setExportProgress] = useState(0)
  const [exportResult, setExportResult] = useState<any>(null)

  const handleExport = async (formatId: string) => {
    setSelectedExport(formatId)
    setIsExporting(true)
    setExportProgress(0)

    // Simulate export process
    const steps = ['Preparing files', 'Bundling assets', 'Optimizing code', 'Creating package']
    
    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setExportProgress(((i + 1) / steps.length) * 100)
      toast.success(steps[i])
    }

    // Mock export result
    const result = {
      format: formatId,
      downloadUrl: '#',
      size: '2.4 MB',
      files: project.files.length,
      timestamp: new Date().toISOString()
    }

    setExportResult(result)
    setIsExporting(false)
    toast.success('Export completed successfully!')
  }

  const handleDeploy = async (platform: string) => {
    toast.success(`Initiating deployment to ${platform}...`)
    // In a real implementation, this would trigger the deployment process
  }

  const copyProjectInfo = () => {
    const info = `
Project: ${project.name}
Description: ${project.description}
Tech Stack: ${Object.values(project.techStack || {}).join(', ')}
Features: ${(project.features || []).length} selected
Generated: ${new Date().toLocaleDateString()}
    `.trim()
    
    navigator.clipboard.writeText(info)
    toast.success('Project info copied to clipboard!')
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-6 space-y-8">
        {/* Export Options */}
        <div>
          <h3 className="text-lg font-semibold text-genesis-gray-900 mb-4">
            Export Your Project
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {exportFormats.map((format) => {
              const Icon = format.icon
              const isSelected = selectedExport === format.id
              
              return (
                <motion.button
                  key={format.id}
                  onClick={() => handleExport(format.id)}
                  disabled={isExporting}
                  className={`
                    p-6 rounded-xl border-2 text-left transition-all duration-200
                    ${isSelected && exportResult
                      ? 'border-green-500 bg-green-50'
                      : isExporting && selectedExport === format.id
                      ? 'border-genesis-orange bg-genesis-orange/5'
                      : 'border-genesis-gray-200 hover:border-genesis-gray-300 hover:shadow-md'
                    }
                    ${isExporting ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
                  `}
                  whileHover={!isExporting ? { scale: 1.02 } : {}}
                  whileTap={!isExporting ? { scale: 0.98 } : {}}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`
                      w-12 h-12 rounded-lg flex items-center justify-center
                      ${isSelected && exportResult
                        ? 'bg-green-500 text-white'
                        : isExporting && selectedExport === format.id
                        ? 'bg-genesis-orange text-white'
                        : 'bg-genesis-gray-100 text-genesis-gray-600'
                      }
                    `}>
                      {isSelected && exportResult ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        <Icon className="w-6 h-6" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="font-semibold text-genesis-gray-900 mb-1">
                        {format.name}
                      </h4>
                      <p className="text-sm text-genesis-gray-600 mb-2">
                        {format.description}
                      </p>
                      <div className="flex items-center space-x-3 text-xs text-genesis-gray-500">
                        <span>Format: {format.format}</span>
                        <span>•</span>
                        <span>Size: {format.size}</span>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  {isExporting && selectedExport === format.id && (
                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-genesis-gray-700">
                          Exporting...
                        </span>
                        <span className="text-sm text-genesis-gray-500">
                          {Math.round(exportProgress)}%
                        </span>
                      </div>
                      <div className="progress-bar">
                        <motion.div
                          className="progress-fill"
                          initial={{ width: 0  }}
                          animate={{ width: `${exportProgress}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Export Result */}
                  {exportResult && selectedExport === format.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-green-800">
                            Export completed!
                          </p>
                          <p className="text-xs text-green-600">
                            {exportResult.files} files • {exportResult.size}
                          </p>
                        </div>
                        <motion.a
                          href={exportResult.downloadUrl}
                          className="btn-primary text-sm py-2 px-4"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </motion.a>
                      </div>
                    </motion.div>
                  )}
                </motion.button>
              )
            })}
          </div>
        </div>

        {/* Deployment Options */}
        <div>
          <h3 className="text-lg font-semibold text-genesis-gray-900 mb-4">
            Deploy Your Project
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {deploymentOptions.map((option) => {
              const Icon = option.icon
              
              return (
                <motion.button
                  key={option.id}
                  onClick={() => handleDeploy(option.name)}
                  className="p-4 rounded-lg border border-genesis-gray-200 hover:border-genesis-gray-300 hover:shadow-md text-left transition-all duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-genesis-gray-100 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-genesis-gray-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-genesis-gray-900">
                        {option.name}
                      </h4>
                      <span className={`
                        text-xs px-2 py-1 rounded-full
                        ${option.status === 'recommended' ? 'bg-green-100 text-green-800' :
                          option.status === 'popular' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'}
                      `}>
                        {option.status}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-genesis-gray-600">
                    {option.description}
                  </p>
                </motion.button>
              )
            })}
          </div>
        </div>

        {/* Project Documentation */}
        <div>
          <h3 className="text-lg font-semibold text-genesis-gray-900 mb-4">
            Generated Documentation
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="card">
              <div className="flex items-center space-x-3 mb-3">
                <Package className="w-5 h-5 text-genesis-orange" />
                <h4 className="font-medium text-genesis-gray-900">Setup Guide</h4>
              </div>
              <p className="text-sm text-genesis-gray-600 mb-4">
                Complete installation and setup instructions for your project.
              </p>
              <button className="btn-outline text-sm py-2 px-4">
                <ExternalLink className="w-4 h-4 mr-2" />
                View Guide
              </button>
            </div>

            <div className="card">
              <div className="flex items-center space-x-3 mb-3">
                <Code className="w-5 h-5 text-genesis-orange" />
                <h4 className="font-medium text-genesis-gray-900">API Documentation</h4>
              </div>
              <p className="text-sm text-genesis-gray-600 mb-4">
                Detailed API endpoints and usage examples.
              </p>
              <button className="btn-outline text-sm py-2 px-4">
                <ExternalLink className="w-4 h-4 mr-2" />
                View Docs
              </button>
            </div>
          </div>
        </div>

        {/* Project Summary */}
        <div className="bg-genesis-gray-50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-genesis-gray-900">
              Project Summary
            </h3>
            <motion.button
              onClick={copyProjectInfo}
              className="btn-secondary text-sm py-2 px-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy Info
            </motion.button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-genesis-gray-600">Project Name</p>
              <p className="font-medium text-genesis-gray-900">
                {project.name || 'Untitled Project'}
              </p>
            </div>
            
            <div>
              <p className="text-sm text-genesis-gray-600">Files Generated</p>
              <p className="font-medium text-genesis-gray-900">
                {project.files.length} files
              </p>
            </div>
            
            <div>
              <p className="text-sm text-genesis-gray-600">Tech Stack</p>
              <p className="font-medium text-genesis-gray-900">
                {Object.values(project.techStack || {}).filter(Boolean).length || 0} technologies
              </p>
            </div>
            
            <div>
              <p className="text-sm text-genesis-gray-600">Features</p>
              <p className="font-medium text-genesis-gray-900">
                {(project.features || []).length} features
              </p>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-genesis-gray-200">
            <p className="text-sm text-genesis-gray-600 mb-2">Description</p>
            <p className="text-genesis-gray-900">
              {project.description || 'No description provided'}
            </p>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-blue-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-genesis-gray-900 mb-3">
            🚀 Next Steps
          </h3>
          <ul className="space-y-2 text-sm text-genesis-gray-700">
            <li className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Download your project files</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Set up your development environment</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-genesis-gray-300 rounded-full" />
              <span>Install dependencies with npm install</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-genesis-gray-300 rounded-full" />
              <span>Start development server</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-genesis-gray-300 rounded-full" />
              <span>Deploy to your preferred platform</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}