import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: "How does the 7-day free trial work?",
    answer: "Start using Dev Cockpit immediately with full access to all features for 7 days. No credit card required. After the trial, you can choose to subscribe through the Mac App Store or the app will revert to view-only mode."
  },
  {
    question: "Is Dev Cockpit really privacy-first?",
    answer: "Absolutely. All operations run locally on your Mac. We don't collect any data, track usage, or require cloud connectivity. Your development environment stays completely private and secure."
  },
  {
    question: "What versions of macOS are supported?",
    answer: "Dev Cockpit requires macOS 15.0 (Sequoia) or later. It's built with the latest SwiftUI technologies to ensure optimal performance and native macOS integration."
  },
  {
    question: "Can I use Dev Cockpit on multiple Macs?",
    answer: "Yes! Your subscription through the Mac App Store allows you to use Dev Cockpit on all your Macs signed in with the same Apple ID."
  },
  {
    question: "How do I cancel my subscription?",
    answer: "You can cancel anytime through the Mac App Store subscription settings. You'll continue to have access until the end of your current billing period."
  },
  {
    question: "Does Dev Cockpit require Homebrew to be installed?",
    answer: "No, Dev Cockpit can help you install Homebrew if it's not already on your system. It works with existing Homebrew installations and can manage both formulas and casks."
  },
  {
    question: "What's included in the AI analysis features?",
    answer: "AI features use Apple Intelligence to analyze port security, process behavior, and system performance. All analysis happens locally on your Mac, ensuring privacy while providing intelligent insights."
  },
  {
    question: "Is there a one-time purchase option?",
    answer: "Currently, Dev Cockpit is available as a subscription to ensure continuous updates, new features, and ongoing support. This model allows us to keep improving the app based on user feedback."
  },
  {
    question: "How often is Dev Cockpit updated?",
    answer: "We release updates regularly, typically every 2-4 weeks, with new features, improvements, and bug fixes. All updates are included in your subscription."
  },
  {
    question: "Can I get a refund?",
    answer: "Refunds are handled through Apple's standard App Store refund policy. If you're not satisfied within the first few days of your subscription, you can request a refund through Apple."
  }
];

export default function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-xl text-gray-400">
            Everything you need to know about Dev Cockpit
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="glass rounded-xl overflow-hidden transition-all duration-300 hover:border-white/20"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left"
              >
                <h3 className="font-semibold text-lg pr-4">{faq.question}</h3>
                <div className="flex-shrink-0">
                  {openItems.includes(index) ? (
                    <Minus className="w-5 h-5 text-primary-400" />
                  ) : (
                    <Plus className="w-5 h-5 text-primary-400" />
                  )}
                </div>
              </button>
              
              {openItems.includes(index) && (
                <div className="px-6 pb-5">
                  <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-4">Still have questions?</p>
          <a
            href="/support"
            className="inline-flex items-center gap-2 px-6 py-3 glass rounded-xl hover:bg-white/10 transition-colors"
          >
            Contact Support
          </a>
        </div>
      </div>
    </section>
  );
}