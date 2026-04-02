import React, { useState } from 'react'
import { MapPin, Link2, Calendar, Share2, Edit3 } from 'lucide-react'
import { CURRENT_USER, POSTS } from '@/constants/data'
import { PostCard } from '@/features/feed/PostCard'
import { Avatar } from '@/components/ui/Avatar'

type ProfileTab = 'posts' | 'replies' | 'media'

export const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ProfileTab>('posts')
  const user = CURRENT_USER

  const userPosts = POSTS.filter((p) => p.author.id === user.id)

  function formatNum(n: number) {
    if (n >= 1000) return (n / 1000).toFixed(1).replace('.0', '') + 'K'
    return String(n)
  }

  return (
    <div className="max-w-[700px] mx-auto">
      {/* Cover image */}
      <div
        className="h-44 flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, var(--brand-light) 0%, var(--bg-tertiary) 100%)' }}
      >
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center opacity-20" style={{ background: 'var(--brand)' }}>
          <span className="text-3xl text-white font-display font-bold">
            {user.name.charAt(0)}
          </span>
        </div>
      </div>

      {/* Profile info */}
      <div className="card -mt-6 mx-4 p-6 relative animate-slide-up">
        {/* Avatar + action buttons */}
        <div className="flex items-end justify-between mb-4">
          <div className="-mt-14">
            <Avatar src={user.avatar} name={user.name} size="xl" isOnline className="ring-4 ring-[var(--bg-primary)]" />
          </div>
          <div className="flex items-center gap-2">
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-all hover:bg-[var(--bg-secondary)]"
              style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
            >
              <Share2 size={14} /> Share
            </button>
            <button className="btn-primary flex items-center gap-2">
              <Edit3 size={14} /> Edit Profile
            </button>
          </div>
        </div>

        {/* Name & bio */}
        <div className="mb-4">
          <h2 className="font-display font-bold text-xl leading-tight" style={{ color: 'var(--text-primary)' }}>
            {user.name}
          </h2>
          <p className="text-sm mb-2" style={{ color: 'var(--text-muted)' }}>@{user.username}</p>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {user.bio}
          </p>
        </div>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 mb-4">
          {user.location && (
            <span className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-muted)' }}>
              <MapPin size={13} /> {user.location}
            </span>
          )}
          {user.website && (
            <a
              href={`https://${user.website}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-xs hover:underline"
              style={{ color: 'var(--brand)' }}
            >
              <Link2 size={13} /> {user.website}
            </a>
          )}
          {user.joinedDate && (
            <span className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-muted)' }}>
              <Calendar size={13} /> Joined {user.joinedDate}
            </span>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center gap-6 border-t border-[var(--border)] pt-4">
          {[
            { label: 'Following', value: user.following },
            { label: 'Followers', value: user.followers },
            { label: 'Posts', value: user.posts },
          ].map(({ label, value }) => (
            <div key={label} className="cursor-pointer hover:opacity-75 transition-opacity">
              <span className="font-display font-bold text-base" style={{ color: 'var(--text-primary)' }}>
                {formatNum(value)}
              </span>
              <span className="ml-1.5 text-sm" style={{ color: 'var(--text-muted)' }}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center px-4 mt-4 border-b border-[var(--border)] bg-[var(--bg-primary)] rounded-t-xl">
        {(['posts', 'replies', 'media'] as ProfileTab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="relative px-5 py-3.5 text-sm font-medium capitalize transition-colors"
            style={{
              color: activeTab === tab ? 'var(--brand)' : 'var(--text-muted)',
            }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
            {activeTab === tab && (
              <span
                className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                style={{ background: 'var(--brand)' }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="px-4 py-4 flex flex-col gap-3">
        {activeTab === 'posts' && userPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
        {activeTab === 'replies' && (
          <div className="py-12 text-center text-sm" style={{ color: 'var(--text-muted)' }}>
            No replies yet
          </div>
        )}
        {activeTab === 'media' && (
          <div className="grid grid-cols-3 gap-2">
            {userPosts.flatMap((p) => p.images || []).map((img, i) => (
              <img key={i} src={img} alt="" className="w-full aspect-square object-cover rounded-xl" />
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="text-center py-6 text-xs" style={{ color: 'var(--text-muted)' }}>
        © 2024 ConnectX. Built for real-time connection.
      </div>
    </div>
  )
}
