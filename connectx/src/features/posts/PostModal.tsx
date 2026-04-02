import React, { useState, useRef } from 'react'
import { X, Image, LayoutGrid, BarChart2, Smile, Globe, ChevronDown } from 'lucide-react'
import { useUIStore } from '@/store/uiStore'
import { useAuthStore } from '@/store/authStore'
import { Avatar } from '@/components/ui/Avatar'

export const PostModal: React.FC = () => {
  const { closePostModal } = useUIStore()
  const { user } = useAuthStore()
  const [content, setContent] = useState('')
  const [images] = useState<string[]>([
    'https://images.unsplash.com/photo-1623479322729-28b25c16b011?w=200&h=140&fit=crop',
    'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=200&h=140&fit=crop',
  ])
  const textRef = useRef<HTMLTextAreaElement>(null)
  const maxChars = 280

  const handlePublish = () => {
    closePostModal()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) closePostModal() }}
    >
      <div className="card w-full max-w-lg animate-scale-in" style={{ background: 'var(--bg-primary)' }}>
        {/* Header */}
        <div className="flex items-center gap-3 p-4 border-b border-[var(--border)]">
          {user && <Avatar src={user.avatar} name={user.name} size="md" isOnline />}
          <div className="flex-1">
            <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
              {user?.name}
            </p>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Drafting your update...</p>
          </div>
          <button
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors"
            style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
          >
            <Globe size={13} /> Everyone <ChevronDown size={12} />
          </button>
          <button
            onClick={closePostModal}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[var(--bg-tertiary)] transition-colors"
            style={{ color: 'var(--text-muted)' }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Text area */}
        <div className="p-4">
          <textarea
            ref={textRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's happening in your world?"
            maxLength={maxChars}
            rows={4}
            className="w-full bg-transparent text-sm resize-none outline-none placeholder:text-[var(--text-muted)] leading-relaxed"
            style={{ color: 'var(--text-primary)' }}
            autoFocus
          />

          {/* Image previews */}
          {images.length > 0 && (
            <div className="flex gap-2 mt-2">
              {images.map((img, i) => (
                <div key={i} className="relative rounded-xl overflow-hidden">
                  <img src={img} alt="" className="w-28 h-20 object-cover" />
                  <button className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/60 flex items-center justify-center text-white text-xs">
                    <X size={10} />
                  </button>
                </div>
              ))}
              <button
                className="w-28 h-20 rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-1 transition-colors hover:bg-[var(--bg-secondary)]"
                style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
              >
                <span className="text-xl font-light">+</span>
                <span className="text-[10px] font-medium uppercase tracking-wide">Add More</span>
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center gap-3 px-4 py-3 border-t border-[var(--border)]">
          <div className="flex items-center gap-1">
            {[Image, LayoutGrid, BarChart2, Smile].map((Icon, i) => (
              <button
                key={i}
                className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-[var(--brand-light)] transition-colors"
                style={{ color: 'var(--brand)' }}
              >
                <Icon size={17} />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <span className="text-xs" style={{ color: content.length > maxChars * 0.8 ? '#ef4444' : 'var(--text-muted)' }}>
              {content.length} / {maxChars}
            </span>
            <button
              onClick={handlePublish}
              className="btn-primary"
              disabled={content.length === 0 && images.length === 0}
            >
              Publish
            </button>
          </div>
        </div>

        {/* Keyboard hints */}
        <div className="flex items-center gap-4 px-4 py-2 border-t border-[var(--border)]">
          <span className="text-[10px] font-mono" style={{ color: 'var(--text-muted)' }}>
            <kbd className="px-1.5 py-0.5 rounded border border-[var(--border)]">Cmd + Enter</kbd> PUBLISH
          </span>
          <span className="text-[10px] font-mono" style={{ color: 'var(--text-muted)' }}>
            <kbd className="px-1.5 py-0.5 rounded border border-[var(--border)]">Esc</kbd> DISCARD
          </span>
        </div>
      </div>

      {/* Content tip */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-start gap-3 p-4 rounded-xl max-w-lg w-full mx-4"
        style={{ background: 'var(--bg-primary)', border: '1px solid var(--border)' }}
      >
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
          style={{ background: 'var(--brand-light)' }}
        >
          <span style={{ color: 'var(--brand)', fontSize: 14 }}>i</span>
        </div>
        <div>
          <p className="text-xs font-semibold mb-0.5" style={{ color: 'var(--text-primary)' }}>Content Tip</p>
          <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Posts with high-quality images and specific hashtags get 3x more engagement. ConnectX real-time engine ensures your circle sees this immediately!
          </p>
        </div>
      </div>
    </div>
  )
}
