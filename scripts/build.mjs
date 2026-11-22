import { cp, mkdir, rm } from 'node:fs/promises';

const output = new URL('../dist/', import.meta.url);
const files = ['index.html', 'styles.css', 'main.js'];
const assets = [
  'favicon.png',
  'manrope.woff2',
  'manrope-OFL.txt',
  'instrument-serif-italic.ttf',
  'instrument-serif-OFL.txt',
  'rudra-cutout.webp',
  'rudra-studio.webp',
  'rudra-jadon-resume.pdf',
];

await rm(output, { recursive: true, force: true });
await mkdir(new URL('assets/', output), { recursive: true });
await Promise.all([
  ...files.map((file) =>
    cp(new URL(`../${file}`, import.meta.url), new URL(file, output))),
  ...assets.map((file) =>
    cp(new URL(`../assets/${file}`, import.meta.url), new URL(`assets/${file}`, output))),
]);
