import React from 'react'
import { TrendingUp, ChevronRight } from 'lucide-react'
import { TRENDING } from '@/constants/data'

export const TrendingWidget: React.FC = () => {
  return (
    <div className="card p-4">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp size={16} style={{ color: 'var(--brand)' }} />
        <h3 className="font-display font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
          Trending for you
        </h3>
      </div>

      <div className="flex flex-col gap-0.5">
        {TRENDING.map((item, i) => (
          <button
            key={i}
            className="flex items-start justify-between px-2 py-2.5 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors text-left group"
          >
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider mb-0.5" style={{ color: 'var(--text-muted)' }}>
                {item.category}
              </p>
              <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                {item.topic}
              </p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                {item.postCount}
              </p>
            </div>
            <ChevronRight size={14} className="mt-1 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--text-muted)' }} />
          </button>
        ))}
      </div>

      <button className="mt-2 px-2 py-1.5 text-xs font-semibold rounded-lg hover:bg-[var(--brand-light)] transition-colors w-full text-left" style={{ color: 'var(--brand)' }}>
        Show more
      </button>
    </div>
  )
}
