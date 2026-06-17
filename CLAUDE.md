# Morow Studio Web — P3 官網

> P3 獨立專案，技術決策請看 memory/p3_website.md（在 AVATAR MAKER STUDIO/ 資料夾）

## 技術棧
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- 部署：Vercel

## 品牌色
- Navy：#1E3A5F
- Gold：#C9A84C

## 本地開發
```bash
npm install   # 第一次需執行
npm run dev   # 啟動開發伺服器（localhost:3000）
```

## 資料夾結構
```
src/
├── app/
│   ├── layout.tsx     ← 全域 layout + metadata
│   ├── page.tsx       ← 首頁
│   └── globals.css    ← Tailwind + CSS 變數
└── components/        ← 可重用元件
```

## 首頁區塊規劃
1. Nav — Logo + 導覽連結
2. Hero — 自動播放影片 + 主標語
3. Services — 4 張服務卡片
4. How it Works — 3 步驟流程
5. CTA — 聯繫行動呼籲

## 部署流程
1. push 到 GitHub
2. Vercel 自動偵測 Next.js 並部署
3. 綁定自訂網域（morowstudio.com）
