'use client'

import { motion } from 'framer-motion'
import { 
  Sparkles, 
  Code, 
  Zap, 
  ArrowRight, 
  Play,
  Star,
  Users,
  Rocket,
  GitBranch,
  Palette,
  Shield
} from 'lucide-react'

interface WelcomeScreenProps {
  onGetStarted: () => void
}

export default function WelcomeScreen({ onGetStarted }: WelcomeScreenProps) {
  const features = [
    {
      icon: Code,
      title: "Smart Code Generation",
      description: "AI-powered code creation with industry best practices",
      color: "from-blue-500 to-indigo-600"
    },
    {
      icon: Palette,
      title: "Beautiful Design Systems",
      description: "Modern UI components with customizable themes",
      color: "from-purple-500 to-pink-600"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Generate complete projects in minutes, not hours",
      color: "from-yellow-500 to-orange-600"
    },
    {
      icon: Shield,
      title: "Production Ready",
      description: "Security best practices and performance optimizations",
      color: "from-green-500 to-emerald-600"
    }
  ]

  const stats = [
    { icon: Users, value: "10K+", label: "Developers" },
    { icon: GitBranch, value: "50K+", label: "Projects Created" },
    { icon: Star, value: "4.9", label: "Rating" },
    { icon: Rocket, value: "99%", label: "Success Rate" }
  ]

  return (
    <div className="h-full overflow-y-auto">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center px-6">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-purple-600/20 rounded-full blur-3xl animate-float" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-400/20 to-orange-600/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-indigo-600/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          {/* Main Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <motion.div
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-50 to-purple-50 px-4 py-2 rounded-full border border-indigo-200 mb-8"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span className="text-sm font-semibold text-indigo-700">
                AI-Powered Development Platform
              </span>
            </motion.div>

            <h1 className="text-6xl md:text-7xl font-bold mb-6">
              <span className="gradient-text">Transform Ideas</span>
              <br />
              <span className="text-slate-900">Into Code</span>
            </h1>

            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-12 leading-relaxed">
              Generate complete, production-ready applications from simple descriptions. 
              Choose your tech stack, customize features, and export professional code in minutes.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <motion.button
                onClick={onGetStarted}
                className="group relative bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-2xl shadow-2xl transition-all duration-300 transform hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <Play className="w-5 h-5" />
                  <span>Start Building</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>

              <motion.button
                className="flex items-center space-x-2 text-slate-700 hover:text-indigo-600 font-semibold py-4 px-6 rounded-2xl border border-slate-200 hover:border-indigo-300 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:shadow-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Watch Demo</span>
                <Play className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={index}
                  className="card-premium text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Icon className="w-8 h-8 text-indigo-600 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-slate-600">{stat.label}</div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-12">
              Everything You Need to Build Amazing Apps
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <motion.div
                    key={index}
                    className="card-premium group cursor-pointer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Quick Start Section */}
      <motion.section
        className="py-20 px-6 bg-gradient-to-br from-slate-50 to-indigo-50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">
            Get Started in 3 Simple Steps
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                title: "Describe Your Project",
                description: "Tell us what you want to build using natural language",
                icon: "✨"
              },
              {
                step: 2,
                title: "Choose Your Stack",
                description: "Select technologies, features, and design preferences",
                icon: "⚙️"
              },
              {
                step: 3,
                title: "Generate & Deploy",
                description: "Get production-ready code and deploy instantly",
                icon: "🚀"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="card-premium text-center relative z-10">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-slate-600">
                    {item.description}
                  </p>
                </div>
                
                {/* Connecting Line */}
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-indigo-300 to-purple-300 z-0" />
                )}
              </motion.div>
            ))}
          </div>

          <motion.button
            onClick={onGetStarted}
            className="mt-12 btn-primary text-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Rocket className="w-5 h-5 mr-2" />
            Start Your First Project
          </motion.button>
        </div>
      </motion.section>
    </div>
  )
}