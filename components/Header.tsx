'use client'

import { motion } from 'framer-motion'
import { Sparkles, User, Settings, HelpCircle } from 'lucide-react'
import { useProjectStore } from '@/store/projectStore'

export default function Header() {
  const { project } = useProjectStore()

  return (
    <header className="bg-white border-b border-genesis-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="w-10 h-10 bg-gradient-to-br from-genesis-orange to-genesis-orange-light rounded-xl flex items-center justify-center"
            >
              <Sparkles className="w-5 h-5 text-white" />
            </motion.div>
            <div>
              <h1 className="text-xl font-bold text-genesis-gray-900">
                AID Genesis
              </h1>
              <p className="text-sm text-genesis-gray-500">
                Code Generation Interface
              </p>
            </div>
          </div>
          
          {project.name && (
            <div className="hidden md:flex items-center space-x-2 ml-8">
              <div className="w-2 h-2 bg-genesis-orange rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-genesis-gray-700">
                {project.name}
              </span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 text-genesis-gray-500 hover:text-genesis-gray-700 hover:bg-genesis-gray-100 rounded-lg transition-all duration-200"
          >
            <HelpCircle className="w-5 h-5" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 text-genesis-gray-500 hover:text-genesis-gray-700 hover:bg-genesis-gray-100 rounded-lg transition-all duration-200"
          >
            <Settings className="w-5 h-5" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 p-2 text-genesis-gray-500 hover:text-genesis-gray-700 hover:bg-genesis-gray-100 rounded-lg transition-all duration-200"
          >
            <User className="w-5 h-5" />
            <span className="hidden sm:inline text-sm font-medium">
              Developer
            </span>
          </motion.button>
        </div>
      </div>
    </header>
  )
}