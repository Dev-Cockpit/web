import React, { useState, useEffect } from 'react';
import { Loader, CheckCircle, AlertCircle, Bug, Sparkles, HelpCircle, MessageSquare, } from 'lucide-react';
import { GitHubAPI, getSystemInfo, type IssueFormData } from '../lib/github';
import { Resend } from 'resend';

interface GitHubIssueFormProps {
  githubOwner: string;
  githubRepo: string;
  githubToken?: string;
  resendApiKey?: string;
}

export default function GitHubIssueForm({ githubOwner, githubRepo, githubToken, resendApiKey }: GitHubIssueFormProps) {
  const [formData, setFormData] = useState<IssueFormData>({
    name: '',
    email: '',
    issueType: 'support',
    priority: 'medium',
    category: 'other',
    subject: '',
    description: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [issueUrl, setIssueUrl] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Initialize GitHub API
  const githubAPI = new GitHubAPI(githubOwner, githubRepo, githubToken);

  // Detect system info on mount
  useEffect(() => {
    const systemInfo = getSystemInfo();
    setFormData(prev => ({ ...prev, systemInfo }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    const result = await githubAPI.createIssue(formData);

    if (result.success && result.issueUrl) {
      setStatus('success');
      setIssueUrl(result.issueUrl);
      
      // Send confirmation email to user if Resend is configured
      if (resendApiKey && formData.email) {
        try {
          const resend = new Resend(resendApiKey);
          
          // Extract issue number from URL
          const issueNumber = result.issueUrl?.split('/').pop() || 'N/A';
          
          await resend.emails.send({
            from: 'Dev Cockpit Support <support@devcockpit.app>',
            to: formData.email,
            subject: `Support Ticket #${issueNumber} Created - Dev Cockpit`,
            html: `
              <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <img src="https://devcockpit.app/logo/logo128.png" alt="Dev Cockpit" style="width: 64px; height: 64px; margin-bottom: 20px;" />
                
                <h2 style="color: #333; margin-bottom: 20px;">Your Support Ticket Has Been Created</h2>
                
                <p style="color: #666; line-height: 1.6;">Hi ${formData.name},</p>
                
                <p style="color: #666; line-height: 1.6;">
                  Thank you for contacting Dev Cockpit support. Your ticket <strong>#${issueNumber}</strong> has been successfully created.
                </p>
                
                <div style="background: #f5f5f5; border-left: 4px solid #3b82f6; padding: 15px; margin: 20px 0;">
                  <h3 style="margin: 0 0 10px 0; color: #333;">Ticket Details:</h3>
                  <p style="margin: 5px 0; color: #666;"><strong>Type:</strong> ${formData.issueType}</p>
                  <p style="margin: 5px 0; color: #666;"><strong>Category:</strong> ${formData.category}</p>
                  <p style="margin: 5px 0; color: #666;"><strong>Priority:</strong> ${formData.priority}</p>
                  <p style="margin: 5px 0; color: #666;"><strong>Subject:</strong> ${formData.subject}</p>
                </div>
                
                <p style="color: #666; line-height: 1.6;">
                  Our support team will review your request and respond within <strong>24-48 hours</strong>.
                </p>
                
                <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 30px 0;" />
                
                <p style="color: #999; font-size: 14px; line-height: 1.6;">
                  Best regards,<br />
                  The Dev Cockpit Team
                </p>
                
                <p style="color: #999; font-size: 12px; line-height: 1.6; margin-top: 20px;">
                  This is an automated email. Please do not reply directly to this message.
                </p>
              </div>
            `,
          });
        } catch (emailError) {
          console.error('Failed to send confirmation email:', emailError);
          // Don't fail the whole process if email fails
        }
      }
      
      // Reset form after 10 seconds
      setTimeout(() => {
        setStatus('idle');
        setFormData({
          name: '',
          email: '',
          issueType: 'support',
          priority: 'medium',
          category: 'other',
          subject: '',
          description: '',
          systemInfo: getSystemInfo(),
        });
        setIssueUrl('');
      }, 10000);
    } else {
      setStatus('error');
      setErrorMessage(result.error || 'Failed to create support ticket');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const getIssueTypeIcon = () => {
    switch (formData.issueType) {
      case 'bug': return <Bug className="w-4 h-4" />;
      case 'feature': return <Sparkles className="w-4 h-4" />;
      case 'support': return <HelpCircle className="w-4 h-4" />;
      default: return <MessageSquare className="w-4 h-4" />;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Issue Type Selector */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { value: 'bug', label: 'Bug Report', icon: <Bug className="w-4 h-4" /> },
          { value: 'feature', label: 'Feature Request', icon: <Sparkles className="w-4 h-4" /> },
          { value: 'support', label: 'Support', icon: <HelpCircle className="w-4 h-4" /> },
          { value: 'other', label: 'Other', icon: <MessageSquare className="w-4 h-4" /> },
        ].map(type => (
          <button
            key={type.value}
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, issueType: type.value as any }))}
            className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-all ${
              formData.issueType === type.value
                ? 'bg-primary-500/20 border-primary-500 text-primary-400'
                : 'glass hover:bg-white/10'
            } border`}
          >
            {type.icon}
            <span className="text-sm">{type.label}</span>
          </button>
        ))}
      </div>

      {/* User Information */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Your Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 glass rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
            placeholder="John Doe"
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 glass rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
            placeholder="john@example.com"
          />
        </div>
      </div>

      {/* Category and Priority */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="category" className="block text-sm font-medium mb-2">
            Category *
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 glass rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
          >
            <option value="homebrew">Homebrew Management</option>
            <option value="docker">Docker Monitoring</option>
            <option value="system">System Monitor</option>
            <option value="network">Network Tools</option>
            <option value="subscription">Subscription & Billing</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="priority" className="block text-sm font-medium mb-2">
            Priority
          </label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full px-4 py-3 glass rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical (App Unusable)</option>
          </select>
        </div>
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="subject" className="block text-sm font-medium mb-2">
          Subject *
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 glass rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
          placeholder="Brief description of your issue"
        />
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-2">
          Detailed Description *
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={6}
          className="w-full px-4 py-3 glass rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all resize-none"
          placeholder={`Please describe your ${formData.issueType === 'bug' ? 'issue in detail. Include steps to reproduce if possible.' : formData.issueType === 'feature' ? 'feature request and why it would be valuable.' : 'question or concern in detail.'}`}
        />
      </div>

      {/* System Info Display */}
      {formData.systemInfo && (
        <div className="glass rounded-xl p-4 text-sm">
          <p className="text-gray-400 mb-2">System Information (auto-detected):</p>
          <div className="flex flex-wrap gap-4 text-gray-300">
            <span>OS: {formData.systemInfo.os}</span>
            <span>Browser: {formData.systemInfo.browser}</span>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === 'loading' || status === 'success'}
        className="w-full cta-button-gradient disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? (
          <>
            <Loader className="w-5 h-5 animate-spin" />
            <span>Creating Support Ticket...</span>
          </>
        ) : status === 'success' ? (
          <>
            <CheckCircle className="w-5 h-5" />
            <span>Ticket Created Successfully!</span>
          </>
        ) : (
          <>
            <span>Create Support Ticket</span>
          </>
        )}
      </button>

      {/* Success Message */}
      {status === 'success' && issueUrl && (
        <div className="glass rounded-xl p-4 border border-green-500/30 bg-green-500/10">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold text-green-400 mb-2">Support ticket created successfully!</p>
              <p className="text-sm text-gray-300 mb-3">
                {resendApiKey ? 'A confirmation email has been sent to your email address.' : 'Your issue has been logged.'} We'll respond within 24-48 hours.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {status === 'error' && errorMessage && (
        <div className="glass rounded-xl p-4 border border-red-500/30 bg-red-500/10">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold text-red-400 mb-1">Failed to create ticket</p>
              <p className="text-sm text-gray-300">{errorMessage}</p>
              <p className="text-sm text-gray-400 mt-2">
                Please try again or email us directly at support@devcockpit.app
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Notice */}
      <p className="text-xs text-gray-500 text-center">
        By submitting this form, you agree that your issue will be publicly visible on GitHub.
        Personal information like email will only be visible to maintainers.
      </p>
    </form>
  );
}

// Add the gradient button style
const styles = `
  .cta-button-gradient {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    border-radius: 0.75rem;
    font-weight: 600;
    transition: all 0.2s;
    background: linear-gradient(to right, #3b82f6, #a855f7);
  }

  .cta-button-gradient:hover:not(:disabled) {
    box-shadow: 0 20px 25px -5px rgba(59, 130, 246, 0.25);
    transform: scale(1.05);
  }

  .glass {
    background-color: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}