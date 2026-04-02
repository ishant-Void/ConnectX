import React, { useState } from 'react'
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal } from 'lucide-react'
import type { Post } from '@/types'
import { Avatar } from '@/components/ui/Avatar'
import clsx from 'clsx'

interface PostCardProps {
  post: Post
}

function formatCount(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1).replace('.0', '') + 'k'
  return String(n)
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [liked, setLiked] = useState(post.isLiked ?? false)
  const [bookmarked, setBookmarked] = useState(post.isBookmarked ?? false)
  const [likeCount, setLikeCount] = useState(post.likes)

  const handleLike = () => {
    setLiked((prev) => !prev)
    setLikeCount((prev) => liked ? prev - 1 : prev + 1)
  }

  return (
    <article className="card px-5 py-4 hover:shadow-md transition-shadow duration-200 animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <Avatar src={post.author.avatar} name={post.author.name} size="md" />
          <div>
            <p className="font-semibold text-sm leading-tight" style={{ color: 'var(--text-primary)' }}>
              {post.author.name}
            </p>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              @{post.author.username} · {post.timeAgo}
            </p>
          </div>
        </div>
        <button className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[var(--bg-tertiary)] transition-colors" style={{ color: 'var(--text-muted)' }}>
          <MoreHorizontal size={16} />
        </button>
      </div>

      {/* Content */}
      <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-primary)' }}>
        {post.content}
      </p>

      {/* Images */}
      {post.images && post.images.length > 0 && (
        <div className={clsx('mb-3 overflow-hidden rounded-xl', post.images.length > 1 ? 'grid grid-cols-2 gap-1' : '')}>
          {post.images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt=""
              className="w-full object-cover rounded-xl"
              style={{ maxHeight: post.images!.length > 1 ? '200px' : '320px' }}
            />
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-1">
          {/* Like */}
          <button
            onClick={handleLike}
            className={clsx(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150',
              liked
                ? 'text-red-500 bg-red-50 dark:bg-red-950/30'
                : 'text-[var(--text-muted)] hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30'
            )}
          >
            <Heart size={15} fill={liked ? 'currentColor' : 'none'} />
            <span>{formatCount(likeCount)}</span>
          </button>

          {/* Comment */}
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[var(--text-muted)] hover:text-[var(--brand)] hover:bg-[var(--brand-light)] transition-all duration-150">
            <MessageCircle size={15} />
            <span>{formatCount(post.comments)}</span>
          </button>

          {/* Share */}
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[var(--text-muted)] hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-all duration-150">
            <Share2 size={15} />
            <span>{formatCount(post.shares)}</span>
          </button>
        </div>

        {/* Bookmark */}
        <button
          onClick={() => setBookmarked((p) => !p)}
          className={clsx(
            'w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-150',
            bookmarked
              ? 'text-[var(--brand)] bg-[var(--brand-light)]'
              : 'text-[var(--text-muted)] hover:text-[var(--brand)] hover:bg-[var(--brand-light)]'
          )}
        >
          <Bookmark size={15} fill={bookmarked ? 'currentColor' : 'none'} />
        </button>
      </div>
    </article>
  )
}
