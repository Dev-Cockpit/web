import React, { useState } from 'react';
import { Check, Sparkles, ArrowRight, Shield, Clock, CreditCard } from 'lucide-react';

const features = [
  'Homebrew package management',
  'Real-time port monitoring',
  'Network tools & diagnostics',
  'AI-powered security analysis',
  'Docker Management',
  'Regular updates & new features',
  'Native SwiftUI performance',
  '100% local processing',
  'No data collection'
];

export default function Pricing() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('annual');
  
  const monthlyPrice = 9.99;
  const annualPrice = 99.99;
  const annualMonthly = (annualPrice / 12).toFixed(2);
  const savings = ((monthlyPrice * 12 - annualPrice) / (monthlyPrice * 12) * 100).toFixed(0);

  return (
    <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium">14-Day Free Trial • No Credit Card Required</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Simple, <span className="gradient-text">Transparent</span> Pricing
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Start with a 14-days free trial. Cancel anytime. All features included.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="glass rounded-full p-1 flex gap-1">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                billingPeriod === 'monthly'
                  ? 'gradient-primary text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod('annual')}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 relative ${
                billingPeriod === 'annual'
                  ? 'gradient-primary text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Annual
              {billingPeriod === 'annual' && (
                <span className="absolute -top-3 -right-6 px-2 py-1 text-xs bg-green-500 text-white rounded-full">
                  Save {savings}%
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Pricing Card */}
        <div className="max-w-2xl mx-auto">
          <div className="glass-dark rounded-3xl p-8 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary-500/20 to-purple-500/20 blur-3xl"></div>
            
            <div className="relative">
              {/* Price */}
              <div className="text-center mb-8">
                <div className="mb-4">
                  {billingPeriod === 'monthly' ? (
                    <div>
                      <span className="text-5xl font-bold">€{monthlyPrice}</span>
                      <span className="text-gray-400 ml-2">/month</span>
                    </div>
                  ) : (
                    <div>
                      <span className="text-5xl font-bold">€{annualPrice}</span>
                      <span className="text-gray-400 ml-2">/year</span>
                      <div className="text-sm text-gray-500 mt-2">
                        €{annualMonthly}/month when billed annually
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Trust badges */}
                <div className="flex flex-wrap justify-center gap-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>14-day free trial</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <CreditCard className="w-4 h-4" />
                    <span>No credit card required</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Shield className="w-4 h-4" />
                    <span>Cancel anytime</span>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-4 mb-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="mt-0.5">
                      <Check className="w-5 h-5 text-green-400" />
                    </div>
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <a
                href="#"
                className="group relative w-full inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-white gradient-primary rounded-xl hover:scale-105 transition-all duration-200 glow"
              >
                <span>Start Free Trial</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 gradient-primary rounded-xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity"></div>
              </a>

              {/* Additional info */}
              <p className="text-center text-sm text-gray-500 mt-6">
                Available on Mac App Store from September 2025<br />
                Subscription managed through Apple
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Preview */}
        <div className="mt-16 text-center">
          <p className="text-gray-400">
            Have questions? Check our{' '}
            <a href="#faq" className="text-primary-400 hover:text-primary-300 underline">
              frequently asked questions
            </a>{' '}
            or{' '}
            <a href="/support" className="text-primary-400 hover:text-primary-300 underline">
              contact support
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}