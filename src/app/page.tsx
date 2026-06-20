'use client'

import { useState, useEffect, useRef } from 'react'

type Message = { role: 'user' | 'assistant'; content: string }

function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: '你好！我是莫羅工作室的 AI 助理 Mark。有什麼我可以幫你的嗎？' },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const send = async () => {
    const text = input.trim()
    if (!text || loading) return

    const userMsg: Message = { role: 'user', content: text }
    const next = [...messages, userMsg]
    setMessages(next)
    setInput('')
    setLoading(true)

    // Placeholder for streaming
    setMessages(prev => [...prev, { role: 'assistant', content: '' }])

    try {
      const resp = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next }),
      })

      const reader = resp.body!.getReader()
      const decoder = new TextDecoder()
      let accumulated = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        accumulated += decoder.decode(value, { stream: true })
        setMessages(prev => {
          const updated = [...prev]
          updated[updated.length - 1] = { role: 'assistant', content: accumulated }
          return updated
        })
      }
    } catch {
      setMessages(prev => {
        const updated = [...prev]
        updated[updated.length - 1] = { role: 'assistant', content: '抱歉，發生錯誤，請稍後再試。' }
        return updated
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* 浮動按鈕 */}
      <button
        onClick={() => setOpen(o => !o)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#C9A84C] shadow-lg flex items-center justify-center hover:bg-[#ddb84e] transition-all duration-200 hover:scale-110"
        aria-label="開啟 AI 助理"
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>

      {/* 對話視窗 */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-100"
          style={{ height: '480px' }}>
          {/* Header */}
          <div className="bg-[#1E3A5F] px-4 py-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#C9A84C] flex items-center justify-center text-sm font-bold text-[#1E3A5F]">
              M
            </div>
            <div>
              <p className="text-white font-semibold text-sm">Mark AI 助理</p>
              <p className="text-white/50 text-xs">莫羅工作室</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#f8f9fb]">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-xl text-sm leading-relaxed whitespace-pre-wrap ${
                    m.role === 'user'
                      ? 'bg-[#1E3A5F] text-white rounded-br-sm'
                      : 'bg-white text-gray-700 shadow-sm border border-gray-100 rounded-bl-sm'
                  }`}
                >
                  {m.content}
                  {m.role === 'assistant' && m.content === '' && loading && (
                    <span className="inline-flex gap-1">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </span>
                  )}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-gray-100 bg-white flex gap-2">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()}
              placeholder="輸入訊息..."
              className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#C9A84C] transition-colors"
            />
            <button
              onClick={send}
              disabled={loading || !input.trim()}
              className="bg-[#C9A84C] text-white px-4 py-2 rounded-lg text-sm font-semibold disabled:opacity-40 hover:bg-[#ddb84e] transition-colors"
            >
              送出
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <main>

      {/* ── NAV ─────────────────────────────────────────── */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-[#1E3A5F]/95 shadow-lg backdrop-blur-sm' : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold italic text-white">morow</span>
            <span className="text-[#C9A84C] text-xs tracking-[0.35em] uppercase">studio</span>
          </div>
          <a
            href="mailto:ycho991215@gmail.com?subject=莫羅工作室服務諮詢"
            className="bg-[#C9A84C] text-[#1E3A5F] px-5 py-2 rounded text-sm font-bold hover:bg-[#ddb84e] transition-colors"
          >
            聯絡我們
          </a>
        </div>
      </nav>

      {/* ── HERO ────────────────────────────────────────── */}
      <section className="min-h-screen bg-[#1E3A5F] flex items-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-16 right-16 w-[420px] h-[420px] rounded-full border border-[#C9A84C]/15" />
          <div className="absolute top-36 right-36 w-[280px] h-[280px] rounded-full border border-[#C9A84C]/10" />
          <div className="absolute -bottom-20 -left-20 w-[380px] h-[380px] rounded-full border border-white/5" />
          <div className="absolute bottom-40 left-40 w-[200px] h-[200px] rounded-full border border-white/5" />
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10 pt-20">
          <p className="text-[#C9A84C] tracking-[0.45em] text-xs uppercase mb-6">
            AI 影片行銷 · 工業設備專屬
          </p>
          <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] mb-6">
            讓 AI 幫你的設備<br />
            <span className="text-[#C9A84C]">開口</span>找到客戶
          </h1>
          <p className="text-white/65 text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
            虛擬主播 Mark 替你 24 小時口播推廣——<br />
            從腳本生成到多平台發布，全自動完成。
          </p>
          <div className="flex gap-4 flex-wrap">
            <a
              href="#services"
              className="bg-[#C9A84C] text-[#1E3A5F] px-8 py-3 rounded font-bold hover:bg-[#ddb84e] transition-colors"
            >
              了解服務
            </a>
            <a
              href="#how-it-works"
              className="border border-white/30 text-white px-8 py-3 rounded font-semibold hover:bg-white/10 transition-colors"
            >
              如何運作 →
            </a>
          </div>
        </div>
      </section>

      {/* ── SERVICES ────────────────────────────────────── */}
      <section id="services" className="bg-white py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[#C9A84C] tracking-[0.4em] text-xs uppercase mb-3">我們的服務</p>
            <h2 className="text-3xl md:text-4xl font-black text-[#1E3A5F]">
              AI 驅動的全自動行銷流程
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '🎬', title: 'AI 虛擬主播影片', desc: '虛擬主播 Mark 口播你的設備，媲美真人質感，無需攝影棚或演員成本。' },
              { icon: '📡', title: '多平台自動發布', desc: 'YouTube Shorts、LinkedIn、TikTok 一鍵發布，附最佳化標題與 30 個 Hashtag。' },
              { icon: '🎯', title: '關鍵字廣告投放', desc: 'Google Ads 自動投放，精準觸及正在搜尋採購方案的工業決策者。' },
              { icon: '📊', title: '每週數據報告', desc: 'AI 分析觀看數、點擊率、詢問量，每週自動產出客戶報告，掌握成效。' },
            ].map((s) => (
              <div key={s.title} className="border border-gray-100 rounded-xl p-6 hover:shadow-xl hover:border-[#C9A84C]/40 transition-all duration-300 group">
                <div className="text-4xl mb-4">{s.icon}</div>
                <h3 className="text-[#1E3A5F] font-bold text-lg mb-2 group-hover:text-[#C9A84C] transition-colors">{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ────────────────────────────────── */}
      <section id="how-it-works" className="bg-[#f5f7fa] py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[#C9A84C] tracking-[0.4em] text-xs uppercase mb-3">運作流程</p>
            <h2 className="text-3xl md:text-4xl font-black text-[#1E3A5F]">
              三步驟，讓產品自動說話
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { step: '01', title: '提供產品資料', desc: '告訴我們你的設備特色、目標客群、核心賣點，一份簡單的說明即可開始。' },
              { step: '02', title: 'AI 生成 + Mark 口播', desc: 'Gemini AI 生成專業腳本，虛擬主播 Mark 完成自信口播，全程不需真人出鏡。' },
              { step: '03', title: '自動發布，持續觸及', desc: '影片自動上傳各平台，SEO 最佳化，24 小時替你觸及有採購需求的客戶。' },
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="text-[8rem] font-black text-[#1E3A5F]/[0.06] absolute -top-6 -left-3 leading-none select-none">
                  {item.step}
                </div>
                <div className="relative z-10 pt-8">
                  <div className="w-10 h-[3px] bg-[#C9A84C] mb-5" />
                  <h3 className="text-[#1E3A5F] font-bold text-xl mb-3">{item.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────── */}
      <section className="bg-[#1E3A5F] py-28">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-[#C9A84C] tracking-[0.4em] text-xs uppercase mb-4">開始合作</p>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-5 leading-tight">
            準備讓你的設備<br />開始說話了嗎？
          </h2>
          <p className="text-white/50 mb-10 text-lg">
            免費諮詢，了解 AI 影片行銷如何為你的工業設備帶來真實詢問量。
          </p>
          <a
            href="mailto:ycho991215@gmail.com?subject=莫羅工作室服務諮詢"
            className="inline-block bg-[#C9A84C] text-[#1E3A5F] px-12 py-4 rounded font-black text-lg hover:bg-[#ddb84e] transition-colors"
          >
            立即免費諮詢
          </a>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────── */}
      <footer className="bg-[#152a47] py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-baseline gap-2">
            <span className="italic font-bold text-white/50">morow</span>
            <span className="text-[#C9A84C]/50 text-xs tracking-[0.35em]">STUDIO</span>
          </div>
          <p className="text-white/25 text-xs">© 2026 莫羅工作室 · AI 影片行銷，工業設備專屬</p>
        </div>
      </footer>

      {/* ── AI 聊天視窗 ──────────────────────────────────── */}
      <ChatWidget />

    </main>
  )
}
