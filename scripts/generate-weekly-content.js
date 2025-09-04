#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = path.join(__dirname, '..', 'src', 'content', 'blog');

// Content templates for different types of posts
const contentTemplates = {
  tips: {
    titles: [
      "5 macOS Terminal Tricks Every Developer Should Know",
      "Optimizing Your Development Workflow on Apple Silicon",
      "Hidden macOS Features for Developers",
      "Speeding Up Your Docker Containers on M-Series Macs",
      "Homebrew Best Practices for 2025"
    ],
    category: "Tips",
    template: (title) => `# ${title}

As developers, we're always looking for ways to improve our workflow and productivity. This week, we're sharing some powerful tips that will help you get the most out of your macOS development environment.

## Tip 1: [First Tip Title]

[Explain the first tip in detail, including why it's useful and how to implement it]

\`\`\`bash
# Example command or code
\`\`\`

## Tip 2: [Second Tip Title]

[Explain the second tip]

## Tip 3: [Third Tip Title]

[Continue with more tips...]

## How Dev Cockpit Helps

With Dev Cockpit, many of these optimizations are automated. Our intelligent monitoring helps you:
- Identify performance bottlenecks
- Optimize resource usage
- Streamline your development workflow

## Conclusion

These tips are just the beginning. Dev Cockpit continuously analyzes your development environment to suggest personalized optimizations.

Try these tips and let us know how they work for you!`
  },
  tutorial: {
    titles: [
      "Getting Started with Docker on Apple Silicon",
      "Managing Multiple Node Versions with Homebrew",
      "Setting Up the Perfect Git Workflow",
      "Debugging Network Issues Like a Pro",
      "Monitoring System Performance During Development"
    ],
    category: "Tutorial",
    template: (title) => `# ${title}

In this tutorial, we'll walk through a complete guide to help you master this essential development skill.

## Prerequisites

Before we begin, make sure you have:
- macOS 14.0 or later
- Dev Cockpit installed (for enhanced monitoring)
- Basic terminal knowledge

## Step 1: Initial Setup

[Detailed first step with code examples]

\`\`\`bash
# Setup commands
\`\`\`

## Step 2: Configuration

[Configuration details]

## Step 3: Implementation

[Main implementation steps]

## Step 4: Testing

[How to test your setup]

## Troubleshooting

Common issues and their solutions:
- **Issue 1**: Solution
- **Issue 2**: Solution

## Using Dev Cockpit

Dev Cockpit makes this process even easier by:
- Providing real-time monitoring
- Alerting you to potential issues
- Offering optimization suggestions

## Next Steps

Now that you've completed this tutorial, consider exploring:
- [Related topic 1]
- [Related topic 2]

Happy coding!`
  },
  update: {
    titles: [
      "Dev Cockpit Weekly: Performance Improvements",
      "This Week in Dev Cockpit: New Features",
      "Dev Cockpit Update: Enhanced Docker Support",
      "Weekly Roundup: Community Feedback Implementation",
      "Dev Cockpit Progress Report: What's New"
    ],
    category: "Update",
    template: (title) => `# ${title}

We're constantly working to improve Dev Cockpit based on your feedback. Here's what's new this week:

## 🚀 New Features

### Feature 1
[Description of the new feature and how it helps developers]

### Feature 2
[Another new feature]

## 🐛 Bug Fixes

- Fixed an issue where [description]
- Resolved a problem with [description]
- Improved stability when [description]

## 🔧 Performance Improvements

We've optimized several core components:
- 20% faster startup time
- Reduced memory usage by 15%
- Improved responsiveness in [specific area]

## 📊 By the Numbers

This week:
- **500+** new beta users
- **99.9%** uptime
- **4.8/5** average user rating

## 🎯 Coming Next

Here's what we're working on for next week:
- [Upcoming feature 1]
- [Upcoming feature 2]
- [Improvement area]

## 💬 Community Highlight

[Share a testimonial or community contribution]

## Get Involved

Your feedback shapes Dev Cockpit. [Report issues](/support) or [request features](/support) to help us build the perfect developer tool.

Stay tuned for next week's update!`
  }
};

function generateWeeklyPost() {
  // Select random template type
  const types = Object.keys(contentTemplates);
  const type = types[Math.floor(Math.random() * types.length)];
  const template = contentTemplates[type];
  
  // Select random title
  const title = template.titles[Math.floor(Math.random() * template.titles.length)];
  
  // Generate slug
  const slug = title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
  
  // Create filename with date
  const date = new Date();
  const dateStr = date.toISOString().split('T')[0];
  const filename = `${dateStr}-${slug}.md`;
  
  // Generate excerpt
  const excerpt = `This week's ${template.category.toLowerCase()}: ${title}. Learn practical tips and techniques to improve your macOS development workflow.`;
  
  // Create frontmatter
  const frontmatter = `---
title: "${title}"
date: ${dateStr}
author: "Dev Cockpit Team"
category: "${template.category}"
tags: ["weekly", "${template.category.toLowerCase()}", "macos", "development"]
excerpt: "${excerpt}"
featured: false
readTime: "${type === 'tips' ? '5 min' : type === 'tutorial' ? '10 min' : '3 min'}"
---`;
  
  // Generate content
  const content = `${frontmatter}

${template.template(title)}
`;
  
  // Write file
  const filepath = path.join(BLOG_DIR, filename);
  
  // Ensure blog directory exists
  if (!fs.existsSync(BLOG_DIR)) {
    fs.mkdirSync(BLOG_DIR, { recursive: true });
  }
  
  fs.writeFileSync(filepath, content);
  
  console.log(`✅ Weekly blog post generated: ${filepath}`);
  console.log(`📄 Title: ${title}`);
  console.log(`🏷️  Category: ${template.category}`);
  console.log(`🔗 URL: /blog/${slug}`);
  
  return filepath;
}

// Run the generator
generateWeeklyPost();