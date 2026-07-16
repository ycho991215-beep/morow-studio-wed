import { NextResponse } from 'next/server'

// 舊版聊天 API 已停用：V2 靜態首頁（public/home.html）不使用這個端點。
// 舊程式碼保留在 git 歷史紀錄裡，需要時可以找回。
export async function POST() {
  return NextResponse.json({ error: 'disabled' }, { status: 410 })
}
