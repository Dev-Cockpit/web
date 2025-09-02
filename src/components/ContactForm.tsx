import React, { useState } from 'react';
import { Send, Loader, CheckCircle, AlertCircle } from 'lucide-react';

interface ContactFormProps {
  accessKey: string;
}

export default function ContactForm({ accessKey }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    // Web3Forms endpoint - using the access key passed as prop
    
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: accessKey,
          ...formData,
          from_name: 'Dev Cockpit Support Form'
        }),
      });
      
      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 glass rounded-xl bg-white/5 focus:bg-white/10 outline-none focus:ring-2 focus:ring-primary-500 transition-all"
            placeholder="John Doe"
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 glass rounded-xl bg-white/5 focus:bg-white/10 outline-none focus:ring-2 focus:ring-primary-500 transition-all"
            placeholder="john@example.com"
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="subject" className="block text-sm font-medium mb-2">
          Subject
        </label>
        <select
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 glass rounded-xl bg-white/5 focus:bg-white/10 outline-none focus:ring-2 focus:ring-primary-500 transition-all"
        >
          <option value="">Select a topic</option>
          <option value="technical">Technical Support</option>
          <option value="billing">Billing Question</option>
          <option value="feature">Feature Request</option>
          <option value="bug">Bug Report</option>
          <option value="other">Other</option>
        </select>
      </div>
      
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          className="w-full px-4 py-3 glass rounded-xl bg-white/5 focus:bg-white/10 outline-none focus:ring-2 focus:ring-primary-500 transition-all resize-none"
          placeholder="Tell us how we can help..."
        />
      </div>
      
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full md:w-auto px-8 py-4 gradient-primary rounded-xl font-semibold flex items-center justify-center gap-2 hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed glow"
      >
        {status === 'loading' ? (
          <>
            <Loader className="w-5 h-5 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Send Message
          </>
        )}
      </button>
      
      {status === 'success' && (
        <div className="flex items-center gap-2 text-green-400 mt-4">
          <CheckCircle className="w-5 h-5" />
          <span>Message sent successfully! We'll get back to you soon.</span>
        </div>
      )}
      
      {status === 'error' && (
        <div className="flex items-center gap-2 text-red-400 mt-4">
          <AlertCircle className="w-5 h-5" />
          <span>Something went wrong. Please try again or email us directly.</span>
        </div>
      )}
    </form>
  );
}