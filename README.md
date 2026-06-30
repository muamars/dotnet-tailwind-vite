# dotnet-tailwind-vite

⚡ **dotnet-tailwind-vite** adalah sebuah CLI tool sederhana untuk mengintegrasikan **Vite v8** dan **Tailwind CSS v4** secara instan ke dalam proyek **ASP.NET Core** (MVC / Razor Pages).

Tool ini secara otomatis menyalin konfigurasi, membuat file CSS utama, dan menyisipkan *environment condition* (Dev Server / Production Build) langsung ke dalam file `_Layout.cshtml` Anda.

---

## 🚀 Fitur Utama

- **Zero Configuration**: Otomatis membuat file `package.json` dan `vite.config.ts` yang sudah teroptimasi untuk ASP.NET Core.
- **Smart Injection**: Mencari file `_Layout.cshtml` secara otomatis dan menyisipkan kode *Hot Module Replacement* (HMR) Vite sebelum tag `</head>`.
- **Tailwind v4 Ready**: Otomatis membuat file `wwwroot/css/site.css` dengan arahan baru `@import "tailwindcss";`.
- **Production Asset Pipeline**: Konfigurasi build Vite yang otomatis menimpa aset statis di dalam folder `wwwroot` tanpa menghapus file bawaan .NET lainnya.

---

## 🛠️ Cara Instalasi & Penggunaan

Karena package ini sudah dipublikasikan secara resmi, Anda bisa langsung menggunakannya di proyek ASP.NET Core baru Anda dengan langkah mudah berikut:

### 1. Jalankan Perintah Install di Proyek Baru Anda
Buka terminal di dalam folder proyek ASP.NET Core baru Anda yang masih kosong (atau proyek yang ingin diintegrasikan), lalu ketik:

```bash
npm install @muamars/dotnet-tailwind-vite --save-dev
```

### 2. Inisialisasi Integrasi via CLI
Setelah proses instalasi selesai, jalankan perintah CLI berikut untuk mengotomatisasi seluruh konfigurasi:

```bash
npx dotnet-vite
```

### 3. Pasang Dependensi Frontend & Jalankan Dev Server
Setelah script CLI selesai memproses proyek Anda, jalankan perintah berikut untuk mengunduh modul Tailwind/Vite dan mengaktifkan server lokal:

```bash
npm install
npm run dev
```

Sekarang, jalankan proyek .NET Anda (`dotnet watch` atau via Visual Studio). Proyek Anda sudah terhubung penuh dengan Vite Dev Server!

---

## ⚙️ Apa Saja yang Diubah Otomatis?

Script ini akan melakukan otomatisasi terhadap struktur proyek Anda seperti berikut:

### 1. File `wwwroot/css/site.css`
Otomatis mendefinisikan Tailwind v4:
```css
@import "tailwindcss";
```

### 2. File `_Layout.cshtml`
Menyisipkan logika deteksi *environment* otomatis sebelum tag `</head>`:
```html
@if (Env.IsDevelopment())
{
    <!-- Terhubung ke Vite Dev Server untuk Hot Module Replacement (HMR) -->
    <script type="module" src="http://localhost:5173/@client"></script>
    <link rel="stylesheet" href="http://localhost:5173/wwwroot/css/site.css" />
}
else
{
    <!-- Membaca file CSS statis hasil kompilasi production -->
    <link rel="stylesheet" href="~/css/site.css" asp-append-version="true" />
}
```

### 2. File `vite.config.ts`
Menyiapkan jalur kompilasi aset agar output build langsung mengarah dan memperbarui file statis produksi .NET Anda tanpa merusak file bawaan wwwroot lainnya.

---

## 📦 Perintah Build untuk Production

Saat Anda siap merilis aplikasi ke tahap production, Anda hanya perlu menjalankan perintah kompilasi berikut untuk menghasilkan file CSS statis yang optimal dan ter-minify:

```bash
npm run build
```

---

## 👤 Author

- **Muammar** - [GitHub Profile](https://github.com/muamars)

---

## 📄 Lisensi

Proyek ini dilisensikan di bawah **ISC License**. Bebas digunakan dan dimodifikasi untuk proyek pribadi maupun komersial.
