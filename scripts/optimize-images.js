/**
 * 画像最適化スクリプト
 * ビルド前に画像をWebPとAVIF形式に変換します
 * レスポンシブ画像の生成も対応
 */

import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function optimizeImages() {
  const imagesDir = path.join(process.cwd(), 'public/images');
  let processedCount = 0;
  let skippedCount = 0;
  let errorCount = 0;
  
  async function processDirectory(dir) {
    try {
      const entries = await fs.readdir(dir, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        
        if (entry.isDirectory()) {
          await processDirectory(fullPath);
        } else if (/\.(jpg|jpeg|png)$/i.test(entry.name)) {
          const ext = path.extname(entry.name).toLowerCase();
          const nameWithoutExt = path.basename(entry.name, ext);
          const dirPath = path.dirname(fullPath);
          
          try {
            // 元画像のメタデータを取得
            const metadata = await sharp(fullPath).metadata();
            const isImportantImage = entry.name.includes('hero') || 
                                     entry.name.includes('img3') || 
                                     entry.name.includes('ogp');
            
            // WebP形式に変換（既存ファイルをスキップ）
            const webpPath = path.join(dirPath, `${nameWithoutExt}.webp`);
            if (!(await fileExists(webpPath))) {
              await sharp(fullPath)
                .webp({ quality: 85, effort: 6 })
                .toFile(webpPath);
              console.log(`✓ Created WebP: ${path.relative(process.cwd(), webpPath)}`);
            } else {
              skippedCount++;
            }
            
            // AVIF形式にも変換（対応ブラウザ用）
            const avifPath = path.join(dirPath, `${nameWithoutExt}.avif`);
            if (!(await fileExists(avifPath))) {
              await sharp(fullPath)
                .avif({ quality: 80, effort: 4 })
                .toFile(avifPath);
              console.log(`✓ Created AVIF: ${path.relative(process.cwd(), avifPath)}`);
            } else {
              skippedCount++;
            }
            
            // レスポンシブ画像の生成（重要画像のみ）
            if (isImportantImage && metadata.width && metadata.width > 640) {
              const sizes = [640, 768, 1024, 1280, 1920];
              for (const size of sizes) {
                if (metadata.width > size) {
                  const webpResponsivePath = path.join(dirPath, `${nameWithoutExt}-${size}w.webp`);
                  if (!(await fileExists(webpResponsivePath))) {
                    await sharp(fullPath)
                      .resize(size, null, { 
                        withoutEnlargement: true,
                        fit: 'inside'
                      })
                      .webp({ quality: 85 })
                      .toFile(webpResponsivePath);
                    console.log(`✓ Created responsive WebP: ${path.basename(webpResponsivePath)}`);
                  }
                }
              }
            }
            
            processedCount++;
          } catch (error) {
            console.error(`✗ Failed to optimize ${entry.name}:`, error.message);
            errorCount++;
          }
        }
      }
    } catch (error) {
      console.error(`Error processing directory ${dir}:`, error.message);
      errorCount++;
    }
  }
  
  console.log('🖼️  Starting image optimization...');
  await processDirectory(imagesDir);
  console.log(`✅ Image optimization complete!`);
  console.log(`   Processed: ${processedCount} images`);
  console.log(`   Skipped (already exists): ${skippedCount} files`);
  if (errorCount > 0) {
    console.log(`   Errors: ${errorCount} files`);
  }
}

optimizeImages().catch((error) => {
  console.error('❌ Image optimization failed:', error);
  process.exit(1);
});

