// GitHub API wrapper for support system

export interface GitHubIssue {
  title: string;
  body: string;
  labels: string[];
  assignees?: string[];
}

export interface IssueFormData {
  name: string;
  email: string;
  issueType: 'bug' | 'feature' | 'support' | 'other';
  priority: 'low' | 'medium' | 'high' | 'critical';
  category: 'homebrew' | 'docker' | 'system' | 'network' | 'subscription' | 'other';
  subject: string;
  description: string;
  systemInfo?: {
    os?: string;
    browser?: string;
    version?: string;
  };
}

export class GitHubAPI {
  private owner: string;
  private repo: string;
  private token?: string;

  constructor(owner: string, repo: string, token?: string) {
    this.owner = owner;
    this.repo = repo;
    this.token = token;
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers['Authorization'] = `token ${this.token}`;
    }

    return headers;
  }

  async createIssue(formData: IssueFormData): Promise<{ success: boolean; issueUrl?: string; error?: string }> {
    try {
      // Format labels based on form data
      const labels: string[] = [
        formData.issueType,
        formData.priority,
        formData.category,
        'support'
      ];

      // Format the issue body with all information
      const body = this.formatIssueBody(formData);

      const issue: GitHubIssue = {
        title: `[${formData.category.toUpperCase()}] ${formData.subject}`,
        body,
        labels: labels.filter(Boolean),
      };

      const response = await fetch(
        `https://api.github.com/repos/${this.owner}/${this.repo}/issues`,
        {
          method: 'POST',
          headers: this.getHeaders(),
          body: JSON.stringify(issue),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create issue');
      }

      const data = await response.json();
      return {
        success: true,
        issueUrl: data.html_url,
      };
    } catch (error) {
      console.error('GitHub API Error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create issue',
      };
    }
  }

  private formatIssueBody(formData: IssueFormData): string {
    const sections: string[] = [
      '## User Information',
      `**Name:** ${formData.name}`,
      `**Email:** ${formData.email}`,
      '',
      '## Issue Details',
      `**Type:** ${formData.issueType}`,
      `**Priority:** ${formData.priority}`,
      `**Category:** ${formData.category}`,
      '',
      '## Description',
      formData.description,
    ];

    if (formData.systemInfo) {
      sections.push(
        '',
        '## System Information',
        `**OS:** ${formData.systemInfo.os || 'Not provided'}`,
        `**Browser:** ${formData.systemInfo.browser || 'Not provided'}`,
        `**App Version:** ${formData.systemInfo.version || 'Not provided'}`
      );
    }

    sections.push(
      '',
      '---',
      '*This issue was automatically created from the Dev Cockpit support form.*'
    );

    return sections.join('\n');
  }

}

// Helper function to detect system information
export function getSystemInfo(): { os?: string; browser?: string } {
  if (typeof window === 'undefined') return {};

  const userAgent = window.navigator.userAgent;
  let os = 'Unknown OS';
  let browser = 'Unknown Browser';

  // Detect OS
  if (userAgent.indexOf('Mac') !== -1) {
    os = 'macOS';
  } else if (userAgent.indexOf('Win') !== -1) {
    os = 'Windows';
  } else if (userAgent.indexOf('Linux') !== -1) {
    os = 'Linux';
  }

  // Detect Browser
  if (userAgent.indexOf('Chrome') !== -1) {
    browser = 'Chrome';
  } else if (userAgent.indexOf('Safari') !== -1 && userAgent.indexOf('Chrome') === -1) {
    browser = 'Safari';
  } else if (userAgent.indexOf('Firefox') !== -1) {
    browser = 'Firefox';
  } else if (userAgent.indexOf('Edge') !== -1) {
    browser = 'Edge';
  }

  return { os, browser };
}