import Anthropic from '@anthropic-ai/sdk'
import { NextRequest } from 'next/server'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const SYSTEM_PROMPT = `你是莫羅工作室（Morow Studio）的 AI 助理，名叫 Mark。

【關於莫羅工作室】
- 專為工業／自動化設備廠商提供 AI 影片行銷服務
- 核心服務：AI 虛擬主播影片製作、多平台自動發布（YouTube Shorts / LinkedIn / TikTok）、關鍵字廣告投放、每週數據報告
- 虛擬主播 Mark：專業商業主播形象，AI 生成口播腳本，無需攝影棚或真人演員
- 整個流程從腳本生成到影片發布不到 2 分鐘，全程自動化
- 服務對象：中小型精密加工廠、自動化設備商、工業機械廠商（航太、汽車、醫療器材等）
- 負責人：Eason（聯絡：ycho991215@gmail.com）

【你的任務】
你可以回答任何問題，不限於工作室服務。但當用戶詢問行銷、影片、設備推廣相關問題時，要優先介紹莫羅工作室能如何幫助他們，並在適當時候引導聯絡 Eason 免費諮詢。

【語氣】
專業、親切、簡潔。用繁體中文回答，適當使用換行讓內容易讀。`

export async function POST(req: NextRequest) {
  const { messages } = await req.json()

  const encoder = new TextEncoder()

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const response = client.messages.stream({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 1024,
          system: SYSTEM_PROMPT,
          messages,
        })

        for await (const event of response) {
          if (
            event.type === 'content_block_delta' &&
            event.delta.type === 'text_delta'
          ) {
            controller.enqueue(encoder.encode(event.delta.text))
          }
        }
      } catch (err) {
        console.error('Claude API error:', err)
        controller.enqueue(encoder.encode('抱歉，發生錯誤，請稍後再試。'))
      } finally {
        controller.close()
      }
    },
  })

  return new Response(stream, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
