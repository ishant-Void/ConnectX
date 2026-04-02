import React, { useState } from 'react'
import { RefreshCw } from 'lucide-react'
import { PostCard } from './PostCard'
import { TrendingWidget } from './TrendingWidget'
import { WhoToFollowWidget } from './WhoToFollowWidget'
import { POSTS } from '@/constants/data'

type FeedTab = 'following' | 'for-you'

export const FeedPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<FeedTab>('following')
  const [showNewPosts, setShowNewPosts] = useState(true)

  const feedPosts = activeTab === 'following'
    ? POSTS
    : [...POSTS].sort((a, b) => b.likes - a.likes)

  return (
    <div className="flex gap-6 px-6 py-6 max-w-[1100px] mx-auto">
      {/* Main feed */}
      <div className="flex-1 min-w-0">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-display font-bold text-xl" style={{ color: 'var(--text-primary)' }}>
            Home Feed
          </h1>
          <div className="flex items-center gap-1 p-1 rounded-xl" style={{ background: 'var(--bg-tertiary)' }}>
            {(['following', 'for-you'] as FeedTab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-4 py-1.5 rounded-lg text-sm font-medium capitalize transition-all duration-150"
                style={
                  activeTab === tab
                    ? { background: 'var(--bg-primary)', color: 'var(--text-primary)', boxShadow: 'var(--shadow-sm)' }
                    : { color: 'var(--text-muted)' }
                }
              >
                {tab === 'for-you' ? 'For You' : 'Following'}
              </button>
            ))}
          </div>
        </div>

        {/* New posts banner */}
        {showNewPosts && (
          <button
            onClick={() => setShowNewPosts(false)}
            className="w-full flex items-center justify-center gap-2 py-2.5 mb-4 rounded-xl text-sm font-semibold transition-all duration-200 animate-slide-down"
            style={{ background: 'var(--brand)', color: '#fff' }}
          >
            <RefreshCw size={14} />
            New Posts Available
          </button>
        )}

        {/* Posts */}
        <div className="flex flex-col gap-3">
          {feedPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        {/* Load more */}
        <div className="py-8 text-center text-sm" style={{ color: 'var(--text-muted)' }}>
          Fetching more stories...
        </div>
      </div>

      {/* Right sidebar */}
      <aside className="w-[280px] flex-shrink-0 hidden lg:flex flex-col gap-4 sticky top-20 self-start">
        <TrendingWidget />
        <WhoToFollowWidget />

        <p className="px-2 text-[10px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          Terms of Service · Privacy Policy · Cookie Policy · Accessibility · Ads Info · More...
          <br />© 2024 ConnectX Corp.
        </p>
      </aside>
    </div>
  )
}
