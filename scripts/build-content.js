import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const contentDir = path.join(__dirname, '..', 'content');
const outDir = path.join(__dirname, '..', 'src', 'data');
const outFile = path.join(outDir, 'posts.json');

if (!fs.existsSync(contentDir)) {
  fs.mkdirSync(contentDir, { recursive: true });
  const sampleDir = path.join(contentDir, '2025-01');
  fs.mkdirSync(sampleDir, { recursive: true });
  const sample = `---
title: "첫 번째 글"
date: 2025-01-15
tags: ["블로그", "시작"]
category: "일상"
---

# 안녕하세요

마크다운으로 작성한 **첫 번째 글**입니다.

- 목록
- 항목
`;
  fs.writeFileSync(path.join(sampleDir, 'first-post.md'), sample, 'utf-8');
}

function collectMdFiles(dir, base = '') {
  let results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const rel = path.join(base, e.name);
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      results = results.concat(collectMdFiles(full, rel));
    } else if (e.name.endsWith('.md')) {
      results.push({ rel, full, month: base });
    }
  }
  return results;
}

const files = collectMdFiles(contentDir);
const posts = [];

for (const { rel, full, month } of files) {
  const raw = fs.readFileSync(full, 'utf-8');
  const { data: frontmatter, content } = matter(raw);
  const slug = path.basename(rel, '.md');
  const rawDate = frontmatter.date;
  const dateStr = !rawDate ? '' : rawDate instanceof Date ? rawDate.toISOString().split('T')[0] : String(rawDate);
  posts.push({
    slug,
    path: rel.replace(/\\/g, '/'),
    month,
    title: frontmatter.title || slug,
    date: dateStr,
    tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : (frontmatter.tags ? [frontmatter.tags] : []),
    category: frontmatter.category || '',
    content,
  });
}

const toDateStr = (d) => {
  if (!d) return '';
  if (d instanceof Date) return d.toISOString().split('T')[0];
  return String(d);
};
posts.sort((a, b) => toDateStr(b.date).localeCompare(toDateStr(a.date)));

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outFile, JSON.stringify(posts, null, 2), 'utf-8');
console.log('Built', posts.length, 'posts -> src/data/posts.json');
