import React, { useState } from 'react';
import { 
  Package, 
  Network, 
  Shield, 
  Cpu, 
  Terminal, 
  Activity,
  Zap,
  Lock
} from 'lucide-react';

const features = [
  {
    id: 'homebrew',
    title: 'Homebrew Manager',
    icon: Package,
    description: 'Visual package management with one-click updates',
    details: [
      'One-click package updates and installation',
      'Dependency tracking and visualization',
      'Service monitoring and management',
      'Cask and formula management',
      'Automatic cleanup and optimization'
    ],
    gradient: 'from-orange-500 to-red-500'
  },
  {
    id: 'ports',
    title: 'Port Monitor',
    icon: Network,
    description: 'Real-time port scanning with process identification',
    details: [
      'Real-time port scanning and monitoring',
      'Process identification for each port',
      'Security vulnerability detection',
      'Network service discovery',
      'Historical port usage tracking'
    ],
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'network',
    title: 'Network Tools',
    icon: Activity,
    description: 'Comprehensive network monitoring and diagnostics',
    details: [
      'Interface monitoring and statistics',
      'Speed testing and bandwidth tracking',
      'DNS lookup and resolution tools',
      'Ping and traceroute utilities',
      'Network traffic analysis'
    ],
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    id: 'ai',
    title: 'AI Analysis',
    icon: Cpu,
    description: 'Apple Intelligence integration for smart insights',
    details: [
      'Security vulnerability assessment',
      'Process behavior analysis',
      'Performance optimization suggestions',
      'Anomaly detection and alerts',
      'Predictive maintenance recommendations'
    ],
    gradient: 'from-green-500 to-emerald-500'
  }
];

export default function Features() {
  const [activeFeature, setActiveFeature] = useState(features[0]);

  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="gradient-text">Powerful Features</span> for Modern Developers
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Everything you need to monitor, manage, and optimize your macOS development environment
          </p>
        </div>

        {/* Feature Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <button
                key={feature.id}
                onClick={() => setActiveFeature(feature)}
                className={`p-6 rounded-2xl transition-all duration-300 ${
                  activeFeature.id === feature.id
                    ? 'glass-dark border-primary-500/50 scale-105'
                    : 'glass hover:scale-105 hover:border-white/20'
                }`}
              >
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient} mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.description}</p>
              </button>
            );
          })}
        </div>

        {/* Active Feature Details */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Details */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${activeFeature.gradient}`}>
                <activeFeature.icon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-3xl font-bold">{activeFeature.title}</h3>
                <p className="text-gray-400">{activeFeature.description}</p>
              </div>
            </div>

            <ul className="space-y-4">
              {activeFeature.details.map((detail, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="mt-1">
                    <Zap className="w-5 h-5 text-primary-400" />
                  </div>
                  <span className="text-gray-300">{detail}</span>
                </li>
              ))}
            </ul>

            <div className="flex gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Lock className="w-4 h-4" />
                <span>100% Local Processing</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Shield className="w-4 h-4" />
                <span>Privacy First</span>
              </div>
            </div>
          </div>

          {/* Right: Feature Highlights */}
          <div className="relative">
            <div className="absolute inset-0 gradient-primary opacity-10 blur-3xl"></div>
            <div className="relative glass-dark rounded-2xl p-8">
              {/* Feature Icon */}
              <div className="flex justify-center mb-6">
                <div className={`p-6 rounded-2xl bg-gradient-to-br ${activeFeature.gradient} shadow-2xl`}>
                  <activeFeature.icon className="w-16 h-16 text-white" />
                </div>
              </div>
              
              {/* Feature Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-4 glass rounded-xl">
                  <div className="text-2xl font-bold gradient-text">Real-time</div>
                  <div className="text-sm text-gray-400">Monitoring</div>
                </div>
                <div className="text-center p-4 glass rounded-xl">
                  <div className="text-2xl font-bold gradient-text">Native</div>
                  <div className="text-sm text-gray-400">Performance</div>
                </div>
              </div>
              
              {/* Key Benefits */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 glass rounded-lg">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  <span className="text-sm">Lightning fast operations</span>
                </div>
                <div className="flex items-center gap-3 p-3 glass rounded-lg">
                  <Shield className="w-5 h-5 text-green-400" />
                  <span className="text-sm">Secure & private by design</span>
                </div>
                <div className="flex items-center gap-3 p-3 glass rounded-lg">
                  <Terminal className="w-5 h-5 text-blue-400" />
                  <span className="text-sm">Developer-friendly interface</span>
                </div>
              </div>
              
              {/* CTA */}
              <button className="w-full mt-6 py-3 gradient-primary rounded-xl font-semibold hover:scale-105 transition-transform">
                Try {activeFeature.title} →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}