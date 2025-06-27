'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Sparkles, 
  User, 
  Settings, 
  HelpCircle, 
  Zap,
  Book,
  Gift,
  Menu,
  X
} from 'lucide-react'
import { useProjectStore } from '@/store/projectStore'

export default function Header() {
  const { project } = useProjectStore()
  const [showHelp, setShowHelp] = useState(false)

  return (
    <>
      <header className="bg-white/80 backdrop-blur-xl border-b border-white/20 px-6 py-4 premium-glow">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-6">
            <motion.div 
              className="flex items-center space-x-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg animate-glow">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Zap className="w-2.5 h-2.5 text-yellow-900" />
                </div>
              </motion.div>
              
              <div>
                <h1 className="text-2xl font-bold gradient-text">
                  AID Genesis
                </h1>
                <p className="text-sm text-slate-500 font-medium">
                  AI Code Generation Platform
                </p>
              </div>
            </motion.div>
            
            {project.name && (
              <motion.div 
                className="hidden lg:flex items-center space-x-3 ml-8 px-4 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="status-dot status-processing"></div>
                <span className="text-sm font-semibold text-slate-700">
                  {project.name}
                </span>
                <span className="text-xs bg-white px-2 py-1 rounded-full text-slate-500">
                  Active Project
                </span>
              </motion.div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <motion.button
              onClick={() => setShowHelp(true)}
              className="flex items-center space-x-2 px-4 py-2 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all duration-200 font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Book className="w-4 h-4" />
              <span className="hidden sm:inline">Guide</span>
            </motion.button>
            
            <motion.button
              className="flex items-center space-x-2 px-4 py-2 text-slate-600 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-200 font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Gift className="w-4 h-4" />
              <span className="hidden sm:inline">Pro</span>
            </motion.button>
            
            <motion.button
              className="p-3 text-slate-600 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Settings className="w-5 h-5" />
            </motion.button>
            
            <motion.button
              className="flex items-center space-x-3 px-4 py-2 bg-gradient-to-r from-slate-100 to-slate-200 hover:from-slate-200 hover:to-slate-300 rounded-xl transition-all duration-200 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-lg flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-semibold text-slate-700">Developer</p>
                <p className="text-xs text-slate-500">Pro Member</p>
              </div>
            </motion.button>
          </div>
        </div>
      </header>

      {/* Help/Instructions Modal */}
      <AnimatePresence>
        {showHelp && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowHelp(false)}
          >
            <motion.div
              className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Book className="w-8 h-8" />
                    <div>
                      <h2 className="text-2xl font-bold">Getting Started Guide</h2>
                      <p className="text-indigo-100">Learn how to create amazing projects</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowHelp(false)}
                    className="p-2 hover:bg-white/20 rounded-xl transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                <div className="space-y-8">
                  {/* Quick Start */}
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center space-x-2">
                      <Zap className="w-5 h-5 text-indigo-500" />
                      <span>Quick Start (3 Minutes)</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { step: 1, title: "Describe Your Project", desc: "Enter your project name and description in the wizard" },
                        { step: 2, title: "Choose Technologies", desc: "Select your preferred tech stack and features" },
                        { step: 3, title: "Generate & Export", desc: "Let AI create your project and download the files" }
                      ].map((item) => (
                        <div key={item.step} className="card-premium text-center">
                          <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-sm font-bold">
                            {item.step}
                          </div>
                          <h4 className="font-semibold text-slate-900 mb-2">{item.title}</h4>
                          <p className="text-sm text-slate-600">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Detailed Instructions */}
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">Detailed Instructions</h3>
                    <div className="space-y-6">
                      {[
                        {
                          title: "1. Project Setup",
                          content: [
                            "Click on 'Project Setup' in the sidebar to start",
                            "Enter a descriptive project name (e.g., 'E-commerce Dashboard')",
                            "Provide a detailed description of what your project should do",
                            "Select the type of project (Web App, Mobile App, API, etc.)"
                          ]
                        },
                        {
                          title: "2. Technology Stack",
                          content: [
                            "Choose your frontend framework (React, Vue, Angular, etc.)",
                            "Select a backend technology (Node.js, Python, Java, etc.)",
                            "Pick a database (PostgreSQL, MongoDB, Redis, etc.)",
                            "Choose styling approach (Tailwind, Bootstrap, Material-UI, etc.)"
                          ]
                        },
                        {
                          title: "3. Features & Functionality",
                          content: [
                            "Select authentication methods (basic login, social auth, 2FA)",
                            "Choose data management features (CRUD, search, export, import)",
                            "Pick UI components (responsive design, dashboard, themes)",
                            "Add integrations (payment processing, email, SMS, APIs)"
                          ]
                        },
                        {
                          title: "4. Design Preferences",
                          content: [
                            "Select a color scheme that matches your brand",
                            "Choose a design style (modern, classic, minimal, etc.)",
                            "Pick a layout type (sidebar nav, top nav, dashboard)",
                            "Configure responsive settings and accessibility options"
                          ]
                        },
                        {
                          title: "5. Performance Settings",
                          content: [
                            "Set performance targets (page load time, bundle size)",
                            "Enable optimization features (caching, compression, lazy loading)",
                            "Choose scalability strategy (horizontal, vertical, microservices)",
                            "Configure monitoring and analytics options"
                          ]
                        }
                      ].map((section, index) => (
                        <div key={index} className="border-l-4 border-indigo-500 pl-6">
                          <h4 className="font-semibold text-slate-900 mb-3">{section.title}</h4>
                          <ul className="space-y-2">
                            {section.content.map((item, i) => (
                              <li key={i} className="flex items-start space-x-2">
                                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                                <span className="text-slate-600">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tips & Best Practices */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-200">
                    <h3 className="text-xl font-bold text-green-900 mb-4">💡 Pro Tips</h3>
                    <ul className="space-y-2">
                      {[
                        "Be specific in your project description - more detail leads to better code generation",
                        "Start with a simple tech stack and add complexity later",
                        "Use the code editor to review and modify generated files",
                        "Check the project structure to understand the architecture",
                        "Export as ZIP for local development or deploy directly to cloud platforms"
                      ].map((tip, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <Sparkles className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-green-800">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}