#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = path.join(__dirname, '..', 'src', 'content', 'blog');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

async function createBlogPost() {
  console.log('\n📝 Create New Blog Post\n');

  // Get post details
  const title = await question('Title: ');
  const category = await question('Category (Announcement/Tutorial/Engineering/Update/Tips): ');
  const tags = (await question('Tags (comma-separated): ')).split(',').map(t => t.trim());
  const excerpt = await question('Excerpt: ');
  const featured = (await question('Featured post? (y/n): ')).toLowerCase() === 'y';
  
  // Generate slug from title
  const slug = title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();

  // Create filename with date
  const date = new Date();
  const dateStr = date.toISOString().split('T')[0];
  const filename = `${slug}.md`;

  // Create frontmatter
  const frontmatter = `---
title: "${title}"
date: ${dateStr}
author: "Dev Cockpit Team"
category: "${category}"
tags: ${JSON.stringify(tags)}
excerpt: "${excerpt}"
featured: ${featured}
readTime: "5 min"
---`;

  // Create initial content
  const content = `${frontmatter}

# ${title}

${excerpt}

## Introduction

[Start writing your blog post here...]

## Key Points

- Point 1
- Point 2
- Point 3

## Conclusion

[Your conclusion here...]

---

*Have questions or feedback? [Contact our support team](/support) or join the discussion in our community.*
`;

  // Write file
  const filepath = path.join(BLOG_DIR, filename);
  
  // Check if file already exists
  if (fs.existsSync(filepath)) {
    const overwrite = await question(`\n⚠️  File ${filename} already exists. Overwrite? (y/n): `);
    if (overwrite.toLowerCase() !== 'y') {
      console.log('\n❌ Cancelled');
      rl.close();
      return;
    }
  }

  fs.writeFileSync(filepath, content);
  
  console.log(`\n✅ Blog post created: ${filepath}`);
  console.log(`📄 Slug: ${slug}`);
  console.log(`🔗 URL: /blog/${slug}\n`);
  
  rl.close();
}

createBlogPost().catch(console.error);