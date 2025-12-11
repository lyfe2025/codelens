// 使用 Node.js 生成 PWA 图标
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const svgPath = path.join(__dirname, '../public/favicon.svg');
const svg = fs.readFileSync(svgPath);

const sizes = [192, 512];

for (const size of sizes) {
  await sharp(svg)
    .resize(size, size)
    .png()
    .toFile(path.join(__dirname, `../public/pwa-${size}x${size}.png`));
  console.log(`✓ 生成 pwa-${size}x${size}.png`);
}

console.log('\n图标生成完成！');
