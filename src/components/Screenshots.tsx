import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X, Expand } from 'lucide-react';

const screenshots = [
  {
    id: 1,
    category: 'Homebrew',
    title: 'Installed Packages',
    description: 'Visual overview of all installed packages with update status',
    src: '/images/screenshots/homebrew_installed.png'
  },
  {
    id: 2,
    category: 'Homebrew',
    title: 'Discover Packages',
    description: 'Browse and search thousands of available packages',
    src: '/images/screenshots/homebrew_discover.png'
  },
  {
    id: 3,
    category: 'Homebrew',
    title: 'Repository Management',
    description: 'Add and manage custom taps and repositories',
    src: '/images/screenshots/homebrew_addrepo.png'
  },
  {
    id: 4,
    category: 'Homebrew',
    title: 'Terminal Integration',
    description: 'Built-in terminal with live command output',
    src: '/images/screenshots/homebrew_terminal.png'
  },
  {
    id: 5,
    category: 'Ports',
    title: 'Port Scanner',
    description: 'Real-time port monitoring with process identification',
    src: '/images/screenshots/ports_general.png'
  },
  {
    id: 6,
    category: 'Ports',
    title: 'AI Security Analysis',
    description: 'AI-powered security vulnerability detection and recommendations',
    src: '/images/screenshots/ports_ai.png'
  },
  {
    id: 7,
    category: 'Network',
    title: 'Network Interfaces',
    description: 'Monitor all network interfaces with real-time statistics',
    src: '/images/screenshots/network_interfaces.png'
  }
];

const categories = ['All', 'Homebrew', 'Ports', 'Network'];

export default function Screenshots() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState<typeof screenshots[0] | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredScreenshots = selectedCategory === 'All' 
    ? screenshots 
    : screenshots.filter(s => s.category === selectedCategory);

  const openLightbox = (screenshot: typeof screenshots[0]) => {
    setSelectedImage(screenshot);
    setCurrentIndex(filteredScreenshots.findIndex(s => s.id === screenshot.id));
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateLightbox = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'next' 
      ? (currentIndex + 1) % filteredScreenshots.length
      : (currentIndex - 1 + filteredScreenshots.length) % filteredScreenshots.length;
    setCurrentIndex(newIndex);
    setSelectedImage(filteredScreenshots[newIndex]);
  };

  return (
    <section id="screenshots" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-primary-950/20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            See <span className="gradient-text">Dev Cockpit</span> in Action
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Beautiful, native macOS interface designed for developers who appreciate great design
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                selectedCategory === category
                  ? 'gradient-primary text-white'
                  : 'glass hover:bg-white/10'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Screenshot Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredScreenshots.map((screenshot) => (
            <div
              key={screenshot.id}
              className="group relative glass rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105"
              onClick={() => openLightbox(screenshot)}
            >
              <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-primary-950/50 to-purple-950/50">
                <img
                  src={screenshot.src}
                  alt={screenshot.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-semibold text-white mb-1">{screenshot.title}</h3>
                    <p className="text-sm text-gray-300">{screenshot.description}</p>
                  </div>
                  <div className="absolute top-4 right-4 p-2 glass rounded-lg">
                    <Expand className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
              <div className="p-4">
                <span className="text-xs text-primary-400 font-medium">{screenshot.category}</span>
                <h3 className="font-semibold mt-1">{screenshot.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 p-2 glass rounded-lg hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={() => navigateLightbox('prev')}
              className="absolute left-4 p-2 glass rounded-lg hover:bg-white/20 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={() => navigateLightbox('next')}
              className="absolute right-4 p-2 glass rounded-lg hover:bg-white/20 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="max-w-5xl w-full">
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="w-full rounded-xl"
              />
              <div className="mt-4 text-center">
                <h3 className="text-2xl font-bold mb-2">{selectedImage.title}</h3>
                <p className="text-gray-400">{selectedImage.description}</p>
                <div className="mt-4 text-sm text-gray-500">
                  {currentIndex + 1} / {filteredScreenshots.length}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}