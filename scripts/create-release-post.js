#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = path.join(__dirname, '..', 'src', 'content', 'blog');
const CHANGELOG_PATH = path.join(__dirname, '..', 'CHANGELOG.md');

function parseChangelog() {
  if (!fs.existsSync(CHANGELOG_PATH)) {
    console.error('❌ CHANGELOG.md not found');
    return null;
  }
  
  const changelog = fs.readFileSync(CHANGELOG_PATH, 'utf-8');
  const lines = changelog.split('\n');
  
  let version = '';
  let date = '';
  let changes = {
    added: [],
    changed: [],
    fixed: [],
    removed: []
  };
  
  let currentSection = null;
  
  for (const line of lines) {
    // Match version header
    if (line.match(/^## \[(\d+\.\d+\.\d+)\]/)) {
      version = line.match(/\[(\d+\.\d+\.\d+)\]/)[1];
      const dateMatch = line.match(/- (\d{4}-\d{2}-\d{2})/);
      if (dateMatch) {
        date = dateMatch[1];
      }
      continue;
    }
    
    // Match section headers
    if (line.startsWith('### Added')) {
      currentSection = 'added';
    } else if (line.startsWith('### Changed')) {
      currentSection = 'changed';
    } else if (line.startsWith('### Fixed')) {
      currentSection = 'fixed';
    } else if (line.startsWith('### Removed')) {
      currentSection = 'removed';
    } else if (line.startsWith('- ') && currentSection) {
      changes[currentSection].push(line.substring(2));
    }
    
    // Stop at next version
    if (version && line.match(/^## \[(\d+\.\d+\.\d+)\]/) && !line.includes(version)) {
      break;
    }
  }
  
  return { version, date, changes };
}

function generateReleasePost(versionInfo) {
  const { version, date, changes } = versionInfo || {};
  
  if (!version) {
    console.error('❌ No version information found');
    return;
  }
  
  const title = `Dev Cockpit ${version} Released`;
  const slug = `release-${version.replace(/\./g, '-')}`;
  const filename = `${slug}.md`;
  
  // Build content sections
  let changelogContent = '';
  
  if (changes.added.length > 0) {
    changelogContent += `## 🚀 New Features\n\n${changes.added.map(item => `- ${item}`).join('\n')}\n\n`;
  }
  
  if (changes.changed.length > 0) {
    changelogContent += `## 🔧 Improvements\n\n${changes.changed.map(item => `- ${item}`).join('\n')}\n\n`;
  }
  
  if (changes.fixed.length > 0) {
    changelogContent += `## 🐛 Bug Fixes\n\n${changes.fixed.map(item => `- ${item}`).join('\n')}\n\n`;
  }
  
  if (changes.removed.length > 0) {
    changelogContent += `## 🗑️ Removed\n\n${changes.removed.map(item => `- ${item}`).join('\n')}\n\n`;
  }
  
  const excerpt = `Dev Cockpit ${version} is now available with ${changes.added.length} new features, ${changes.fixed.length} bug fixes, and performance improvements.`;
  
  const frontmatter = `---
title: "${title}"
date: ${date || new Date().toISOString().split('T')[0]}
author: "Dev Cockpit Team"
category: "Announcement"
tags: ["release", "update", "version-${version.split('.')[0]}-${version.split('.')[1]}"]
excerpt: "${excerpt}"
featured: true
readTime: "3 min"
---`;
  
  const content = `${frontmatter}

# ${title}

We're excited to announce the release of Dev Cockpit ${version}! This update brings new features, improvements, and bug fixes based on your valuable feedback.

${changelogContent}

## How to Update

Dev Cockpit includes automatic update checking. When a new version is available:

1. You'll receive an in-app notification
2. Click "Download Update" to get the latest version
3. The app will update and restart automatically

## System Requirements

- macOS 14.0 (Sonoma) or later
- Apple Silicon Mac (M1, M2, M3, or M4)
- 4GB RAM minimum
- 100MB available storage

## Feedback

Your feedback helps us improve Dev Cockpit. If you encounter any issues or have suggestions:

- [Report a bug](/support)
- [Request a feature](/support)
- Share your feedback at support@devcockpit.app

## What's Next?

We're already working on the next release with more exciting features:
- Enhanced Docker Compose support
- Advanced Git analytics
- Custom dashboard layouts
- And much more!

Thank you for being part of the Dev Cockpit community. Happy coding!

---

[Download Dev Cockpit](/download) | [View Full Changelog](/changelog) | [Get Support](/support)
`;
  
  // Write file
  const filepath = path.join(BLOG_DIR, filename);
  
  // Ensure blog directory exists
  if (!fs.existsSync(BLOG_DIR)) {
    fs.mkdirSync(BLOG_DIR, { recursive: true });
  }
  
  fs.writeFileSync(filepath, content);
  
  console.log(`✅ Release blog post generated: ${filepath}`);
  console.log(`📦 Version: ${version}`);
  console.log(`🔗 URL: /blog/${slug}`);
  
  return filepath;
}

// Get version from command line or changelog
const version = process.argv[2];

if (version) {
  // Manual version specified
  generateReleasePost({
    version,
    date: new Date().toISOString().split('T')[0],
    changes: {
      added: ['New features and improvements'],
      changed: [],
      fixed: ['Various bug fixes'],
      removed: []
    }
  });
} else {
  // Parse from changelog
  const versionInfo = parseChangelog();
  if (versionInfo) {
    generateReleasePost(versionInfo);
  }
}