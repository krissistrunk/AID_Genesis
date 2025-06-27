'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Folder, 
  File, 
  ChevronRight, 
  ChevronDown, 
  Package, 
  Code, 
  Settings, 
  Database,
  Globe,
  Shield,
  Zap
} from 'lucide-react'
import { useProjectStore } from '@/store/projectStore'

interface TreeNode {
  name: string
  type: 'folder' | 'file'
  children?: TreeNode[]
  description?: string
  size?: string
  language?: string
  purpose?: string
}

export default function ProjectStructure() {
  const { project } = useProjectStore()
  const [expandedNodes, setExpandedNodes] = useState(new Set(['root', 'src', 'components', 'pages']))
  const [selectedNode, setSelectedNode] = useState<string | null>(null)

  // Generate project structure based on project configuration
  const generateProjectStructure = (): TreeNode => {
    const techStack = project.techStack || {}
    const isReact = techStack.frontend === 'react' || techStack.frontend === 'nextjs'
    const isVue = techStack.frontend === 'vue' || techStack.frontend === 'nuxtjs'
    const isNodeJS = techStack.backend === 'nodejs'
    
    return {
      name: project.name || 'Your Project',
      type: 'folder',
      children: [
        {
          name: 'src',
          type: 'folder',
          description: 'Source code directory',
          children: [
            {
              name: 'components',
              type: 'folder',
              description: 'Reusable UI components',
              children: [
                { name: 'Header.tsx', type: 'file', language: 'TypeScript', purpose: 'Navigation header component' },
                { name: 'Sidebar.tsx', type: 'file', language: 'TypeScript', purpose: 'Navigation sidebar component' },
                { name: 'Button.tsx', type: 'file', language: 'TypeScript', purpose: 'Reusable button component' },
                { name: 'Modal.tsx', type: 'file', language: 'TypeScript', purpose: 'Modal dialog component' },
              ]
            },
            {
              name: 'pages',
              type: 'folder',
              description: 'Application pages/views',
              children: [
                { name: 'Dashboard.tsx', type: 'file', language: 'TypeScript', purpose: 'Main dashboard page' },
                { name: 'Profile.tsx', type: 'file', language: 'TypeScript', purpose: 'User profile page' },
                { name: 'Settings.tsx', type: 'file', language: 'TypeScript', purpose: 'Application settings' },
              ]
            },
            {
              name: 'hooks',
              type: 'folder',
              description: 'Custom React hooks',
              children: [
                { name: 'useAuth.ts', type: 'file', language: 'TypeScript', purpose: 'Authentication state management' },
                { name: 'useApi.ts', type: 'file', language: 'TypeScript', purpose: 'API call utilities' },
                { name: 'useLocalStorage.ts', type: 'file', language: 'TypeScript', purpose: 'Local storage utilities' },
              ]
            },
            {
              name: 'services',
              type: 'folder',
              description: 'API and external services',
              children: [
                { name: 'api.ts', type: 'file', language: 'TypeScript', purpose: 'API configuration and endpoints' },
                { name: 'auth.ts', type: 'file', language: 'TypeScript', purpose: 'Authentication service' },
                { name: 'storage.ts', type: 'file', language: 'TypeScript', purpose: 'File storage service' },
              ]
            },
            {
              name: 'types',
              type: 'folder',
              description: 'TypeScript type definitions',
              children: [
                { name: 'user.ts', type: 'file', language: 'TypeScript', purpose: 'User data types' },
                { name: 'api.ts', type: 'file', language: 'TypeScript', purpose: 'API response types' },
                { name: 'common.ts', type: 'file', language: 'TypeScript', purpose: 'Common shared types' },
              ]
            },
            {
              name: 'styles',
              type: 'folder',
              description: 'Styling files',
              children: [
                { name: 'globals.css', type: 'file', language: 'CSS', purpose: 'Global application styles' },
                { name: 'components.css', type: 'file', language: 'CSS', purpose: 'Component-specific styles' },
                { name: 'variables.css', type: 'file', language: 'CSS', purpose: 'CSS custom properties' },
              ]
            },
            { name: 'App.tsx', type: 'file', language: 'TypeScript', purpose: 'Main application component' },
            { name: 'index.tsx', type: 'file', language: 'TypeScript', purpose: 'Application entry point' },
          ]
        },
        {
          name: 'public',
          type: 'folder',
          description: 'Static assets',
          children: [
            { name: 'index.html', type: 'file', language: 'HTML', purpose: 'Main HTML template' },
            { name: 'favicon.ico', type: 'file', language: 'Binary', purpose: 'Browser tab icon' },
            { name: 'manifest.json', type: 'file', language: 'JSON', purpose: 'PWA manifest' },
          ]
        },
        {
          name: 'docs',
          type: 'folder',
          description: 'Project documentation',
          children: [
            { name: 'README.md', type: 'file', language: 'Markdown', purpose: 'Project overview and setup' },
            { name: 'API.md', type: 'file', language: 'Markdown', purpose: 'API documentation' },
            { name: 'DEPLOYMENT.md', type: 'file', language: 'Markdown', purpose: 'Deployment instructions' },
          ]
        },
        { name: 'package.json', type: 'file', language: 'JSON', purpose: 'Dependencies and scripts' },
        { name: 'tsconfig.json', type: 'file', language: 'JSON', purpose: 'TypeScript configuration' },
        { name: 'tailwind.config.js', type: 'file', language: 'JavaScript', purpose: 'Tailwind CSS configuration' },
        { name: 'vite.config.ts', type: 'file', language: 'TypeScript', purpose: 'Vite build configuration' },
        { name: '.gitignore', type: 'file', language: 'Text', purpose: 'Git ignore patterns' },
        { name: '.env.example', type: 'file', language: 'Text', purpose: 'Environment variables template' },
      ]
    }
  }

  const projectStructure = generateProjectStructure()

  const toggleNode = (nodePath: string) => {
    const updated = new Set(expandedNodes)
    if (updated.has(nodePath)) {
      updated.delete(nodePath)
    } else {
      updated.add(nodePath)
    }
    setExpandedNodes(updated)
  }

  const getFileIcon = (node: TreeNode) => {
    if (node.type === 'folder') {
      return <Folder className="w-4 h-4 text-genesis-orange" />
    }
    
    const name = node.name.toLowerCase()
    if (name.includes('package.json')) return <Package className="w-4 h-4 text-green-600" />
    if (name.includes('config')) return <Settings className="w-4 h-4 text-genesis-gray-600" />
    if (name.includes('.env')) return <Shield className="w-4 h-4 text-yellow-600" />
    if (name.includes('readme') || name.includes('.md')) return <File className="w-4 h-4 text-blue-600" />
    if (name.includes('.ts') || name.includes('.tsx')) return <Code className="w-4 h-4 text-blue-500" />
    if (name.includes('.js') || name.includes('.jsx')) return <Code className="w-4 h-4 text-yellow-500" />
    if (name.includes('.css')) return <Zap className="w-4 h-4 text-pink-500" />
    if (name.includes('.json')) return <Database className="w-4 h-4 text-genesis-gray-600" />
    if (name.includes('.html')) return <Globe className="w-4 h-4 text-orange-500" />
    
    return <File className="w-4 h-4 text-genesis-gray-500" />
  }

  const renderTreeNode = (node: TreeNode, path: string, depth: number = 0): JSX.Element => {
    const nodePath = `${path}/${node.name}`
    const isExpanded = expandedNodes.has(nodePath)
    const isSelected = selectedNode === nodePath
    const hasChildren = node.children && node.children.length > 0

    return (
      <div key={nodePath}>
        <motion.div
          className={`
            flex items-center space-x-2 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200
            ${isSelected 
              ? 'bg-genesis-orange/10 border border-genesis-orange/20' 
              : 'hover:bg-genesis-gray-50'
            }
          `}
          style={{ marginLeft: `${depth * 20}px` }}
          onClick={() => {
            setSelectedNode(nodePath)
            if (hasChildren) {
              toggleNode(nodePath)
            }
          }}
          whileHover={{ x: 2 }}
        >
          {hasChildren && (
            <button className="text-genesis-gray-400 hover:text-genesis-gray-600">
              {isExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
          )}
          
          {!hasChildren && <div className="w-4" />}
          
          {getFileIcon(node)}
          
          <span className={`text-sm ${isSelected ? 'font-medium text-genesis-orange' : 'text-genesis-gray-700'}`}>
            {node.name}
          </span>
          
          {node.size && (
            <span className="text-xs text-genesis-gray-500 ml-auto">
              {node.size}
            </span>
          )}
        </motion.div>

        {hasChildren && isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            {node.children!.map((child) => renderTreeNode(child, nodePath, depth + 1))}
          </motion.div>
        )}
      </div>
    )
  }

  const getSelectedNodeInfo = () => {
    if (!selectedNode) return null

    const findNode = (node: TreeNode, path: string): TreeNode | null => {
      const nodePath = `${path}/${node.name}`
      if (nodePath === selectedNode) return node
      
      if (node.children) {
        for (const child of node.children) {
          const found = findNode(child, nodePath)
          if (found) return found
        }
      }
      
      return null
    }

    return findNode(projectStructure, 'root')
  }

  const selectedNodeInfo = getSelectedNodeInfo()

  return (
    <div className="h-full flex">
      {/* Project Tree */}
      <div className="w-1/2 bg-white border-r border-genesis-gray-200 flex flex-col">
        <div className="p-6 border-b border-genesis-gray-200">
          <h3 className="text-lg font-semibold text-genesis-gray-900 mb-2">
            Project Structure
          </h3>
          <p className="text-sm text-genesis-gray-600">
            Explore the architecture and organization of your generated project.
          </p>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          {renderTreeNode(projectStructure, 'root')}
        </div>
      </div>

      {/* File/Folder Details */}
      <div className="w-1/2 flex flex-col">
        <div className="p-6 border-b border-genesis-gray-200">
          <h3 className="text-lg font-semibold text-genesis-gray-900">
            Details
          </h3>
        </div>
        
        <div className="flex-1 p-6">
          {selectedNodeInfo ? (
            <motion.div
              key={selectedNode}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* File/Folder Header */}
              <div className="flex items-center space-x-3">
                {getFileIcon(selectedNodeInfo)}
                <div>
                  <h4 className="text-xl font-semibold text-genesis-gray-900">
                    {selectedNodeInfo.name}
                  </h4>
                  <p className="text-sm text-genesis-gray-500 capitalize">
                    {selectedNodeInfo.type}
                    {selectedNodeInfo.language && ` • ${selectedNodeInfo.language}`}
                  </p>
                </div>
              </div>

              {/* Description */}
              {selectedNodeInfo.description && (
                <div className="bg-genesis-gray-50 rounded-lg p-4">
                  <h5 className="font-medium text-genesis-gray-900 mb-2">Description</h5>
                  <p className="text-genesis-gray-700">{selectedNodeInfo.description}</p>
                </div>
              )}

              {/* Purpose */}
              {selectedNodeInfo.purpose && (
                <div className="bg-blue-50 rounded-lg p-4">
                  <h5 className="font-medium text-genesis-gray-900 mb-2">Purpose</h5>
                  <p className="text-genesis-gray-700">{selectedNodeInfo.purpose}</p>
                </div>
              )}

              {/* Folder Contents */}
              {selectedNodeInfo.type === 'folder' && selectedNodeInfo.children && (
                <div>
                  <h5 className="font-medium text-genesis-gray-900 mb-3">
                    Contents ({selectedNodeInfo.children.length} items)
                  </h5>
                  <div className="space-y-2">
                    {selectedNodeInfo.children.map((child, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-genesis-gray-200">
                        {getFileIcon(child)}
                        <div className="flex-1">
                          <p className="font-medium text-genesis-gray-900">{child.name}</p>
                          {child.purpose && (
                            <p className="text-sm text-genesis-gray-600">{child.purpose}</p>
                          )}
                        </div>
                        {child.language && (
                          <span className="px-2 py-1 text-xs bg-genesis-gray-100 text-genesis-gray-600 rounded-full">
                            {child.language}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* File Properties */}
              {selectedNodeInfo.type === 'file' && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg border border-genesis-gray-200 p-4">
                    <h6 className="font-medium text-genesis-gray-900 mb-2">File Type</h6>
                    <p className="text-genesis-gray-700">{selectedNodeInfo.language || 'Unknown'}</p>
                  </div>
                  
                  <div className="bg-white rounded-lg border border-genesis-gray-200 p-4">
                    <h6 className="font-medium text-genesis-gray-900 mb-2">Size</h6>
                    <p className="text-genesis-gray-700">{selectedNodeInfo.size || 'Calculating...'}</p>
                  </div>
                </div>
              )}

              {/* Best Practices */}
              <div className="bg-green-50 rounded-lg p-4">
                <h5 className="font-medium text-genesis-gray-900 mb-2">💡 Best Practices</h5>
                <ul className="text-sm text-genesis-gray-700 space-y-1">
                  {selectedNodeInfo.type === 'folder' && (
                    <>
                      <li>• Keep folder structure shallow and intuitive</li>
                      <li>• Group related files together</li>
                      <li>• Use descriptive folder names</li>
                    </>
                  )}
                  {selectedNodeInfo.name.includes('.ts') && (
                    <>
                      <li>• Use strong typing throughout</li>
                      <li>• Export types for reusability</li>
                      <li>• Follow naming conventions</li>
                    </>
                  )}
                  {selectedNodeInfo.name.includes('component') && (
                    <>
                      <li>• Keep components small and focused</li>
                      <li>• Use prop interfaces for type safety</li>
                      <li>• Include error boundaries</li>
                    </>
                  )}
                </ul>
              </div>
            </motion.div>
          ) : (
            <div className="flex items-center justify-center h-full text-genesis-gray-500">
              <div className="text-center">
                <Folder className="w-16 h-16 text-genesis-gray-300 mx-auto mb-4" />
                <p className="text-lg font-medium">Select a file or folder</p>
                <p className="text-sm">Click on any item in the project tree to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}