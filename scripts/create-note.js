import fs from 'fs';
import path from 'path';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const getTodayDate = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD') // Normalize special characters/diacritics
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start
    .replace(/-+$/, ''); // Trim - from end
};

const askQuestion = (query) => {
  return new Promise((resolve) => rl.question(query, resolve));
};

async function main() {
  let title = process.argv.slice(2).join(' ').trim();
  
  if (!title) {
    title = await askQuestion('Enter post title: ');
    title = title.trim();
  }

  if (!title) {
    console.error('Error: Post title is required.');
    rl.close();
    process.exit(1);
  }

  const slug = slugify(title);
  const fileName = `${slug}.mdx`;
  const notesDir = path.join(process.cwd(), 'content', 'notes');
  const filePath = path.join(notesDir, fileName);

  if (fs.existsSync(filePath)) {
    console.error(`Error: A post with the slug "${slug}" already exists at ${filePath}`);
    rl.close();
    process.exit(1);
  }

  const subtitle = await askQuestion('Enter post subtitle (optional): ');
  const publishedAt = getTodayDate();

  const content = `---
title: "${title.replace(/"/g, '\\"')}"
subtitle: "${subtitle.trim().replace(/"/g, '\\"')}"
publishedAt: "${publishedAt}"
---

Write your new post content here!
`;

  // Ensure directory exists
  fs.mkdirSync(notesDir, { recursive: true });
  fs.writeFileSync(filePath, content, 'utf8');

  console.log(`\n🎉 Success! New post created:`);
  console.log(`📁 File: ${path.relative(process.cwd(), filePath)}`);
  console.log(`🔗 Slug: ${slug}\n`);
  
  rl.close();
}

main().catch((err) => {
  console.error(err);
  rl.close();
  process.exit(1);
});
