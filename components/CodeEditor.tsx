'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Editor from '@monaco-editor/react'
import { 
  Play, 
  Download, 
  Copy, 
  FileText, 
  Folder, 
  ChevronRight,
  ChevronDown,
  Search,
  Undo,
  Redo
} from 'lucide-react'
import { useProjectStore } from '@/store/projectStore'
import toast from 'react-hot-toast'

export default function CodeEditor() {
  const { project, updateProject } = useProjectStore()
  const [selectedFile, setSelectedFile] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')
  const [editorTheme, setEditorTheme] = useState('vs-light')
  const [expandedFolders, setExpandedFolders] = useState(new Set(['src', 'components']))

  // Mock file structure for demonstration
  const mockFiles = project.files.length > 0 ? project.files : [
    {
      name: 'App.tsx',
      path: 'src/App.tsx',
      language: 'typescript',
      content: `import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App`
    },
    {
      name: 'Dashboard.tsx',
      path: 'src/pages/Dashboard.tsx',
      language: 'typescript',
      content: `import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface DashboardData {
  users: number
  revenue: number
  orders: number
}

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setData({
        users: 1250,
        revenue: 45670,
        orders: 356
      })
      setLoading(false)
    }, 1000)
  }, [])

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  return (
    <motion.div 
      className="dashboard"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1>Dashboard</h1>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Users</h3>
          <p>{data?.users}</p>
        </div>
        <div className="stat-card">
          <h3>Revenue</h3>
          <p>$${data?.revenue.toLocaleString()}</p>
        </div>
        <div className="stat-card">
          <h3>Orders</h3>
          <p>{data?.orders}</p>
        </div>
      </div>
    </motion.div>
  )
}`
    },
    {
      name: 'Header.tsx',
      path: 'src/components/Header.tsx',
      language: 'typescript',
      content: `import React from 'react'
import { Link } from 'react-router-dom'
import { User, Settings, Menu } from 'lucide-react'

export default function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <h1>${project.name || 'Your App'}</h1>
        </div>
        
        <nav className="navigation">
          <Link to="/" className="nav-link">Dashboard</Link>
          <Link to="/analytics" className="nav-link">Analytics</Link>
          <Link to="/settings" className="nav-link">Settings</Link>
        </nav>
        
        <div className="header-actions">
          <button className="icon-btn">
            <Settings size={20} />
          </button>
          <button className="icon-btn">
            <User size={20} />
          </button>
        </div>
      </div>
    </header>
  )
}`
    },
    {
      name: 'App.css',
      path: 'src/App.css',
      language: 'css',
      content: `.App {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background: white;
  border-bottom: 1px solid #e2e8f0;
  padding: 1rem 2rem;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
}

.logo h1 {
  color: #ff6b35;
  font-size: 1.5rem;
  margin: 0;
}

.navigation {
  display: flex;
  gap: 2rem;
}

.nav-link {
  color: #64748b;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.nav-link:hover {
  color: #ff6b35;
}

.header-actions {
  display: flex;
  gap: 1rem;
}

.icon-btn {
  background: none;
  border: none;
  padding: 0.5rem;
  border-radius: 0.5rem;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s;
}

.icon-btn:hover {
  background: #f8fafc;
  color: #ff6b35;
}

.main-content {
  flex: 1;
  padding: 2rem;
}

.dashboard {
  max-width: 1200px;
  margin: 0 auto;
}

.dashboard h1 {
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #1e293b;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: white;
  padding: 1.5rem;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
}

.stat-card h3 {
  font-size: 0.875rem;
  color: #64748b;
  margin: 0 0 0.5rem 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.stat-card p {
  font-size: 1.875rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
}

.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 400px;
  font-size: 1.125rem;
  color: #64748b;
}`
    },
    {
      name: 'package.json',
      path: 'package.json',
      language: 'json',
      content: `{
  "name": "${project.name?.toLowerCase().replace(/\s+/g, '-') || 'your-app'}",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.8.0",
    "framer-motion": "^10.0.0",
    "lucide-react": "^0.294.0",
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "typescript": "^4.9.0"
  },
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint src --ext ts,tsx --report-unused-disable-directives --max-warnings 0"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}`
    }
  ]

  useEffect(() => {
    if (project.files.length === 0) {
      updateProject({ files: mockFiles })
    }
  }, [project.files.length, updateProject])

  const handleFileContentChange = (value: string | undefined) => {
    if (value !== undefined && mockFiles[selectedFile]) {
      const updatedFiles = [...mockFiles]
      updatedFiles[selectedFile].content = value
      updateProject({ files: updatedFiles })
    }
  }

  const copyToClipboard = async () => {
    if (mockFiles[selectedFile]) {
      await navigator.clipboard.writeText(mockFiles[selectedFile].content)
      toast.success('Code copied to clipboard!')
    }
  }

  const downloadFile = () => {
    if (mockFiles[selectedFile]) {
      const file = mockFiles[selectedFile]
      const blob = new Blob([file.content], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = file.name
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      toast.success(`Downloaded ${file.name}`)
    }
  }

  const toggleFolder = (folderName: string) => {
    const updated = new Set(expandedFolders)
    if (updated.has(folderName)) {
      updated.delete(folderName)
    } else {
      updated.add(folderName)
    }
    setExpandedFolders(updated)
  }

  const getFileIcon = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase()
    switch (ext) {
      case 'tsx':
      case 'ts':
      case 'js':
      case 'jsx':
        return '⚛️'
      case 'css':
      case 'scss':
        return '🎨'
      case 'json':
        return '📋'
      case 'md':
        return '📝'
      default:
        return '📄'
    }
  }

  const renderFileTree = () => {
    const tree: { [key: string]: any } = {}
    
    mockFiles.forEach((file, index) => {
      const parts = file.path.split('/')
      let current = tree
      
      parts.forEach((part, i) => {
        if (i === parts.length - 1) {
          // It's a file
          current[part] = { type: 'file', index, file }
        } else {
          // It's a folder
          if (!current[part]) {
            current[part] = { type: 'folder', children: {} }
          }
          current = current[part].children
        }
      })
    })

    const renderTreeNode = (name: string, node: any, depth = 0): JSX.Element => {
      if (node.type === 'file') {
        return (
          <motion.button
            key={`${name}-${node.index}`}
            onClick={() => setSelectedFile(node.index)}
            className={`
              w-full flex items-center space-x-2 px-3 py-2 text-left text-sm rounded-lg transition-all duration-200
              ${selectedFile === node.index 
                ? 'bg-genesis-orange text-white' 
                : 'text-genesis-gray-700 hover:bg-genesis-gray-100'
              }
            `}
            style={{ marginLeft: `${depth * 16}px` }}
            whileHover={{ x: 2 }}
          >
            <span className="text-sm">{getFileIcon(name)}</span>
            <span className="truncate">{name}</span>
          </motion.button>
        )
      }

      const isExpanded = expandedFolders.has(name)
      
      return (
        <div key={name}>
          <motion.button
            onClick={() => toggleFolder(name)}
            className="w-full flex items-center space-x-2 px-3 py-2 text-left text-sm text-genesis-gray-700 hover:bg-genesis-gray-100 rounded-lg transition-all duration-200"
            style={{ marginLeft: `${depth * 16}px` }}
            whileHover={{ x: 2 }}
          >
            {isExpanded ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
            <Folder className="w-4 h-4 text-genesis-orange" />
            <span className="font-medium">{name}</span>
          </motion.button>
          
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              {Object.entries(node.children).map(([childName, childNode]) =>
                renderTreeNode(childName, childNode, depth + 1)
              )}
            </motion.div>
          )}
        </div>
      )
    }

    return (
      <div className="space-y-1">
        {Object.entries(tree).map(([name, node]) => renderTreeNode(name, node))}
      </div>
    )
  }

  return (
    <div className="h-full flex">
      {/* File Explorer */}
      <div className="w-80 bg-white border-r border-genesis-gray-200 flex flex-col">
        <div className="p-4 border-b border-genesis-gray-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-genesis-gray-900">Project Files</h3>
            <span className="text-sm text-genesis-gray-500">
              {mockFiles.length} files
            </span>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-genesis-gray-400" />
            <input
              type="text"
              placeholder="Search files..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-genesis-gray-300 rounded-lg focus:ring-2 focus:ring-genesis-orange focus:border-transparent text-sm"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          {renderFileTree()}
        </div>
      </div>

      {/* Code Editor */}
      <div className="flex-1 flex flex-col">
        {/* Editor Header */}
        <div className="bg-white border-b border-genesis-gray-200 px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-lg">{getFileIcon(mockFiles[selectedFile]?.name || '')}</span>
              <h4 className="font-medium text-genesis-gray-900">
                {mockFiles[selectedFile]?.name || 'Select a file'}
              </h4>
              <span className="text-sm text-genesis-gray-500">
                {mockFiles[selectedFile]?.path}
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <select
                value={editorTheme}
                onChange={(e) => setEditorTheme(e.target.value)}
                className="text-sm border border-genesis-gray-300 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-genesis-orange focus:border-transparent"
              >
                <option value="vs-light">Light Theme</option>
                <option value="vs-dark">Dark Theme</option>
                <option value="hc-black">High Contrast</option>
              </select>
              
              <motion.button
                onClick={copyToClipboard}
                className="btn-secondary p-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Copy className="w-4 h-4" />
              </motion.button>
              
              <motion.button
                onClick={downloadFile}
                className="btn-secondary p-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Monaco Editor */}
        <div className="flex-1">
          {mockFiles[selectedFile] && (
            <Editor
              height="100%"
              language={mockFiles[selectedFile].language}
              value={mockFiles[selectedFile].content}
              onChange={handleFileContentChange}
              theme={editorTheme}
              options={{
                minimap: { enabled: true },
                fontSize: 14,
                lineNumbers: 'on',
                wordWrap: 'on',
                automaticLayout: true,
                scrollBeyondLastLine: false,
                readOnly: false,
                folding: true,
                renderLineHighlight: 'all',
                selectOnLineNumbers: true,
                mouseWheelZoom: true,
                cursorStyle: 'line',
                tabSize: 2,
                insertSpaces: true,
                renderWhitespace: 'selection',
                bracketPairColorization: { enabled: true },
              }}
            />
          )}
        </div>

        {/* Editor Footer */}
        <div className="bg-genesis-gray-50 border-t border-genesis-gray-200 px-6 py-2">
          <div className="flex items-center justify-between text-sm text-genesis-gray-600">
            <div className="flex items-center space-x-4">
              <span>Language: {mockFiles[selectedFile]?.language}</span>
              <span>
                Lines: {mockFiles[selectedFile]?.content.split('\n').length || 0}
              </span>
              <span>
                Characters: {mockFiles[selectedFile]?.content.length || 0}
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <button className="p-1 hover:bg-genesis-gray-200 rounded">
                <Undo className="w-4 h-4" />
              </button>
              <button className="p-1 hover:bg-genesis-gray-200 rounded">
                <Redo className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}