/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  // 首頁「/」直接顯示 V2 靜態版（public/home.html），網址列保持乾淨
  async rewrites() {
    return {
      beforeFiles: [{ source: '/', destination: '/home.html' }],
      afterFiles: [],
      fallback: [],
    }
  },
}

module.exports = nextConfig
