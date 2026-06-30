#!/usr/bin/env node

import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { globby } from 'globby';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function setup() {
  const targetDir = process.cwd(); // Lokasi project baru dijalankan
  const templateDir = path.join(__dirname, 'templates');

  console.log('⚡ Mengintegrasikan Tailwind v4 & Vite ke project ASP.NET Core...');

  try {
    // 1. Copy package.json & vite.config.ts ke target
    await fs.copy(path.join(templateDir, 'package.json'), path.join(targetDir, 'package.json'));
    await fs.copy(path.join(templateDir, 'vite.config.ts'), path.join(targetDir, 'vite.config.ts'));
    console.log('✅ File konfigurasi package.json dan vite.config.ts berhasil dibuat.');

    // 2. Buat file wwwroot/css/site.css dan isi dengan @import "tailwindcss";
    const cssDir = path.join(targetDir, 'wwwroot', 'css');
    await fs.ensureDir(cssDir);
    await fs.writeFile(path.join(cssDir, 'site.css'), '@import "tailwindcss";\n');
    console.log('✅ File wwwroot/css/site.css dengan Tailwind v4 berhasil dibuat.');

    // 3. Cari file _Layout.cshtml secara otomatis
    const layoutFiles = await globby('**/Views/Shared/_Layout.cshtml', { cwd: targetDir, absolute: true });

    if (layoutFiles.length === 0) {
      console.log('⚠️  Peringatan: File _Layout.cshtml tidak ditemukan otomatis. Silakan pasang kodenya manual.');
    } else {
      const layoutPath = layoutFiles[0];
      let layoutContent = await fs.readFile(layoutPath, 'utf-8');

      // Teks kode inject yang diinginkan
      const injectCode = `
    @if (Env.IsDevelopment())
    {
        <!-- Terhubung ke Vite Dev Server untuk Hot Module Replacement (HMR) -->
        <script type="module" src="http://localhost:5173/@@client"></script>
        <link rel="stylesheet" href="http://localhost:5173/wwwroot/css/site.css" />
    }
    else
    {
        <!-- Membaca file CSS statis hasil kompilasi production -->
        <link rel="stylesheet" href="~/css/site.css" asp-append-version="true" />
    }
`;

      // Cek apakah kode sudah pernah di-inject sebelumnya supaya tidak double
      if (!layoutContent.includes('http://localhost:5173/@@client')) {
        // Cari tag </head> dan sisipkan sebelum tag tersebut
        if (layoutContent.includes('</head>')) {
          layoutContent = layoutContent.replace('</head>', `${injectCode}</head>`);
          await fs.writeFile(layoutPath, layoutContent, 'utf-8');
          console.log(`✅ Berhasil menyisipkan kode integrasi Vite ke: ${path.relative(targetDir, layoutPath)}`);
        } else {
          console.log('⚠️  Tag </head> tidak ditemukan di _Layout.cshtml. Gagal menyisipkan otomatis.');
        }
      } else {
        console.log('ℹ️  Kode integrasi Vite sudah ada di _Layout.cshtml.');
      }
    }

    console.log('\n🎉 Selesai! Silakan jalankan `npm install` lalu `npm run dev` di project baru Anda.');

  } catch (error) {
    console.error('❌ Terjadi kesalahan saat setup:', error);
  }
}

setup();
