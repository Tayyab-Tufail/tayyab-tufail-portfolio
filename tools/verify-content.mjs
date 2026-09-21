import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../website');
const source = fs.readFileSync(path.join(root, 'lib/projects.ts'), 'utf8');
const match = source.match(/const projectCatalog: Project\[\] = ([\s\S]*?\n\]);/);
if (!match) throw new Error('Could not read the project catalog.');
const expanded = JSON.parse(fs.readFileSync(path.join(root, 'lib/project-galleries.json'), 'utf8'));
const projects = JSON.parse(match[1]).map(project => ({...project, images: expanded[project.id] ?? project.images}));
const errors = [];
const ids = new Set();
let imageCount = 0;
for (const project of projects) {
  if (ids.has(project.id)) errors.push(`Duplicate project: ${project.id}`);
  ids.add(project.id);
  for (const field of ['title', 'description', 'summary', 'result', 'context']) {
    if (!project[field]?.trim()) errors.push(`${project.id}: missing ${field}`);
  }
  if (!project.images.length) errors.push(`${project.id}: no output images`);
  for (const image of project.images) {
    imageCount++;
    const target = path.join(root, 'public/images', image.file);
    if (!fs.existsSync(target) || !fs.statSync(target).size) errors.push(`${project.id}: missing ${image.file}`);
    if (!image.caption?.trim()) errors.push(`${project.id}: image has no caption`);
  }
}
for (const filename of ['medbot-demo.mp4', 'gesture-robot-demo.mp4', 'autonomous-robot-demo.mp4']) {
  if (!fs.existsSync(path.join(root, 'public/videos', filename))) errors.push(`Missing video: ${filename}`);
}
const page = fs.readFileSync(path.join(root, 'app/page.tsx'), 'utf8');
for (const contact of ['mailto:tayyabmalik1655@gmail.com', 'https://wa.me/923455788896']) {
  if (!page.includes(contact)) errors.push(`Missing contact link: ${contact}`);
}
if (projects.length !== 15) errors.push(`Expected 15 projects; found ${projects.length}`);
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log(`Verified ${projects.length} projects, ${imageCount} gallery images, 3 videos, and both contact links.`);
